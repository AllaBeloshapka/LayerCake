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
   SUBMIT REVIEW
========================= */

function saveReviews(reviews) {
  localStorage.setItem("cakeReviews", JSON.stringify(reviews));
}

sendReviewButton.addEventListener("click", () => {
  const review = {
    id: crypto.randomUUID(),
    text: reviewTextarea.value,
    img: "",
    status: "pending",
    createdAt: Date.now(),
  };

  console.log(review);

  cakeReviews.push(review);

  saveReviews(cakeReviews);

  reviewTextarea.value = "";

  reviewPhotoInput.value = "";

  console.log(cakeReviews);
});
