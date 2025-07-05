
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface UserData {
  uid?: string;
  name: string;
  email: string;
  totalCalls:number;
  points: number;
  authKey: string;
  authId: string;
  packType: 'none' | 'mini' | 'pro' | 'promax';
  status: 'normal' | 'blocked';
  lastUpdateAttempt: number;
  updateAttempts: number;
  lastPayment?: {
    paymentId: string;
    amount: number;
    timestamp: string;
    plan: string;
  };
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  regenerateAuthKey: () => Promise<void>;
  updateUserEmail: (newEmail: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const generateUniqueAuthKey = async (): Promise<string> => {
  let authKey: string;
  let isUnique = false;
  
  while (!isUnique) {
    authKey = 'pk_' + Array.from(crypto.getRandomValues(new Uint8Array(24)), b => b.toString(16).padStart(2, '0')).join('');
    
    // Check if this auth key already exists
    const q = query(collection(db, 'users'), where('authKey', '==', authKey));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      isUnique = true;
      return authKey;
    }
  }
  
  throw new Error('Failed to generate unique auth key');
};

const generateUniqueAuthId = async (): Promise<string> => {
  let authId: string;
  let isUnique = false;
  
  while (!isUnique) {
    authId = 'auth_' + Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join('');
    
    // Check if this auth ID already exists
    const q = query(collection(db, 'users'), where('authId', '==', authId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      isUnique = true;
      return authId;
    }
  }
  
  throw new Error('Failed to generate unique auth ID');
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as UserData;
          setUserData({ ...data, uid: user.uid });
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const authKey = await generateUniqueAuthKey();
    const authId = await generateUniqueAuthId();
    
    const newUserData: UserData = {
      uid: userCredential.user.uid,
      name,
      email,
      totalCalls: 0,
      points: 20,
      authKey,
      authId,
      packType: 'none',
      status: 'normal',
      lastUpdateAttempt: 0,
      updateAttempts: 0
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), newUserData);
    setUserData(newUserData);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserData = async (data: Partial<UserData>) => {
    if (!user || !userData) return;
    
    // Check if user is blocked
    if (userData.status === 'blocked') {
      throw new Error('Account is blocked due to excessive update attempts');
    }
    
    // Rate limiting check
    const now = Date.now();
    const timeSinceLastUpdate = now - (userData.lastUpdateAttempt || 0);
    const resetTime = 60000; // 1 minute
    
    let newUpdateAttempts = userData.updateAttempts || 0;
    
    if (timeSinceLastUpdate < resetTime) {
      newUpdateAttempts += 1;
      if (newUpdateAttempts > 10) {
        // Block the user
        const blockedData = { 
          ...userData, 
          ...data, 
          status: 'blocked' as const,
          lastUpdateAttempt: now,
          updateAttempts: newUpdateAttempts
        };
        await setDoc(doc(db, 'users', user.uid), blockedData, { merge: true });
        setUserData(blockedData);
        throw new Error('Account blocked due to excessive update attempts');
      }
    } else {
      newUpdateAttempts = 1;
    }
    
    const updatedData = { 
      ...userData, 
      ...data, 
      lastUpdateAttempt: now,
      updateAttempts: newUpdateAttempts
    };
    await setDoc(doc(db, 'users', user.uid), updatedData, { merge: true });
    setUserData(updatedData);
  };

  const regenerateAuthKey = async () => {
    if (!user || !userData) return;
    
    const newAuthKey = await generateUniqueAuthKey();
    const updatedData = { ...userData, authKey: newAuthKey };
    await setDoc(doc(db, 'users', user.uid), updatedData, { merge: true });
    setUserData(updatedData);
  };

  const updateUserEmail = async (newEmail: string, password: string) => {
    if (!user || !userData) return;
    
    // Re-authenticate user before email change
    await signInWithEmailAndPassword(auth, userData.email, password);
    
    // Update email in Firebase Auth
    await updateEmail(user, newEmail);
    
    // Update email in Firestore
    const updatedData = { ...userData, email: newEmail };
    await setDoc(doc(db, 'users', user.uid), updatedData, { merge: true });
    setUserData(updatedData);
  };

  const value = {
    user,
    userData,
    loading,
    login,
    register,
    logout,
    updateUserData,
    regenerateAuthKey,
    updateUserEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
