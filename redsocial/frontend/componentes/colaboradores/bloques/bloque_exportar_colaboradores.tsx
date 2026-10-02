import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { Menu } from '../../compartido/interfaz/menu'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'

const OPCIONES_EXPORTAR = catalogoColaboradores.menu_exportar as ElementoMenu[]

export function BloqueExportarColaboradores() {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)

  function alternar(evento: MouseEvent<HTMLButtonElement>) {
    evento.stopPropagation()
    setAncla((actual) => (actual ? null : evento.currentTarget))
  }

  function cerrar() {
    setAncla(null)
  }

  return (
    <div className="relative max-900:w-full">
      <Boton type="button" variant="secundario" size="md" onClick={alternar} activo={Boolean(ancla)} className="max-900:w-full max-900:justify-center">
        <Icono name="adjuntar" className="w-3.5 h-3.5" /> {catalogoColaboradores.botones.exportar}
      </Boton>
      {ancla && <Menu ancla={ancla} alCerrar={cerrar} elementos={OPCIONES_EXPORTAR} />}
    </div>
  )
}
