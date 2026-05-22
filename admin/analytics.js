/* =========================
   FAKE ANALYTICS DATA
========================= */

const fakeVisitors = 1000;
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
  (totalOrders / fakeVisitors) * 100;

conversionRateElement.textContent =
  `${conversionRate}%`;

/* =========================
   SALES FUNNEL DATA
========================= */

salesFunnelOrdersElement.textContent =
  totalOrders;

