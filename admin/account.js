if (window.requireAdminSession()) {

const usernameElement = document.querySelector("#admin-account-username");
const emailElement = document.querySelector("#admin-account-email");
const emailStatusElement = document.querySelector("#admin-account-email-status");
const accountMessageElement = document.querySelector("#admin-account-message");
const accountLogoutButton = document.querySelector("#account-logout-button");

async function loadAdminAccount() {
  try {
    const admin = await window.getCurrentAdminAccount();

    usernameElement.textContent = admin.username;
    emailElement.textContent = admin.email;
    emailStatusElement.textContent = admin.emailVerified
      ? "Verified"
      : "Not verified";
  } catch (error) {
    usernameElement.textContent = "";
    emailElement.textContent = "";
    emailStatusElement.textContent = "";
    accountMessageElement.textContent = "Unable to load account.";
    accountMessageElement.style.color = "red";
  }
}

accountLogoutButton.addEventListener("click", () => {
  sessionStorage.removeItem("adminSessionToken");
  window.location.href = "login.html";
});

loadAdminAccount();

}
