import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
export default function WeeklyChallenge(){
  const [c, setC] = useState(null)
  useEffect(()=>{(async()=>{
    const s = await getDoc(doc(db,'meta','weekly'))
    setC(s.exists()? s.data() : { title:'Week 1 – Row 25,000m', details:'Log meters in the app.' })
  })()},[])
  return (
    <section className='space-y-3'>
      <h2 className='text-2xl font-bold'>Weekly Challenge</h2>
      {c ? <div className='bg-white border rounded-xl p-4'>
        <h3 className='text-lg font-semibold'>{c.title}</h3>
        <p className='text-slate-700'>{c.details}</p>
      </div> : <p>Loading…</p>}
    </section>
  )
}