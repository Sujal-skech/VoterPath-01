import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration for VoterPath (project: voterpath-01)
export const firebaseConfig = {
  projectId: "voterpath-01",
  appId: "1:560400190590:web:b7ee95be90f8690d159c2f",
  storageBucket: "voterpath-01.firebasestorage.app",
  apiKey: "AIzaSyBpThMzwtgNIMq_RO_6cm4-xeFCY_fvvaM",
  authDomain: "voterpath-01.firebaseapp.com",
  messagingSenderId: "560400190590",
  measurementId: "G-DCMGQDJQZP"
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
let auth: Auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  try {
    // Dynamic require for React Native persistence with AsyncStorage
    const rnAuth = require('@firebase/auth/dist/rn/index.js');
    if (rnAuth && rnAuth.getReactNativePersistence) {
      auth = initializeAuth(app, {
        persistence: rnAuth.getReactNativePersistence(AsyncStorage)
      });
    } else {
      auth = getAuth(app);
    }
  } catch {
    auth = getAuth(app);
  }
}

// Initialize Firestore & Storage
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage };
