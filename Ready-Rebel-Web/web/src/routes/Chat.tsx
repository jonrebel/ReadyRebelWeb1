import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

type Message = { id: string; text: string; sentBy: 'me' | 'rebel' }

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)
  const avatar = localStorage.getItem('avatar') || 'boy'

  const avatarMap: Record<string, string> = {
    boy: '🧑',
    girl: '👩',
    cat: '🐱',
    dog: '🐶',
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    const text = input.trim()
    if (!text) return
    const myMsg: Message = { id: crypto.randomUUID(), text, sentBy: 'me' }
    const typing: Message = { id: 'typing', text: 'Typing...', sentBy: 'rebel' }
    setMessages(m => [...m, myMsg, typing])
    setInput('')

    try {
      const { data } = await axios.post('/api/chat', { message: text })
      setMessages(m => m.filter(x => x.id !== 'typing').concat({ id: crypto.randomUUID(), text: (data?.reply ?? '').trim(), sentBy: 'rebel' }))
    } catch (e: any) {
      setMessages(m => m.filter(x => x.id !== 'typing').concat({ id: crypto.randomUUID(), text: 'Failed: ' + (e?.message || e), sentBy: 'rebel' }))
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') send()
  }

  return (
    <div className="max-w-2xl mx-auto h-[80vh] flex flex-col gap-4">
      <div className="flex-1 overflow-y-auto bg-white/70 rounded-2xl p-4 space-y-3">
        {messages.map(m => (
          <div key={m.id} className={`max-w-[80%] px-3 py-2 rounded-2xl ${m.sentBy === 'me' ? 'bg-amber-500 text-white ml-auto' : 'bg-orange-600 text-white'}`}>
            <div className="text-xs opacity-80 mb-1">{m.sentBy === 'me' ? 'You' : 'Rebel'}</div>
            <div className="whitespace-pre-wrap">{m.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2 w-full max-w-3xl mx-auto">
        <div className="flex items-center gap-3 flex-1">
          <div className="text-2xl">
            {avatarMap[avatar]}
          </div>

          <input
            className="flex-1 w-full rounded-xl px-4 py-3"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>

        <button
          onClick={send}
          className="px-4 py-3 rounded-2xl bg-orange-600 text-white"
        >
          Send
        </button>
      </div>

    </div>
  )
}
