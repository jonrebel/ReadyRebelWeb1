import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './routes/App'
import Chat from './routes/Chat'
import Contacts from './routes/Contacts'
import Settings from './routes/Settings'
import Welcome from './routes/Welcome'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      { index: true, element: <Welcome/> },
      { path: 'chat', element: <Chat/> },
      { path: 'contacts', element: <Contacts/> },
      { path: 'settings', element: <Settings/> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
