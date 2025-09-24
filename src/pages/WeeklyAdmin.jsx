import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
export default function WeeklyAdmin(){
  const [title,setTitle]=useState('');const[details,setDetails]=useState('');const[msg,setMsg]=useState('')
  useEffect(()=>{(async()=>{const s=await getDoc(doc(db,'meta','weekly'));if(s.exists()){const d=s.data();setTitle(d.title||'');setDetails(d.details||'')}})()},[])
  const save=async(e)=>{e.preventDefault();try{await setDoc(doc(db,'meta','weekly'),{title,details},{merge:true});setMsg('Saved ✓')}catch{setMsg('Failed')}};
  return (<section className='space-y-4'><h2 className='text-2xl font-bold'>Weekly Admin</h2>
    <form onSubmit={save} className='space-y-3 max-w-xl'>
      <input className='w-full border rounded px-3 py-2' placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)}/>
      <textarea className='w-full border rounded px-3 py-2' rows='3' placeholder='Details' value={details} onChange={e=>setDetails(e.target.value)}/>
      <button className='px-3 py-2 rounded bg-slate-900 text-white'>Save</button>
      {msg&&<span className='text-sm text-slate-600 ml-2'>{msg}</span>}
    </form></section>)
}