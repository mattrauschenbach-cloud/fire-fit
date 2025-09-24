import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
const TIERS = ['committed','developed','advanced','elite']
const parseLines = (text) => text.split(/\r?\n/).map(t=>t.trim()).filter(Boolean).map(label => ({ key: label.toLowerCase().replace(/[^a-z0-9]+/g,'_'), label }))

export default function StandardsImport() {
  const [tier, setTier] = useState('committed')
  const [raw, setRaw] = useState('')
  const [msg, setMsg] = useState('')
  useEffect(()=>{ setMsg('') }, [tier, raw])

  const saveTemplate = async (e) => {
    e.preventDefault()
    const items = parseLines(raw)
    if (!items.length) { setMsg('Add at least one line.'); return }
    const ref = doc(db, 'config', 'standards_by_tier')
    const snap = await getDoc(ref)
    const existing = snap.exists() ? snap.data() : {}
    existing[tier] = items
    await setDoc(ref, existing, { merge: true })
    setMsg('Saved template ✓')
  }

  const applyToMember = async () => {
    const uid = prompt('Enter member UID to apply this tier template to:')
    if (!uid) return
    const ref = doc(db, 'config', 'standards_by_tier')
    const snap = await getDoc(ref)
    const tpl = snap.exists() ? (snap.data()[tier] || []) : []
    await setDoc(doc(db, 'standards', uid), { items: tpl }, { merge: true })
    setMsg('Applied to member ✓')
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Standards Import (by Tier)</h2>
      <p className="text-sm text-slate-600">Paste one standard per line. Save per tier (committed, developed, advanced, elite).</p>

      <div className="flex items-center gap-2">
        <span className="text-sm">Tier</span>
        <select className="border rounded px-2 py-1" value={tier} onChange={e=>setTier(e.target.value)}>
          {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <textarea className="w-full border rounded p-3" rows="10" placeholder="e.g.&#10;1.5-mile ≤ 13:15&#10;100 pushups&#10;50 burpees" value={raw} onChange={e=>setRaw(e.target.value)} />

      <div className="flex items-center gap-2">
        <button onClick={saveTemplate} className="px-3 py-2 rounded bg-slate-900 text-white">Save Tier Template</button>
        <button onClick={applyToMember} className="px-3 py-2 rounded border">Apply to a specific member…</button>
      </div>
      {msg && <p className="text-sm text-slate-600">{msg}</p>}

      <p className="text-xs text-slate-500">Templates live at <code>config/standards_by_tier</code>. Member checklists live at <code>standards/{'{uid}'}</code>.</p>
    </section>
  )
}
