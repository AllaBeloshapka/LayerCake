if (window.requireAdminSession()) {

const usernameElement = document.querySelector("#admin-account-username");
const emailElement = document.querySelector("#admin-account-email");
const emailStatusElement = document.querySelector("#admin-account-email-status");
const accountMessageElement = document.querySelector("#admin-account-message");
const accountLogoutButton = document.querySelector("#account-logout-button");
const sendVerificationEmailButton = document.querySelector("#send-verification-email-button");
const emailVerificationMessageElement = document.querySelector("#admin-email-verification-message");
const passwordForm = document.querySelector("#admin-password-form");
const passwordMessageElement = document.querySelector("#admin-password-message");
const currentPasswordInput = document.querySelector("#current-password");
const newPasswordInput = document.querySelector("#new-password");
const repeatNewPasswordInput = document.querySelector("#repeat-new-password");

let currentAdminEmailVerified = false;

function updateVerificationControls() {
  if (currentAdminEmailVerified) {
    sendVerificationEmailButton.style.display = "none";
    emailVerificationMessageElement.textContent = "";
    emailVerificationMessageElement.style.color = "";
    return;
  }

  sendVerificationEmailButton.style.display = "";
  sendVerificationEmailButton.disabled = false;
  sendVerificationEmailButton.textContent = "Send verification email";
}

function showEmailVerificationMessage(message, isError) {
  emailVerificationMessageElement.textContent = message;
  emailVerificationMessageElement.style.color = isError ? "red" : "green";
}

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
    currentAdminEmailVerified = Boolean(admin.emailVerified);
    updateVerificationControls();
  } catch (error) {
    usernameElement.textContent = "";
    emailElement.textContent = "";
    emailStatusElement.textContent = "";
    emailStatusElement.className = "admin-email-status";
    accountMessageElement.textContent = "Unable to load account.";
    accountMessageElement.style.color = "red";
    sendVerificationEmailButton.style.display = "none";
    sendVerificationEmailButton.disabled = true;
  }
}

function showPasswordMessage(message, isError) {
  passwordMessageElement.textContent = message;
  passwordMessageElement.style.color = isError ? "red" : "green";
}

sendVerificationEmailButton.addEventListener("click", async () => {
  sendVerificationEmailButton.disabled = true;
  sendVerificationEmailButton.textContent = "Sending...";
  emailVerificationMessageElement.textContent = "";

  try {
    const result = await window.requestAdminEmailVerification();

    if (result.emailVerified) {
      currentAdminEmailVerified = true;
      emailStatusElement.textContent = "Verified";
      emailStatusElement.className =
        "admin-email-status admin-email-status--verified";
      updateVerificationControls();
      return;
    }

    showEmailVerificationMessage(
      "Verification email sent. Please check your inbox.",
      false,
    );
  } catch (error) {
    showEmailVerificationMessage(error.message, true);
  } finally {
    if (!currentAdminEmailVerified) {
      sendVerificationEmailButton.disabled = false;
      sendVerificationEmailButton.textContent = "Send verification email";
    }
  }
});

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
