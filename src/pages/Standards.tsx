import Nav from '../components/Nav'

export default function Standards() {
  return (
    <div>
      <Nav />
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">Fire Fit Standards</h1>
        <p className="text-slate-700">Voluntary but encouraged for all members. Dedicated to fitness and readiness.</p>
        <ul className="list-disc pl-6">
          <li>1.5 mile run: 13:15 (development)</li>
          <li>343 Circuit: 100 pushups, 100 air squats, 50 burpees, 50 sit-ups, 25 lunges/leg, 25 pull-ups</li>
        </ul>
      </div>
    </div>
  )
}
