import { useEffect, useState, useContext, createContext } from 'react'
import { auth, provider, db } from './firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'

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

      // 🔹 Save real name/email/photo from Auth into Firestore (so you see names instead of "Firefighter")
      const niceName = u.displayName || (u.email ? u.email.split('@')[0] : 'Firefighter')
      await setDoc(ref, {
        displayName: niceName,
        email: u.email || null,
        photoURL: u.photoURL || null
      }, { merge: true })

      // Live subscription so role/name changes show immediately
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
