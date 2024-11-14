import { create } from 'zustand';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';
import { 
  branchService, 
  representativeService, 
  territoryService,
  activityService 
} from '../services/firestore';
import type { Branch, Representative, Territory, User, Activity } from '../types';

interface State {
  user: User | null;
  branches: Branch[];
  representatives: Representative[];
  territories: Territory[];
  activePanel: 'map' | 'dashboard' | 'management' | null;
  activeManagementTab: 'branches' | 'representatives' | 'territories';
  loading: {
    auth: boolean;
    branches: boolean;
    representatives: boolean;
    territories: boolean;
  };
  error: string | null;
  
  // Auth actions
  initAuth: () => void;
  setUser: (firebaseUser: FirebaseUser | null) => void;
  
  // Data actions
  setBranches: (branches: Branch[]) => void;
  setRepresentatives: (representatives: Representative[]) => void;
  setTerritories: (territories: Territory[]) => void;
  setActivePanel: (panel: 'map' | 'dashboard' | 'management' | null) => void;
  setActiveManagementTab: (tab: 'branches' | 'representatives' | 'territories') => void;
  setError: (error: string | null) => void;
  
  // Async actions
  fetchBranches: () => Promise<void>;
  fetchRepresentatives: () => Promise<void>;
  fetchTerritories: () => Promise<void>;
  addBranch: (branch: Omit<Branch, 'id'>) => Promise<void>;
  updateBranch: (id: string, branch: Partial<Branch>) => Promise<void>;
  deleteBranch: (id: string) => Promise<void>;
  addRepresentative: (representative: Omit<Representative, 'id'>) => Promise<void>;
  updateRepresentative: (id: string, representative: Partial<Representative>) => Promise<void>;
  deleteRepresentative: (id: string) => Promise<void>;
  addTerritory: (territory: Omit<Territory, 'id'>) => Promise<void>;
  updateTerritory: (id: string, territory: Partial<Territory>) => Promise<void>;
  deleteTerritory: (id: string) => Promise<void>;
}

export const useStore = create<State>((set, get) => ({
  // Initial state
  user: null,
  branches: [],
  representatives: [],
  territories: [],
  activePanel: null,
  activeManagementTab: 'branches',
  loading: {
    auth: true,
    branches: false,
    representatives: false,
    territories: false,
  },
  error: null,

  // Auth actions
  initAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        set({
          user: {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            role: 'admin',
          },
          loading: { ...get().loading, auth: false },
        });
        
        // Fetch initial data
        get().fetchBranches();
        get().fetchRepresentatives();
        get().fetchTerritories();
      } else {
        set({
          user: null,
          loading: { ...get().loading, auth: false },
        });
      }
    });

    return () => unsubscribe();
  },

  setUser: (firebaseUser) => {
    if (firebaseUser) {
      set({
        user: {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          role: 'admin',
        },
      });
    } else {
      set({ user: null });
    }
  },

  // Data actions
  setBranches: (branches) => set({ branches }),
  setRepresentatives: (representatives) => set({ representatives }),
  setTerritories: (territories) => set({ territories }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  setActiveManagementTab: (tab) => set({ activeManagementTab: tab }),
  setError: (error) => set({ error }),

  // Async actions
  fetchBranches: async () => {
    set((state) => ({ loading: { ...state.loading, branches: true }, error: null }));
    try {
      const branches = await branchService.getAll();
      set({ branches });
    } catch (error) {
      console.error('Error fetching branches:', error);
      set({ error: 'Failed to fetch branches' });
    } finally {
      set((state) => ({ loading: { ...state.loading, branches: false } }));
    }
  },

  fetchRepresentatives: async () => {
    set((state) => ({ loading: { ...state.loading, representatives: true }, error: null }));
    try {
      const representatives = await representativeService.getAll();
      set({ representatives });
    } catch (error) {
      console.error('Error fetching representatives:', error);
      set({ error: 'Failed to fetch representatives' });
    } finally {
      set((state) => ({ loading: { ...state.loading, representatives: false } }));
    }
  },

  fetchTerritories: async () => {
    set((state) => ({ loading: { ...state.loading, territories: true }, error: null }));
    try {
      const territories = await territoryService.getAll();
      set({ territories });
    } catch (error) {
      console.error('Error fetching territories:', error);
      set({ error: 'Failed to fetch territories' });
    } finally {
      set((state) => ({ loading: { ...state.loading, territories: false } }));
    }
  },

  addBranch: async (branch) => {
    try {
      const id = await branchService.add(branch);
      const newBranch = { ...branch, id };
      set((state) => ({ branches: [...state.branches, newBranch] }));
      
      await activityService.add({
        type: 'create',
        entityType: 'branch',
        entityId: id,
        entityName: branch.name,
        userId: get().user?.id || '',
        userEmail: get().user?.email || '',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error adding branch:', error);
      set({ error: 'Failed to add branch' });
    }
  },

  updateBranch: async (id, branch) => {
    try {
      await branchService.update(id, branch);
      set((state) => ({
        branches: state.branches.map((b) => (b.id === id ? { ...b, ...branch } : b)),
      }));
      
      await activityService.add({
        type: 'update',
        entityType: 'branch',
        entityId: id,
        entityName: branch.name || get().branches.find((b) => b.id === id)?.name || '',
        userId: get().user?.id || '',
        userEmail: get().user?.email || '',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error updating branch:', error);
      set({ error: 'Failed to update branch' });
    }
  },

  deleteBranch: async (id) => {
    const branchToDelete = get().branches.find((b) => b.id === id);
    try {
      await branchService.delete(id);
      set((state) => ({
        branches: state.branches.filter((b) => b.id !== id),
      }));
      
      await activityService.add({
        type: 'delete',
        entityType: 'branch',
        entityId: id,
        entityName: branchToDelete?.name || '',
        userId: get().user?.id || '',
        userEmail: get().user?.email || '',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error deleting branch:', error);
      set({ error: 'Failed to delete branch' });
    }
  },

  addRepresentative: async (representative) => {
    try {
      const id = await representativeService.add(representative);
      const newRepresentative = { ...representative, id };
      set((state) => ({
        representatives: [...state.representatives, newRepresentative],
      }));
      
      await activityService.add({
        type: 'create',
        entityType: 'representative',
        entityId: id,
        entityName: representative.name,
        userId: get().user?.id || '',
        userEmail: get().user?.email || '',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error adding representative:', error);
      set({ error: 'Failed to add representative' });
    }
  },

  updateRepresentative: async (id, representative) => {
    try {
      await representativeService.update(id, representative);
      set((state) => ({
        representatives: state.representatives.map((r) =>
          r.id === id ? { ...r, ...representative } : r
        ),
      }));
      
      await activityService.add({
        type: 'update',
        entityType: 'representative',
        entityId: id,
        entityName:
          representative.name ||
          get().representatives.find((r) => r.id === id)?.name ||
          '',
        userId: get().user?.id || '',
        userEmail: get().user?.email || '',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error updating representative:', error);
      set({ error: 'Failed to update representative' });
    }
  },

  deleteRepresentative: async (id) => {
    const repToDelete = get().representatives.find((r) => r.id === id);
    try {
      await representativeService.delete(id);
      set((state) => ({
        representatives: state.representatives.filter((r) => r.id !== id),
      }));
      
      await activityService.add({
        type: 'delete',
        entityType: 'representative',
        entityId: id,
        entityName: repToDelete?.name || '',
        userId: get().user?.id || '',
        userEmail: get().user?.email || '',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error deleting representative:', error);
      set({ error: 'Failed to delete representative' });
    }
  },

  addTerritory: async (territory) => {
    try {
      const id = await territoryService.add(territory);
      const newTerritory = { ...territory, id };
      set((state) => ({
        territories: [...state.territories, newTerritory],
      }));
      
      await activityService.add({
        type: 'create',
        entityType: 'territory',
        entityId: id,
        entityName: territory.name,
        userId: get().user?.id || '',
        userEmail: get().user?.email || '',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error adding territory:', error);
      set({ error: 'Failed to add territory' });
    }
  },

  updateTerritory: async (id, territory) => {
    try {
      await territoryService.update(id, territory);
      set((state) => ({
        territories: state.territories.map((t) =>
          t.id === id ? { ...t, ...territory } : t
        ),
      }));
      
      await activityService.add({
        type: 'update',
        entityType: 'territory',
        entityId: id,
        entityName:
          territory.name || get().territories.find((t) => t.id === id)?.name || '',
        userId: get().user?.id || '',
        userEmail: get().user?.email || '',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error updating territory:', error);
      set({ error: 'Failed to update territory' });
    }
  },

  deleteTerritory: async (id) => {
    const territoryToDelete = get().territories.find((t) => t.id === id);
    try {
      await territoryService.delete(id);
      set((state) => ({
        territories: state.territories.filter((t) => t.id !== id),
      }));
      
      await activityService.add({
        type: 'delete',
        entityType: 'territory',
        entityId: id,
        entityName: territoryToDelete?.name || '',
        userId: get().user?.id || '',
        userEmail: get().user?.email || '',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error deleting territory:', error);
      set({ error: 'Failed to delete territory' });
    }
  },
}));