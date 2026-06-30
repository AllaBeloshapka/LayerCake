if (window.requireAdminSession()) {

const usernameElement = document.querySelector("#admin-account-username");
const emailElement = document.querySelector("#admin-account-email");
const emailStatusElement = document.querySelector("#admin-account-email-status");
const accountMessageElement = document.querySelector("#admin-account-message");
const accountLogoutButton = document.querySelector("#account-logout-button");
const passwordForm = document.querySelector("#admin-password-form");
const passwordMessageElement = document.querySelector("#admin-password-message");
const currentPasswordInput = document.querySelector("#current-password");
const newPasswordInput = document.querySelector("#new-password");
const repeatNewPasswordInput = document.querySelector("#repeat-new-password");

async function loadAdminAccount() {
  try {
    const admin = await window.getCurrentAdminAccount();

    usernameElement.textContent = admin.username;
    emailElement.textContent = admin.email;
    emailStatusElement.textContent = admin.emailVerified
      ? "Verified"
      : "Not verified";
    emailStatusElement.className = admin.emailVerified
      ? "admin-email-status admin-email-status--verified"
      : "admin-email-status admin-email-status--unverified";
  } catch (error) {
    usernameElement.textContent = "";
    emailElement.textContent = "";
    emailStatusElement.textContent = "";
    emailStatusElement.className = "admin-email-status";
    accountMessageElement.textContent = "Unable to load account.";
    accountMessageElement.style.color = "red";
  }
}

function showPasswordMessage(message, isError) {
  passwordMessageElement.textContent = message;
  passwordMessageElement.style.color = isError ? "red" : "green";
}

passwordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  passwordMessageElement.textContent = "";

  const currentPassword = currentPasswordInput.value;
  const newPassword = newPasswordInput.value;
  const repeatNewPassword = repeatNewPasswordInput.value;

  if (!currentPassword || !newPassword || !repeatNewPassword) {
    showPasswordMessage("All password fields are required.", true);
    return;
  }

  if (newPassword.length < 8) {
    showPasswordMessage("New password must be at least 8 characters long.", true);
    return;
  }

  if (newPassword !== repeatNewPassword) {
    showPasswordMessage("New passwords do not match.", true);
    return;
  }

  try {
    await window.changeAdminPassword(currentPassword, newPassword);
    showPasswordMessage("Password updated successfully.", false);
    passwordForm.reset();
  } catch (error) {
    showPasswordMessage(error.message, true);
  }
});

accountLogoutButton.addEventListener("click", () => {
  sessionStorage.removeItem("adminSessionToken");
  window.location.href = "login.html";
});

loadAdminAccount();

}
