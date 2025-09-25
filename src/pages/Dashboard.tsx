import Nav from '../components/Nav'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '../utils/firebase'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const uid = auth.currentUser?.uid
    if (!uid) return
    (async () => {
      const ref = doc(db, 'users', uid)
      const snap = await getDoc(ref)
      if (snap.exists()) setProfile(snap.data())
      else {
        await setDoc(ref, { createdAt: Date.now(), weekly_goal: '25,000 row meters', name: auth.currentUser?.email })
        const s2 = await getDoc(ref); setProfile(s2.data())
      }
    })()
  }, [])

  return (
    <div>
      <Nav />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-slate-600">Welcome to Fire Fit.</p>
        <pre className="bg-slate-100 p-4 rounded-xl overflow-auto text-sm">{JSON.stringify(profile, null, 2)}</pre>
      </div>
    </div>
  )
}
