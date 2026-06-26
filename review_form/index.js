const starButtons = document.querySelectorAll(".star-btn");

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

// selectedRating will be used later when submitting the review.
