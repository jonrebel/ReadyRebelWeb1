import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className="h-full grid place-items-center">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-extrabold">Welcome</h2>
        <p className="text-lg">Tap below to chat with <strong>Rebel</strong>.</p>
        <Link to="/chat" className="inline-block bg-orange-600 text-white px-6 py-3 rounded-2xl">Open Rebel</Link>
      </div>
    </div>
  )
}
