/* =========================
   MONEYBOX ELEMENTS
========================= */

const moneyboxAmount = document.getElementById("moneybox-amount");

const moneyboxCheckbox = document.getElementById("moneybox-checkbox");

const moneyboxTotal = document.getElementById("moneybox-total");

console.log(moneyboxAmount);
console.log(moneyboxCheckbox);
console.log(moneyboxTotal);

/* =========================
   MONEYBOX PROFIT
========================= */

const savedProfit = Number(localStorage.getItem("totalProfit")) || 0;

const moneyboxValue = Math.round(savedProfit * 0.1);

/* =========================
   MONEYBOX STORAGE
========================= */

let savedMoneybox = Number(localStorage.getItem("moneybox")) || 0;

console.log(savedMoneybox);

/* =========================
   DISPLAY MONEYBOX DATA
========================= */

moneyboxAmount.textContent = `Today, that's $${moneyboxValue}.`;

moneyboxTotal.textContent = `Now you have $${moneyboxValue} in your piggy bank for business growth.`;

/* =========================
   SAVE MONEY TO MONEYBOX
========================= */

moneyboxCheckbox.addEventListener(
  "change",
  () => {
    if (moneyboxCheckbox.checked) {
      savedMoneybox += moneyboxValue;

      localStorage.setItem(
        "moneybox",
        savedMoneybox
      );

      moneyboxTotal.textContent =
        `Now you have $${savedMoneybox} in your piggy bank for business growth.`;
    }
  }
);