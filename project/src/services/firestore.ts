import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  serverTimestamp,
  GeoPoint,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Branch, Representative, Territory, Activity } from '../types';

// Improved type safety for coordinates
type Coordinates = [number, number];

// Helper function to convert Firestore timestamp to Date with type guard
const convertTimestamp = (timestamp: unknown): Date => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return new Date();
};

// Helper function to convert coordinates for Firestore with type safety
const formatCoordinatesForFirestore = (coordinates: Coordinates): GeoPoint => {
  return new GeoPoint(coordinates[0], coordinates[1]);
};

// Helper function to convert coordinates from Firestore with type guard
const formatCoordinatesFromFirestore = (geoPoint: unknown): Coordinates => {
  if (geoPoint instanceof GeoPoint) {
    return [geoPoint.latitude, geoPoint.longitude];
  }
  if (typeof geoPoint === 'object' && geoPoint !== null) {
    const point = geoPoint as { latitude?: number; longitude?: number };
    if (typeof point.latitude === 'number' && typeof point.longitude === 'number') {
      return [point.latitude, point.longitude];
    }
  }
  return [0, 0];
};

// Helper to safely handle array of coordinates
const formatCoordinatesArrayFromFirestore = (coordinates: unknown): Coordinates[] => {
  if (!Array.isArray(coordinates)) {
    return [];
  }
  return coordinates.map(coord => formatCoordinatesFromFirestore(coord));
};

// Representative operations
export const representativeService = {
  getAll: async (): Promise<Representative[]> => {
    try {
      const representativesRef = collection(db, 'representatives');
      const querySnapshot = await getDocs(representativesRef);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          branchId: data.branchId || '',
          coordinates: formatCoordinatesFromFirestore(data.coordinates),
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: convertTimestamp(data.updatedAt),
        };
      });
    } catch (error) {
      console.error('Error fetching representatives:', error);
      throw error;
    }
  },

  add: async (data: Omit<Representative, 'id'>): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, 'representatives'), {
        ...data,
        coordinates: formatCoordinatesForFirestore(data.coordinates),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding representative:', error);
      throw error;
    }
  },

  update: async (id: string, data: Partial<Representative>): Promise<void> => {
    try {
      const updateData: Partial<DocumentData> = {
        ...data,
        updatedAt: serverTimestamp(),
      };
      
      if (data.coordinates) {
        updateData.coordinates = formatCoordinatesForFirestore(data.coordinates);
      }
      
      await updateDoc(doc(db, 'representatives', id), updateData);
    } catch (error) {
      console.error('Error updating representative:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    const batch = writeBatch(db);
    try {
      // Delete the representative
      const repRef = doc(db, 'representatives', id);
      batch.delete(repRef);

      // Update territories that reference this representative
      const territoriesSnapshot = await getDocs(
        query(collection(db, 'territories'), where('representativeId', '==', id))
      );
      territoriesSnapshot.docs.forEach(doc => {
        batch.update(doc.ref, { representativeId: '' });
      });

      await batch.commit();
    } catch (error) {
      console.error('Error deleting representative:', error);
      throw error;
    }
  },
};

// Branch operations
export const branchService = {
  getAll: async (): Promise<Branch[]> => {
    try {
      const branchesRef = collection(db, 'branches');
      const querySnapshot = await getDocs(branchesRef);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          address: data.address || '',
          contact: data.contact || '',
          coordinates: formatCoordinatesFromFirestore(data.coordinates),
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: convertTimestamp(data.updatedAt),
        };
      });
    } catch (error) {
      console.error('Error fetching branches:', error);
      throw error;
    }
  },

  add: async (data: Omit<Branch, 'id'>): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, 'branches'), {
        ...data,
        coordinates: formatCoordinatesForFirestore(data.coordinates),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding branch:', error);
      throw error;
    }
  },

  update: async (id: string, data: Partial<Branch>): Promise<void> => {
    try {
      const updateData: Partial<DocumentData> = {
        ...data,
        updatedAt: serverTimestamp(),
      };
      
      if (data.coordinates) {
        updateData.coordinates = formatCoordinatesForFirestore(data.coordinates);
      }
      
      await updateDoc(doc(db, 'branches', id), updateData);
    } catch (error) {
      console.error('Error updating branch:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    const batch = writeBatch(db);
    try {
      // Delete the branch
      const branchRef = doc(db, 'branches', id);
      batch.delete(branchRef);

      // Delete associated territories
      const territoriesSnapshot = await getDocs(
        query(collection(db, 'territories'), where('branchId', '==', id))
      );
      territoriesSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      // Delete associated representatives
      const representativesSnapshot = await getDocs(
        query(collection(db, 'representatives'), where('branchId', '==', id))
      );
      representativesSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.error('Error deleting branch:', error);
      throw error;
    }
  },
};

// Territory operations with improved coordinates handling
export const territoryService = {
  getAll: async (): Promise<Territory[]> => {
    try {
      const territoriesRef = collection(db, 'territories');
      const querySnapshot = await getDocs(territoriesRef);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          type: data.type || 'branch',
          coordinates: formatCoordinatesArrayFromFirestore(data.coordinates),
          color: data.color || '#3B82F6',
          branchId: data.branchId || '',
          representativeId: data.representativeId || '',
          parentId: data.parentId || '',
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: convertTimestamp(data.updatedAt),
        };
      });
    } catch (error) {
      console.error('Error fetching territories:', error);
      throw error;
    }
  },

  add: async (data: Omit<Territory, 'id'>): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, 'territories'), {
        ...data,
        coordinates: data.coordinates.map(coord => formatCoordinatesForFirestore(coord)),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding territory:', error);
      throw error;
    }
  },

  update: async (id: string, data: Partial<Territory>): Promise<void> => {
    try {
      const updateData: Partial<DocumentData> = {
        ...data,
        updatedAt: serverTimestamp(),
      };
      
      if (Array.isArray(data.coordinates)) {
        updateData.coordinates = data.coordinates.map(coord => 
          formatCoordinatesForFirestore(coord)
        );
      }
      
      await updateDoc(doc(db, 'territories', id), updateData);
    } catch (error) {
      console.error('Error updating territory:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, 'territories', id));
    } catch (error) {
      console.error('Error deleting territory:', error);
      throw error;
    }
  },
};

// Activity logging
export const activityService = {
  add: async (activity: Omit<Activity, 'id' | 'timestamp'>): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, 'activities'), {
        ...activity,
        timestamp: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error logging activity:', error);
      throw error;
    }
  },

  getRecent: async (limit: number = 10): Promise<Activity[]> => {
    try {
      const q = query(
        collection(db, 'activities'),
        orderBy('timestamp', 'desc'),
        limit(limit)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: convertTimestamp(doc.data().timestamp),
      })) as Activity[];
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      throw error;
    }
  },
};