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
| `GET /api/products` | List all products |
| `POST /api/products` | Create product with required image upload or image URL |
| `GET /api/products/:productCode` | Get product by product code |
| `PUT /api/products/:productCode` | Update product |
| `DELETE /api/products/:productCode` | Delete product |
| `GET /api/orders` | List all orders |
| `GET /api/orders/:id` | Get order by ID |
| `POST /api/orders` | Create order |
| `PATCH /api/orders/:id/status` | Update order status (optional review email on completion) |
| `GET /api/reviews` | List approved reviews |
| `GET /api/reviews/pending` | List pending reviews for moderation |
| `POST /api/reviews` | Submit review (optional photo upload) |
| `PATCH /api/reviews/:id/status` | Approve or reject review |
| `PATCH /api/reviews/:id/remove-photo` | Remove review photo from moderation |

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
- Admin: `http://localhost:5500/admin/index.html`
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
- Admin authentication and route protection are planned for the next branch
- The project is functional for local development but not hardened for production yet

---

## Important Note

- Real secrets must be stored **only** in `backend/.env`
- `backend/.env` must **not** be committed to git
- Use `backend/.env.example` as a template without real credentials

---

## Planned Next Steps

- Admin authentication
- Protected admin API routes
- Secure review links with token validation
- CORS allowlist and rate limiting before production
- README and deployment documentation improvements

---

## About

LayerCake demonstrates full-stack development: responsive frontend UI, REST API design, MongoDB data modeling, file uploads, and email integration for a real business workflow.

**Year:** 2026
