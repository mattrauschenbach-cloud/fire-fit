import { useEffect,useState,useContext,createContext } from 'react'
import { auth, provider, db } from './firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
const AuthCtx=createContext(null)
export function AuthProvider({children}){
  const[user,setUser]=useState(null);const[profile,setProfile]=useState(null);const[loading,setLoading]=useState(true)
  useEffect(()=>{const unsubAuth=onAuthStateChanged(auth,async(u)=>{setUser(u);if(!u){setProfile(null);setLoading(false);return}
    const ref=doc(db,'profiles',u.uid);const snap=await getDoc(ref);if(!snap.exists()){await setDoc(ref,{displayName:u.displayName||'Firefighter',tier:'developmental',role:'mentor',isCommitted:false,shift:'A',createdAt:Date.now()})}
    const unsubProf=onSnapshot(ref,(d)=>setProfile(d.data()));setLoading(false);return()=>unsubProf&&unsubProf()});return()=>unsubAuth()},[])
  const signInWithGoogle=async()=>{await signInWithPopup(auth,provider)};const signOutUser=async()=>{await signOut(auth)}
  return <AuthCtx.Provider value={{user,profile,setProfile,loading,signInWithGoogle,signOutUser}}>{children}</AuthCtx.Provider>
}
export function useAuthState(){return useContext(AuthCtx)}