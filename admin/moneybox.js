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

console.log(savedProfit);

console.log(moneyboxValue);

