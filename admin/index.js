import {
  getOrders,
  getReviews,
  getProducts,
  saveReviews,
  saveProducts,
} from "../storage/storage.js";

// Order elements
const orderElement = document.querySelector(".order");

const newOrdersElement = document.querySelector(".number_new_orders");

const orderButton = document.querySelector(".btn-order");

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
   GO TO ORDERS PAGE
========================= */

orderButton.addEventListener("click", () => {
  window.location.href = "../orders_page/index.html";
});

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

const reviews = getReviews();

console.log(reviews);

/* =========================
   APPROVE REVIEW
========================= */

approveButton.addEventListener("click", () => {
  const reviews = getReviews();

  const pendingReview = reviews.find((review) => review.status === "pending");

  if (!pendingReview) return;

  pendingReview.status = "approved";

  saveReviews(reviews);

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

const productMessage = document.querySelector("#product-message");
const saveMessage = document.querySelector(".save-message");

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

    description: "",

    flavor: "",

    ingredients: "",

    weight: 0,

    height: 0,

    diameter: 0,
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

  saveProducts(products);

  productMessage.textContent = "Product created";

  productMessage.style.color = "green";

  productForm.reset();

  console.log(product);
});

/* =========================
   DELETE PRODUCT
========================= */

const deleteForm = document.querySelector("#delete-form");

const deleteIdInput = document.querySelector("#delete-id");

const deleteMessage = document.querySelector("#message");

deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  deleteMessage.textContent = "";

  const deleteId = deleteIdInput.value;

  const products = getProducts();

  console.log("DELETE ID:", deleteId);
  console.log("PRODUCTS:", products);

  const productIndex = products.findIndex((product) => product.id === deleteId);

  console.log("INDEX:", productIndex);

  if (productIndex === -1) {
    deleteMessage.textContent = "Product not found";

    deleteMessage.style.color = "red";

    return;
  }

  products.splice(productIndex, 1);

  saveProducts(products);

  deleteMessage.textContent = "Product deleted";

  deleteMessage.style.color = "green";

  deleteForm.reset();

  // displayProducts(getProducts());
});

/* =========================
   MODAL CARD EDITOR
========================= */
const idInput = document.querySelector("#id-input");

const descriptionInput = document.querySelector("#description-input");

const flavorInput = document.querySelector("#flavor-input");

const ingredientsInput = document.querySelector("#ingredients-input");

const weightInput = document.querySelector("#weight-input");

const heightInput = document.querySelector("#height-input");

const diameterInput = document.querySelector("#diameter-input");

const modalCardMessage = document.querySelector(".product-message");

const findProductButton = document.querySelector(".btn-find-product");

const editForm = document.querySelector(".modal-editor-form");

/* =========================
   FIND PRODUCT
========================= */

findProductButton.addEventListener("click", () => {
  saveMessage.textContent = "";

  const productId = idInput.value.trim();

  const products = JSON.parse(localStorage.getItem("products")) || [];

  const product = products.find((item) => String(item.id) === productId);

  if (!product) {
    modalCardMessage.textContent = "Product with this ID was not found.";

    descriptionInput.value = "";
    flavorInput.value = "";
    ingredientsInput.value = "";
    weightInput.value = "";
    heightInput.value = "";
    diameterInput.value = "";

    return;
  }

  productMessage.textContent = "";

  descriptionInput.value = product.description || "";

  flavorInput.value = product.flavor || "";

  ingredientsInput.value = product.ingredients || "";

  weightInput.value = product.weight || "";

  heightInput.value = product.height || "";

  diameterInput.value = product.diameter || "";
});

/* =========================
   SAVE PRODUCT CHANGES
========================= */

editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const productId = idInput.value.trim();

  const products = JSON.parse(localStorage.getItem("products")) || [];

  const product = products.find((item) => String(item.id) === productId);

  console.log(product);

  if (!product) {
    productMessage.textContent = "Product with this ID was not found.";

    return;
  }
  productMessage.textContent = "";

  product.description = descriptionInput.value;

  product.flavor = flavorInput.value;

  product.ingredients = ingredientsInput.value;

  product.weight = Number(weightInput.value);

  product.height = Number(heightInput.value);

  product.diameter = Number(diameterInput.value);

  try {
    saveProducts(products);

    saveMessage.textContent = "Product updated successfully.";

    saveMessage.style.color = "green";
  } catch (error) {
    saveMessage.textContent = "Product update failed.";

    saveMessage.style.color = "red";
  }
});
