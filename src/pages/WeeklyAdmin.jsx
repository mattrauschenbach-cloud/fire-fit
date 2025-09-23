import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export default function WeeklyAdmin() {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, 'meta', 'weekly')
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data()
        setTitle(data.title || '')
        setDetails(data.details || '')
      }
    }
    load()
  }, [])

  const save = async (e) => {
    e.preventDefault()
    try {
      await setDoc(doc(db, 'meta', 'weekly'), { title, details }, { merge: true })
      setMsg('Saved ✓')
    } catch (e) { console.error(e); setMsg('Failed to save') }
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Weekly Admin</h2>
      <form onSubmit={save} className="space-y-3 max-w-xl">
        <label className="block">
          <span className="text-sm">Title</span>
          <input className="w-full border rounded px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm">Details</span>
          <textarea className="w-full border rounded px-3 py-2" rows="4" value={details} onChange={e=>setDetails(e.target.value)} />
        </label>
        <button className="px-3 py-2 rounded bg-slate-900 text-white">Save</button>
        {msg && <span className="text-sm text-slate-600 ml-2">{msg}</span>}
      </form>
    </section>
  )
}