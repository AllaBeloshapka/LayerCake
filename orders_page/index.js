// const BODY = document.querySelector("#root");

// const ordersContainer = document.querySelector(".orders-container");

// const STATUS_LIST = [
//   "New order",
//   "Accepted for work",
//   "Completed",
//   "Blacklist",
// ];


// // Загружаем заказы
// function loadOrders() {
//   ordersContainer.innerHTML = "";

//   let orders = JSON.parse(localStorage.getItem("orders")) || [];

//   if (orders.length === 0) {
//     ordersContainer.innerHTML = "<p>No orders yet.</p>";
//     return;
//   }

//   orders.forEach((order) => {
//     // Если статус не установлен, задаём по умолчанию
//     if (!order.status) {
//       order.status = "New order";
//     }

//     const card = document.createElement("div");
//     card.className = "order-card";

//     const statusSelect = document.createElement("select");
//     statusSelect.className = "status-select";
//     STATUS_LIST.forEach((status) => {
//       const option = document.createElement("option");
//       option.value = status;
//       option.textContent = status;
//       if (order.status === status) {
//         option.selected = true;
//       }
//       statusSelect.appendChild(option);
//     });

//     statusSelect.addEventListener("change", () => {
//       updateOrderStatus(order.id, statusSelect.value);
//     });

//     card.innerHTML = `
//       <p><strong>Order ID:</strong> ${order.id}</p>
//       <p><strong>Product ID:</strong> ${productId}</p>
//       <p><strong>Name:</strong> ${order.name}</p>
//       <p><strong>Telephone:</strong> ${order.phone}</p>
//       <p><strong>Email:</strong> ${order.email}</p>
//     `;

//     card.appendChild(statusSelect);
//     ordersContainer.appendChild(card);
//   });

//   // Сохраняем обновлённые заказы (на случай, если у кого-то не было статуса)
//   localStorage.setItem("orders", JSON.stringify(orders));
// }

// // Функция обновления статуса в localStorage
// function updateOrderStatus(orderId, newStatus) {
//   let orders = JSON.parse(localStorage.getItem("orders")) || [];
//   const orderIndex = orders.findIndex((o) => o.id == orderId);
//   if (orderIndex !== -1) {
//     orders[orderIndex].status = newStatus;
//     localStorage.setItem("orders", JSON.stringify(orders));
//   }
// }

// // Запуск при загрузке
// loadOrders();
// 1️⃣ Получаем контейнер для карточек


// 2️⃣ Возможные статусы заказа
const STATUS_LIST = [
  "New order",
  "Accepted for work",
  "Completed",
  "Blacklist",
];

// 3️⃣ Проверяем localStorage на наличие заказов
if (!localStorage.getItem("orders")) {
  // Создаём пустой массив заказов
  localStorage.setItem("orders", JSON.stringify([]));
}

// 4️⃣ Контейнер для заказов
const ordersContainer = document.querySelector(".orders-container");

// 5️⃣ Функция загрузки и отображения заказов
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

  // Если есть заказы, отображаем их (здесь можно использовать твой код генерации карточек)
orders.forEach(order => {
  // Создаём карточку заказа
  const card = document.createElement("div");
  card.className = "order-card";

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

  // ✅ Создаём select для статуса
  const statusSelect = document.createElement("select");
  statusSelect.className = "statusSelect";
  STATUS_LIST.forEach(status => {
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
  card.append(idP, productP, cakeNameP, customerNameP, phoneP, emailP, statusSelect);

  // Добавляем карточку в контейнер
  ordersContainer.appendChild(card);
});

}

// Загружаем заказы при старте страницы
loadOrders();

