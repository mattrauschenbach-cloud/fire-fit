import { useEffect, useState, useContext, createContext } from 'react'
import { auth, provider, db } from './firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { doc, setDoc, onSnapshot } from 'firebase/firestore'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (!u) { setProfile(null); setLoading(false); return }

      const ref = doc(db, 'profiles', u.uid)

      // Save real identity so Members shows names
      const niceName = u.displayName || (u.email ? u.email.split('@')[0] : 'Firefighter')
      await setDoc(ref, {
        displayName: niceName,
        email: u.email || null,
        photoURL: u.photoURL || null
      }, { merge: true })

      const unsubProf = onSnapshot(ref, (d) => setProfile(d.data()))
      setLoading(false)
      return () => unsubProf && unsubProf()
    })
    return () => unsubAuth()
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
