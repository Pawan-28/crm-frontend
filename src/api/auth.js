import api from "./api";

// Login
export const loginUser = async (credentials) => {
  const response = await api.post("auth/login/", credentials);
  return response.data;
};

// Register
export const signupUser = async (userData) => {
  const response = await api.post("auth/register/", userData);
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await api.post("auth/logout/");
  return response.data;
};

// Current User
export const getCurrentUser = async () => {
  const response = await api.get("auth/me/");
  return response.data;
};