/* =========================
   TODAY ORDERS COUNT
========================= */

function renderTodayOrdersCount(orders) {
  const today = new Date();

  const todayOrders = orders.filter((order) => {
    const orderDate = new Date(order.sentAt);

    return (
      orderDate.getFullYear() ===
        today.getFullYear() &&
      orderDate.getMonth() ===
        today.getMonth() &&
      orderDate.getDate() ===
        today.getDate()
    );
  });

  const todayOrdersCountElement =
    document.getElementById(
      "today-orders-count"
    );

  todayOrdersCountElement.textContent =
    `${todayOrders.length} orders`;
}

/* =========================
   WEEK ORDERS COUNT
========================= */

function renderWeekOrdersCount(orders) {
  const today = new Date();

  const weekAgo = new Date();

  weekAgo.setDate(today.getDate() - 7);

  const weekOrders = orders.filter((order) => {
    const orderDate = new Date(
      order.sentAt
    );

    return (
      orderDate >= weekAgo &&
      orderDate <= today
    );
  });

  const weekOrdersCountElement =
    document.getElementById(
      "week-orders-count"
    );

  weekOrdersCountElement.textContent =
    `${weekOrders.length} orders`;
}

/* =========================
   MONTH ORDERS COUNT
========================= */

function renderMonthOrdersCount(orders) {
  const today = new Date();

  const monthOrders = orders.filter((order) => {
    const orderDate = new Date(
      order.sentAt
    );

    return (
      orderDate.getFullYear() ===
        today.getFullYear() &&
      orderDate.getMonth() ===
        today.getMonth()
    );
  });

  const monthOrdersCountElement =
    document.getElementById(
      "month-orders-count"
    );

  monthOrdersCountElement.textContent =
    `${monthOrders.length} orders`;
}

/* =========================
   TODAY ORDERS REVENUE
========================= */

function renderTodayOrdersRevenue(orders) {
  const today = new Date();

  const todayOrders = orders.filter((order) => {
    const orderDate = new Date(
      order.sentAt
    );

    return (
      orderDate.getFullYear() ===
        today.getFullYear() &&
      orderDate.getMonth() ===
        today.getMonth() &&
      orderDate.getDate() ===
        today.getDate()
    );
  });

  const totalRevenue = todayOrders.reduce(
    (sum, order) => {
      return (
        sum + Number(order.price || 0)
    );
    },
    0
  );

  const todayRevenueElement =
    document.getElementById(
      "today-orders-sum"
    );

  todayRevenueElement.textContent =
    `${totalRevenue} $`;
}

/* =========================
   WEEK ORDERS REVENUE
========================= */

function renderWeekOrdersRevenue(orders) {
  const today = new Date();

  const weekAgo = new Date();

  weekAgo.setDate(today.getDate() - 7);

  const weekOrders = orders.filter((order) => {
    const orderDate = new Date(
      order.sentAt
    );

    return (
      orderDate >= weekAgo &&
      orderDate <= today
    );
  });

  const totalRevenue = weekOrders.reduce(
    (sum, order) => {
      return (
        sum + Number(order.price || 0)
      );
    },
    0
  );

  const weekRevenueElement =
    document.getElementById(
      "week-orders-sum"
    );

  weekRevenueElement.textContent =
    `${totalRevenue} $`;
}

/* =========================
   MONTH ORDERS REVENUE
========================= */

function renderMonthOrdersRevenue(orders) {
  const today = new Date();

  const monthOrders = orders.filter((order) => {
    const orderDate = new Date(
      order.sentAt
    );

    return (
      orderDate.getFullYear() ===
        today.getFullYear() &&
      orderDate.getMonth() ===
        today.getMonth()
    );
  });

  const totalRevenue = monthOrders.reduce(
    (sum, order) => {
      return (
        sum + Number(order.price || 0)
      );
    },
    0
  );

  const monthRevenueElement =
    document.getElementById(
      "month-orders-sum"
    );

  monthRevenueElement.textContent =
    `${totalRevenue} $`;
}

async function loadStatistics() {
  try {
    const response = await window.adminApiFetch("http://localhost:3000/api/orders");

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const orders = await response.json();

    renderTodayOrdersCount(orders);
    renderWeekOrdersCount(orders);
    renderMonthOrdersCount(orders);
    renderTodayOrdersRevenue(orders);
    renderWeekOrdersRevenue(orders);
    renderMonthOrdersRevenue(orders);
  } catch (error) {
    console.error("Failed to load statistics:", error);

    document.getElementById("today-orders-count").textContent = "0 orders";
    document.getElementById("week-orders-count").textContent = "0 orders";
    document.getElementById("month-orders-count").textContent = "0 orders";
    document.getElementById("today-orders-sum").textContent = "0 $";
    document.getElementById("week-orders-sum").textContent = "0 $";
    document.getElementById("month-orders-sum").textContent = "0 $";
  }
}

loadStatistics();
