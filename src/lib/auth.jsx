import { useEffect, useState, useContext, createContext } from 'react'
import { auth, provider } from './firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
  }

  const signOutUser = async () => {
    await signOut(auth)
  }

  return (
    <AuthCtx.Provider value={{ user, loading, signInWithGoogle, signOutUser }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuthState() {
  return useContext(AuthCtx)
}