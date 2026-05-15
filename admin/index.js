// Order elements
const orderElement =
  document.querySelector(".order");

const newOrdersElement =
  document.querySelector(".number_new_orders");

/* =========================
   GET ORDERS
========================= */

function getOrders() {
  return (
    JSON.parse(localStorage.getItem("orders")) || []
  );
}

/* =========================
   UPDATE NEW ORDERS COUNT
========================= */

function updateNewOrdersCount() {
  const orders = getOrders();

  const newOrders = orders.filter(
    (orderItem) =>
      orderItem.status === "New order"
  );

  newOrdersElement.textContent =
    newOrders.length;
}

/* =========================
   INITIAL RENDER
========================= */

updateNewOrdersCount();