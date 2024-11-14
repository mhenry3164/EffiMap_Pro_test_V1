import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDwWtipHZYlNIzfHRrAq-7sM8Aniju7beA",
  authDomain: "hmi-territory-mapping-tool.firebaseapp.com",
  projectId: "hmi-territory-mapping-tool",
  storageBucket: "hmi-territory-mapping-tool.firebasestorage.app",
  messagingSenderId: "111564690259",
  appId: "1:111564690259:web:40235bd7ad81dfee7687a6",
  measurementId: "G-LQKV8KH8XK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support persistence.');
  }
});