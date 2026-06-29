window.adminApiFetch = async function adminApiFetch(url, options = {}) {
  const token = sessionStorage.getItem("adminSessionToken");

  if (!token) {
    throw new Error("Admin session token is missing");
  }

  const updatedOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(url, updatedOptions);
};

window.requireAdminSession = function requireAdminSession() {
  const token = sessionStorage.getItem("adminSessionToken");

  if (!token) {
    window.location.href = "login.html";
    return false;
  }

  return true;
};
