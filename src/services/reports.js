import api from './api';

export const getLeadReport = (params = {}) => {
  return api.get('/reports/leads/', { params });
};

export const getPerformanceReport = (params = {}) => {
  return api.get('/reports/performance/', { params });
};

export const getConversionReport = (params = {}) => {
  return api.get('/reports/conversion/', { params });
};

export const exportReport = (type, format = 'pdf') => {
  return api.get(`/reports/export/${type}/?format=${format}`);
};