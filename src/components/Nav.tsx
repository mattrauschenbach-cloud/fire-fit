import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { signOut } from 'firebase/auth'

export default function Nav() {
  const nav = useNavigate()
  async function logout() {
    await signOut(auth)
    nav('/')
  }
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow">
      <Link to="/" className="font-bold text-xl">🔥 Fire Fit</Link>
      <div className="space-x-3">
        <Link className="px-3 py-1 rounded-xl bg-slate-100" to="/dashboard">Dashboard</Link>
        <Link className="px-3 py-1 rounded-xl bg-slate-100" to="/weekly">Weekly</Link>
        <Link className="px-3 py-1 rounded-xl bg-slate-100" to="/standards">Standards</Link>
        <Link className="px-3 py-1 rounded-xl bg-slate-100" to="/logbook">Logbook</Link>
        <button onClick={logout} className="px-3 py-1 rounded-xl bg-black text-white">Logout</button>
      </div>
    </nav>
  )
}
