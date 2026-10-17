import { useState } from 'react'
import { FondoPanelFlotante } from '../../compartido/interfaz/fondo_panel_flotante'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { PanelFiltrosAvanzados } from './panel_filtros_avanzados'
import type { FiltrosAvanzadosColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

export function BloqueFiltrosAvanzados({ aplicados, alAplicar }: { aplicados: FiltrosAvanzadosColaboradores; alAplicar: (valores: FiltrosAvanzadosColaboradores) => void }) {
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
          <FondoPanelFlotante onCerrar={cerrar} />
          <PanelFiltrosAvanzados aplicados={aplicados} onAplicar={alAplicar} onCerrar={cerrar} />
        </>
      )}
    </div>
  )
}
