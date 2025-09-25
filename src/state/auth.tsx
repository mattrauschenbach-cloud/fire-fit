import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../utils/firebase'

const AuthCtx = createContext<{user: User|null, loading: boolean}>({user: null, loading: true})

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User|null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => { setUser(u); setLoading(false) })
    return () => unsub()
  }, [])
  return <AuthCtx.Provider value={{user, loading}}>{children}</AuthCtx.Provider>
}

export function useAuthState() {
  return useContext(AuthCtx)
}
