// src/components/MapControls.tsx

import React from 'react';

interface MapControlsProps {
  selectedBranchId: string | null;
  setSelectedBranchId: (id: string | null) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  branches: Array<{ id: string; name: string }>;
  startDrawing: (shape: 'polygon' | 'rectangle') => void;
}

export default function MapControls({
  selectedBranchId,
  setSelectedBranchId,
  isCollapsed,
  setIsCollapsed,
  branches,
  startDrawing,
}: MapControlsProps) {
  return (
    <div
      className={`absolute top-4 left-4 bg-white shadow-lg rounded-lg p-4 transition-all ${
        isCollapsed ? 'w-12' : 'w-64'
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">
          {!isCollapsed && 'Map Controls'}
        </h3>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '>' : '<'}
        </button>
      </div>

      {!isCollapsed && (
        <div className="mt-4 space-y-4">
          {/* Branch Selector */}
          <div>
            <label
              htmlFor="branch-select"
              className="block text-sm font-medium text-gray-700"
            >
              Select Branch
            </label>
            <select
              id="branch-select"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedBranchId || ''}
              onChange={(e) => setSelectedBranchId(e.target.value || null)}
            >
              <option value="">All Branches</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          {/* Drawing Tools */}
          <div>
            <h4 className="text-sm font-medium text-gray-700">Create Territory</h4>
            <div className="flex space-x-2">
              <button
                onClick={() => startDrawing('polygon')}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                <span className="sr-only">Draw Polygon</span>🔷
              </button>
              <button
                onClick={() => startDrawing('rectangle')}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                <span className="sr-only">Draw Rectangle</span>◼️
              </button>
            </div>
          </div>

          {/* Additional Controls */}
          {/* You can add more controls here as needed */}
        </div>
      )}
    </div>
  );
}

