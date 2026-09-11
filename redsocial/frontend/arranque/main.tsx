import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Aplicacion from './aplicacion.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Aplicacion />
  </StrictMode>,
)
