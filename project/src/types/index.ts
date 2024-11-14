// src/types/index.ts

export interface Branch {
  id: string;
  name: string;
  address: string;
  contact: string;
  coordinates: [number, number];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Representative {
  id: string;
  name: string;
  branchId: string;
  email: string;
  phone: string;
  coordinates: [number, number];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Territory {
  id: string;
  name: string;
  type: 'branch' | 'representative';
  coordinates: Array<[number, number]>;
  color: string;
  branchId?: string;
  representativeId?: string;
  parentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'viewer';
}

export interface Activity {
  id: string;
  type: 'create' | 'update' | 'delete';
  entityType: 'branch' | 'representative' | 'territory';
  entityId: string;
  entityName: string;
  userId: string;
  userEmail: string;
  timestamp: Date;
  details?: string;
}