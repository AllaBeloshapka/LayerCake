// 2️⃣ Возможные статусы заказа
const STATUS_LIST = [
  "New order",
  "Accepted for work",
  "Completed",
  "Blacklist",
];

//  Проверяем localStorage на наличие заказов
if (!localStorage.getItem("orders")) {
  // Создаём пустой массив заказов
  localStorage.setItem("orders", JSON.stringify([]));
}

//  Контейнер для заказов
const ordersContainer = document.querySelector(".orders-container");

//  Функция загрузки и отображения заказов
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Очищаем контейнер
  ordersContainer.innerHTML = "";

  if (orders.length === 0) {
    // Если заказов нет, выводим сообщение
    const noOrdersMsg = document.createElement("p");
    noOrdersMsg.textContent = "NO ORDERS YET";
    noOrdersMsg.style.fontSize = "20px";
    noOrdersMsg.style.fontWeight = "bold";
    noOrdersMsg.style.color = "#fff"; // или любой цвет, чтобы было видно на фоне
    ordersContainer.appendChild(noOrdersMsg);
    return;
  }

  // Если есть заказы, отображаем их
  orders.forEach((order) => {
    // Создаём карточку заказа
    const card = document.createElement("div");
    card.className = "order-card";

// Функция форматирования даты и времени
function formatDateTime(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Функция форматирования только даты (без времени)
function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}



    // Создаём элементы с данными заказа
    const idP = document.createElement("p");
    idP.textContent = `Order ID: ${order.id}`;

    const productP = document.createElement("p");
    productP.textContent = `Product ID: ${order.productId ?? "-"}`;

    const cakeNameP = document.createElement("p");
    cakeNameP.textContent = `Cake Name: ${order.cakeName ?? "-"}`;

    const customerNameP = document.createElement("p");
    customerNameP.textContent = `Customer Name: ${order.customerName ?? "-"}`;

    const phoneP = document.createElement("p");
    phoneP.textContent = `Telephone: ${order.phone ?? "-"}`;

    const emailP = document.createElement("p");
    emailP.textContent = `Email: ${order.email ?? "-"}`;

    const orderDateTimeP = document.createElement("p");
    orderDateTimeP.textContent = `Order Date & Time: ${formatDateTime(
      order.orderDateTime
    )}`;

    const birthDateP = document.createElement("p");
    birthDateP.textContent = `Birth Date: ${formatDate(order.birthDate)}`;

    const sentAtP = document.createElement("p");
    sentAtP.textContent = `Sent At: ${formatDateTime(order.sentAt)}`;

    // ✅ Создаём select для статуса
    const statusSelect = document.createElement("select");
    statusSelect.className = "statusSelect";
    STATUS_LIST.forEach((status) => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      if (order.status === status) option.selected = true;
      statusSelect.appendChild(option);
    });

    // ✅ Обновляем статус при изменении
    statusSelect.addEventListener("change", () => {
      updateOrderStatus(order.id, statusSelect.value);
    });

    // Добавляем все элементы в карточку
    card.append(
      idP,
      productP,
      cakeNameP,
      customerNameP,
      phoneP,
      emailP,
      orderDateTimeP,
      birthDateP,
      sentAtP,
      statusSelect
    );

    // Добавляем карточку в контейнер
    ordersContainer.appendChild(card);
  });
}

// Загружаем заказы при старте страницы
loadOrders();
