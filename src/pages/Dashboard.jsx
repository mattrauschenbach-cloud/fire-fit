import { useAuthState } from '../lib/auth'
import { db } from '../lib/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { user } = useAuthState()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, 'profiles', user.uid)
      const snap = await getDoc(ref)
      if (!snap.exists()) {
        await setDoc(ref, { displayName: user.displayName || 'Firefighter', createdAt: Date.now() })
        setProfile({ displayName: user.displayName || 'Firefighter' })
      } else {
        setProfile(snap.data())
      }
    }
    load()
  }, [user])

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p>Hello, <span className="font-semibold">{profile?.displayName || user.displayName}</span> 👋</p>
      <p className="text-slate-600">This is your hub. Add logs, see progress, and check challenges.</p>
    </section>
  )
}