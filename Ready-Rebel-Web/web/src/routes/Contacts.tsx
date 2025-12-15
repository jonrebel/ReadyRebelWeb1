
import { useState } from 'react'

export default function Contacts() {
  const [form, setForm] = useState({ email: '', phone: '', description: '' })
  const [submitted, setSubmitted] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Report a Problem</h1>

      {submitted ? (
        <div className="bg-white/70 p-4 rounded-2xl">
          <p className="font-semibold">Thank you!</p>
          <p className="text-sm opacity-70">Your report has been submitted.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4 bg-white/70 p-4 rounded-2xl">
          <input
            className="w-full border rounded-xl px-3 py-2"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full border rounded-xl px-3 py-2"
            placeholder="Phone"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />
          <textarea
            className="w-full border rounded-xl px-3 py-2"
            placeholder="Describe the issue"
            rows={4}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <button className="px-4 py-2 rounded-xl bg-black text-white">
            Submit
          </button>
        </form>
      )}
    </div>
  )
}
