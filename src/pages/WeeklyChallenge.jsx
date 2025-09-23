import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function WeeklyChallenge() {
  const [challenge, setChallenge] = useState(null)

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, 'meta', 'weekly')
      const snap = await getDoc(ref)
      if (snap.exists()) setChallenge(snap.data())
      else setChallenge({ title: 'Week 1 – Row 25,000m as a team', details: 'Log your meters on the whiteboard and in the app.' })
    }
    load()
  }, [])

  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold">Weekly Challenge</h2>
      {challenge ? (
        <div className="bg-white border rounded-xl p-4">
          <h3 className="text-lg font-semibold">{challenge.title}</h3>
          <p className="text-slate-700">{challenge.details}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  )
}