
/* =========================
   GET ORDERS FROM STORAGE
========================= */

function getOrdersFromStorage() {
  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  return orders;
}

/* =========================
   TODAY ORDERS COUNT
========================= */

function renderTodayOrdersCount() {
  const orders = getOrdersFromStorage();

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

renderTodayOrdersCount();

/* =========================
   WEEK ORDERS COUNT
========================= */

function renderWeekOrdersCount() {
  const orders = getOrdersFromStorage();

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
renderWeekOrdersCount();

/* =========================
   MONTH ORDERS COUNT
========================= */

function renderMonthOrdersCount() {
  const orders = getOrdersFromStorage();

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

renderMonthOrdersCount();

/* =========================
   TODAY ORDERS REVENUE
========================= */

function renderTodayOrdersRevenue() {
  const orders = getOrdersFromStorage();

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

renderTodayOrdersRevenue();

/* =========================
   WEEK ORDERS REVENUE
========================= */

function renderWeekOrdersRevenue() {
  const orders = getOrdersFromStorage();

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

renderWeekOrdersRevenue();

/* =========================
   MONTH ORDERS REVENUE
========================= */

function renderMonthOrdersRevenue() {
  const orders = getOrdersFromStorage();

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
renderMonthOrdersRevenue();