import { useEffect, useMemo, useState } from 'react'
import { db } from '../lib/firebase'
import { collection, onSnapshot, doc, getDoc, setDoc } from 'firebase/firestore'
const TIER_KEYS = ['committed','developed','advanced','elite']
const mapTier = (t) => t === 'developmental' ? 'developed' : t

export default function TierCheckoff() {
  const [tier, setTier] = useState('committed')
  const [members, setMembers] = useState([])
  const [standardsByUser, setStandardsByUser] = useState({})
  const [tierTemplate, setTierTemplate] = useState([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'profiles'), (snap) => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setMembers(arr)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, 'config', 'standards_by_tier'))
      setTierTemplate(snap.exists() ? (snap.data()[tier] || []) : [])
    })()
  }, [tier])

  useEffect(() => {
    (async () => {
      const relevant = members.filter(m => mapTier(m.tier) === tier)
      const map = {}
      for (const m of relevant) {
        const s = await getDoc(doc(db, 'standards', m.id))
        map[m.id] = s.exists() ? (s.data().items || []) : []
      }
      setStandardsByUser(map)
    })()
  }, [members, tier])

  const filtered = useMemo(() => members.filter(m => mapTier(m.tier) === tier), [members, tier])

  const toggle = async (uid, idx) => {
    const list = standardsByUser[uid] || []
    const next = list.map((it, i) => i===idx ? { ...it, done: !it.done } : it)
    setStandardsByUser({ ...standardsByUser, [uid]: next })
    await setDoc(doc(db, 'standards', uid), { items: next }, { merge: true })
  }

  const assignTemplate = async (uid) => {
    await setDoc(doc(db, 'standards', uid), { items: tierTemplate }, { merge: true })
    setStandardsByUser({ ...standardsByUser, [uid]: tierTemplate })
    setMsg('Assigned template ✓')
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Tier Check-off</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm">Tier</span>
        <select className="border rounded px-2 py-1" value={tier} onChange={e=>setTier(e.target.value)}>
          {TIER_KEYS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {!filtered.length && <p className="text-sm text-slate-600">No members in this tier yet.</p>}

      {filtered.map(m => {
        const list = standardsByUser[m.id] || []
        return (
          <div key={m.id} className="bg-white border rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{m.displayName || 'Firefighter'}</div>
              <button onClick={()=>assignTemplate(m.id)} className="text-sm border rounded px-2 py-1">Assign tier template</button>
            </div>
            {list.length ? list.map((it, i) => (
              <label key={it.key || i} className="flex items-center gap-3 border rounded p-2">
                <input type="checkbox" checked={!!it.done} onChange={()=>toggle(m.id, i)} />
                <span>{it.label}</span>
              </label>
            )) : <p className="text-sm text-slate-500">No standards assigned. Click “Assign tier template”.</p>}
          </div>
        )
      })}
      {msg && <p className="text-sm text-slate-600">{msg}</p>}
    </section>
  )
}
