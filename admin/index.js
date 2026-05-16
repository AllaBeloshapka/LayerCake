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
   APPROVE REVIEW
========================= */

approveButton.addEventListener("click", () => {
  const pendingReview = reviews.find(
    (review) => review.status === "pending"
  );

  if (!pendingReview) return;

  pendingReview.status = "approved";

  localStorage.setItem(
    "cakeReviews",
    JSON.stringify(reviews)
  );

  renderPendingReview();
});

/* =========================
   RENDER REVIEW
========================= */

function renderPendingReview() {
  const pendingReview = reviews.find(
    (review) => review.status === "pending"
  );

  if (!pendingReview) {
    reviewText.textContent =
      "No reviews pending moderation";

    reviewImage.style.display = "none";

    approveButton.style.display = "none";

    rejectButton.style.display = "none";

    return;
  }

  reviewText.textContent = pendingReview.text;

  reviewImage.src =
    pendingReview.img || "./assets/cake.png";

  reviewImage.style.display = "block";

  approveButton.style.display = "block";

  rejectButton.style.display = "block";
}

/* =========================
   INITIAL RENDER
========================= */

renderPendingReview();