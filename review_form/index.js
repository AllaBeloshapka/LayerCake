const starButtons = document.querySelectorAll(".star-btn");

const customerGreeting = document.getElementById("customer-greeting");
const orderCakeName = document.getElementById("order-cake-name");
const orderDate = document.getElementById("order-date");
const orderCakeImage = document.getElementById("order-cake-image");

let selectedRating = 5;

function updateStarRating() {
  starButtons.forEach((button) => {
    const rating = Number(button.dataset.rating);

    if (rating <= selectedRating) {
      button.classList.add("is-active");
    } else {
      button.classList.remove("is-active");
    }
  });
}

starButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedRating = Number(button.dataset.rating);
    updateStarRating();
  });
});

updateStarRating();

async function loadOrderDetails() {
  const orderId = new URLSearchParams(window.location.search).get("orderId");

  if (!orderId) {
    customerGreeting.textContent = "Hello!";
    orderCakeName.textContent = "Cake information is missing";
    orderDate.textContent =
      "Please open this page from your review invitation link.";
    orderCakeImage.style.display = "none";
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/orders/${orderId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }

    const order = await response.json();

    customerGreeting.textContent = `Hello, ${order.customerName}!`;
    orderCakeName.textContent = order.cakeName;
    orderDate.textContent = `Order date: ${new Date(
      order.orderDateTime,
    ).toLocaleDateString()}`;

    try {
      const productResponse = await fetch(
        `http://localhost:3000/api/products/${order.productCode}`,
      );

      if (productResponse.ok) {
        const product = await productResponse.json();
        orderCakeImage.src = product.image;
        orderCakeImage.style.display = "block";
      } else {
        orderCakeImage.style.display = "none";
      }
    } catch {
      orderCakeImage.style.display = "none";
    }
  } catch (error) {
    console.error("Failed to load order details:", error);
    customerGreeting.textContent = "Hello!";
    orderCakeName.textContent = "Order information could not be loaded";
    orderDate.textContent = "Please try again later.";
    orderCakeImage.style.display = "none";
  }
}

loadOrderDetails();

// selectedRating will be used later when submitting the review.
