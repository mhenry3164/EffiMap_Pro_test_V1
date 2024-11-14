import React from 'react';
import { Building2, Users, Map as MapIcon, PieChart } from 'lucide-react';
import { useStore } from '../store';
import SummaryCard from './SummaryCard';
import RecentActivity from './RecentActivity';

export default function Dashboard() {
  const { branches, representatives, territories, setActivePanel, setActiveManagementTab } = useStore();

  const summaryData = [
    {
      title: 'Total Branches',
      value: branches.length,
      icon: <Building2 size={24} />,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Active Representatives',
      value: representatives.length,
      icon: <Users size={24} />,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Mapped Territories',
      value: territories.length,
      icon: <MapIcon size={24} />,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Coverage Rate',
      value: `${calculateCoverageRate(branches.length, territories.length)}%`,
      icon: <PieChart size={24} />,
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  // Function to calculate coverage rate
  function calculateCoverageRate(branchCount: number, territoryCount: number): number {
    if (branchCount === 0 || territoryCount === 0) return 0;
    // Assuming coverage rate is branches per territory, adjust as needed
    return Math.min(100, Math.round((territoryCount / branchCount) * 100));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your territory management dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity />
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setActivePanel('management');
                setActiveManagementTab('branches');
              }}
              className="p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <Building2 className="mb-2 text-blue-600" />
              <h3 className="font-medium">Manage Branches</h3>
              <p className="text-sm text-gray-600">Add or edit branch locations</p>
            </button>
            <button
              onClick={() => {
                setActivePanel('management');
                setActiveManagementTab('representatives');
              }}
              className="p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <Users className="mb-2 text-green-600" />
              <h3 className="font-medium">Manage Representatives</h3>
              <p className="text-sm text-gray-600">Update team assignments</p>
            </button>
            <button
              onClick={() => setActivePanel('map')}
              className="p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <MapIcon className="mb-2 text-purple-600" />
              <h3 className="font-medium">View Map</h3>
              <p className="text-sm text-gray-600">Explore territory mappings</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}