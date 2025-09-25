import Nav from '../components/Nav'
import { useEffect, useState } from 'react'
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore'
import { db, auth } from '../utils/firebase'

export default function WeeklyChallenge() {
  const [goal, setGoal] = useState('25,000 row meters')
  const [entry, setEntry] = useState('')
  const [log, setLog] = useState<any[]>([])

  async function addEntry() {
    const uid = auth.currentUser?.uid
    if (!uid || !entry) return
    await addDoc(collection(db, 'entries'), { uid, type: 'row', amount: entry, createdAt: Timestamp.now() })
    setEntry('')
    load()
  }

  async function load() {
    const uid = auth.currentUser?.uid
    if (!uid) return
    const q = query(collection(db, 'entries'), where('uid','==',uid))
    const snap = await getDocs(q)
    setLog(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <Nav />
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">Weekly Challenge</h1>
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="font-semibold">Current goal</div>
          <div className="text-slate-700">{goal}</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 space-y-2">
          <div className="font-semibold">Add your progress</div>
          <div className="flex gap-2">
            <input className="border rounded-xl p-2 flex-1" placeholder="e.g., 2500 meters"
              value={entry} onChange={e=>setEntry(e.target.value)} />
            <button onClick={addEntry} className="px-4 py-2 rounded-xl bg-black text-white">Add</button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="font-semibold mb-2">Your log</div>
          <ul className="list-disc pl-5 space-y-1">
            {log.map(item => <li key={item.id} className="text-sm">{item.type}: {item.amount}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
