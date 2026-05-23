/* =========================
   MONEYBOX ELEMENTS
========================= */

const moneyboxAmount =
  document.getElementById(
    "moneybox-amount"
  );

const moneyboxCheckbox =
  document.getElementById(
    "moneybox-checkbox"
  );

const moneyboxTotal =
  document.getElementById(
    "moneybox-total"
  );

console.log(moneyboxAmount);
console.log(moneyboxCheckbox);
console.log(moneyboxTotal);

/* =========================
   MONEYBOX PROFIT
========================= */

const savedProfit =
  Number(
    localStorage.getItem("totalProfit")
  ) || 0;

const moneyboxValue =
  Math.round(savedProfit * 0.1);

/* =========================
   DISPLAY MONEYBOX DATA
========================= */

moneyboxAmount.textContent =
  `Today, that's $${moneyboxValue}.`;

moneyboxTotal.textContent =
  `Now you have $${moneyboxValue} in your piggy bank for business growth.`;

