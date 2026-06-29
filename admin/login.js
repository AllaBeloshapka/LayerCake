const loginForm = document.querySelector("#login-form");
const usernameOrEmailInput = document.querySelector("#username-or-email");
const passwordInput = document.querySelector("#password");
const loginMessage = document.querySelector("#login-message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  loginMessage.textContent = "";

  const usernameOrEmail = usernameOrEmailInput.value.trim();
  const password = passwordInput.value;

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usernameOrEmail,
        password,
      }),
    });

    if (!response.ok) {
      loginMessage.textContent = "Invalid login";
      loginMessage.style.color = "red";
      return;
    }

    const data = await response.json();

    if (!data.token) {
      loginMessage.textContent = "Invalid login";
      loginMessage.style.color = "red";
      return;
    }

    sessionStorage.setItem("adminSessionToken", data.token);
    window.location.href = "index.html";
  } catch (error) {
    loginMessage.textContent = "Invalid login";
    loginMessage.style.color = "red";
  }
});
