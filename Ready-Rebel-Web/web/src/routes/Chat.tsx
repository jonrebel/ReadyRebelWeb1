import { useEffect, useMemo, useRef, useState } from 'react'

type Msg = {
  id: string
  role: 'user' | 'bot'
  text: string
  createdAt: number
}

export default function Chat() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    { id: 'welcome', role: 'bot', text: 'Hey! Ask me anything 👋', createdAt: Date.now() },
  ])

  const endRef = useRef<HTMLDivElement | null>(null)

  const avatar = useMemo(() => localStorage.getItem('avatar') || 'boy', [])
  const avatarMap: Record<string, string> = {
    boy: '🧑',
    girl: '👩',
    cat: '🐱',
    dog: '🐶',
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setLoading(true)

    const userMsg: Msg = { id: crypto.randomUUID(), role: 'user', text, createdAt: Date.now() }
    setMessages(prev => [...prev, userMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || `Request failed (${res.status})`)
      }

      const data = (await res.json()) as { reply?: string }
      const botMsg: Msg = {
        id: crypto.randomUUID(),
        role: 'bot',
        text: data.reply ?? 'No reply received.',
        createdAt: Date.now(),
      }
      setMessages(prev => [...prev, botMsg])
    } catch (e: any) {
      const botMsg: Msg = {
        id: crypto.randomUUID(),
        role: 'bot',
        text: `⚠️ ${e?.message ?? 'Failed to reach API'}`,
        createdAt: Date.now(),
      }
      setMessages(prev => [...prev, botMsg])
    } finally {
      setLoading(false)
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') send()
  }

  return (
    <div className="p-6">
      <div className="w-full max-w-3xl mx-auto space-y-4">
        <div className="rounded-2xl bg-white/70 p-4 min-h-[360px] space-y-3">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-3 rounded-2xl max-w-[80%] ${m.role === 'user' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl max-w-[80%] bg-white text-black opacity-70">
                Thinking...
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="flex gap-2 w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-2xl">{avatarMap[avatar] ?? '🙂'}</div>
            <input
              className="flex-1 w-full rounded-xl px-4 py-3"
              placeholder={loading ? 'Thinking...' : 'Type a message...'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
            />
          </div>
          <button
            onClick={send}
            className="px-4 py-3 rounded-2xl bg-orange-600 text-white disabled:opacity-60"
            disabled={loading || !input.trim()}
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}
