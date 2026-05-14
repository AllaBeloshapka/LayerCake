
const STATUS_LIST = [
  "New order",
  "In progress",
  "Completed",
  "Reviewed",
  "Blacklisted",
];

// Orders container
const ordersContainer =
  document.querySelector(".orders-container");

// Get orders from localStorage
function getOrders() {
  return (
    JSON.parse(localStorage.getItem("orders")) || []
  );
}

// Save orders to localStorage
function saveOrders(orders) {
  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  );
}

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
    const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) throw new Error("Ошибка при обновлении статуса");

    const updatedOrder = await response.json();
    console.log("✅ Статус успешно обновлён:", updatedOrder);

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
      o.id === order.id
        ? { ...o, status: newStatus }
        : o
    );

saveOrders(updatedOrders);
  });

  return statusSelect;
}

function createOrderCard(order, orders) {
  const orderCard = document.createElement("div");

  orderCard.className = "order-card";
  orderCard.dataset.id = order._id || order.id;

  const idP = document.createElement("p");
  idP.textContent = `Order ID: ${order._id || order.id || "-"}`;

  const productP = document.createElement("p");
  productP.textContent = `Product ID: ${order.productId ?? "-"}`;

  const cakeNameP = document.createElement("p");
  cakeNameP.textContent = `Cake Name: ${order.cakeName ?? "-"}`;

  const customerNameP = document.createElement("p");
  customerNameP.textContent = `Customer Name: ${order.customerName ?? "-"}`;

  const phoneP = document.createElement("p");
  phoneP.textContent = `Phone: ${order.phone ?? "-"}`;

  const emailP = document.createElement("p");
  emailP.textContent = `Email: ${order.email ?? "-"}`;

  const birthDateP = document.createElement("p");
  birthDateP.textContent = `Birth Date: ${formatDate(order.birthDate)}`;

  const orderDateTimeP = document.createElement("p");
  orderDateTimeP.textContent = `Order Date & Time: ${formatDateTime(
    order.orderDateTime
  )}`;

  const sentAtP = document.createElement("p");
  sentAtP.textContent = `Sent At: ${formatDateTime(order.sentAt)}`;

  const statusSelect = createStatusSelect(order, orders);

  orderCard.append(
    idP,
    productP,
    cakeNameP,
    customerNameP,
    phoneP,
    emailP,
    birthDateP,
    orderDateTimeP,
    sentAtP,
    statusSelect
  );

  return orderCard;
}


// Load and display orders (DB)
// async function loadOrders() {
//   try {
//     const response = await fetch(
//       "http://localhost:5000/api/orders"
//     );

//     const orders = await response.json();

//     ordersContainer.innerHTML = "";

//     if (!orders || orders.length === 0) {
//       const noOrdersMsg =
//         document.createElement("p");

//       noOrdersMsg.textContent =
//         "NO ORDERS YET";

//       noOrdersMsg.style.fontSize = "20px";
//       noOrdersMsg.style.fontWeight = "bold";
//       noOrdersMsg.style.color = "#fff";

//       ordersContainer.appendChild(noOrdersMsg);

//       return;
//     }

//     // Render orders from backend
//     orders.forEach((order) => {
//       const orderCard =
//         createOrderCard(order, orders);

//       ordersContainer.appendChild(orderCard);
//     });
//   } catch (err) {
//     console.error(
//       "Ошибка при загрузке заказов:",
//       err
//     );

//     // Load orders from localStorage
//     const orders =
//       JSON.parse(localStorage.getItem("orders")) || [];

//     ordersContainer.innerHTML = "";

//     if (orders.length > 0) {
//       // Render orders from localStorage
//       orders.forEach((order) => {
//         const orderCard =
//           createOrderCard(order, orders);

//         ordersContainer.appendChild(orderCard);
//       });
//     } else {
//       ordersContainer.innerHTML = `
//         <p style="color:red;">
//           Error loading orders.
//           No local data available.
//         </p>
//       `;
//     }
//   }
// }

// Load and display orders
function loadOrders() { 
const orders = getOrders();

  ordersContainer.innerHTML = "";

  if (orders.length === 0) {
    const noOrdersMsg =
      document.createElement("p");

    noOrdersMsg.textContent =
      "NO ORDERS YET";

    noOrdersMsg.style.fontSize = "20px";
    noOrdersMsg.style.fontWeight = "bold";
    noOrdersMsg.style.color = "#fff";

    ordersContainer.appendChild(noOrdersMsg);

    return;
  }

  orders.forEach((order) => {
    const orderCard =
      createOrderCard(order, orders);

    ordersContainer.appendChild(orderCard);
  });
}

// Load orders on page start
loadOrders();



// Apply status color styles
function applyStatusStyle(element, status) {
  element.classList.remove(
    "status-new",
    "status-progress",
    "status-completed",
    "status-reviewed",
    "status-blacklisted"
  );

  const statusClasses = {
    "New order": "status-new",
    "In progress": "status-progress",
    Completed: "status-completed",
    Reviewed: "status-reviewed",
    Blacklisted: "status-blacklisted",
  };

  element.classList.add(
    statusClasses[status]
  );
}


