// Rewrite legacy service to align with new data model
import { auth, db } from '../firebase/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut as fbSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';

// --- Auth Services ---
export const observeAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const loginWithEmail = async (email: string, pass: string): Promise<User> => {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  return cred.user;
};

export const registerWithEmail = async (email: string, pass: string): Promise<User> => {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  await setDoc(doc(db, 'users', cred.user.uid), {
    email: cred.user.email,
    createdAt: new Date().toISOString()
  });
  return cred.user;
};

export const loginAsGuest = async (): Promise<User> => {
  const cred = await signInAnonymously(auth);
  return cred.user;
};

export const logoutUser = async (): Promise<void> => {
  await fbSignOut(auth);
};

// --- User Preferences ---
export const saveComplaintToFirestore = async (
  userId: string,
  complaint: { type: string; description: string; state: string; district: string; mediaType?: string }
): Promise<{ success: boolean; id?: string }> => {
  try {
    const id = `complaint-${Date.now()}`;
    const ref = doc(db, 'complaints', id);
    await setDoc(ref, {
      ...complaint,
      userId,
      submittedAt: new Date().toISOString(),
      status: 'Pending'
    });
    return { success: true, id };
  } catch (err: any) {
    console.error('Failed to save complaint:', err);
    return { success: false };
  }
};
