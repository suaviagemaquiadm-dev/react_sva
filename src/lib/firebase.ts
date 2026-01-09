import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDeuJpnYDOb0OwT30G7MTv-vGtrkeKO2ZM",
  authDomain: "projeto-novo-612255.firebaseapp.com",
  projectId: "projeto-novo-612255",
  storageBucket: "projeto-novo-612255.firebasestorage.app",
  messagingSenderId: "745357435584",
  appId: "1:745357435584:web:d728d849865600a7b78325",
  measurementId: "G-74930LH88L"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
