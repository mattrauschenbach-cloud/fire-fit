import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './pages/App'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import WeeklyChallenge from './pages/WeeklyChallenge'
import Standards from './pages/Standards'
import Logbook from './pages/Logbook'
import { useAuthState } from './state/auth'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuthState()
  if (loading) return <div className="p-8">Loading…</div>
  return user ? children : <Navigate to="/login" />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/weekly" element={<PrivateRoute><WeeklyChallenge /></PrivateRoute>} />
        <Route path="/standards" element={<PrivateRoute><Standards /></PrivateRoute>} />
        <Route path="/logbook" element={<PrivateRoute><Logbook /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
