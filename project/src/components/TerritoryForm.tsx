import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Branch, Representative, Territory } from '../types';
import { X, MapPin } from 'lucide-react';
import TerritoryDrawer from './TerritoryDrawer';

interface TerritoryFormProps {
  coordinates: Array<[number, number]>;
  onClose: () => void;
  onSave: (territoryData: Omit<Territory, 'id'>) => void;
  territory?: Territory | null;
}

export default function TerritoryForm({
  coordinates,
  onClose,
  onSave,
  territory = null,
}: TerritoryFormProps) {
  const { branches, representatives } = useStore();
  const [formData, setFormData] = useState<Omit<Territory, 'id'>>({
    name: territory?.name || '',
    type: territory?.type || 'branch',
    coordinates: coordinates,
    color: territory?.color || '#3B82F6',
    branchId: territory?.branchId || '',
    representativeId: territory?.representativeId || '',
    parentId: territory?.parentId || '',
  });

  const [showDrawer, setShowDrawer] = useState(false);
  const [filteredRepresentatives, setFilteredRepresentatives] = useState<Representative[]>([]);

  useEffect(() => {
    if (formData.branchId) {
      setFilteredRepresentatives(
        representatives.filter((rep) => rep.branchId === formData.branchId)
      );
    } else {
      setFilteredRepresentatives([]);
    }
  }, [formData.branchId, representatives]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert('Please provide a name for the territory.');
      return;
    }
    if (formData.type === 'branch' && !formData.branchId) {
      alert('Please select a branch.');
      return;
    }
    if (formData.type === 'representative' && !formData.representativeId) {
      alert('Please select a representative.');
      return;
    }
    if (formData.coordinates.length === 0) {
      alert('Please draw the territory boundaries on the map.');
      return;
    }

    onSave(formData);
  };

  const handleCoordinatesSelected = (newCoordinates: Array<[number, number]>) => {
    setFormData((prev) => ({ ...prev, coordinates: newCoordinates }));
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {territory ? 'Edit Territory' : 'New Territory'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Territory Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Territory Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter territory name"
              />
            </div>

            {/* Territory Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Territory Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: e.target.value as 'branch' | 'representative',
                    branchId: '',
                    representativeId: '',
                    parentId: '',
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="branch">Branch Territory</option>
                <option value="representative">Representative Territory</option>
              </select>
            </div>

            {/* Branch Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assign to Branch
              </label>
              <select
                value={formData.branchId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    branchId: e.target.value,
                    representativeId: '',
                  }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select a branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Representative Selection */}
            {formData.type === 'representative' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assign to Representative
                </label>
                <select
                  value={formData.representativeId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      representativeId: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={!formData.branchId}
                >
                  <option value="">
                    {formData.branchId
                      ? 'Select a representative'
                      : 'Select a branch first'}
                  </option>
                  {filteredRepresentatives.map((rep) => (
                    <option key={rep.id} value={rep.id}>
                      {rep.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Territory Color
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="h-8 w-8 rounded border border-gray-300"
                />
                <span className="text-sm text-gray-500">
                  Choose territory color
                </span>
              </div>
            </div>

            {/* Territory Drawing Button */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Territory Boundaries
              </label>
              <button
                type="button"
                onClick={() => setShowDrawer(true)}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                {formData.coordinates.length > 0 ? 'Edit Territory Shape' : 'Draw Territory Shape'}
              </button>
              {formData.coordinates.length > 0 && (
                <p className="mt-1 text-sm text-gray-500">
                  {formData.coordinates.length} points defined
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                {territory ? 'Update' : 'Create'} Territory
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Territory Drawing Modal */}
      {showDrawer && (
        <TerritoryDrawer
          onClose={() => setShowDrawer(false)}
          onCoordinatesSelected={handleCoordinatesSelected}
        />
      )}
    </>
  );
}