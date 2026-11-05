import { useState } from 'react'
import { FondoPanelFlotante } from '../../compartido/interfaz/fondo_panel_flotante'
import { Boton } from '../../compartido/interfaz/boton'
import { Insignia } from '../../compartido/interfaz/insignia'
import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { PanelFiltrosAvanzados } from './panel_filtros_avanzados'
import type { BasicosFiltrosColaboradores, FiltrosAvanzadosColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const clases = catalogoColaboradores.clases.listado

export function BloqueFiltrosAvanzados({
  aplicados,
  alAplicar,
  basicos,
  totalActivos = 0,
}: {
  aplicados: FiltrosAvanzadosColaboradores
  alAplicar: (valores: FiltrosAvanzadosColaboradores) => void
  basicos?: BasicosFiltrosColaboradores
  totalActivos?: number
}) {
  const [abierto, setAbierto] = useState(false)

  function alternar(evento: { stopPropagation: () => void }) {
    evento.stopPropagation()
    setAbierto((actual) => !actual)
  }

  function cerrar() {
    setAbierto(false)
  }

  return (
    <div className={clases.contenedor_boton_barra}>
      <Boton type="button" variant="secundario" size="md" onClick={alternar} activo={abierto} className={clases.boton_barra}>
        <Icono name="filtro" className={clases.boton_barra_glifo} /> {basicos ? catalogoColaboradores.botones.filtros_movil : catalogoColaboradores.botones.filtros}
        {basicos && totalActivos > 0 && <span className={clases.contador_filtros}><Insignia variant="counter" tamano="sm">{totalActivos}</Insignia></span>}
      </Boton>
      {abierto && (
        <>
          <FondoPanelFlotante onCerrar={cerrar} />
          <PanelFiltrosAvanzados aplicados={aplicados} basicos={basicos} onAplicar={alAplicar} onCerrar={cerrar} />
        </>
      )}
    </div>
  )
}
