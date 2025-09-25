import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../utils/firebase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e:any) {
      setError(e.message)
    }
  }

  async function google() {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (e:any) {
      setError(e.message)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50">
      <form onSubmit={handleLogin} className="bg-white shadow rounded-2xl p-6 w-full max-w-md space-y-3">
        <h2 className="text-xl font-semibold">Sign in</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input className="w-full border rounded-xl p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded-xl p-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full rounded-xl bg-black text-white py-2">Sign in</button>
        <button type="button" onClick={google} className="w-full rounded-xl bg-slate-800 text-white py-2">Continue with Google</button>
      </form>
    </div>
  )
}
