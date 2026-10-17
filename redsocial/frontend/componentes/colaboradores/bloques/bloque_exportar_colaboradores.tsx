import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { Menu } from '../../compartido/interfaz/menu'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { AccionesExportar } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const OPCIONES_EXPORTAR = catalogoColaboradores.menu_exportar as (ElementoMenu & { clave: keyof AccionesExportar })[]

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
    <div className="relative max-900:w-full">
      <Boton type="button" variant="secundario" size="md" onClick={alternar} activo={Boolean(ancla)} className="max-900:w-full max-900:justify-center">
        <Icono name="descargar" className="w-3.5 h-3.5" /> {catalogoColaboradores.botones.exportar}
      </Boton>
      {ancla && <Menu ancla={ancla} alCerrar={cerrar} elementos={elementos} />}
    </div>
  )
}
