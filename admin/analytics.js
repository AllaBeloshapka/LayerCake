/* =========================
   READ VISITORS FROM STORAGE
========================= */

const totalVisitors =
  Number(localStorage.getItem("visitors")) || 0;

/* =========================
   GET ORDERS FROM STORAGE
========================= */

const orders =
  JSON.parse(localStorage.getItem("orders")) || [];

const totalOrders = orders.length;

/* =========================
   GET ANALYTICS ELEMENTS
========================= */

const conversionRateElement =
  document.getElementById("conversion-rate");

const salesFunnelOrdersElement =
  document.getElementById("sales-funnel-orders");

const websiteVisitorsElement =
  document.getElementById("website-visitors");

/* =========================
   CONVERSION CALCULATION
========================= */

const conversionRate =
  totalVisitors > 0
    ? (totalOrders / totalVisitors) * 100
    : 0;

conversionRateElement.textContent =
  `${conversionRate.toFixed(1)}%`;

/* =========================
   DISPLAY ANALYTICS DATA
========================= */

salesFunnelOrdersElement.textContent =
  totalOrders;

websiteVisitorsElement.textContent =
  totalVisitors;
