import { useState, useEffect } from 'react';
import { getLeads, getLead, createLead, updateLead, deleteLead } from '../services/leads';
import toast from 'react-hot-toast';

export const useLeads = (initialParams = {}) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState(initialParams);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await getLeads(params);
      setLeads(response.data.results || []);
      setTotal(response.data.count || 0);
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [params]);

  const refresh = () => {
    fetchLeads();
  };

  const updateParams = (newParams) => {
    setParams({ ...params, ...newParams });
  };

  return {
    leads,
    loading,
    total,
    totalPages,
    currentPage,
    params,
    setParams,
    updateParams,
    refresh,
    fetchLeads,
  };
};