/* =========================
   READ VISITORS FROM STORAGE
========================= */

const totalVisitors = Number(localStorage.getItem("visitors")) || 0;

/* =========================
   GET ORDERS FROM STORAGE
========================= */

const orders = JSON.parse(localStorage.getItem("orders")) || [];

const totalOrders = orders.length;

/* =========================
   GET ANALYTICS ELEMENTS
========================= */

const conversionRateElement = document.getElementById("conversion-rate");

const salesFunnelOrdersElement = document.getElementById("sales-funnel-orders");

const websiteVisitorsElement = document.getElementById("website-visitors");

/* =========================
   TODAY PROFIT
========================= */

const today = new Date()
  .toISOString()
  .split("T")[0];

const todayOrders = orders.filter(
  (order) =>
    order.sentAt &&
    order.sentAt.startsWith(today)
);

const totalProfit =
  todayOrders.reduce(
    (total, order) =>
      total + Number(order.price || 0),
    0
  );

localStorage.setItem(
  "totalProfit",
  totalProfit
);

/* =========================
   CONVERSION CALCULATION
========================= */

const conversionRate =
  totalVisitors > 0 ? (totalOrders / totalVisitors) * 100 : 0;

conversionRateElement.textContent = `${conversionRate.toFixed(1)}%`;

/* =========================
   DISPLAY ANALYTICS DATA
========================= */

salesFunnelOrdersElement.textContent = totalOrders;

websiteVisitorsElement.textContent = totalVisitors;
