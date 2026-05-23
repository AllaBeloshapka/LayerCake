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

const totalProfit =
  Number(
    localStorage.getItem("totalProfit")
  ) || 0;

const moneyboxValue =
  Math.round(totalProfit * 0.1);

console.log(totalProfit);

console.log(moneyboxValue);

