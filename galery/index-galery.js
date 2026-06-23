import {
  getOrders,
  saveOrders,
  getVisitors,
  saveVisitors,
} from "../storage/storage.js";

/* =========================
   VISITORS COUNTER
========================= */

let visitors = getVisitors();

visitors++;

saveVisitors(visitors);

// Access DOM elements

const contentMain = document.querySelector(".gallery");

const closeModalButton = document.querySelector(".close");
const closeOrderButton = document.querySelector(".close-order");

const modalCard = document.querySelector(".modal");
modalCard.style.display = "none";

const modalName = document.querySelector(".modal-name");
const modalDescription = document.querySelector(".modal-taste");
const modalIngredients = document.querySelector(".modal-ingredients");
const modalSize = document.querySelector(".modal-size");
const modalButton = document.querySelector(".modal-button");

const orderFormBox = document.querySelector(".box-order-form");
orderFormBox.style.display = "none";

const orderForm = document.querySelector(".order-form");

// Render product cards

function displayProducts(productsToShow) {
  contentMain.innerHTML = "";

  productsToShow.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.productCode = product.productCode;

    const idElement = document.createElement("p");
    idElement.textContent = `#${product.productCode}`;
    idElement.className = "id";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.className = "foto";

    const name = document.createElement("p");
    name.textContent = `"${product.name}"`;
    name.style.fontWeight = "bold";

    const price = document.createElement("p");
    price.textContent = `Price: ${product.price} USD`;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(idElement);

    // Open product modal

    card.addEventListener("click", () => {
      modalCard.style.display = "flex";

      modalName.textContent = product.name;
      modalDescription.textContent = product.description;
      modalIngredients.textContent = product.ingredients;
      modalSize.textContent = `Weight - ${product.weight} kg,  Height - ${product.height} cm,  Diameter - ${product.diameter} cm`;

      modalButton.textContent = "ORDER";

      // Save product data for order form

      modalButton.dataset.productCode = product.productCode;
      modalButton.dataset.name = product.name;
    });

    contentMain.appendChild(card);
  });
}

/* =========================
   LOAD PRODUCTS FROM API
========================= */

let allProducts = [];

async function loadGalleryProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    allProducts = await response.json();
    displayProducts(allProducts);
  } catch (error) {
    console.error("Failed to load gallery products:", error);
    allProducts = [];
    displayProducts(allProducts);
  }
}

loadGalleryProducts();

// Close product modal

closeModalButton.addEventListener("click", () => {
  modalCard.style.display = "none";
});

// Open order form

modalButton.addEventListener("click", () => {
  orderFormBox.style.display = "flex";
  modalCard.style.display = "none";
});

// Close order form

closeOrderButton.addEventListener("click", () => {
  orderFormBox.style.display = "none";
});

// Handle order form submission

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = orderForm["customer-name"].value.trim();
  const phone = orderForm["customer-phone"].value.trim();
  const email = orderForm["customer-email"].value.trim();

  const productCode = Number(modalButton.dataset.productCode);
  const productName = modalButton.dataset.name;

  if (!name || !phone || !email) {
    alert("Please fill in all fields!");
    return;
  }

  const product = allProducts.find(
    (item) => item.productCode === productCode,
  );

  if (!product) {
    alert("Product not found. Please reload the page and try again.");
    return;
  }

  const order = {
    productCode,
    cakeName: productName,
    customerName: name,
    price: product.price,
    phone,
    email,
    birthDate: orderForm["birth-date"].value,
    orderDateTime: orderForm["order-datetime"].value,
  };

  try {
    const response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.message || "Failed to send order");
      return;
    }

    orderFormBox.style.display = "none";
    orderForm.reset();
    alert("Order sent successfully!");
  } catch {
    alert("Failed to send order");
  }
});
