import { Link } from 'react-router-dom'
import { AuthProvider } from '../state/auth'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-2">🔥 Fire Fit</h1>
          <p className="text-slate-700 mb-6">Simple starter app for your Fire Fit program.</p>
          <div className="grid gap-4">
            <Link to="/login" className="rounded-2xl shadow px-6 py-4 bg-white">Sign in to get started</Link>
            <Link to="/dashboard" className="rounded-2xl shadow px-6 py-4 bg-white">Dashboard</Link>
            <Link to="/weekly" className="rounded-2xl shadow px-6 py-4 bg-white">Weekly Challenge</Link>
            <Link to="/standards" className="rounded-2xl shadow px-6 py-4 bg-white">Standards</Link>
            <Link to="/logbook" className="rounded-2xl shadow px-6 py-4 bg-white">Logbook</Link>
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}
