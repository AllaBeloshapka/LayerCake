// Возможные статусы заказа
const STATUS_LIST = [
  "New order",
  "In progress",
  "Completed",
  "Reviewed",
  "Blacklisted",
];

// Контейнер для заказов
const ordersContainer = document.querySelector(".orders-container");

//  Функция форматирования даты и времени
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

//  Функция форматирования только даты
function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

//  Функция обновления статуса заказа
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

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
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


//  Функция загрузки и отображения заказов
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
  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

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

//Загружаем заказы при старте страницы
loadOrders();



// Добавляем стилизацию статуса в зависимости от значения
function applyStatusStyle(element, status) {
  const statusColors = {
    "New order": "#87CEEB", // голубой
    "In progress": "#ff4d00", // оранжевый
    "Completed": "#008000", // зелёный
    "Reviewed": "#bca002", // жёлтый
    "Blacklisted": "#000000", // чёрный
  };

  element.style.color = statusColors[status] || "#000000"; // По умолчанию чёрный
}


