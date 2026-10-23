import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu } from '../../compartido/interfaz/menu'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { MenuComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { OpcionMenuPublicacion } from '@/tipos/inicio/contrato_publicacion_visual'

const textos = catalogoInicio.publicacion.comentarios
const opcionesMenu = textos.menu as OpcionMenuPublicacion[]

export function MenuComentario({ onEditar, onEliminar }: MenuComentarioProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const acciones = { editar: onEditar, eliminar: onEliminar }
  const elementos = opcionesMenu.map((opcion) => ({ etiqueta: opcion.etiqueta, icono: opcion.icono, peligro: opcion.peligro, alHacerClick: acciones[opcion.clave] }))

  function alternar(boton: HTMLElement) {
    setAncla((actual) => (actual ? null : boton))
  }

  return (
    <div className="flex-none">
      <BotonIcono
        icono="puntos"
        type="button"
        aria-label={textos.opciones}
        aria-haspopup="menu"
        aria-expanded={Boolean(ancla)}
        onClick={(evento) => alternar(evento.currentTarget)}
        variant="sutil"
        size="default"
      />
      {ancla && <Menu ancla={ancla} alCerrar={() => setAncla(null)} elementos={elementos} />}
    </div>
  )
}
