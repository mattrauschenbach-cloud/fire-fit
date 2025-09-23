import { useAuthState } from '../lib/auth'
import { db } from '../lib/firebase'
import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { user, profile } = useAuthState()
  const [meters, setMeters] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const ensureTotals = async () => {
      const tRef = doc(db, 'totals', user.uid)
      const tSnap = await getDoc(tRef)
      if (!tSnap.exists()) await setDoc(tRef, { meters: 0 })
    }
    ensureTotals()
  }, [user])

  const logMeters = async (e) => {
    e.preventDefault()
    const val = parseInt(meters, 10)
    if (isNaN(val) || val <= 0) { setMsg('Enter a positive number'); return }
    setMsg('')
    try {
      await addDoc(collection(db, 'logs', user.uid, 'entries'), { meters: val, createdAt: serverTimestamp() })
      await updateDoc(doc(db, 'totals', user.uid), { meters: increment(val) })
      const teamRef = doc(db, 'stats', 'team')
      const teamSnap = await getDoc(teamRef)
      if (!teamSnap.exists()) await setDoc(teamRef, { meters: val, updatedAt: serverTimestamp() })
      else await updateDoc(teamRef, { meters: increment(val), updatedAt: serverTimestamp() })
      setMeters(''); setMsg('Logged!')
    } catch (e) { console.error(e); setMsg('Failed to log. Check rules.') }
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p>Hello, <span className="font-semibold">{profile?.displayName || user.displayName}</span> 👋</p>
        <p className="text-sm text-slate-600">Tier: <span className="font-medium">{profile?.tier}</span> • Shift: <span className="font-medium">{profile?.shift}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-semibold mb-2">Log meters</h3>
          <form onSubmit={logMeters} className="space-y-3">
            <input className="w-full border rounded px-3 py-2" type="number" placeholder="Enter meters (e.g., 500)" value={meters} onChange={e=>setMeters(e.target.value)} />
            <button className="px-3 py-2 rounded bg-slate-900 text-white">Add to team total</button>
            {msg && <p className="text-sm text-slate-600">{msg}</p>}
          </form>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-semibold mb-2">Notes</h3>
          <p className="text-sm text-slate-600">Tier & shift changes are handled by mentors.</p>
        </div>
      </div>
    </section>
  )
}