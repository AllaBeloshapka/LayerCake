# LayerCake — Full-Stack Web Application for Custom Cake Businesses

LayerCake is a full-stack web application for custom cake and confectionery businesses. It combines a public storefront with an admin workflow for products, orders, and customer reviews.

The frontend is built with **HTML, CSS, and Vanilla JavaScript**. The backend uses **Node.js, Express, MongoDB, and Mongoose**. Product and review images are uploaded to **S3-compatible storage (Cloudflare R2)**. Completed orders can trigger a **review request email** via **Nodemailer**.

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
- Order creation and order status management
- Review email request after completed order
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
- Nodemailer (review request emails)

---

## Project Structure

```
LayerCake/
├── index.html              # Main landing page
├── galery/                 # Public product gallery
├── admin/                  # Admin panel (products, orders link, review moderation)
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

### Protected admin actions

These require a valid admin session token:

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

- Admin account settings (profile changes after setup)
- Email verification
- Password recovery / reset flow

Admin authentication is available for local development but is not yet part of a finished production deployment process.

---

## Business Value of Admin Authentication

This branch adds practical protection for a small cake business running its own site. The shop owner keeps control of products, orders, and review moderation instead of leaving those actions open to anyone who finds the admin pages.

LayerCake follows a **one site = one owner/admin** model. After the first admin account is created, repeat public registration is blocked, which helps prevent strangers from taking over the back office.

Customer-related data—such as order details handled in the admin workflow—is less exposed because admin API actions require a valid session. Invalid or expired sessions redirect the owner back to the login page instead of continuing with stale access. Logout gives a clear way to end an admin session safely on a shared or workplace device.

Together, these changes move LayerCake closer to a **reusable website template** that a business could eventually run in production. Full production hardening is still in progress; features such as email verification and password recovery are not implemented yet.

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
- Orders: `http://localhost:5500/orders_page/index.html`
- Reviews: `http://localhost:5500/reviews/index_reviews.html`
- Review form: `http://localhost:5500/review_form/index.html`

The frontend currently calls the backend at `http://localhost:3000`.

---

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and configure:

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
| `EMAIL_HOST` | SMTP host |
| `EMAIL_PORT` | SMTP port |
| `EMAIL_USER` | SMTP username |
| `EMAIL_PASS` | SMTP password |
| `EMAIL_FROM` | Sender email address |
| `FRONTEND_BASE_URL` | Frontend base URL used in review email links |

---

## Current Status

- Backend and database migration are in progress
- Products, orders, reviews, and the email review flow are connected to the backend
- Image uploads use S3-compatible storage when configured
- Admin authentication and protected admin API routes are implemented for local development
- The project is functional for local development but not hardened for production yet

---

## Important Note

- Real secrets must be stored **only** in `backend/.env`
- `backend/.env` must **not** be committed to git
- Use `backend/.env.example` as a template without real credentials

---

## Planned Next Steps

- Secure review links with token validation
- CORS allowlist and rate limiting before production
- Admin account settings, email verification, and password recovery
- README and deployment documentation improvements

---

## About

LayerCake demonstrates full-stack development: responsive frontend UI, REST API design, MongoDB data modeling, file uploads, and email integration for a real business workflow.

**Year:** 2026
