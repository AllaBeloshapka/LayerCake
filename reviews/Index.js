
//набор отзывов
const cakeReviews = [
  { id: 1, text: "The cake was incredibly tender, the cream melted in my mouth!", img: "./assets/1k.jpg" },
  { id: 2, text: "Ordered for a birthday — the guests were delighted, everyone asked where I got it.", img: "./assets/2k.png" },
  { id: 3, text: "Very beautiful design, it almost felt wrong to cut it.", img: "./assets/3k.jpg" },
  { id: 4, text: "The cake turned out light and not too sweet, even my grandmother ate it, who usually doesn’t like sweets.", img: "./assets/4k.jpg" },
  { id: 5, text: "Delivered on time, everything was super fresh, many thanks!", img: "./assets/5k.jpg" },
  { id: 6, text: "Chocolate cake — simply magical, rich flavor, and the layers were airy.", img: "./assets/6k.jpeg" },
  { id: 7, text: "The kids especially loved the cake with fondant figures — the celebration was a success!", img: "./assets/7k.jpeg" },
  { id: 8, text: "I tried cheesecake for the first time — now it’s my favorite dessert.", img: "./assets/8k.jpeg" },
  { id: 9, text: "Great value for money, we’ve ordered more than once.", img: "./assets/9k.jpeg" },
  { id: 10, text: "The cake was super fresh and gorgeous. It decorated our wedding. Thank you very much!", img: "./assets/10л.jpg" },
  { id: 11, text: "I’m thrilled! The taste is amazing! Ordered it for a bachelorette party.", img: "" },
];

//находим элемент main
const MAIN = document.querySelector(".main");

//создаю бокс для карточек с отзывами
const CARD_BOX = document.createElement("div");
CARD_BOX.className = "card_box";
MAIN.prepend(CARD_BOX);

cakeReviews.forEach((review) => {
  //создаю карточку
  const CARD = document.createElement("div"); //новый HTML-элемент <div>
  CARD.className = "card";

  // создаю коробку для текста
  const REVIEW = document.createElement("p");
  REVIEW.className = "review";
  REVIEW.textContent = `${review.text}`;

  // вставляем фото внутрь параграфа
  const IMG = document.createElement("img");
  IMG.className = "img";
  IMG.src = review.img;
  IMG.alt = "foto";

  REVIEW.appendChild(IMG); // вставляем фото в параграф
  CARD.appendChild(REVIEW); // вставляем параграф в карточку
  CARD_BOX.appendChild(CARD); //вставляем карточку в бокс карточек
});
