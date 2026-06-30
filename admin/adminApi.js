window.adminApiFetch = async function adminApiFetch(url, options = {}) {
  const token = sessionStorage.getItem("adminSessionToken");

  if (!token) {
    throw new Error("Admin session token is missing");
  }

  const { skipUnauthorizedRedirect, ...fetchOptions } = options;

  const updatedOptions = {
    ...fetchOptions,
    headers: {
      ...fetchOptions.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, updatedOptions);

  if (response.status === 401 && !skipUnauthorizedRedirect) {
    sessionStorage.removeItem("adminSessionToken");
    window.location.href = "login.html";
  }

  return response;
};

window.requireAdminSession = function requireAdminSession() {
  const token = sessionStorage.getItem("adminSessionToken");

  if (!token) {
    window.location.href = "login.html";
    return false;
  }

  return true;
};

window.getCurrentAdminAccount = async function getCurrentAdminAccount() {
  const response = await window.adminApiFetch("http://localhost:3000/api/auth/me");

  if (!response.ok) {
    throw new Error("Failed to load admin account");
  }

  return response.json();
};

window.changeAdminPassword = async function changeAdminPassword(
  currentPassword,
  newPassword,
) {
  const response = await window.adminApiFetch(
    "http://localhost:3000/api/auth/password",
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
      skipUnauthorizedRedirect: true,
    },
  );

  if (!response.ok) {
    let errorMessage = "Failed to update password";

    try {
      const error = await response.json();

      if (error.message) {
        errorMessage = error.message;
      }
    } catch (parseError) {
      // Keep default error message.
    }

    if (errorMessage === "Current password is incorrect") {
      throw new Error("Current password is incorrect. Please try again.");
    }

    if (errorMessage === "Unauthorized") {
      sessionStorage.removeItem("adminSessionToken");
      window.location.href = "login.html";
      throw new Error("Unauthorized");
    }

    throw new Error(errorMessage);
  }

  return response.json();
};
