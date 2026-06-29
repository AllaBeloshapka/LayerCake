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

  const response = await fetch(url, updatedOptions);

  if (response.status === 401) {
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
