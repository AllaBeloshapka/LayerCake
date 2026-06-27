/* =========================
   READ VISITORS FROM STORAGE
========================= */

const totalVisitors = Number(localStorage.getItem("visitors")) || 0;

/* =========================
   GET ANALYTICS ELEMENTS
========================= */

const conversionRateElement = document.getElementById("conversion-rate");

const salesFunnelOrdersElement = document.getElementById("sales-funnel-orders");

const websiteVisitorsElement = document.getElementById("website-visitors");

async function loadAnalytics() {
  try {
    const response = await fetch("http://localhost:3000/api/orders");

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const orders = await response.json();

    const totalOrders = orders.length;

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

    const conversionRate =
      totalVisitors > 0 ? (totalOrders / totalVisitors) * 100 : 0;

    conversionRateElement.textContent = `${conversionRate.toFixed(1)}%`;

    salesFunnelOrdersElement.textContent = totalOrders;

    websiteVisitorsElement.textContent = totalVisitors;
  } catch (error) {
    console.error("Failed to load analytics orders:", error);
    conversionRateElement.textContent = "0.0%";
    salesFunnelOrdersElement.textContent = "0";
    websiteVisitorsElement.textContent = totalVisitors;
  }
}

loadAnalytics();
