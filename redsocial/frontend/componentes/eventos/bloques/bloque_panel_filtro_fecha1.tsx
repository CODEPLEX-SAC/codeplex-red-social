import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'

export function BloquePanelFiltroFecha1({
  enCalendarioMovil,
  setVistaMovil,
  tituloMovil,
  onCerrar,
}: {
  enCalendarioMovil: boolean
  setVistaMovil: (valor: 'calendario' | 'opciones' | ((actual: 'calendario' | 'opciones') => 'calendario' | 'opciones')) => void
  tituloMovil: string | undefined
  onCerrar: () => void
}) {
  return (
    <div className="hidden max-600:sticky max-600:top-0 max-600:z-10 max-600:flex max-600:flex-col max-600:bg-white max-600:pt-2.5">
      <div className="mx-auto mb-1 h-1 w-10 flex-none rounded-full bg-t-e0dce8" />
      <div className="flex items-center gap-2 border-b border-t-f0eef5 px-4 pb-3">
        {enCalendarioMovil && (
          <BotonIcono icono="flecha-izquierda" type="button" aria-label={textosRedSocial.ANTERIOR} onClick={() => setVistaMovil('opciones')} variant="discreto" size="md" />
        )}
        <h3 className="m-0 min-w-0 flex-1 text-titulo-seccion font-bold text-texto">{tituloMovil}</h3>
        <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={onCerrar} variant="discreto" size="md" />
      </div>
    </div>
  )
}
