import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBWikS2vh58aRAyWsY-5B4sbPzKwYQmQ28",
  authDomain: "fire-fit-d3ca4.firebaseapp.com",
  projectId: "fire-fit-d3ca4",
  storageBucket: "fire-fit-d3ca4.firebasestorage.app",
  messagingSenderId: "455281062389",
  appId: "1:455281062389:web:4b55e4f4976e4edba7f0bc",
  measurementId: "G-4FZXNZRTZN"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
