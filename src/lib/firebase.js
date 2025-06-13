
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbRMvWM8XG8iI9ifs1KwJRaqw_81tw-tY",
  authDomain: "pushnotify-b5ec3.firebaseapp.com",
  projectId: "pushnotify-b5ec3",
  storageBucket: "pushnotify-b5ec3.firebasestorage.app",
  messagingSenderId: "964805221266",
  appId: "1:964805221266:web:3aba6327f0ffc3bfe63f4b",
  measurementId: "G-N4FJS71RRX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
