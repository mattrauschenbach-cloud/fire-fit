import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig={
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBWikS2vh58aRAyWsY-5B4sbPzKwYQmQ28",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fire-fit-d3ca4.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fire-fit-d3ca4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fire-fit-d3ca4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "455281062389",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:455281062389:web:4b55e4f4976e4edba7f0bc",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-4FZXNZRTZN"
}
const app=initializeApp(firebaseConfig);export const auth=getAuth(app);export const provider=new GoogleAuthProvider();export const db=getFirestore(app)
