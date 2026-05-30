/* =========================
   GLOBAL STORAGE HELPERS
   Centralized access to localStorage.
   Future migration to backend/API
   should be done in this file.
========================= */

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

export function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

export function saveProducts(products) {
  localStorage.setItem(
    "products",
    JSON.stringify(products),
  );
}