/* =========================
   MONEYBOX ELEMENTS
========================= */

const moneyboxAmount = document.getElementById("moneybox-amount");

const moneyboxCheckbox = document.getElementById("moneybox-checkbox");

const moneyboxTotal = document.getElementById("moneybox-total");

const resetMoneyboxBtn = document.getElementById("reset-moneybox-btn");

/* =========================
   MONEYBOX STORAGE
========================= */

let savedMoneybox = Number(localStorage.getItem("moneybox")) || 0;

const lastSavedTime = localStorage.getItem("moneyboxLastSavedTime");

/* =========================
   GET ORDERS
========================= */

const moneyboxOrders = JSON.parse(localStorage.getItem("orders")) || [];

/* =========================
   CURRENT PERIOD ORDERS
========================= */

const currentPeriodOrders = moneyboxOrders.filter((order) => {
  if (!lastSavedTime) {
    return true;
  }

  return new Date(order.sentAt) > new Date(lastSavedTime);
});

/* =========================
   CURRENT PERIOD PROFIT
========================= */

const currentPeriodProfit = currentPeriodOrders.reduce(
  (total, order) => total + Number(order.price || 0),
  0,
);

const moneyboxValue = Math.round(currentPeriodProfit * 0.1);

/* =========================
   DISPLAY MONEYBOX DATA
========================= */

moneyboxAmount.textContent = `For the last period, you earned $${currentPeriodProfit}. Save $${moneyboxValue} for business growth.`;

moneyboxTotal.textContent = `Now you have $${savedMoneybox} in your piggy bank for business growth.`;

/* =========================
   RESTORE CHECKBOX STATE
========================= */

moneyboxCheckbox.checked = moneyboxValue === 0;

/* =========================
   SAVE MONEY TO MONEYBOX
========================= */

moneyboxCheckbox.addEventListener("change", () => {
  if (moneyboxCheckbox.checked && moneyboxValue > 0) {
    savedMoneybox += moneyboxValue;

    localStorage.setItem("moneybox", savedMoneybox);

    localStorage.setItem("moneyboxLastSavedTime", new Date().toISOString());

    moneyboxTotal.textContent = `Now you have $${savedMoneybox} in your piggy bank for business growth.`;
  }
});

/* =========================
   RESET MONEYBOX
========================= */

resetMoneyboxBtn.addEventListener(
  "click",
  () => {
    savedMoneybox = 0;

    localStorage.setItem(
      "moneybox",
      0
    );

    moneyboxTotal.textContent =
      "Now you have $0 in your piggy bank for business growth.";
  }
);
