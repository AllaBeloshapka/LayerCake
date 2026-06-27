/* =========================
   DOM ELEMENTS
========================= */

const main = document.querySelector(".main");

/* =========================
   REVIEWS CONTAINER
========================= */

const cardBox = document.createElement("div");

cardBox.className = "card_box";

main.prepend(cardBox);

function getStarRating(rating) {
  if (rating === undefined || rating === null) {
    return "";
  }

  const value = Math.min(5, Math.max(1, Number(rating)));

  return "★".repeat(value) + "☆".repeat(5 - value);
}

/* =========================
   RENDER REVIEWS
========================= */

async function loadApprovedReviews() {
  try {
    const response = await fetch("http://localhost:3000/api/reviews");

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const reviews = await response.json();

    cardBox.replaceChildren();

    reviews.forEach((reviewItem) => {
      const card = document.createElement("div");

      card.className = "card";

      const reviewContainer = document.createElement("div");

      reviewContainer.className = "review";

      const customerName = document.createElement("p");

      customerName.className = "review-customer";
      customerName.textContent = reviewItem.customerName || "Customer";

      const reviewDate = document.createElement("p");

      reviewDate.className = "review-date";
      reviewDate.textContent = reviewItem.submittedAt
        ? new Date(reviewItem.submittedAt).toLocaleDateString("en-GB")
        : "-";

      const reviewRating = document.createElement("p");

      reviewRating.className = "review-rating";
      reviewRating.textContent = getStarRating(reviewItem.rating);

      const reviewText = document.createElement("p");

      reviewText.className = "review-text";
      reviewText.textContent = reviewItem.text;

      const image = document.createElement("img");

      image.className = "img";
      image.src =
        reviewItem.image ||
        reviewItem.productImage ||
        "./assets/cake.png";
      image.alt = "Cake review photo";

      reviewContainer.append(
        customerName,
        reviewDate,
        reviewRating,
        reviewText,
        image,
      );

      card.appendChild(reviewContainer);

      cardBox.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load approved reviews:", error);
    cardBox.replaceChildren();
  }
}

loadApprovedReviews();
