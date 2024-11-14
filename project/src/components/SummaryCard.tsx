import React from 'react';

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

export default function SummaryCard({ title, value, icon, color }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}