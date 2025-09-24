// add near the other controls, mentors only:
<input
  className="border rounded px-2 py-1"
  defaultValue={m.displayName || ''}
  onBlur={(e) => isMentor && updateDoc(doc(db,'profiles',m.id), { displayName: e.target.value })}
/>
