import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { useAuthState } from '../lib/auth'

const TIERS = ['committed','developmental','advanced','elite','mentor']
const SHIFTS = ['A','B','C']

export default function Members() {
  const { profile } = useAuthState()
  const [members, setMembers] = useState([])
  const isMentor = profile?.role === 'mentor'

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'profiles'), (snap) => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setMembers(arr)
    })
    return () => unsub()
  }, [])

  const setTier = async (uid, tier) => { if (isMentor) await updateDoc(doc(db, 'profiles', uid), { tier }) }
  const setShift = async (uid, shift) => { if (isMentor) await updateDoc(doc(db, 'profiles', uid), { shift }) }
  const toggleCommitted = async (uid, val) => { if (isMentor) await updateDoc(doc(db, 'profiles', uid), { isCommitted: val }) }
  const setRole = async (uid, role) => { if (isMentor) await updateDoc(doc(db, 'profiles', uid), { role }) }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Members</h2>
      {!isMentor && <p className="text-sm text-slate-600">View only. Mentor tools are hidden.</p>}
      <div className="grid md:grid-cols-2 gap-3">
        {members.map(m => {
          const isThisMentor = m.role === 'mentor'
          return (
            <div key={m.id} className="border rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{m.displayName || 'Firefighter'}</div>
                  <div className="text-xs text-slate-500">
                    Role: {isThisMentor ? 'mentor' : 'member'} • Tier: {m.tier} • Shift: {m.shift || 'A'} • Committed: {m.isCommitted ? '✅' : '—'}
                  </div>
                </div>
                {isMentor && (
                  <div className="flex gap-2">
                    {isThisMentor ? (
                      <button className="text-sm border rounded px-2 py-1"
                        onClick={() => setRole(m.id, 'member')}>Remove mentor</button>
                    ) : (
                      <button className="text-sm border rounded px-2 py-1"
                        onClick={() => setRole(m.id, 'mentor')}>Make mentor</button>
                    )}
                  </div>
                )}
              </div>

              {isMentor && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <input
                    className="border rounded px-2 py-1"
                    defaultValue={m.displayName || ''}
                    onBlur={(e) => isMentor && updateDoc(doc(db,'profiles',m.id), { displayName: e.target.value })}
                    placeholder="Name"
                  />
                  <select className="border rounded px-2 py-1" value={m.tier || 'developmental'} onChange={e=>setTier(m.id, e.target.value)}>
                    {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <select className="border rounded px-2 py-1" value={m.shift || 'A'} onChange={e=>setShift(m.id, e.target.value)}>
                    {SHIFTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <label className="text-sm flex items-center gap-1">
                    <input type="checkbox" checked={!!m.isCommitted} onChange={e=>toggleCommitted(m.id, e.target.checked)} />
                    committed
                  </label>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
