import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Aplicacion from './aplicacion.tsx'
import catalogoCompartido from './catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Aplicacion />
  </StrictMode>,
)
