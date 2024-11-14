import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store';
import type { Representative } from '../types';

interface Props {
  onClose: () => void;
  representative?: Representative;
}

export default function RepresentativeForm({ onClose, representative }: Props) {
  const {
    branches,
    loading,
    fetchBranches,
    addRepresentative,
    updateRepresentative,
  } = useStore();

  const [formData, setFormData] = useState({
    name: representative?.name || '',
    email: representative?.email || '',
    phone: representative?.phone || '',
    branchId: representative?.branchId || '',
    latitude: representative?.coordinates ? representative.coordinates[0] : '',
    longitude: representative?.coordinates ? representative.coordinates[1] : '',
  });

  useEffect(() => {
    if (branches.length === 0) {
      fetchBranches().catch((e) => console.error('Error fetching branches:', e));
    }
  }, [branches.length, fetchBranches]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.branchId ||
      formData.latitude === '' ||
      formData.longitude === ''
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const repData: Omit<Representative, 'id'> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      branchId: formData.branchId,
      coordinates: [parseFloat(formData.latitude), parseFloat(formData.longitude)],
      createdAt: representative?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (representative) {
      updateRepresentative(representative.id, repData);
    } else {
      addRepresentative(repData);
    }
    onClose();
  };

  if (loading.branches) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg">
          <p>Loading branches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {representative ? 'Edit Representative' : 'Add Representative'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assigned Branch
            </label>
            <select
              required
              value={formData.branchId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, branchId: e.target.value }))
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              required
              value={formData.latitude}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, latitude: e.target.value }))
              }
              step="any"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="number"
              required
              value={formData.longitude}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, longitude: e.target.value }))
              }
              step="any"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

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
              {representative ? 'Update' : 'Add'} Representative
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}