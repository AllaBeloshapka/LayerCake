

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
    card.dataset.id = product.id;

    const idElement = document.createElement("p");
    idElement.textContent = `#${product.id}`;
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
      modalSize.textContent = product.size;

      modalButton.textContent = "ORDER";

      // Save product data for order form

      modalButton.dataset.id = product.id;
      modalButton.dataset.name = product.name;
    });

    contentMain.appendChild(card);
  });
}

// Initial gallery render

displayProducts(products);

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

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  orderFormBox.style.display = "none";

  const name = orderForm["customer-name"].value.trim();
  const phone = orderForm["customer-phone"].value.trim();
  const email = orderForm["customer-email"].value.trim();

  const productId = Number(modalButton.dataset.id);
  const productName = modalButton.dataset.name;

  if (!name || !phone || !email) {
    alert("Please fill in all fields!");
    return;
  }

  // Find selected product

  const product = products.find((product) => product.id === productId);

  const order = {
    id: Date.now(),
    productId: productId,
    cakeName: productName,
    customerName: name,
    phone,
    email,

    birthDate: orderForm["birth-date"].value,

    orderDateTime: orderForm["order-datetime"].value,

    status: "New order",

    sentAt: new Date().toISOString(),
  };

  // Save order to localStorage

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));

  // Reset and close form

  orderFormBox.style.display = "none";
  orderForm.reset();
});
