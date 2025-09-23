import { useEffect, useState, useContext, createContext } from 'react'
import { auth, provider, db } from './firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        const ref = doc(db, 'profiles', u.uid)
        const snap = await getDoc(ref)
        if (!snap.exists()) {
          const p = { displayName: u.displayName || 'Firefighter', tier: 'developmental', role: 'mentor', isCommitted: false, shift: 'A', createdAt: Date.now() }
          await setDoc(ref, p)
          setProfile(p)
        } else {
          setProfile(snap.data())
        }
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const signInWithGoogle = async () => { await signInWithPopup(auth, provider) }
  const signOutUser = async () => { await signOut(auth) }

  return (
    <AuthCtx.Provider value={{ user, profile, setProfile, loading, signInWithGoogle, signOutUser }}>
      {children}
    </AuthCtx.Provider>
  )
}
export function useAuthState() { return useContext(AuthCtx) }