import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { collection, onSnapshot, orderBy, query, limit, doc, getDoc } from 'firebase/firestore'

export default function Leaderboard() {
  const [rows, setRows] = useState([])
  const [shiftTotals, setShiftTotals] = useState({ A:0, B:0, C:0 })

  useEffect(() => {
    const q = query(collection(db, 'totals'), orderBy('meters', 'desc'), limit(200))
    const unsub = onSnapshot(q, async (snap) => {
      const arr = []
      let totals = { A:0, B:0, C:0 }
      for (const d of snap.docs) {
        const uid = d.id
        const total = d.data().meters || 0
        const profSnap = await getDoc(doc(db, 'profiles', uid))
        const name = profSnap.exists() ? (profSnap.data().displayName || 'Firefighter') : 'Firefighter'
        const shift = profSnap.exists() ? (profSnap.data().shift || 'A') : 'A'
        totals[shift] = (totals[shift] || 0) + total
        arr.push({ uid, name, meters: total, shift })
      }
      setRows(arr); setShiftTotals(totals)
    })
    return () => unsub()
  }, [])

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {['A','B','C'].map(s => (
          <div key={s} className="bg-white border rounded-xl p-4">
            <div className="text-sm text-slate-500">Shift {s} total</div>
            <div className="text-3xl font-bold">{(shiftTotals[s]||0).toLocaleString()} m</div>
          </div>
        ))}
      </div>
      <div className="bg-white border rounded-xl">
        <table className="w-full text-left">
          <thead><tr className="border-b bg-slate-100"><th className="p-3">#</th><th className="p-3">Member</th><th className="p-3">Shift</th><th className="p-3">Meters</th></tr></thead>
          <tbody>{rows.map((r,i)=>(<tr key={r.uid} className="border-b last:border-0"><td className="p-3">{i+1}</td><td className="p-3">{r.name}</td><td className="p-3">{r.shift}</td><td className="p-3 font-medium">{r.meters.toLocaleString()}</td></tr>))}</tbody>
        </table>
      </div>
    </section>
  )
}
