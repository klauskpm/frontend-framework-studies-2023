import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Routes from './routes'
import SessionProvider from './SessionProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SessionProvider>
      <Routes />
    </SessionProvider>
  </React.StrictMode>,
)
