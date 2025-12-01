const ORDER = document.querySelector(".order");
// Элемент, куда выводим количество новых заказов
//  const newOrdersCountElement = document.getElementById("new-orders-count");

// Функция загрузки данных из БД через ваш backend
async function loadOrders() {
  try {
    const response = await fetch("http://localhost:5000/api/orders"); // ваш эндпоинт
    const orders = await response.json();

    updateNewOrdersCount(orders);
  } catch (err) {
    console.error("Ошибка загрузки заказов:", err);
  }
}

// Функция подсчёта новых заказов
function updateNewOrdersCount(orders) {
  const newOrders = orders.filter(order => order.status === "New order");
  ORDER.textContent = newOrders.length;
}

// Старт при загрузке страницы
loadOrders();
