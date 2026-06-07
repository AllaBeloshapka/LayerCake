import { saveReviews } from "../storage/storage.js";

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

cakeReviews.forEach((reviewItem) => {
  // Create review card
  const card = document.createElement("div");

  card.className = "card";

  // Create review text
  const reviewText = document.createElement("p");

  reviewText.className = "review";
  reviewText.textContent = reviewItem.text;

  // Create review image
  const image = document.createElement("img");

  image.className = "img";
  image.src = reviewItem.img;
  image.alt = "Cake review photo";

  // Add image into review text
  reviewText.appendChild(image);

  // Add review text into card
  card.appendChild(reviewText);

  // Add card into reviews container
  cardBox.appendChild(card);
});

/* =========================
   CONVERT IMAGE
========================= */

function convertImageToBase64(file, callback) {
  const reader = new FileReader();

  reader.onload = () => {
    callback(reader.result);
  };

  reader.readAsDataURL(file);
}

sendReviewButton.addEventListener("click", () => {
  const file = reviewPhotoInput.files[0];

  if (file) {
    convertImageToBase64(file, (imageBase64) => {
      const review = {
        id: crypto.randomUUID(),
        text: reviewTextarea.value,
        img: imageBase64,
        status: "pending",
        createdAt: Date.now(),
      };

      cakeReviews.push(review);

      saveReviews(cakeReviews);

      reviewTextarea.value = "";

      reviewPhotoInput.value = "";
    });

    return;
  }

  const review = {
    id: crypto.randomUUID(),
    text: reviewTextarea.value,
    img: "",
    status: "pending",
    createdAt: Date.now(),
  };

  cakeReviews.push(review);

  saveReviews(cakeReviews);

  reviewTextarea.value = "";

  reviewPhotoInput.value = "";
});
