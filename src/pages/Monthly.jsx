import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useAuthState } from '../lib/auth'

export default function Monthly() {
  const { profile } = useAuthState()
  const isMentor = profile?.role === 'mentor'

  const [month, setMonth] = useState('')
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [movements, setMovements] = useState([''])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, 'meta', 'monthly')
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data()
        setMonth(data.month || '')
        setTitle(data.title || '')
        setDetails(data.details || '')
        setMovements(Array.isArray(data.movements) ? data.movements : [])
      }
    }
    load()
  }, [])

  const save = async (e) => {
    e.preventDefault()
    if (!isMentor) return
    try {
      await setDoc(doc(db, 'meta', 'monthly'), {
        month,
        title,
        details,
        movements: movements.filter(m => m && m.trim())
      }, { merge: true })
      setMsg('Saved ✓')
    } catch (e) { console.error(e); setMsg('Failed to save') }
  }

  const updateMovement = (i, val) => {
    const next = [...movements]; next[i] = val; setMovements(next)
  }
  const addMovement = () => setMovements([...movements, ''])
  const removeMovement = (i) => setMovements(movements.filter((_,idx)=>idx!==i))

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Monthly Workout</h2>

      {/* Read view */}
      <div className="bg-white border rounded-xl p-4 space-y-2">
        <div className="text-sm text-slate-500">Month</div>
        <div className="text-lg font-semibold">{month || '—'}</div>
        <div className="text-sm text-slate-500">Title</div>
        <div className="text-lg font-semibold">{title || '—'}</div>
        <p className="text-slate-700">{details || '—'}</p>
        {movements?.length ? (
          <ul className="list-disc pl-6">
            {movements.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        ) : <p className="text-sm text-slate-500">No movements added yet.</p>}
      </div>

      {/* Mentor edit form */}
      {isMentor && (
        <form onSubmit={save} className="space-y-3 max-w-xl">
          <h3 className="font-semibold">Edit Monthly Workout</h3>
          <label className="block">
            <span className="text-sm">Month (YYYY-MM)</span>
            <input className="w-full border rounded px-3 py-2" placeholder="2025-09" value={month} onChange={e=>setMonth(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm">Title</span>
            <input className="w-full border rounded px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm">Details</span>
            <textarea className="w-full border rounded px-3 py-2" rows="3" value={details} onChange={e=>setDetails(e.target.value)} />
          </label>

          <div className="space-y-2">
            <div className="text-sm font-medium">Movements</div>
            {movements.map((m, i) => (
              <div key={i} className="flex gap-2">
                <input className="flex-1 border rounded px-3 py-2" value={m} onChange={e=>updateMovement(i, e.target.value)} placeholder="e.g., 500m row, 20 pushups x 3 sets" />
                <button type="button" className="px-2 border rounded" onClick={()=>removeMovement(i)}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={addMovement} className="px-3 py-1 border rounded">+ Add movement</button>
          </div>

          <button className="px-3 py-2 rounded bg-slate-900 text-white">Save Monthly</button>
          {msg && <span className="text-sm text-slate-600 ml-2">{msg}</span>}
        </form>
      )}
    </section>
  )
}