/* =========================
   VISITORS COUNTER
========================= */

let visitors =
  Number(localStorage.getItem("visitors")) || 0;

visitors++;

localStorage.setItem(
  "visitors",
  visitors,
);

/* =========================
   FAKE ANALYTICS DATA
========================= */

const totalVisitors = visitors;

/* =========================
   GET ORDERS FROM STORAGE
========================= */

const orders =
  JSON.parse(localStorage.getItem("orders")) || [];

const totalOrders = orders.length;

const conversionRateElement =
  document.getElementById("conversion-rate");

const salesFunnelOrdersElement =
  document.getElementById("sales-funnel-orders");

/* =========================
   CONVERSION CALCULATION
========================= */

const conversionRate =
  (totalOrders / totalVisitors) * 100;

conversionRateElement.textContent =
  `${conversionRate.toFixed(1)}%`;

/* =========================
   SALES FUNNEL DATA
========================= */

salesFunnelOrdersElement.textContent =
  totalOrders;

