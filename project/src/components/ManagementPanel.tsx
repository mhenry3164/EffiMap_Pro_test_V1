// src/components/ManagementPanel.tsx

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { useStore } from '../store';
import BranchForm from './BranchForm';
import RepresentativeForm from './RepresentativeForm';
import TerritoryForm from './TerritoryForm';
import { Branch, Representative, Territory } from '../types';

export default function ManagementPanel() {
  const {
    branches = [],
    representatives = [],
    territories = [],
    loading,
    error,
    fetchBranches,
    fetchRepresentatives,
    fetchTerritories,
    addBranch,
    addRepresentative,
    addTerritory,
    updateBranch,
    updateRepresentative,
    updateTerritory,
    deleteBranch,
    deleteRepresentative,
    deleteTerritory,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'branches' | 'representatives' | 'territories'>('branches');
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [showRepForm, setShowRepForm] = useState(false);
  const [showTerritoryForm, setShowTerritoryForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Branch | Representative | Territory | null>(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchBranches(), fetchRepresentatives(), fetchTerritories()]);
    };

    fetchData();
  }, [fetchBranches, fetchRepresentatives, fetchTerritories]);

  const handleDeleteBranch = async (id: string) => {
    try {
      await deleteBranch(id);
    } catch (error) {
      console.error('Failed to delete branch:', error);
    }
  };

  const handleDeleteRepresentative = async (id: string) => {
    try {
      await deleteRepresentative(id);
    } catch (error) {
      console.error('Failed to delete representative:', error);
    }
  };

  const handleDeleteTerritory = async (id: string) => {
    try {
      await deleteTerritory(id);
    } catch (error) {
      console.error('Failed to delete territory:', error);
    }
  };

  if (loading.branches || loading.representatives || loading.territories) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error.message || error.toString()}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl">
      <div className="border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('branches')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'branches'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Branches
          </button>
          <button
            onClick={() => setActiveTab('representatives')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'representatives'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Representatives
          </button>
          <button
            onClick={() => setActiveTab('territories')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'territories'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Territories
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold capitalize">{activeTab}</h2>
          {activeTab === 'branches' && (
            <button
              onClick={() => setShowBranchForm(true)}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Branch</span>
            </button>
          )}
          {activeTab === 'representatives' && (
            <button
              onClick={() => setShowRepForm(true)}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Representative</span>
            </button>
          )}
          {activeTab === 'territories' && (
            <button
              onClick={() => setShowTerritoryForm(true)}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Territory</span>
            </button>
          )}
        </div>

        <div className="space-y-2">
          {activeTab === 'branches' &&
            (branches.length === 0 ? (
              <p>No branches available. Add a new branch.</p>
            ) : (
              branches.map((branch) => (
                <div
                  key={branch.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {typeof branch.name === 'string' ? branch.name : 'Unnamed Branch'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {typeof branch.address === 'string' ? branch.address : 'No address'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingItem(branch)}
                      className="p-2 hover:bg-gray-200 rounded-full"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteBranch(branch.id)}
                      className="p-2 hover:bg-red-100 rounded-full text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ))}

          {activeTab === 'representatives' &&
            (representatives.length === 0 ? (
              <p>No representatives available. Add a new representative.</p>
            ) : (
              representatives.map((rep) => {
                const branch = branches.find((b) => b.id === rep.branchId);
                return (
                  <div
                    key={rep.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {typeof rep.name === 'string' ? rep.name : 'Unnamed Representative'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {typeof rep.email === 'string' ? rep.email : 'No email'}
                      </p>
                      <p className="text-sm text-gray-600">
                        Branch: {typeof branch?.name === 'string' ? branch.name : 'Unassigned'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingItem(rep)}
                        className="p-2 hover:bg-gray-200 rounded-full"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteRepresentative(rep.id)}
                        className="p-2 hover:bg-red-100 rounded-full text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            ))}

          {activeTab === 'territories' &&
            (territories.length === 0 ? (
              <p>No territories available. Add a new territory.</p>
            ) : (
              territories.map((territory) => (
                <div
                  key={territory.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{territory.name || 'Unnamed Territory'}</p>
                    <p className="text-sm text-gray-600">
                      Type: {territory.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      Assigned to: {getAssignedName(territory)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingItem(territory)}
                      className="p-2 hover:bg-gray-200 rounded-full"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteTerritory(territory.id)}
                      className="p-2 hover:bg-red-100 rounded-full text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ))}
        </div>
      </div>

      {/* Branch Form Modal */}
      {showBranchForm && (
        <BranchForm
          branch={null}
          onClose={() => setShowBranchForm(false)}
        />
      )}

      {/* Representative Form Modal */}
      {showRepForm && (
        <RepresentativeForm
          representative={null}
          onClose={() => setShowRepForm(false)}
        />
      )}

      {/* Territory Form Modal */}
      {showTerritoryForm && (
        <TerritoryForm
          coordinates={[]}
          onClose={() => setShowTerritoryForm(false)}
          onSave={(territoryData) => {
            addTerritory(territoryData).then(() => {
              setShowTerritoryForm(false);
            });
          }}
        />
      )}

      {/* Editing Modals */}
      {editingItem && activeTab === 'branches' && (
        <BranchForm
          branch={editingItem as Branch}
          onClose={() => setEditingItem(null)}
        />
      )}
      {editingItem && activeTab === 'representatives' && (
        <RepresentativeForm
          representative={editingItem as Representative}
          onClose={() => setEditingItem(null)}
        />
      )}
      {editingItem && activeTab === 'territories' && (
        <TerritoryForm
          coordinates={(editingItem as Territory).coordinates}
          onClose={() => setEditingItem(null)}
          onSave={(territoryData) => {
            updateTerritory(editingItem!.id, territoryData).then(() => {
              setEditingItem(null);
            });
          }}
          territory={editingItem as Territory}
        />
      )}
    </div>
  );
}

// Helper function to get assigned name
function getAssignedName(territory: Territory) {
  const { branches, representatives } = useStore.getState();
  if (territory.type === 'branch') {
    const branch = branches.find((b) => b.id === territory.branchId);
    return branch ? branch.name : 'Unknown Branch';
  } else if (territory.type === 'representative') {
    const rep = representatives.find((r) => r.id === territory.representativeId);
    return rep ? rep.name : 'Unknown Representative';
  }
  return 'Unassigned';
}
