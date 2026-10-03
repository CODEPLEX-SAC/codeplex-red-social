import { useEffect, useRef } from 'react'
import { Icono, imagenUsuarioPredeterminada } from '../icono'
import { AvatarImagen } from '../interfaz/avatar_imagen'
import { Boton } from '../interfaz/boton'
import { BotonIcono } from '../interfaz/boton_icono'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { OpcionPanelUsuario, PanelUsuarioTopbarProps } from '@/tipos/compartido/contrato_sesion'

const textos = catalogoAcceso.panel_usuario
const opciones = textos.opciones as OpcionPanelUsuario[]

export function PanelUsuarioTopbar({ usuario, onCerrar, onCerrarSesion }: PanelUsuarioTopbarProps) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => panel.current?.focus(), [])

  useEffect(() => {
    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === catalogoCompartido.modal.tecla_cerrar) onCerrar()
    }
    document.addEventListener('keydown', alPresionarTecla)
    return () => document.removeEventListener('keydown', alPresionarTecla)
  }, [onCerrar])

  return (
    <div
      ref={panel}
      id={textos.id}
      role="dialog"
      aria-label={textos.titulo}
      tabIndex={-1}
      className="fixed right-md top-17 z-20 w-95 overflow-hidden rounded-xl border border-borde bg-white shadow-t13 outline-none max-600:left-3 max-600:right-3 max-600:w-auto"
    >
      <div className="relative flex items-center gap-4 bg-linear-to-br from-primario-suave via-white to-primario-suave p-5 pr-12 max-600:gap-3 max-600:p-4 max-600:pr-11">
        <BotonIcono icono="cerrar" type="button" aria-label={textos.cerrar} onClick={onCerrar} variant="discreto" size="default" className="absolute right-3 top-3" />
        <div className="relative flex-none">
          <AvatarImagen src={imagenUsuarioPredeterminada} className="h-20 w-20 rounded-full border-4 border-white bg-borde ring-2 ring-primario/30 max-600:h-16 max-600:w-16" />
          <span aria-hidden="true" className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-exito" />
        </div>
        <div className="flex min-w-0 flex-col items-start gap-1">
          <strong className="max-w-full truncate text-valor-destacado font-extrabold leading-tight text-texto">{usuario.usuario}</strong>
          <span className="max-w-full truncate text-subtitulo text-texto-suave">{usuario.empresa}</span>
          <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-primario-suave px-3 py-1 text-etiqueta-estado font-bold text-primario">
            <Icono name="maletin" className="h-3.5 w-3.5" /> {usuario.rol}
          </span>
        </div>
      </div>

      <ul aria-label={textos.etiqueta_opciones} className="m-0 list-none px-4 py-2">
        {opciones.map((opcion) => (
          <li key={opcion.clave} className="border-b border-t-f0eef5 last:border-b-0">
            <button type="button" aria-disabled="true" title={textos.proximamente} className="flex w-full cursor-default items-center gap-3 border-0 bg-transparent px-1 py-2.5 text-left">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-control bg-primario-suave text-primario">
                <Icono name={opcion.icono} className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1 truncate text-cuerpo font-medium text-texto">{opcion.etiqueta}</span>
              <Icono name="flecha-derecha" className="h-4 w-4 flex-none text-texto-suave" />
            </button>
          </li>
        ))}
      </ul>

      <div className="px-4 pb-4 pt-1">
        <Boton type="button" variant="peligro_contorno" size="enlace" onClick={onCerrarSesion} className="w-full justify-start gap-3 rounded-xl bg-t-fef2f2 p-2 pr-4">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-control bg-t-fee2e2">
            <Icono name="despedida" className="h-5 w-5" />
          </span>
          {textos.cerrar_sesion}
        </Boton>
      </div>
    </div>
  )
}
