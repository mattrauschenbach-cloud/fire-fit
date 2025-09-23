import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore'

export default function MentorStandards() {
  const [members, setMembers] = useState([])
  const [selected, setSelected] = useState('')
  const [items, setItems] = useState(null)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'profiles'), (snap) => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setMembers(arr)
      if (!selected && arr.length) setSelected(arr[0].id)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    const load = async () => {
      if (!selected) return
      const ref = doc(db, 'standards', selected)
      const snap = await getDoc(ref)
      setItems(snap.exists() ? (snap.data().items || []) : [])
    }
    load()
  }, [selected])

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Mentor Standards Viewer</h2>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-slate-600">Select member:</span>
        <select className="border rounded px-2 py-1" value={selected} onChange={e=>setSelected(e.target.value)}>
          {members.map(m => <option key={m.id} value={m.id}>{m.displayName || 'Firefighter'}</option>)}
        </select>
      </div>
      <div className="bg-white border rounded-xl p-4 space-y-2">
        {items === null ? <p>Loading…</p> : (
          items.length ? items.map((it, i) => (
            <div key={it.key || i} className="flex items-center gap-3 border rounded p-2">
              <input type="checkbox" disabled checked={!!it.done} readOnly />
              <span>{it.label}</span>
            </div>
          )) : <p className="text-sm text-slate-600">No standards found for this member.</p>
        )}
      </div>
    </section>
  )
}