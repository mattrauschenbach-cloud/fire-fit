import { Link, NavLink } from 'react-router-dom'
import { useAuthState } from '../lib/auth'

export default function NavBar() {
  const { user, signOutUser } = useAuthState()
  return (
    <header className="bg-white border-b">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold tracking-tight text-lg">🔥 Fire Fit</Link>
        <div className="flex items-center gap-4">
          <NavLink to="/" className="hover:underline">Home</NavLink>
          <NavLink to="/weekly" className="hover:underline">Weekly</NavLink>
          <NavLink to="/dashboard" className="hover:underline">Dashboard</NavLink>
          {user ? (
            <button onClick={signOutUser} className="px-3 py-1 rounded bg-slate-900 text-white">
              Sign out
            </button>
          ) : (
            <NavLink to="/login" className="px-3 py-1 rounded bg-slate-900 text-white">Login</NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}