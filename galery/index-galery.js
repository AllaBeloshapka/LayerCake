
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
      MODAL_BUTTON.dataset.name = product.name; // сохраняем название торта

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
  cakeName: productName,
  customerName: name,           //  имя клиента
  phone,
  email,
  birthDate: ORDER_FORM["birth-date"].value,          // дата рождения
  orderDateTime: ORDER_FORM["order-datetime"].value,  // дата и время выполнения заказа
  status: "New order",           // статус по умолчанию
  sentAt: new Date().toISOString()

};


  try {
    //  Сохраняем в localStorage (на всякий случай)
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    //  Отправляем на сервер
    const response = await fetch("http://localhost:5000/api/orders", {
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

