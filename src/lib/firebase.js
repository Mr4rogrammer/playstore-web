
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD38gjhFwHXXhlV-Yi2Fj42cOWgrjC5SX4",
  authDomain: "playstore-40de3.firebaseapp.com",
  projectId: "playstore-40de3",
  storageBucket: "playstore-40de3.firebasestorage.app",
  messagingSenderId: "1021319794011",
  appId: "1:1021319794011:web:e3ab2dffd2636b98b2de7e",
  measurementId: "G-4JCG2WJ5DF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
