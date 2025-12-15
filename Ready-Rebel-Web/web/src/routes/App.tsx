import { Link, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const loc = useLocation()
  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-orange-600 text-white p-4 space-y-2">
        <h1 className="text-2xl font-bold">ReadyRebel</h1>
        <nav className="mt-6 grid gap-2">
          <Link className={navCls(loc.pathname === '/')} to="/">Home</Link>
          <Link className={navCls(loc.pathname === '/chat')} to="/chat">Rebel</Link>
          <Link className={navCls(loc.pathname === '/contacts')} to="/contacts">Contacts</Link>
          <Link className={navCls(loc.pathname === '/settings')} to="/settings">Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet/>
      </main>
    </div>
  )
}

function navCls(active: boolean) {
  return `px-3 py-2 rounded-xl ${active ? 'bg-white/20' : 'hover:bg-white/10'}`
}
