import { useState } from 'react'
import { FondoPanelFlotante } from '../../compartido/interfaz/fondo_panel_flotante'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { PanelFiltrosAvanzadosEmpresas } from './panel_filtros_avanzados_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ListadoEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

export function BloqueFiltrosAvanzadosEmpresas({ listado }: ListadoEmpresasProps) {
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
      <Boton type="button" variant="contorno" size="md" onClick={alternar} activo={abierto || listado.filtrosAvanzadosActivos !== 0} aria-expanded={abierto} className="max-900:w-full">
        <Icono name="filtro" className="w-4 h-4" />
        {catalogoEmpresas.botones.filtros_avanzados}
      </Boton>
      {abierto ? (
        <>
          <FondoPanelFlotante onCerrar={cerrar} />
          <PanelFiltrosAvanzadosEmpresas listado={listado} alCerrar={cerrar} />
        </>
      ) : null}
    </div>
  )
}
