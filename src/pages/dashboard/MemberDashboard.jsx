import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/layout/MainLayout';
import StatCard from '../../components/dashboard/StatCard';
import RecentActivities from '../../components/dashboard/RecentActivities';
import { getLeads } from '../../services/leads';
import { getRecentActivities } from '../../services/dashboard';
import { 
  UsersIcon, 
  ClockIcon,
  TrophyIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import SkeletonLoader from '../../components/common/SkeletonLoader';

const MemberDashboard = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [leadsResponse, activitiesResponse] = await Promise.all([
        getLeads(),
        getRecentActivities(),
      ]);
      
      const leadData = leadsResponse.data.results || [];
      setLeads(leadData);
      setActivities(activitiesResponse.data || []);
      
      // Calculate stats
      const statsData = {
        total: leadData.length,
        new: leadData.filter(l => l.status === 'new').length,
        contacted: leadData.filter(l => l.status === 'contacted').length,
        qualified: leadData.filter(l => l.status === 'qualified').length,
        proposal_sent: leadData.filter(l => l.status === 'proposal_sent').length,
        won: leadData.filter(l => l.status === 'won').length,
        lost: leadData.filter(l => l.status === 'lost').length,
      };
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonLoader count={4} type="card" />
          </div>
        </div>
      </MainLayout>
    );
  }

  const statCards = [
    { 
      title: 'My Leads', 
      value: stats.total || 0, 
      icon: UsersIcon, 
      color: 'blue',
      subtitle: 'Total assigned to you' 
    },
    { 
      title: 'New', 
      value: stats.new || 0, 
      icon: ClockIcon, 
      color: 'green',
      subtitle: 'Awaiting action' 
    },
    { 
      title: 'Won', 
      value: stats.won || 0, 
      icon: TrophyIcon, 
      color: 'yellow',
      subtitle: 'Successfully closed' 
    },
    { 
      title: 'Lost', 
      value: stats.lost || 0, 
      icon: XMarkIcon, 
      color: 'red',
      subtitle: 'Lost opportunities' 
    },
  ];

  const getStatusBadgeClass = (status) => {
    const classes = {
      'new': 'bg-blue-100 text-blue-700',
      'contacted': 'bg-yellow-100 text-yellow-700',
      'qualified': 'bg-green-100 text-green-700',
      'proposal_sent': 'bg-purple-100 text-purple-700',
      'won': 'bg-emerald-100 text-emerald-700',
      'lost': 'bg-red-100 text-red-700',
    };
    return classes[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.full_name || user?.username}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts and Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">My Lead Status Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(stats).map(([key, value]) => {
                  if (key === 'total') return null;
                  const colors = {
                    'new': 'bg-blue-500',
                    'contacted': 'bg-yellow-500',
                    'qualified': 'bg-green-500',
                    'proposal_sent': 'bg-purple-500',
                    'won': 'bg-emerald-500',
                    'lost': 'bg-red-500',
                  };
                  const labels = {
                    'new': 'New',
                    'contacted': 'Contacted',
                    'qualified': 'Qualified',
                    'proposal_sent': 'Proposal Sent',
                    'won': 'Won',
                    'lost': 'Lost',
                  };
                  return (
                    <div key={key} className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className={`text-2xl font-bold ${colors[key] ? colors[key].replace('bg-', 'text-') : 'text-gray-700'}`}>
                        {value}
                      </p>
                      <p className="text-xs text-gray-500 uppercase">{labels[key] || key}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <RecentActivities 
              activities={activities} 
              loading={loading} 
              limit={5} 
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <p className="text-sm opacity-90">Conversion Rate</p>
            <p className="text-3xl font-bold">
              {stats.total > 0 ? Math.round((stats.won / stats.total) * 100) : 0}%
            </p>
            <p className="text-xs opacity-75 mt-1">Leads converted to won</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <p className="text-sm opacity-90">Pending Follow-ups</p>
            <p className="text-3xl font-bold">{stats.contacted || 0}</p>
            <p className="text-xs opacity-75 mt-1">Need attention today</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl p-6 text-white">
            <p className="text-sm opacity-90">Qualified Leads</p>
            <p className="text-3xl font-bold">{stats.qualified || 0}</p>
            <p className="text-xs opacity-75 mt-1">Ready for proposal</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
            <p className="text-sm opacity-90">Proposal Sent</p>
            <p className="text-3xl font-bold">{stats.proposal_sent || 0}</p>
            <p className="text-xs opacity-75 mt-1">Awaiting response</p>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Recent Leads</h2>
            <span className="text-sm text-gray-500">Total: {leads.length}</span>
          </div>
          <div className="space-y-3">
            {leads.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all border"
              >
                <div>
                  <p className="font-medium text-gray-900">{lead.full_name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{lead.company || 'No company'}</span>
                    <span>•</span>
                    <span>{lead.email}</span>
                    {lead.phone && (
                      <>
                        <span>•</span>
                        <span>{lead.phone}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(lead.status)}`}
                  >
                    {lead.status_display}
                  </span>
                  <Link
                    to={`/leads/${lead.id}`}
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <EyeIcon className="h-4 w-4" />
                    View
                  </Link>
                </div>
              </div>
            ))}
            {leads.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No leads assigned to you yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MemberDashboard;