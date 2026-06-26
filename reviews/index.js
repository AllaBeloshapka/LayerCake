/* =========================
   DOM ELEMENTS
========================= */

const main = document.querySelector(".main");

/* =========================
   REVIEW FORM ELEMENTS
========================= */

const reviewTextarea = document.querySelector(".user_input_form");

const reviewPhotoInput = document.querySelector("#foto_input");

const sendReviewButton = document.querySelector(".send_btn");

/* =========================
   REVIEWS CONTAINER
========================= */

const cardBox = document.createElement("div");

cardBox.className = "card_box";

main.prepend(cardBox);

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

    cardBox.innerHTML = "";

    reviews.forEach((reviewItem) => {
      const card = document.createElement("div");

      card.className = "card";

      const reviewText = document.createElement("p");

      reviewText.className = "review";
      reviewText.textContent = reviewItem.text;

      const image = document.createElement("img");

      image.className = "img";
      image.src = reviewItem.image || "./assets/cake.png";
      image.alt = "Cake review photo";

      reviewText.appendChild(image);

      card.appendChild(reviewText);

      cardBox.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load approved reviews:", error);
    cardBox.innerHTML = "";
  }
}

loadApprovedReviews();

sendReviewButton.addEventListener("click", () => {
  console.log("Review submit will be connected to API later");
});
