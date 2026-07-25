import api from './api';

// Public Lead - No authentication required
export const createPublicLead = (data) => {
  return api.post('/leads/public/leads/', data);
};

// Authenticated Lead APIs
export const getLeads = (params = {}) => {
  return api.get('/leads/', { params });
};

export const getLead = (id) => {
  return api.get(`/leads/${id}/`);
};

export const createLead = (data) => {
  return api.post('/leads/', data);
};

export const updateLead = (id, data) => {
  return api.patch(`/leads/${id}/`, data);
};

export const deleteLead = (id) => {
  return api.delete(`/leads/${id}/`);
};

export const getLeadNotes = (id) => {
  return api.get(`/leads/${id}/notes/`);
};

export const addLeadNote = (id, data) => {
  return api.post(`/leads/${id}/add_note/`, data);
};

export const getLeadActivities = (id) => {
  return api.get(`/leads/${id}/activities/`);
};

export const changeLeadStatus = (id, status) => {
  return api.patch(`/leads/${id}/change_status/`, { status });
};

export const getLeadStats = () => {
  return api.get('/leads/stats/');
};