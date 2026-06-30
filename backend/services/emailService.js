function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendTransactionalEmail({ to, subject, text, html }) {
  const apiKey = process.env.BREVO_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;

  if (!apiKey || !emailFrom) {
    throw new Error("Email service is not configured.");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: emailFrom },
      to: [{ email: to }],
      subject,
      textContent: text,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    console.error(responseText);
    throw new Error("Failed to send email through Brevo.");
  }
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

  await sendTransactionalEmail({
    to: order.email,
    subject: "How was your cake?",
    text,
    html,
  });
}

module.exports = { sendReviewRequestEmail, sendTransactionalEmail };
