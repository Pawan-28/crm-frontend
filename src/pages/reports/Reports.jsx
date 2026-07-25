import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { BarChartComponent, PieChartComponent, LineChartComponent } from '../../components/dashboard/Charts';

const Reports = () => {
  const [reportType, setReportType] = useState('leads');

  const leadData = [
    { month: 'Jan', leads: 12 },
    { month: 'Feb', leads: 19 },
    { month: 'Mar', leads: 15 },
    { month: 'Apr', leads: 25 },
    { month: 'May', leads: 22 },
    { month: 'Jun', leads: 30 },
    { month: 'Jul', leads: 28 },
    { month: 'Aug', leads: 35 },
    { month: 'Sep', leads: 32 },
    { month: 'Oct', leads: 40 },
    { month: 'Nov', leads: 38 },
    { month: 'Dec', leads: 45 },
  ];

  const statusData = [
    { name: 'New', value: 30 },
    { name: 'Contacted', value: 25 },
    { name: 'Qualified', value: 20 },
    { name: 'Proposal Sent', value: 15 },
    { name: 'Won', value: 10 },
    { name: 'Lost', value: 8 },
  ];

  const sourceData = [
    { name: 'Website', value: 35 },
    { name: 'Facebook', value: 20 },
    { name: 'LinkedIn', value: 18 },
    { name: 'Google', value: 15 },
    { name: 'Referral', value: 12 },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">View detailed analytics and reports</p>
        </div>

        {/* Report Type Tabs */}
        <div className="tabs">
          <button
            className={`tab ${reportType === 'leads' ? 'tab-active' : ''}`}
            onClick={() => setReportType('leads')}
          >
            Leads Report
          </button>
          <button
            className={`tab ${reportType === 'performance' ? 'tab-active' : ''}`}
            onClick={() => setReportType('performance')}
          >
            Performance Report
          </button>
          <button
            className={`tab ${reportType === 'conversion' ? 'tab-active' : ''}`}
            onClick={() => setReportType('conversion')}
          >
            Conversion Report
          </button>
        </div>

        {/* Report Content */}
        {reportType === 'leads' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChartComponent
              data={leadData}
              dataKey="leads"
              xAxisKey="month"
              title="Monthly Lead Trend"
              color="#3B82F6"
            />
            <PieChartComponent
              data={statusData}
              title="Lead Status Distribution"
            />
            <div className="lg:col-span-2">
              <PieChartComponent
                data={sourceData}
                title="Lead Source Distribution"
              />
            </div>
          </div>
        )}

        {reportType === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChartComponent
              data={[
                { name: 'John', leads: 45 },
                { name: 'Jane', leads: 38 },
                { name: 'Mike', leads: 32 },
                { name: 'Sarah', leads: 28 },
                { name: 'David', leads: 22 },
              ]}
              dataKey="leads"
              xAxisKey="name"
              title="Team Performance"
              color="#10B981"
            />
            <LineChartComponent
              data={[
                { month: 'Jan', won: 5, lost: 3 },
                { month: 'Feb', won: 8, lost: 4 },
                { month: 'Mar', won: 6, lost: 2 },
                { month: 'Apr', won: 12, lost: 5 },
                { month: 'May', won: 9, lost: 3 },
                { month: 'Jun', won: 14, lost: 6 },
              ]}
              dataKey="won"
              xAxisKey="month"
              title="Won vs Lost"
              color="#10B981"
            />
          </div>
        )}

        {reportType === 'conversion' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PieChartComponent
              data={[
                { name: 'Converted', value: 35 },
                { name: 'Not Converted', value: 65 },
              ]}
              title="Overall Conversion Rate"
            />
            <BarChartComponent
              data={[
                { source: 'Website', rate: 25 },
                { source: 'Facebook', rate: 18 },
                { source: 'LinkedIn', rate: 30 },
                { source: 'Google', rate: 22 },
                { source: 'Referral', rate: 40 },
              ]}
              dataKey="rate"
              xAxisKey="source"
              title="Conversion Rate by Source"
              color="#8B5CF6"
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Reports;