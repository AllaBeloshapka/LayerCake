const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendReviewRequestEmail(order, reviewLink) {
  const customerName = order.customerName || "there";
  const cakeName = order.cakeName || "your cake";

  const text = `Hello ${customerName},

Thank you for ordering "${cakeName}" from LayerCake!

We hope you enjoyed your cake. We would really appreciate it if you could take a moment to leave a review:

${reviewLink}

Thank you for choosing LayerCake!`;

  const html = `
    <p>Hello ${escapeHtml(customerName)},</p>
    <p>Thank you for ordering <strong>${escapeHtml(cakeName)}</strong> from LayerCake!</p>
    <p>We hope you enjoyed your cake. We would really appreciate it if you could take a moment to leave a review:</p>
    <p><a href="${escapeHtml(reviewLink)}">Leave a review</a></p>
    <p>Thank you for choosing LayerCake!</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: order.email,
    subject: "How was your cake?",
    text,
    html,
  });
}

module.exports = { sendReviewRequestEmail };
