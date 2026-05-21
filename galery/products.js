const products = [
  {
    id: 1,
    name: "Women's joy",
    price: 250,
    image: "./assets/Женская радость.webp",

    description:
      "Delicate lavender sponge soaked in a syrup of rose petals and vanilla. A subtle floral and berry aroma fills each bite, creating a light, springtime flavor.",

    flavor:
      "Lavender, vanilla, wild berries",

    ingredients:
      "Wheat flour, sugar, eggs, milk, butter, vanilla, lavender and rose syrup, cream cheese, wild berries.",

    weight: 3,
    height: 50,
    diameter: 30,
  },

  {
    id: 2,
    name: "Birthday",
    price: 150,
    image: "./assets/Happy.jpg",

    description:
      "Classic vanilla cake with airy sponge layers and whipped cream frosting. Light, sweet, and festive.",

    flavor:
      "Vanilla cream",

    ingredients:
      "Flour, sugar, eggs, vanilla, 33% cream, butter, baking powder, pinch of salt.",

    weight: 2.5,
    height: 40,
    diameter: 28,
  },

  {
    id: 3,
    name: "Christmas",
    price: 100,
    image: "./assets/рождественский.jpg",

    description:
      "Spiced with cinnamon, honey, and dried fruits. Warm, festive flavor in every bite.",

    flavor:
      "Honey, cinnamon, dried fruits",

    ingredients:
      "Flour, eggs, butter, cinnamon, honey, raisins, nuts, cloves, dark sugar.",

    weight: 2,
    height: 35,
    diameter: 25,
  },

  {
    id: 4,
    name: "Pink bouquet",
    price: 250,
    image: "./assets/розовый букет.jpg",

    description:
      "Strawberry mousse and pink sponge layers decorated with cream flowers. Looks like an edible bouquet.",

    flavor:
      "Strawberry mousse",

    ingredients:
      "Flour, sugar, strawberry puree, cream, eggs, rose-colored icing, buttercream.",

    weight: 3,
    height: 45,
    diameter: 30,
  },

  {
    id: 5,
    name: "For my beloved",
    price: 200,
    image: "./assets/для любимой.webp",

    description:
      "Chocolate and cherry layers with a delicate mousse — a cake full of romance and passion.",

    flavor:
      "Chocolate and cherry",

    ingredients:
      "Chocolate, flour, cream, eggs, sugar, cherries, butter, cocoa.",

    weight: 2.8,
    height: 40,
    diameter: 28,
  },

  {
    id: 6,
    name: "Chocolate",
    price: 150,
    image: "./assets/1.png",

    description:
      "Rich dark chocolate flavor, dense sponge and glossy ganache. Classic perfection.",

    flavor:
      "Dark chocolate",

    ingredients:
      "Flour, eggs, sugar, cocoa, dark chocolate, cream, butter.",

    weight: 2.5,
    height: 38,
    diameter: 27,
  },

  {
    id: 7,
    name: "Three-tiered",
    price: 100,
    image: "./assets/трёхэтажный_.jpg",

    description:
      "Three-layered cake for celebrations. Each tier has a different flavor: vanilla, chocolate, and strawberry.",

    flavor:
      "Vanilla, chocolate, strawberry",

    ingredients:
      "Flour, eggs, sugar, cream, chocolate, strawberry puree, vanilla, butter.",

    weight: 5,
    height: 70,
    diameter: 35,
  },

  {
    id: 8,
    name: "Pink",
    price: 230,
    image: "./assets/розовый.jpg",

    description:
      "Light pink cream with raspberry flavor and snow-white sponge layers. Airy and delicate.",

    flavor:
      "Raspberry cream",

    ingredients:
      "Flour, sugar, cream, eggs, raspberry puree, butter.",

    weight: 2.7,
    height: 42,
    diameter: 28,
  },

  {
    id: 9,
    name: "Candy",
    price: 180,
    image: "./assets/конфетный.jpg",

    description:
      "Bright, sweet, and fun — like a bag of candies. Layered cake with colorful cream and sprinkles.",

    flavor:
      "Sweet cream and white chocolate",

    ingredients:
      "Flour, sugar, eggs, cream, colored cream, decorative sprinkles, white chocolate.",

    weight: 2.3,
    height: 35,
    diameter: 26,
  },

  {
    id: 10,
    name: "Chocolate-berry",
    price: 50,
    image: "./assets/шоколадно-ягодный.jpeg",

    description:
      "Chocolate sponge with layers of fresh berries and light cream. Refreshing yet rich flavor.",

    flavor:
      "Chocolate and berries",

    ingredients:
      "Chocolate, flour, cream, berries, eggs, sugar, butter.",

    weight: 2,
    height: 35,
    diameter: 25,
  },

  {
    id: 11,
    name: "Pineapple",
    price: 200,
    image: "./assets/ананасовый.jpg",

    description:
      "Tropical pineapple flavor, soaked in syrup with creamy layers — a light summer delight.",

    flavor:
      "Pineapple cream",

    ingredients:
      "Flour, sugar, pineapple puree, cream, eggs, butter.",

    weight: 2.5,
    height: 38,
    diameter: 27,
  },

  {
    id: 12,
    name: "Nice",
    price: 120,
    image: "./assets/любимый.jpg",

    description:
      "Homemade childhood flavor — simple sponge and delicate cream. Perfect with tea.",

    flavor:
      "Vanilla cream",

    ingredients:
      "Flour, eggs, sugar, cream, butter, vanilla.",

    weight: 2,
    height: 32,
    diameter: 25,
  },

  {
    id: 13,
    name: "Children",
    price: 80,
    image: "./assets/Детский.jpg",

    description:
      "Light sponge, vanilla cream, and cheerful decorations. Made for kids — no alcohol or strong spices.",

    flavor:
      "Vanilla cream",

    ingredients:
      "Flour, sugar, eggs, cream, butter, natural colorings.",

    weight: 1.8,
    height: 30,
    diameter: 24,
  },

  {
    id: 14,
    name: "Wedding",
    price: 99,
    image: "./assets/свадебный.jpg",

    description:
      "Snow-white cake with floral aroma, decorated with sugar flowers. Symbol of celebration and tenderness.",

    flavor:
      "Vanilla and white chocolate",

    ingredients:
      "Flour, sugar, cream, vanilla, eggs, fondant, white chocolate.",

    weight: 4,
    height: 60,
    diameter: 33,
  },

  {
    id: 15,
    name: "Strawberry",
    price: 120,
    image: "./assets/1.jpg",

    description:
      "Fresh strawberry puree with light sponge — bright summer flavor you won’t forget.",

    flavor:
      "Fresh strawberry",

    ingredients:
      "Flour, strawberry puree, sugar, cream, eggs, butter.",

    weight: 2.3,
    height: 37,
    diameter: 26,
  },

  {
    id: 16,
    name: "For tea",
    price: 50,
    image: "./assets/к чаю.jpg",

    description:
      "Small cake with classic flavor, perfect for an evening tea.",

    flavor:
      "Classic vanilla",

    ingredients:
      "Flour, sugar, cream, eggs, butter, vanilla.",

    weight: 1.5,
    height: 25,
    diameter: 22,
  },
];