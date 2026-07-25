import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/layout/MainLayout';
import StatCard from '../../components/dashboard/StatCard';
import RecentActivities from '../../components/dashboard/RecentActivities';
import { LineChartComponent, PieChartComponent } from '../../components/dashboard/Charts';
import { getLeadStats } from '../../services/leads';
import { getUsers } from '../../services/users';
import { getRecentActivities } from '../../services/dashboard';
import {
  UsersIcon,
  UserGroupIcon,
  TrophyIcon,
  XMarkIcon,
  ClockIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import SkeletonLoader from '../../components/common/SkeletonLoader';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, usersResponse, activitiesResponse] = await Promise.all([
        getLeadStats(),
        getUsers(),
        getRecentActivities(),
      ]);
      setStats(statsResponse.data);
      setUsers(usersResponse.data.results || []);
      setActivities(activitiesResponse.data || []);

      // Prepare chart data
      const statusData = Object.entries(statsResponse.data)
        .filter(([key]) => !['total', 'total_members'].includes(key))
        .map(([key, value]) => ({
          name: key.replace('_', ' ').toUpperCase(),
          value: value,
        }));
      setChartData(statusData);
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
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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
      title: 'Total Leads', 
      value: stats?.total || 0, 
      icon: UsersIcon, 
      color: 'blue',
      subtitle: 'All time leads' 
    },
    { 
      title: 'New Leads', 
      value: stats?.new || 0, 
      icon: ClockIcon, 
      color: 'green',
      subtitle: 'This month' 
    },
    { 
      title: 'Won Leads', 
      value: stats?.won || 0, 
      icon: TrophyIcon, 
      color: 'yellow',
      subtitle: 'Successfully converted' 
    },
    { 
      title: 'Lost Leads', 
      value: stats?.lost || 0, 
      icon: XMarkIcon, 
      color: 'red',
      subtitle: 'Lost opportunities' 
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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
            <LineChartComponent
              data={[
                { month: 'Jan', leads: 12 },
                { month: 'Feb', leads: 19 },
                { month: 'Mar', leads: 15 },
                { month: 'Apr', leads: 25 },
                { month: 'May', leads: 22 },
                { month: 'Jun', leads: 30 },
              ]}
              dataKey="leads"
              xAxisKey="month"
              title="Monthly Lead Growth"
              color="#3B82F6"
            />
          </div>
          <div>
            <RecentActivities 
              activities={activities} 
              loading={loading} 
              limit={5} 
            />
          </div>
        </div>

        {/* Status Distribution and Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChartComponent
            data={chartData}
            title="Lead Status Distribution"
          />
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 font-medium">Total Members</p>
                <p className="text-2xl font-bold text-blue-900">{users.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 font-medium">Conversion Rate</p>
                <p className="text-2xl font-bold text-green-900">
                  {stats?.total > 0 ? Math.round((stats?.won / stats?.total) * 100) : 0}%
                </p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-sm text-yellow-600 font-medium">Active Leads</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {(stats?.total || 0) - (stats?.won || 0) - (stats?.lost || 0)}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-600 font-medium">Qualified Leads</p>
                <p className="text-2xl font-bold text-purple-900">{stats?.qualified || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
            <span className="text-sm text-gray-500">Total: {users.length}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">
                    {user.full_name?.charAt(0) || user.username.charAt(0)}
                  </span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {user.full_name || user.username}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
                <span className={`badge ${user.role === 'admin' ? 'badge-purple' : 'badge-blue'}`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;