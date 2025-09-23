import { Link, NavLink } from 'react-router-dom'
import { useAuthState } from '../lib/auth'

export default function NavBar() {
  const { user, profile, signOutUser } = useAuthState()
  const isMentor = profile?.role === 'mentor'
  return (
    <header className="bg-white border-b">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold tracking-tight text-lg">🚒 Station 1 Fit Garfield Heights</Link>
        <div className="flex items-center gap-4">
          <NavLink to="/" className="hover:underline">Home</NavLink>
          {user && <NavLink to="/weekly" className="hover:underline">Weekly</NavLink>}
          {isMentor && <NavLink to="/weekly-admin" className="hover:underline">Weekly Admin</NavLink>}
          {user && <NavLink to="/monthly" className="hover:underline">Monthly</NavLink>}
          {user && <NavLink to="/dashboard" className="hover:underline">Dashboard</NavLink>}
          {user && <NavLink to="/members" className="hover:underline">Members</NavLink>}
          {user && <NavLink to="/leaderboard" className="hover:underline">Leaderboard</NavLink>}
          {user && <NavLink to="/standards" className="hover:underline">My Standards</NavLink>}
          {isMentor && <NavLink to="/mentor-standards" className="hover:underline">Mentor Standards</NavLink>}
          {user ? (
            <button onClick={signOutUser} className="px-3 py-1 rounded bg-slate-900 text-white">Sign out</button>
          ) : (
            <NavLink to="/login" className="px-3 py-1 rounded bg-slate-900 text-white">Login</NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}