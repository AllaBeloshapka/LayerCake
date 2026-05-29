export function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

export function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}