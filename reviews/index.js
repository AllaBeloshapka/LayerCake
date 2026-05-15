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