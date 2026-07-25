import React from 'react';

const LeadStatusBadge = ({ status }) => {
  const statusConfig = {
    'new': { label: 'New', className: 'bg-blue-100 text-blue-700' },
    'contacted': { label: 'Contacted', className: 'bg-yellow-100 text-yellow-700' },
    'qualified': { label: 'Qualified', className: 'bg-green-100 text-green-700' },
    'proposal_sent': { label: 'Proposal Sent', className: 'bg-purple-100 text-purple-700' },
    'won': { label: 'Won', className: 'bg-emerald-100 text-emerald-700' },
    'lost': { label: 'Lost', className: 'bg-red-100 text-red-700' },
  };

  const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-700' };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
};

export default LeadStatusBadge;