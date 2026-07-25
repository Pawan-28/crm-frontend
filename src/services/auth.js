import api from './api';

export const login = (username, password) => {
  return api.post('/auth/login/', { username, password });
};

export const register = (userData) => {
  return api.post('/auth/register/', userData);
};

export const getCurrentUser = () => {
  return api.get('/auth/me/');
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};