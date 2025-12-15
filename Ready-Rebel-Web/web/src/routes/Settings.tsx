
import { useEffect, useState } from 'react'

const avatars = ['boy', 'girl', 'cat', 'dog']

export default function Settings() {
  const [avatar, setAvatar] = useState<string>(() => localStorage.getItem('avatar') || 'boy')

  useEffect(() => {
    localStorage.setItem('avatar', avatar)
  }, [avatar])

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="space-y-4 bg-white/70 p-4 rounded-2xl">
        <label className="font-semibold block">Choose Avatar</label>
        <div className="flex gap-4">
          {avatars.map(a => (
            <button
              key={a}
              onClick={() => setAvatar(a)}
              className={`px-4 py-2 rounded-xl border ${avatar === a ? 'bg-black text-white' : 'bg-white'}`}
            >
              {a}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <div className="text-sm opacity-70">Current avatar:</div>
          <div className="text-lg font-semibold capitalize">{avatar}</div>
        </div>
      </div>
    </div>
  )
}
