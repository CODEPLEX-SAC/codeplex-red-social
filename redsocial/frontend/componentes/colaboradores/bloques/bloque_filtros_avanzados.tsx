import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { PanelFiltrosAvanzados } from './panel_filtros_avanzados'

export function BloqueFiltrosAvanzados() {
  const [abierto, setAbierto] = useState(false)

  function alternar(evento: { stopPropagation: () => void }) {
    evento.stopPropagation()
    setAbierto((actual) => !actual)
  }

  function cerrar() {
    setAbierto(false)
  }

  return (
    <div className="relative max-900:w-full">
      <Boton type="button" variant="secundario" size="md" onClick={alternar} activo={abierto} className="max-900:w-full max-900:justify-center">
        <Icono name="filtro" className="w-3.5 h-3.5" /> {catalogoColaboradores.botones.filtros}
      </Boton>
      {abierto && (
        <>
          <div className="fixed inset-0 z-19 max-600:bg-black/45" onClick={cerrar} />
          <PanelFiltrosAvanzados onCerrar={cerrar} />
        </>
      )}
    </div>
  )
}
