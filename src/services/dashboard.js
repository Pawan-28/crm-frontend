import api from './api';

export const getDashboardStats = () => {
  return api.get('/dashboard/stats/');
};

export const getRecentActivities = () => {
  return api.get('/dashboard/activities/');
};

export const getChartData = () => {
  return api.get('/dashboard/charts/');
};