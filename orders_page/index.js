import { getOrders, saveOrders } from "../storage/storage.js";

const STATUS_LIST = [
  "New order",
  "In progress",
  "Completed",
  "Reviewed",
  "Blacklisted",
];

// Orders container
const ordersContainer = document.querySelector(".orders-container");

const backButton = document.querySelector(".back-btn");

const ordersSearchInput = document.getElementById("ordersSearchInput");
const ordersSearchBtn = document.getElementById("ordersSearchBtn");
const filterByStatus = document.getElementById("filterByStatus");

// Format date and time
function formatDateTime(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Format date only
function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Update order status
async function updateOrderStatus(orderId, newStatus) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      },
    );

    if (!response.ok) throw new Error("Ошибка при обновлении статуса");

    await response.json();

    // Плавная подсветка карточки, чтобы показать, что статус изменился
    const card = document.querySelector(`[data-id="${orderId}"]`);
    if (card) {
      card.style.transition = "background-color 0.5s ease";
      card.style.backgroundColor = "#d4ffd4";
      setTimeout(() => (card.style.backgroundColor = ""), 1000);
    }
  } catch (error) {
    console.error("❌ Ошибка при изменении статуса:", error);
    alert("Не удалось обновить статус. Проверь соединение с сервером.");
  }
}

function createStatusSelect(order, orders) {
  const statusSelect = document.createElement("select");

  statusSelect.className = "statusSelect";

  STATUS_LIST.forEach((status) => {
    const option = document.createElement("option");

    option.value = status;
    option.textContent = status;

    if (order.status === status) {
      option.selected = true;
    }

    statusSelect.appendChild(option);
  });

  // Apply color style for current status
  applyStatusStyle(statusSelect, order.status);

  // Handle status change
  statusSelect.addEventListener("change", () => {
    const newStatus = statusSelect.value;

    applyStatusStyle(statusSelect, newStatus);

    // Update localStorage
    const updatedOrders = orders.map((o) =>
      o.id === order.id ? { ...o, status: newStatus } : o,
    );

    saveOrders(updatedOrders);
    applyFilters();
  });

  return statusSelect;
}

function createOrderCard(order, orders) {
  const orderCard = document.createElement("div");

  orderCard.className = "order-card";
  orderCard.dataset.id = order._id || order.id;

  const orderCardContent = document.createElement("div");
  orderCardContent.className = "order-card-content";

  const orderCardActions = document.createElement("div");
  orderCardActions.className = "order-card-actions";

  const idP = document.createElement("p");
  idP.textContent = `Order ID: ${order._id || order.id || "-"}`;

  const productP = document.createElement("p");
  productP.textContent = `Product ID: ${order.productId ?? "-"}`;

  const cakeNameP = document.createElement("p");
  cakeNameP.className = "order-card-wrap";
  cakeNameP.textContent = `Cake Name: ${order.cakeName ?? "-"}`;

  const customerNameP = document.createElement("p");
  customerNameP.className = "order-card-wrap";
  customerNameP.textContent = `Customer Name: ${order.customerName ?? "-"}`;

  const phoneP = document.createElement("p");
  phoneP.className = "order-card-wrap";
  phoneP.textContent = `Phone: ${order.phone ?? "-"}`;

  const emailP = document.createElement("p");
  emailP.className = "order-card-wrap";
  emailP.textContent = `Email: ${order.email ?? "-"}`;

  const birthDateP = document.createElement("p");
  birthDateP.textContent = `Birth Date: ${formatDate(order.birthDate)}`;

  const orderDateTimeP = document.createElement("p");
  orderDateTimeP.textContent = `Order Date & Time: ${formatDateTime(
    order.orderDateTime,
  )}`;

  const sentAtP = document.createElement("p");
  sentAtP.textContent = `Sent At: ${formatDateTime(order.sentAt)}`;

  const statusSelect = createStatusSelect(order, orders);

  orderCardContent.append(
    idP,
    productP,
    cakeNameP,
    customerNameP,
    phoneP,
    emailP,
    birthDateP,
    orderDateTimeP,
    sentAtP,
  );

  orderCardActions.appendChild(statusSelect);

  orderCard.append(orderCardContent, orderCardActions);

  return orderCard;
}

function matchesSearch(order, searchTerm) {
  const term = searchTerm.trim().toLowerCase();

  if (!term) {
    return true;
  }

  const cakeName = String(order.cakeName ?? "").toLowerCase();
  const customerName = String(order.customerName ?? "").toLowerCase();
  const phone = String(order.phone ?? "").toLowerCase();

  return (
    cakeName.includes(term) ||
    customerName.includes(term) ||
    phone.includes(term)
  );
}

function filterOrders(orders) {
  const searchTerm = ordersSearchInput.value;
  const status = filterByStatus.value;

  return orders.filter((order) => {
    if (status !== "all" && order.status !== status) {
      return false;
    }

    if (!matchesSearch(order, searchTerm)) {
      return false;
    }

    return true;
  });
}

function hasActiveFilters() {
  return (
    ordersSearchInput.value.trim() !== "" || filterByStatus.value !== "all"
  );
}

// Load and display orders
function loadOrders() {
  const allOrders = getOrders();
  const filteredOrders = filterOrders(allOrders);

  ordersContainer.innerHTML = "";

  if (allOrders.length === 0) {
    const noOrdersMsg = document.createElement("p");

    noOrdersMsg.textContent = "NO ORDERS YET";

    noOrdersMsg.className = "no-orders-message";

    ordersContainer.appendChild(noOrdersMsg);

    return;
  }

  if (filteredOrders.length === 0) {
    const noResultsMsg = document.createElement("p");

    noResultsMsg.textContent = hasActiveFilters()
      ? "NO ORDERS MATCH YOUR FILTERS"
      : "NO ORDERS YET";

    noResultsMsg.className = "no-orders-message";

    ordersContainer.appendChild(noResultsMsg);

    return;
  }

  filteredOrders.forEach((order) => {
    const orderCard = createOrderCard(order, allOrders);

    ordersContainer.appendChild(orderCard);
  });
}

function applyFilters() {
  loadOrders();
}

// Load orders on page start
loadOrders();

ordersSearchBtn.addEventListener("click", applyFilters);

ordersSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    applyFilters();
  }
});

filterByStatus.addEventListener("change", applyFilters);

/* =========================
   BACK TO ADMIN PAGE
========================= */

backButton.addEventListener("click", () => {
  window.location.href = "../admin/index.html";
});

// Apply status color styles
function applyStatusStyle(element, status) {
  element.classList.remove(
    "status-new",
    "status-progress",
    "status-completed",
    "status-reviewed",
    "status-blacklisted",
  );

  const statusClasses = {
    "New order": "status-new",
    "In progress": "status-progress",
    Completed: "status-completed",
    Reviewed: "status-reviewed",
    Blacklisted: "status-blacklisted",
  };

  element.classList.add(statusClasses[status]);
}
