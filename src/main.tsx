import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// @ts-ignore
import TagManager from 'react-gtm-module'

const GTM_ID = import.meta.env.VITE_GTM_ID
if (GTM_ID) {
  TagManager.initialize({ gtmId: GTM_ID })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
