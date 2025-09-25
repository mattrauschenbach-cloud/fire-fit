
import { useState } from 'react'
import { db } from '../lib/firebase'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'

function toCsvRow(arr){ return arr.map(v => {
  if (v == null) return ''
  const s = String(v).replace(/"/g,'""')
  return /[",\n]/.test(s) ? `"${s}"` : s
}).join(',') }

export default function ExportData(){
  const [msg, setMsg] = useState('')

  const exportResults = async () => {
    setMsg('Building CSV…')
    const profSnap = await getDocs(collection(db,'profiles'))
    const profiles = profSnap.docs.map(d=>({ id:d.id, ...d.data() }))

    const rows = []
    rows.push(['member_uid','member_name','mentor_name','shift','tier','standard_key','standard_label','attempt_ts','attempt_value','passed','note'])

    for (const p of profiles){
      const st = await getDoc(doc(db,'standards', p.id))
      const items = st.exists() ? (st.data().items || []) : []
      for (const it of items){
        const attempts = Array.isArray(it.attempts) ? it.attempts : []
        if (attempts.length === 0){
          rows.push([p.id, p.displayName||'', p.mentorName||'', p.shift||'', p.tier||'', it.key||'', it.label||'', '', '', '', ''])
        } else {
          for (const a of attempts){
            rows.push([p.id, p.displayName||'', p.mentorName||'', p.shift||'', p.tier||'', it.key||'', it.label||'', new Date(a.ts||0).toISOString(), a.value||'', a.passed? 'TRUE':'FALSE', a.note||''])
          }
        }
      }
    }

    const csv = rows.map(r=>toCsvRow(r)).join('\n')
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fire-fit-results.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setMsg('Exported fire-fit-results.csv ✓')
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Export</h2>
      <p className="text-sm text-slate-600">Exports all members, their standards, and result attempts to a CSV you can open in Excel/Sheets.</p>
      <button onClick={exportResults} className="px-3 py-2 rounded bg-slate-900 text-white">Export Results CSV</button>
      {msg && <p className="text-sm text-slate-600">{msg}</p>}
      <p className="text-xs text-slate-500 mt-2">Columns: member_uid, member_name, mentor_name, shift, tier, standard_key, standard_label, attempt_ts, attempt_value, passed, note.</p>
    </section>
  )
}
