import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import DailyApp from './daily/DailyApp'
import './styles/index.css'

/**
 * Routing:
 *  - /b/* and /v/*  → legacy App (shared bracket / vault views)
 *  - ?legacy=1      → legacy App (Free Play library, custom brackets)
 *  - everything else → BOB Daily (v3 — the front door)
 */
function pickRoot() {
  const path = window.location.pathname
  const params = new URLSearchParams(window.location.search)
  if (path.startsWith('/b/') || path.startsWith('/v/') || params.has('legacy')) {
    return <App />
  }
  return <DailyApp />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {pickRoot()}
  </React.StrictMode>
)
