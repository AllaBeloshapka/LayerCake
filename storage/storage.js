export function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

export function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function getReviews() {
  return JSON.parse(localStorage.getItem("cakeReviews")) || [];
}

export function saveReviews(reviews) {
  localStorage.setItem("cakeReviews", JSON.stringify(reviews));
}