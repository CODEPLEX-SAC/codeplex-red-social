import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu } from '../../compartido/interfaz/menu'
import { DialogoEliminarPublicacion } from './dialogo_eliminar_publicacion'
import { enlaceHistoria, etiquetaEliminarHistoria } from './logica_historias_inicio'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { MenuHistoriaProps } from '@/tipos/inicio/contrato_historia'

const textos = catalogoInicio.historias.flujo
const clases = textos.clases

export function MenuHistoria({ historia, onEliminar }: MenuHistoriaProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const [confirmando, setConfirmando] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const pedirConfirmacion = () => setConfirmando(true)
  const cerrarConfirmacion = () => setConfirmando(false)
  const cerrarMenu = () => setAncla(null)

  function copiarEnlace() {
    void navigator.clipboard?.writeText(enlaceHistoria(historia.id))?.then(() => setCopiado(true))
  }

  const acciones: Record<string, () => void> = { copiar_enlace: copiarEnlace, eliminar: pedirConfirmacion }
  const elementos: ElementoMenu[] = textos.visor.menu.map((opcion) => ({
    etiqueta: opcion.clave === 'eliminar' ? etiquetaEliminarHistoria(historia, opcion.etiqueta) : opcion.etiqueta,
    icono: opcion.icono as ElementoMenu['icono'],
    peligro: opcion.peligro,
    alHacerClick: acciones[opcion.clave],
  }))

  function alternar(boton: HTMLElement) {
    setCopiado(false)
    setAncla((actual) => (actual ? null : boton))
  }

  return (
    <>
      {copiado && (
        <span role="status" className={clases.estado_enlace}>
          {textos.visor.enlace_copiado}
        </span>
      )}
      <BotonIcono icono="puntos" type="button" aria-label={textos.visor.opciones} aria-haspopup="menu" aria-expanded={Boolean(ancla)} onClick={(evento) => alternar(evento.currentTarget)} variant="sobre_oscuro" size="default" />
      {ancla && <Menu ancla={ancla} alCerrar={cerrarMenu} elementos={elementos} />}
      {confirmando && <DialogoEliminarPublicacion textos={textos.eliminar} onConfirmar={onEliminar} onCerrar={cerrarConfirmacion} />}
    </>
  )
}
