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

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  productMessage.textContent = "";

  const price = Number(productPriceInput.value);

  if (price < 0) {
    productMessage.textContent = "Price cannot be negative";

    productMessage.style.color = "red";

    return;
  }

  if (!productImageInput.files || productImageInput.files.length === 0) {
    productMessage.textContent = "Product image is required";

    productMessage.style.color = "red";

    return;
  }

  const formData = new FormData();
  formData.append("productCode", Number(productIdInput.value));
  formData.append("name", productNameInput.value);
  formData.append("price", price);
  formData.append("image", productImageInput.files[0]);
  formData.append("description", "");
  formData.append("flavor", "");
  formData.append("ingredients", "");
  formData.append("weight", 0);
  formData.append("height", 0);
  formData.append("diameter", 0);

  try {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: formData,
    });

    if (response.status === 409) {
      productMessage.textContent = "Product code already exists";

      productMessage.style.color = "red";

      return;
    }

    if (response.status === 400) {
      productMessage.textContent = "Invalid product data";

      productMessage.style.color = "red";

      return;
    }

    if (!response.ok) {
      productMessage.textContent = "Failed to create product";

      productMessage.style.color = "red";

      return;
    }

    productMessage.textContent = "Product created";

    productMessage.style.color = "green";

    productForm.reset();
  } catch (error) {
    productMessage.textContent = "Failed to create product";

    productMessage.style.color = "red";
  }
});

/* =========================
   DELETE PRODUCT
========================= */

const deleteForm = document.querySelector("#delete-form");

const deleteIdInput = document.querySelector("#delete-id");

const deleteMessage = document.querySelector("#message");

deleteForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  deleteMessage.textContent = "";

  const deleteId = deleteIdInput.value.trim();

  if (!deleteId) {
    deleteMessage.textContent = "Product code is required";

    deleteMessage.style.color = "red";

    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${deleteId}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      deleteMessage.textContent = "Product deleted";

      deleteMessage.style.color = "green";

      deleteForm.reset();

      return;
    }

    const error = await response.json();

    deleteMessage.textContent = error.message || "Failed to delete product";

    deleteMessage.style.color = "red";
  } catch (error) {
    deleteMessage.textContent = "Failed to delete product";

    deleteMessage.style.color = "red";
  }
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

findProductButton.addEventListener("click", async () => {
  saveMessage.textContent = "";

  const productId = idInput.value.trim();

  if (!productId) {
    modalCardMessage.textContent = "Product code is required";

    descriptionInput.value = "";
    flavorInput.value = "";
    ingredientsInput.value = "";
    weightInput.value = "";
    heightInput.value = "";
    diameterInput.value = "";

    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`,
    );

    if (!response.ok) {
      modalCardMessage.textContent = "Product with this ID was not found.";

      descriptionInput.value = "";
      flavorInput.value = "";
      ingredientsInput.value = "";
      weightInput.value = "";
      heightInput.value = "";
      diameterInput.value = "";

      return;
    }

    const product = await response.json();

    productMessage.textContent = "";
    modalCardMessage.textContent = "";

    descriptionInput.value = product.description || "";
    flavorInput.value = product.flavor || "";
    ingredientsInput.value = product.ingredients || "";
    weightInput.value = product.weight || "";
    heightInput.value = product.height || "";
    diameterInput.value = product.diameter || "";
  } catch (error) {
    modalCardMessage.textContent = "Product with this ID was not found.";

    descriptionInput.value = "";
    flavorInput.value = "";
    ingredientsInput.value = "";
    weightInput.value = "";
    heightInput.value = "";
    diameterInput.value = "";
  }
});

/* =========================
   SAVE PRODUCT CHANGES
========================= */

editForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const productId = idInput.value.trim();

  if (!productId) {
    productMessage.textContent = "Product code is required.";

    productMessage.style.color = "red";

    return;
  }

  try {
    const getResponse = await fetch(
      `http://localhost:3000/api/products/${productId}`,
    );

    if (!getResponse.ok) {
      productMessage.textContent = "Product with this ID was not found.";

      return;
    }

    const currentProduct = await getResponse.json();

    productMessage.textContent = "";

    const updateData = {
      name: currentProduct.name,
      price: currentProduct.price,
      description: descriptionInput.value,
      flavor: flavorInput.value,
      ingredients: ingredientsInput.value,
      weight: Number(weightInput.value),
      height: Number(heightInput.value),
      diameter: Number(diameterInput.value),
    };

    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      },
    );

    if (response.ok) {
      saveMessage.textContent = "Product updated successfully.";

      saveMessage.style.color = "green";

      return;
    }

    const error = await response.json();

    saveMessage.textContent = error.message || "Product update failed.";

    saveMessage.style.color = "red";
  } catch (error) {
    saveMessage.textContent = "Product update failed.";

    saveMessage.style.color = "red";
  }
});
