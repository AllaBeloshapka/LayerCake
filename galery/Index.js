// const products = [
//   {
//     id: 1,
//     name: "Women's joy",
//     price: 250,
//     imgUrl: "./assets/Женская радость.webp",
//   },
//   {
//     id: 2,
//     name: "Birthday",
//     price: 150,
//     imgUrl: "./assets/Happy.jpg",
//   },
//   {
//     id: 3,
//     name: "Christmas",
//     price: 100,
//     imgUrl: "./assets/рождественский.jpg",
//   },
//   {
//     id: 4,
//     name: "Pink bouquet",
//     price: 250,
//     imgUrl: "./assets/розовый букет.jpg",
//   },
//   {
//     id: 5,
//     name: "For my beloved",
//     price: 200,
//     imgUrl: "./assets/для любимой.webp",
//   },
//   {
//     id: 6,
//     name: "Chocolate",
//     price: 150,
//     imgUrl: "./assets/1.png",
//   },
//   {
//     id: 7,
//     name: "Three-tiered",
//     price: 100,
//     imgUrl: "./assets/трёхэтажный_.jpg",
//   },
//   {
//     id: 8,
//     name: "Pink",
//     price: 230,
//     imgUrl: "./assets/розовый.jpg",
//   },
//   {
//     id: 9,
//     name: "Candy",
//     price: 180,
//     imgUrl: "./assets/конфетный.jpg",
//   },
//   {
//     id: 10,
//     name: "Chocolate-berry",
//     price: 50,
//     imgUrl: "./assets/шоколадно-ягодный.jpeg",
//   },
//   {
//     id: 11,
//     name: "Pineapple",
//     price: 200,
//     imgUrl: "./assets/ананасовый.jpg",
//   },
//   {
//     id: 12,
//     name: "Nice",
//     price: 120,
//     imgUrl: "./assets/любимый.jpg",
//   },
//   {
//     id: 13,
//     name: "Children",
//     price: 80,
//     imgUrl: "./assets/Детский.jpg",
//   },
//   {
//     id: 14,
//     name: "Wedding",
//     price: 99,
//     imgUrl: "./assets/свадебный.jpg",
//   },
//   {
//     id: 15,
//     name: "Strawberry",
//     price: 120,
//     imgUrl: "./assets/1.jpg",
//   },
//   {
//     id: 16,
//     name: "For tea",
//     price: 50,
//     imgUrl: "./assets/к чаю.jpg",
//   },
// ];

// const CAKE_DESCRIPTION = [
//   {
//     id: 1,
//     taste_description:
//       "Delicate, light, soft, moist, and rich in flavor. Delicate lavender sponges are soaked in a syrup made from lavender and rose blossom infusions, and a touch of vanilla creates a subtle, stunning lavender and rose flavor. Layers of wild berries—raspberries, blackberries, blackcurrants, and blueberries—balance the sweetness of the sponge. A cream cheese frosting adds a creamy note to the cake's flavor.",
//     ingredients:
//       "The cake consists of wheat flour, cocoa, sugar, eggs, milk, butter, baking powder, a pinch of salt, 33% cream, dark chocolate, vanilla extract, chocolate ganache, and cocoa powder for decoration.",
//     size_and_weight: "3 kg.  Height 50 cm.  Diameter 30 cm.",
//     button: "ORDER",
//   },
//   {
//     id: 2,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 3,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 4,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 5,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 6,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 7,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 8,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 9,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 10,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 11,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 12,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 13,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 14,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 15,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
//   {
//     id: 16,
//     taste_description: "",
//     ingredients: "",
//     size_and_weight: "",
//     button: "ORDER",
//   },
// ];


// находим доступ


// const CONTENT_MAIN = document.querySelector(".gallery"); // всё окно галереи
// const CLOSE = document.querySelector(".close"); //крестик для закрытия модального окна
// const CLOSE_ORDER = document.querySelector(".close-order"); //крестик закрытия формы

// // изначально модальной карточки с описанием не видно
// const MODAL_CARD = document.querySelector(".modal");
// MODAL_CARD.style.display = "none";

// //находим элементы модальной  карточки
// const MODAL_NAME = document.querySelector(".modal-name"); //название торта
// const MODAL_TASTE = document.querySelector(".modal-taste"); //описание вкуса торта
// const MODAL_INGREDIENTS = document.querySelector(".modal-ingredients"); //  состав торта
// const MODAL_SIZE = document.querySelector(".modal-size"); //размер и вес торта
// const MODAL_BUTTON = document.querySelector(".modal-button"); //кнопка в модальной карточке
// const ORDER_BTN = document.querySelector(".order-btn"); // кнопка заказа в форме
// const ORDER_FORM = document.querySelector(".order-form");   //форма отправки заказа

// // изначально формы регистрации не видно
// const BOX_ORDER_FORM = document.querySelector(".box-order-form"); //вся форма регистрации
// BOX_ORDER_FORM.style.display = "none";

// // Функция для отображения продуктов
// function displayProducts(productsToShow) {
//   // Очищаем основной контент
//   const cards = document.querySelectorAll(".card");
//   //находит ВСЕ существующие на странице элементы с классом card
//   //  и возвращает их в виде коллекции (NodeList)
//   cards.forEach((card) => card.remove());
//   //перебирает каждый элемент этой коллекции
//   //  и удаляет его из DOM (Document Object Model).

//   // Отображаем отфильтрованные продукты
//   productsToShow.forEach((product) => {
//     const CARD = document.createElement("div"); //новый HTML-элемент <div>
//     CARD.className = "card";
//     CARD.dataset.id = product.id;

//     // создаём элемент КАРТИНКА
//     const AVATAR = document.createElement("img");
//     AVATAR.src = product.imgUrl; // ссылка на картинку
//     AVATAR.alt = "avatar"; // если фото не загружается
//     AVATAR.className = "foto"; // имя класса для стилей

//     // создаём данные о продукте в карточке
//     const INFO_TYPE = document.createElement("h2");    

//     const INFO_NAME = document.createElement("p");
//     INFO_NAME.textContent = `"${product.name}"`;
//     INFO_NAME.style.fontWeight = "bold"; // жирный текст

//     const INFO_PRISE = document.createElement("p");
//     INFO_PRISE.textContent = `Prise: ${product.price} USD`;
    

//     const INFO_ID = document.createElement("p");
//     INFO_ID.id = "id";
//     INFO_ID.textContent = `#${product.id}`;

    

//     // добавляем элементы в блок КАРТОЧКА
//     CARD.appendChild(AVATAR);
//     CARD.appendChild(INFO_TYPE);
//     CARD.appendChild(INFO_NAME);
//     CARD.appendChild(INFO_PRISE);
//     CARD.appendChild(INFO_ID);

//     // обработчик события - при клике на карточку с тортом выходит модальное окно с описанием
//     CARD.addEventListener("click", (event) => {
//       MODAL_CARD.style.display = "flex"; // показываем модальную карточку

//       const productId = event.currentTarget.dataset.id; // получаем ID карточки

//       // находим объект с именем торта
//       const product = products.find((p) => p.id == productId);

//       // находим объект с описанием
//       const description = CAKE_DESCRIPTION.find((d) => d.id == productId);

//       // вставляем данные в модалку
//       MODAL_NAME.textContent = product.name;
//       MODAL_TASTE.textContent = description.taste_description;
//       MODAL_INGREDIENTS.textContent = description.ingredients;
//       MODAL_SIZE.textContent = description.size_and_weight;
//       MODAL_BUTTON.textContent = description.button;
//     });

//     CONTENT_MAIN.appendChild(CARD);
//   });
// }
// // Изначально отображаем все продукты
// displayProducts(products);

// // обработчик события - нажатие на крестик модального окна
// CLOSE.addEventListener("click", () => {
//   MODAL_CARD.style.display = "none";
// });

// //обработчик события - клик на кнопку ЗАКАЗА в модальной карточке -> появление формы заказа
// MODAL_BUTTON.addEventListener("click", (event) => {
//   BOX_ORDER_FORM.style.display = "flex"; // показываем модальную карточку
//   MODAL_CARD.style.display = "none"; // модальная карточка исчезает
// });

// // обработчик события - нажатие на крестик формы заказа
// CLOSE_ORDER.addEventListener("click", () => {
//   BOX_ORDER_FORM.style.display = "none";
// });

// // обработчик события - нажатие на кнопку формы заказа
// ORDER_FORM.addEventListener("submit", (event) => {
//   event.preventDefault(); // чтобы форма не перезагружала страницу

//   const name = ORDER_FORM["customer-name"].value.trim();
//   const phone = ORDER_FORM["customer-phone"].value.trim();
//   const email = ORDER_FORM["customer-email"].value.trim();

//   if (name && phone && email) {

//     //сохранение заказа в localStorage
//     const order = {
//       id: Date.now(),
//       name,
//       phone,
//       email
//     };

//     const orders = JSON.parse(localStorage.getItem('orders')) || [];
//     orders.push(order);
//     localStorage.setItem('orders', JSON.stringify(orders));
    

//     BOX_ORDER_FORM.style.display = "none";
//     alert("Your order has been sent successfully!");
//     ORDER_FORM.reset(); // очищаем поля после отправки
//   } else {
//     alert("Please fill in all fields!");
//   }

// });

const products = [
  {
    id: 1,
    name: "Women's joy",
    price: 250,
    imgUrl: "./assets/Женская радость.webp",
    taste_description:
      "Delicate lavender sponge soaked in a syrup of rose petals and vanilla. A subtle floral and berry aroma fills each bite, creating a light, springtime flavor.",
    ingredients:
      "Wheat flour, sugar, eggs, milk, butter, vanilla, lavender and rose syrup, cream cheese, wild berries.",
    size_and_weight: "3 kg · Height 50 cm · Diameter 30 cm",
    button: "ORDER",
  },
  {
    id: 2,
    name: "Birthday",
    price: 150,
    imgUrl: "./assets/Happy.jpg",
    taste_description:
      "Classic vanilla cake with airy sponge layers and whipped cream frosting. Light, sweet, and festive.",
    ingredients:
      "Flour, sugar, eggs, vanilla, 33% cream, butter, baking powder, pinch of salt.",
    size_and_weight: "2.5 kg · Height 40 cm · Diameter 28 cm",
    button: "ORDER",
  },
  {
    id: 3,
    name: "Christmas",
    price: 100,
    imgUrl: "./assets/рождественский.jpg",
    taste_description:
      "Spiced with cinnamon, honey, and dried fruits. Warm, festive flavor in every bite.",
    ingredients:
      "Flour, eggs, butter, cinnamon, honey, raisins, nuts, cloves, dark sugar.",
    size_and_weight: "2 kg · Height 35 cm · Diameter 25 cm",
    button: "ORDER",
  },
  {
    id: 4,
    name: "Pink bouquet",
    price: 250,
    imgUrl: "./assets/розовый букет.jpg",
    taste_description:
      "Strawberry mousse and pink sponge layers decorated with cream flowers. Looks like an edible bouquet.",
    ingredients:
      "Flour, sugar, strawberry puree, cream, eggs, rose-colored icing, buttercream.",
    size_and_weight: "3 kg · Height 45 cm · Diameter 30 cm",
    button: "ORDER",
  },
  {
    id: 5,
    name: "For my beloved",
    price: 200,
    imgUrl: "./assets/для любимой.webp",
    taste_description:
      "Chocolate and cherry layers with a delicate mousse — a cake full of romance and passion.",
    ingredients:
      "Chocolate, flour, cream, eggs, sugar, cherries, butter, cocoa.",
    size_and_weight: "2.8 kg · Height 40 cm · Diameter 28 cm",
    button: "ORDER",
  },
  {
    id: 6,
    name: "Chocolate",
    price: 150,
    imgUrl: "./assets/1.png",
    taste_description:
      "Rich dark chocolate flavor, dense sponge and glossy ganache. Classic perfection.",
    ingredients:
      "Flour, eggs, sugar, cocoa, dark chocolate, cream, butter.",
    size_and_weight: "2.5 kg · Height 38 cm · Diameter 27 cm",
    button: "ORDER",
  },
  {
    id: 7,
    name: "Three-tiered",
    price: 100,
    imgUrl: "./assets/трёхэтажный_.jpg",
    taste_description:
      "Three-layered cake for celebrations. Each tier has a different flavor: vanilla, chocolate, and strawberry.",
    ingredients:
      "Flour, eggs, sugar, cream, chocolate, strawberry puree, vanilla, butter.",
    size_and_weight: "5 kg · Height 70 cm · Diameter of bottom tier 35 cm",
    button: "ORDER",
  },
  {
    id: 8,
    name: "Pink",
    price: 230,
    imgUrl: "./assets/розовый.jpg",
    taste_description:
      "Light pink cream with raspberry flavor and snow-white sponge layers. Airy and delicate.",
    ingredients:
      "Flour, sugar, cream, eggs, raspberry puree, butter.",
    size_and_weight: "2.7 kg · Height 42 cm · Diameter 28 cm",
    button: "ORDER",
  },
  {
    id: 9,
    name: "Candy",
    price: 180,
    imgUrl: "./assets/конфетный.jpg",
    taste_description:
      "Bright, sweet, and fun — like a bag of candies. Layered cake with colorful cream and sprinkles.",
    ingredients:
      "Flour, sugar, eggs, cream, colored cream, decorative sprinkles, white chocolate.",
    size_and_weight: "2.3 kg · Height 35 cm · Diameter 26 cm",
    button: "ORDER",
  },
  {
    id: 10,
    name: "Chocolate-berry",
    price: 50,
    imgUrl: "./assets/шоколадно-ягодный.jpeg",
    taste_description:
      "Chocolate sponge with layers of fresh berries and light cream. Refreshing yet rich flavor.",
    ingredients:
      "Chocolate, flour, cream, berries, eggs, sugar, butter.",
    size_and_weight: "2 kg · Height 35 cm · Diameter 25 cm",
    button: "ORDER",
  },
  {
    id: 11,
    name: "Pineapple",
    price: 200,
    imgUrl: "./assets/ананасовый.jpg",
    taste_description:
      "Tropical pineapple flavor, soaked in syrup with creamy layers — a light summer delight.",
    ingredients:
      "Flour, sugar, pineapple puree, cream, eggs, butter.",
    size_and_weight: "2.5 kg · Height 38 cm · Diameter 27 cm",
    button: "ORDER",
  },
  {
    id: 12,
    name: "Nice",
    price: 120,
    imgUrl: "./assets/любимый.jpg",
    taste_description:
      "Homemade childhood flavor — simple sponge and delicate cream. Perfect with tea.",
    ingredients:
      "Flour, eggs, sugar, cream, butter, vanilla.",
    size_and_weight: "2 kg · Height 32 cm · Diameter 25 cm",
    button: "ORDER",
  },
  {
    id: 13,
    name: "Children",
    price: 80,
    imgUrl: "./assets/Детский.jpg",
    taste_description:
      "Light sponge, vanilla cream, and cheerful decorations. Made for kids — no alcohol or strong spices.",
    ingredients:
      "Flour, sugar, eggs, cream, butter, natural colorings.",
    size_and_weight: "1.8 kg · Height 30 cm · Diameter 24 cm",
    button: "ORDER",
  },
  {
    id: 14,
    name: "Wedding",
    price: 99,
    imgUrl: "./assets/свадебный.jpg",
    taste_description:
      "Snow-white cake with floral aroma, decorated with sugar flowers. Symbol of celebration and tenderness.",
    ingredients:
      "Flour, sugar, cream, vanilla, eggs, fondant, white chocolate.",
    size_and_weight: "4 kg · Height 60 cm · Diameter of bottom tier 33 cm",
    button: "ORDER",
  },
  {
    id: 15,
    name: "Strawberry",
    price: 120,
    imgUrl: "./assets/1.jpg",
    taste_description:
      "Fresh strawberry puree with light sponge — bright summer flavor you won’t forget.",
    ingredients:
      "Flour, strawberry puree, sugar, cream, eggs, butter.",
    size_and_weight: "2.3 kg · Height 37 cm · Diameter 26 cm",
    button: "ORDER",
  },
  {
    id: 16,
    name: "For tea",
    price: 50,
    imgUrl: "./assets/к чаю.jpg",
    taste_description:
      "Small cake with classic flavor, perfect for an evening tea.",
    ingredients:
      "Flour, sugar, cream, eggs, butter, vanilla.",
    size_and_weight: "1.5 kg · Height 25 cm · Diameter 22 cm",
    button: "ORDER",
  },
];

// Access DOM elements
const CONTENT_MAIN = document.querySelector(".gallery"); // main gallery
const CLOSE_MODAL = document.querySelector(".close"); // close modal button
const CLOSE_ORDER = document.querySelector(".close-order"); // close order form

const MODAL_CARD = document.querySelector(".modal");
MODAL_CARD.style.display = "none";

const MODAL_NAME = document.querySelector(".modal-name");
const MODAL_TASTE = document.querySelector(".modal-taste");
const MODAL_INGREDIENTS = document.querySelector(".modal-ingredients");
const MODAL_SIZE = document.querySelector(".modal-size");
const MODAL_BUTTON = document.querySelector(".modal-button");

const ORDER_FORM_BOX = document.querySelector(".box-order-form");
ORDER_FORM_BOX.style.display = "none";

const ORDER_FORM = document.querySelector(".order-form");

// Display products function
function displayProducts(productsToShow) {
  CONTENT_MAIN.innerHTML = ""; // clear gallery

  productsToShow.forEach(product => {
    const CARD = document.createElement("div");
    CARD.className = "card";
    CARD.dataset.id = product.id;

    const ID = document.createElement("id");
    ID.textContent = `#${product.id}`;
    ID.className = "id";

    const IMAGE = document.createElement("img");
    IMAGE.src = product.imgUrl;
    IMAGE.alt = product.name;
    IMAGE.className = "foto";

    const NAME = document.createElement("p");
    NAME.textContent = `"${product.name}"`;
    NAME.style.fontWeight = "bold";

    const PRICE = document.createElement("p");
    PRICE.textContent = `Price: ${product.price} USD`;

    CARD.appendChild(IMAGE);
    CARD.appendChild(NAME);
    CARD.appendChild(PRICE);
    CARD.appendChild(ID);

    // Show modal on click
    CARD.addEventListener("click", () => {
      MODAL_CARD.style.display = "flex";

      MODAL_NAME.textContent = product.name;
      MODAL_TASTE.textContent = product.taste_description;
      MODAL_INGREDIENTS.textContent = product.ingredients;
      MODAL_SIZE.textContent = product.size_and_weight;
      MODAL_BUTTON.textContent = product.button;

      // Store product id for order reference
      MODAL_BUTTON.dataset.id = product.id;
      MODAL_BUTTON.dataset.name = product.name; // ✅ сохраняем название торта

    });

    CONTENT_MAIN.appendChild(CARD);
  });
}

// Initial display
displayProducts(products);

// Close modal
CLOSE_MODAL.addEventListener("click", () => {
  MODAL_CARD.style.display = "none";
});

// Open order form from modal
MODAL_BUTTON.addEventListener("click", () => {
  ORDER_FORM_BOX.style.display = "flex";
  MODAL_CARD.style.display = "none";
});

// Close order form
CLOSE_ORDER.addEventListener("click", () => {
  ORDER_FORM_BOX.style.display = "none";
});

ORDER_FORM.addEventListener("submit", async (event) => {
  event.preventDefault();

  ORDER_FORM_BOX.style.display = "none";

  const name = ORDER_FORM["customer-name"].value.trim();
  const phone = ORDER_FORM["customer-phone"].value.trim();
  const email = ORDER_FORM["customer-email"].value.trim();
  const productId = Number(MODAL_BUTTON.dataset.id); // ID товара
  const productName = MODAL_BUTTON.dataset.name; // название товара

  if (!name || !phone || !email) {
    alert("Please fill in all fields!");
    return;
  }

  // Находим продукт по ID в массиве products
// Находим объект продукта по productId
const product = products.find(p => p.id == productId);


const order = {
  id: Date.now(),               // ID заказа
  productId: productId,         // ID товара
  // cakeName: product ? product.name : "Неизвестный торт",
  cakeName: productName,
  customerName: name,           // ✅ имя клиента
  phone,
  email,
  status: "New order"           // статус по умолчанию
};


  try {
    // 1️⃣ Сохраняем в localStorage (на всякий случай)
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // 2️⃣ Отправляем на сервер
    const response = await fetch("https://your-server.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    alert(`Your order for "${product.name}" has been sent successfully!`);

    // Закрываем форму и очищаем
    ORDER_FORM_BOX.style.display = "none";
    ORDER_FORM.reset();

  } catch (error) {
    console.error(error);
    alert("There was an error sending your order. Please try again later.");
  }
});


// Submit order
// ORDER_FORM.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const name = ORDER_FORM["customer-name"].value.trim();
//   const phone = ORDER_FORM["customer-phone"].value.trim();
//   const email = ORDER_FORM["customer-email"].value.trim();
//   const productId = MODAL_BUTTON.dataset.id; // product id from modal

//   if (name && phone && email) {
//     const order = {
//       id: Date.now(),
//       productId: productId,
//       cakeName,
//       name,
//       phone,
//       email
//     };

//     const orders = JSON.parse(localStorage.getItem("orders")) || [];
//     orders.push(order);
//     localStorage.setItem("orders", JSON.stringify(orders));

//     ORDER_FORM_BOX.style.display = "none";
//     alert(`Your order for product #${productId} has been sent successfully!`);
//     ORDER_FORM.reset();
//   } else {
//     alert("Please fill in all fields!");
//   }
// });


