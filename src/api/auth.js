import api from "./api";
import Cookies from "js-cookie";

// Get CSRF Token
const getCSRFToken = async () => {
  await api.get("/accounts/csrf/");
  return Cookies.get("csrftoken");
};

// Login
export const loginUser = async (credentials) => {
  const csrfToken = await getCSRFToken();

  const response = await api.post(
    "/accounts/login/",
    credentials,
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
    }
  );

  return response.data;
};

// Signup
export const signupUser = async (userData) => {
  const csrfToken = await getCSRFToken();

  const response = await api.post(
    "/accounts/signup/",
    userData,
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
    }
  );

  return response.data;
};

// Logout
export const logoutUser = async () => {
  const csrfToken = Cookies.get("csrftoken");

  const response = await api.post(
    "/accounts/logout/",
    {},
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
    }
  );

  return response.data;
};

// Current Logged-in User
export const getCurrentUser = async () => {
  const response = await api.get("/accounts/me/");
  return response.data;
};

// Check Authentication
export const isAuthenticated = async () => {
  try {
    await api.get("/accounts/me/");
    return true;
  } catch {
    return false;
  }
};

// Get User Role
export const getUserRole = async () => {
  try {
    const response = await api.get("/accounts/me/");
    return response.data.role;
  } catch {
    return null;
  }
};