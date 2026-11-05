import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { Menu } from '../../compartido/interfaz/menu'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { AccionesExportar } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const OPCIONES_EXPORTAR = catalogoColaboradores.menu_exportar as (ElementoMenu & { clave: keyof AccionesExportar })[]

const clases = catalogoColaboradores.clases.listado

export function BloqueExportarColaboradores({ acciones }: { acciones: AccionesExportar }) {
  const elementos = OPCIONES_EXPORTAR.map((opcion) => ({ ...opcion, deshabilitado: !acciones[opcion.clave], alHacerClick: acciones[opcion.clave] }))

  const [ancla, setAncla] = useState<HTMLElement | null>(null)

  function alternar(evento: MouseEvent<HTMLButtonElement>) {
    evento.stopPropagation()
    const boton = evento.currentTarget
    setAncla((actual) => (actual ? null : boton))
  }

  function cerrar() {
    setAncla(null)
  }

  return (
    <div className={clases.contenedor_boton_barra}>
      <Boton type="button" variant="secundario" size="md" onClick={alternar} activo={Boolean(ancla)} className={clases.boton_barra}>
        <Icono name="descargar" className={clases.boton_barra_glifo} /> {catalogoColaboradores.botones.exportar}
      </Boton>
      {ancla && <Menu ancla={ancla} alCerrar={cerrar} elementos={elementos} />}
    </div>
  )
}
