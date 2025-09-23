export default function Home() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Fire Fit</h1>
      <p className="text-slate-600">
        Track weekly challenges, log workouts, and keep the crew accountable.
      </p>
      <ul className="list-disc pl-6 text-slate-700">
        <li>Login → access Dashboard</li>
        <li>Weekly → see the current challenge</li>
        <li>Dashboard → your personal area (requires login)</li>
      </ul>
    </section>
  )
}