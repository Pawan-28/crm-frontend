import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlusIcon,
  UserCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

const RecentActivities = ({ activities, loading, limit = 5 }) => {
  if (loading) {
    return (
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="text-center py-8">
          <ClockIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No recent activities</p>
        </div>
      </div>
    );
  }

  const getActivityIcon = (action) => {
    const icons = {
      'created': UserPlusIcon,
      'updated': PencilIcon,
      'deleted': TrashIcon,
      'assigned': UserCircleIcon,
      'status_changed': ArrowPathIcon,
      'note_added': ChatBubbleLeftIcon,
      'contacted': PhoneIcon,
      'meeting_scheduled': CalendarIcon,
      'email_sent': EnvelopeIcon,
      'won': CheckCircleIcon,
      'lost': XCircleIcon,
    };
    return icons[action] || ClockIcon;
  };

  const getActivityColor = (action) => {
    const colors = {
      'created': 'text-blue-500 bg-blue-50',
      'updated': 'text-yellow-500 bg-yellow-50',
      'deleted': 'text-red-500 bg-red-50',
      'assigned': 'text-purple-500 bg-purple-50',
      'status_changed': 'text-indigo-500 bg-indigo-50',
      'note_added': 'text-green-500 bg-green-50',
      'contacted': 'text-emerald-500 bg-emerald-50',
      'meeting_scheduled': 'text-pink-500 bg-pink-50',
      'email_sent': 'text-cyan-500 bg-cyan-50',
      'won': 'text-emerald-500 bg-emerald-50',
      'lost': 'text-red-500 bg-red-50',
    };
    return colors[action] || 'text-gray-500 bg-gray-50';
  };

  const getActionLabel = (action) => {
    const labels = {
      'created': 'created',
      'updated': 'updated',
      'deleted': 'deleted',
      'assigned': 'assigned',
      'status_changed': 'changed status',
      'note_added': 'added a note',
      'contacted': 'contacted',
      'meeting_scheduled': 'scheduled a meeting',
      'email_sent': 'sent an email',
      'won': 'won the deal',
      'lost': 'lost the deal',
    };
    return labels[action] || action;
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

const displayActivities = Array.isArray(activities)
  ? activities.slice(0, limit)
  : [];
  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        {Array.isArray(activities) && activities.length > limit && (
          <Link to="/activities" className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </Link>
        )}
      </div>

      <div className="flow-root">
        <ul className="-mb-8">
          {displayActivities.map((activity, index) => {
            const Icon = getActivityIcon(activity.action);
            const colorClass = getActivityColor(activity.action);
            const isLast = index === displayActivities.length - 1;

            return (
              <li key={activity.id || index}>
                <div className="relative pb-8">
                  {!isLast && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={`h-8 w-8 rounded-full ${colorClass} flex items-center justify-center ring-8 ring-white`}>
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="font-medium text-gray-900">
                          {activity.user?.full_name || activity.user?.username || 'System'}
                        </span>
                        <span className="text-gray-500">
                          {getActionLabel(activity.action)}
                        </span>
                        {activity.lead && (
                          <Link
                            to={`/leads/${activity.lead.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {activity.lead.full_name}
                          </Link>
                        )}
                      </div>
                      {activity.description && (
                        <p className="mt-0.5 text-sm text-gray-500">
                          {activity.description}
                        </p>
                      )}
                      <div className="mt-0.5 flex items-center space-x-2">
                        <span className="text-xs text-gray-400">
                          {formatTimeAgo(activity.created_at)}
                        </span>
                        {activity.lead && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span className={`badge ${activity.lead.status === 'won' ? 'badge-green' : 
                              activity.lead.status === 'lost' ? 'badge-red' : 
                              activity.lead.status === 'new' ? 'badge-blue' : 
                              activity.lead.status === 'contacted' ? 'badge-yellow' : 
                              activity.lead.status === 'qualified' ? 'badge-purple' : 
                              'badge-gray'}`}>
                              {activity.lead.status_display || activity.lead.status}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivities;