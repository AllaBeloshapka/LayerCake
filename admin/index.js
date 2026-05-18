// Order elements
const orderElement = document.querySelector(".order");

const newOrdersElement = document.querySelector(".number_new_orders");

/* =========================
   GET ORDERS
========================= */

function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

/* =========================
   UPDATE NEW ORDERS COUNT
========================= */

function updateNewOrdersCount() {
  const orders = getOrders();

  const newOrders = orders.filter(
    (orderItem) => orderItem.status === "New order",
  );

  newOrdersElement.textContent = newOrders.length;
}

/* =========================
   INITIAL RENDER
========================= */

updateNewOrdersCount();

/* =========================
   REVIEW MODERATION
========================= */

const reviewText = document.querySelector(".text-review");

const reviewImage = document.querySelector(".foto");

const approveButton = document.querySelector("#btn-approve");

const rejectButton = document.querySelector("#btn_reject");

/* =========================
   LOAD REVIEWS
========================= */

const reviews = JSON.parse(localStorage.getItem("cakeReviews")) || [];

console.log(reviews);

/* =========================
   GET REVIEWS
========================= */

function getReviews() {
  return JSON.parse(localStorage.getItem("cakeReviews")) || [];
}

/* =========================
   APPROVE REVIEW
========================= */

approveButton.addEventListener("click", () => {
  const reviews = getReviews();

  const pendingReview = reviews.find((review) => review.status === "pending");

  if (!pendingReview) return;

  pendingReview.status = "approved";

  localStorage.setItem("cakeReviews", JSON.stringify(reviews));

  renderPendingReview();
});
/* =========================
   RENDER REVIEW
========================= */

function renderPendingReview() {
  const reviews = getReviews();

  const pendingReview = reviews.find((review) => review.status === "pending");

  if (!pendingReview) {
    reviewText.textContent = "No reviews pending moderation";

    reviewImage.style.display = "none";

    approveButton.style.display = "none";

    rejectButton.style.display = "none";

    return;
  }

  reviewText.textContent = pendingReview.text;

  reviewImage.src = pendingReview.img || "./assets/cake.png";

  reviewImage.style.display = "block";

  approveButton.style.display = "block";

  rejectButton.style.display = "block";
}

/* =========================
   INITIAL RENDER
========================= */

renderPendingReview();

/* =========================
   PRODUCT FORM
========================= */

const productForm = document.querySelector("#edit-product-form");

const productNameInput = document.querySelector("#product-name");

const productPriceInput = document.querySelector("#product-price");

const productIdInput = document.querySelector("#product-id");

const productImageInput = document.querySelector("#product-image");

/* =========================
   GET PRODUCTS
========================= */

function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

const productMessage = document.querySelector("#product-message");

/* =========================
   PRODUCT FORM SUBMIT
========================= */

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  productMessage.textContent = "";

  const product = {
    id: productIdInput.value,
    name: productNameInput.value,
    price: productPriceInput.value,
    image: productImageInput.value,
  };

  if (Number(product.price) < 0) {
    productMessage.textContent = "Price cannot be negative";

    productMessage.style.color = "red";

    return;
  }

  const products = getProducts();

  const existingProduct = products.find(
    (productItem) => productItem.id === product.id,
  );

  if (existingProduct) {
    productMessage.textContent = "ID already exists";

    productMessage.style.color = "red";

    return;
  }

  products.push(product);

  localStorage.setItem("products", JSON.stringify(products));

  productMessage.textContent = "Product created";

  productMessage.style.color = "green";

  productForm.reset();

  console.log(product);
});
