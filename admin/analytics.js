/* =========================
   FAKE ANALYTICS DATA
========================= */

const fakeVisitors = 1000;
const fakeOrders = 50;

const conversionRateElement =
  document.getElementById("conversion-rate");

const salesFunnelOrdersElement =
  document.getElementById("sales-funnel-orders");

/* =========================
   CONVERSION CALCULATION
========================= */

const conversionRate =
  (fakeOrders / fakeVisitors) * 100;

conversionRateElement.textContent =
  `${conversionRate}%`;

/* =========================
   SALES FUNNEL DATA
========================= */

salesFunnelOrdersElement.textContent =
  fakeOrders;