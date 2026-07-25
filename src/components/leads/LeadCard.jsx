import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

const LeadCard = ({ lead, onDelete }) => {
  const { isAdmin } = useAuth();

  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-700',
      'contacted': 'bg-yellow-100 text-yellow-700',
      'qualified': 'bg-green-100 text-green-700',
      'proposal_sent': 'bg-purple-100 text-purple-700',
      'won': 'bg-emerald-100 text-emerald-700',
      'lost': 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {lead.full_name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{lead.email}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
          {lead.status_display}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-500">Phone:</span>
          <span className="ml-1 text-gray-900">{lead.phone || '-'}</span>
        </div>
        <div>
          <span className="text-gray-500">Company:</span>
          <span className="ml-1 text-gray-900">{lead.company || '-'}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Source:</span>
          <span className="ml-1 text-gray-900">{lead.source_display}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Assigned To:</span>
          <span className="ml-1 text-gray-900">
            {lead.assigned_to_detail?.full_name || 'Unassigned'}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end space-x-2 border-t border-gray-100 pt-4">
        <Link
          to={`/leads/${lead.id}`}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <EyeIcon className="h-5 w-5" />
        </Link>
        {isAdmin && (
          <>
            <Link
              to={`/leads/${lead.id}/edit`}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <PencilIcon className="h-5 w-5" />
            </Link>
            <button
              onClick={() => onDelete(lead.id, lead.full_name)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadCard;