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

let moneyboxValue = 0;

async function loadMoneyboxOrders() {
  try {
    const response = await window.adminApiFetch("http://localhost:3000/api/orders");

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const moneyboxOrders = await response.json();

    const lastSavedDate = lastSavedTime ? new Date(lastSavedTime) : null;

    const currentPeriodOrders = moneyboxOrders.filter((order) => {
      if (!lastSavedDate) {
        return true;
      }

      return new Date(order.sentAt) > lastSavedDate;
    });

    const currentPeriodProfit = currentPeriodOrders.reduce(
      (total, order) => total + Number(order.price || 0),
      0,
    );

    moneyboxValue = Math.round(currentPeriodProfit * 0.1);

    moneyboxAmount.textContent = `For the last period, you earned $${currentPeriodProfit}. Save $${moneyboxValue} for business growth.`;

    moneyboxTotal.textContent = `Now you have $${savedMoneybox} in your piggy bank for business growth.`;

    moneyboxCheckbox.checked = moneyboxValue === 0;
  } catch (error) {
    console.error("Failed to load moneybox orders:", error);
    moneyboxAmount.textContent = "Could not load moneybox data.";
    moneyboxTotal.textContent = `Now you have $${savedMoneybox} in your piggy bank for business growth.`;
  }
}

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

loadMoneyboxOrders();
