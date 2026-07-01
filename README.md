# LayerCake — Full-Stack Web Application for Custom Cake Businesses

LayerCake is a full-stack web application for custom cake and confectionery businesses. It combines a public storefront with an admin workflow for products, orders, and customer reviews.

The frontend is built with **HTML, CSS, and Vanilla JavaScript**. The backend uses **Node.js, Express, MongoDB, and Mongoose**. Product and review images are uploaded to **S3-compatible storage (Cloudflare R2)**. The project includes a **generic transactional email service**: **SMTP/Ethereal** support for local development, with **Brevo API** support prepared for future production use after domain and sender setup. Completed orders can trigger a review request email through this service.

This project is intended to become a reusable website/application template for small cake businesses. It is actively developed and not yet production-ready.

---

## Project Overview

LayerCake covers the main workflow of a custom cake shop:

- Customers browse products and place orders
- Admins manage products, order statuses, and review moderation
- Customers receive a review invitation email after an order is completed
- Approved reviews are published on the reviews page

---

## Main Features

- Public product gallery
- Product management in admin
- Admin login and protected admin area
- Admin account page with email verification status
- Admin password change
- Admin email verification request and confirmation
- Order creation and order status management
- Review email request after completed order
- Transactional email foundation for review requests and admin verification
- Review submission form
- Review moderation (approve / reject / remove photo)
- Published reviews page
- Image upload for products and review photos
- Responsive layout for different screen sizes

---

## Tech Stack

### Frontend

- HTML5
- CSS3 (Flexbox, Grid, media queries)
- Vanilla JavaScript

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- Multer (file uploads)
- Sharp (image conversion to WebP)
- AWS SDK S3 client (S3-compatible storage / Cloudflare R2)
- Nodemailer / SMTP for local Ethereal email testing
- Brevo API support prepared for production transactional emails

---

## Project Structure

```
LayerCake/
├── index.html              # Main landing page
├── galery/                 # Public product gallery
├── admin/                  # Admin panel (login, dashboard, account, review moderation)
├── orders_page/            # Order list and status management
├── review_form/            # Customer review submission page
├── reviews/                # Published reviews page
├── about/
├── backend/
│   ├── server.js
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   └── .env.example
└── README.md
```

---

## Backend API Overview

Base URL (local): `http://localhost:3000`

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check |
| `POST /api/auth/setup` | Create the first admin account (one-time) |
| `POST /api/auth/login` | Admin login; returns a session token |
| `GET /api/auth/me` | Load current admin account (**admin**) |
| `PATCH /api/auth/password` | Change admin password (**admin**) |
| `POST /api/auth/email-verification/request` | Send admin email verification email (**admin**) |
| `GET /api/auth/email-verification/confirm?token=...` | Confirm admin email verification (public) |
| `GET /api/products` | List all products (public) |
| `POST /api/products` | Create product with required image upload or image URL (**admin**) |
| `GET /api/products/:productCode` | Get product by product code (public) |
| `PUT /api/products/:productCode` | Update product (**admin**) |
| `DELETE /api/products/:productCode` | Delete product (**admin**) |
| `GET /api/orders` | List all orders (**admin**) |
| `GET /api/orders/:id` | Get order by ID (**admin**) |
| `POST /api/orders` | Create order (public) |
| `PATCH /api/orders/:id/status` | Update order status (**admin**; optional review email on completion) |
| `GET /api/reviews` | List approved reviews (public) |
| `GET /api/reviews/pending` | List pending reviews for moderation (**admin**) |
| `POST /api/reviews` | Submit review (public; optional photo upload) |
| `PATCH /api/reviews/:id/status` | Approve or reject review (**admin**) |
| `PATCH /api/reviews/:id/remove-photo` | Remove review photo from moderation (**admin**) |

---

## Admin Authentication

LayerCake uses a **one site = one owner/admin** model. Each deployment is intended to have a single admin account that manages products, orders, and review moderation.

### First admin setup

`POST /api/auth/setup` creates the **first and only** admin account for the site. Send JSON with `username`, `email`, and `password` (minimum 8 characters).

- On success: `201` with `{ message: "Admin account created" }`
- If an admin already exists: `409` with `{ message: "Admin account already exists" }`

Passwords are stored as **hashes**, not plain text. There is no admin setup page in the frontend yet; the first account is created through this API call during local setup.

### Admin login

`POST /api/auth/login` accepts JSON:

```json
{
  "usernameOrEmail": "admin",
  "password": "your-password"
}
```

On success, the API returns `{ token }`. Invalid credentials return `401`.

The admin login page is `admin/login.html`. After a successful login, the frontend stores the token in **`sessionStorage`** under the key `adminSessionToken`.

### Session protection (frontend)

- The admin dashboard (`admin/index.html`) checks for a token with `requireAdminSession()` and redirects unauthenticated users to **`admin/login.html`**.
- Admin API requests use `adminApiFetch`, which sends `Authorization: Bearer <token>`.
- If the backend returns **`401`** (missing, invalid, or expired token), the frontend clears `adminSessionToken` and redirects to **`admin/login.html`**.
- Logout removes the token from `sessionStorage` and returns to the login page.

### Admin account page

The protected account page is `admin/account.html`. It displays the current admin **username**, **email**, and **email verification status**. The page is available from the Account link in the admin header.

### Password change

Authenticated admins can change their password from the account page. The frontend calls `PATCH /api/auth/password` with the current password and a new password (minimum 8 characters). Passwords are stored as hashes, not plain text.

### Email verification

Email verification helps confirm that the shop owner controls the admin email address before the system relies on it for important messages.

- `POST /api/auth/email-verification/request` is **protected** and sends a verification email to the admin address.
- `GET /api/auth/email-verification/confirm?token=...` is a **public** confirmation route that uses a secure one-time token.
- The raw verification token is **never stored** in the database; only a **SHA-256 token hash** is stored.
- The token expires after **1 hour**.
- Token fields are cleared after successful verification.
- Token fields are also cleared if email sending fails.
- The admin is **not logged out** when email sending fails; the account page shows an error message instead.

For local development, verification emails can be tested with **Ethereal SMTP** settings. Production delivery through **Brevo** is prepared but still requires final domain and sender configuration.

### Protected admin actions

These require a valid admin session token:

- Load current admin account
- Change admin password
- Request admin email verification
- Create, update, and delete products
- List orders and view order details
- Update order status
- List pending reviews
- Approve or reject reviews
- Remove a photo from a pending review

### Public visitor actions

These do not require admin authentication:

- Browse products (`GET /api/products`, `GET /api/products/:productCode`)
- Place an order (`POST /api/orders`)
- View published reviews (`GET /api/reviews`)
- Submit a review (`POST /api/reviews`)

### Planned future work

The following are **not implemented yet**:

- Password recovery / reset flow
- Additional admin profile settings beyond the current account page

Admin authentication, account management, password change, and email verification are available for local development but are not yet part of a finished production deployment process.

---

## Business Value of Admin Security and Email Verification

This work adds practical protection for a small cake business running its own site. The shop owner keeps control of products, orders, and review moderation instead of leaving those actions open to anyone who finds the admin pages.

LayerCake follows a **one site = one owner/admin** model. After the first admin account is created, repeat public registration is blocked, which helps prevent strangers from taking over the back office.

Customer-related data—such as order details handled in the admin workflow—is less exposed because admin API actions require a valid session. Invalid or expired sessions redirect the owner back to the login page instead of continuing with stale access. Logout gives a clear way to end an admin session safely on a shared or workplace device.

Verified admin email creates a safer foundation for important system emails. That makes future customer review automation easier and means the same email foundation can later support password reset, order notifications, review requests, and contact replies from one place.

Together, these changes move LayerCake closer to a **reusable sellable website template**, not just a demo. Full production hardening is still in progress; features such as password recovery and final Brevo production setup are not finished yet.

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/AllaBeloshapka/LayerCake.git
cd LayerCake
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env` from `backend/.env.example` and fill in your values (see Environment Variables below).

Start the server:

```bash
node --watch server.js
```

The API runs at `http://localhost:3000`.

### 3. Frontend

From the project root:

```bash
py -m http.server 5500
```

Open in the browser:

- Main site: `http://localhost:5500/`
- Gallery: `http://localhost:5500/galery/index-galery.html`
- Admin login: `http://localhost:5500/admin/login.html`
- Admin dashboard: `http://localhost:5500/admin/index.html`
- Admin account: `http://localhost:5500/admin/account.html`
- Orders: `http://localhost:5500/orders_page/index.html`
- Reviews: `http://localhost:5500/reviews/index_reviews.html`
- Review form: `http://localhost:5500/review_form/index.html`

The frontend currently calls the backend at `http://localhost:3000`.

---

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and configure:

For local email testing, **Ethereal SMTP** can be used with `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, and `EMAIL_PASS`. Real secrets must go only into `backend/.env`, never into the README or git.

| Variable | Purpose |
|----------|---------|
| `PORT` | Backend server port (default: 3000) |
| `MONGODB_URI` | MongoDB connection string |
| `S3_ENDPOINT` | S3-compatible endpoint (e.g. Cloudflare R2) |
| `S3_REGION` | Storage region |
| `S3_BUCKET` | Bucket name |
| `S3_ACCESS_KEY_ID` | Storage access key |
| `S3_SECRET_ACCESS_KEY` | Storage secret key |
| `S3_PUBLIC_URL_BASE` | Public base URL for uploaded images |
| `BREVO_API_KEY` | Brevo API key for future production email provider |
| `EMAIL_HOST` | SMTP host (local Ethereal testing) |
| `EMAIL_PORT` | SMTP port |
| `EMAIL_USER` | SMTP username |
| `EMAIL_PASS` | SMTP password |
| `EMAIL_FROM` | Sender email address |
| `API_BASE_URL` | Backend base URL used for backend confirmation links |
| `APP_BASE_URL` | App/frontend base URL for future app links |
| `FRONTEND_BASE_URL` | Frontend base URL used in review email links |
| `ADMIN_SESSION_SECRET` | Secret used to sign admin session tokens |

---

## Current Status

- Backend and database migration are in progress
- Products, orders, reviews, and the email review flow are connected to the backend
- Image uploads use S3-compatible storage when configured
- Admin authentication, account page, password change, and email verification are implemented for local development
- Email sending is tested locally with Ethereal SMTP
- Brevo is prepared but final production setup waits for domain and sender configuration
- The project is functional for local development but not hardened for production yet

---

## Important Note

- Real secrets must be stored **only** in `backend/.env`
- `backend/.env` must **not** be committed to git
- Use `backend/.env.example` as a template without real credentials

---

## Planned Next Steps

- Password recovery / reset flow
- Secure review links with token validation
- CORS allowlist and rate limiting before production
- Production email and domain setup with Brevo
- Deployment documentation improvements

---

## About

LayerCake demonstrates full-stack development: responsive frontend UI, REST API design, MongoDB data modeling, file uploads, and email integration for a real business workflow.

**Year:** 2026
