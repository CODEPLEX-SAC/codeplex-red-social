import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { TablaCalendarioMini } from '../../../tablas/eventos/tabla_calendario_mini'
import type { DiaCalendarioMini } from '@/tipos/eventos/modelo_calendario_mini'

export function PanelCalendarioMini({ mes, semanas, textoEnlace = catalogoEventos.botones.ver_calendario }: { mes: string; semanas: DiaCalendarioMini[][]; textoEnlace?: string }) {
  return (
    <section className="overflow-hidden rounded-xl border border-t-eeeeee bg-white">
      <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
        <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEventos.secciones.calendario}</h3>
        <a href={catalogoEventos.rutas.calendario} className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textoEnlace}</a>
      </div>
      <div className="px-4 pb-3">
        <div className="mb-2.5 flex items-center justify-between px-1">
          <BotonIcono type="button" icono="flecha-izquierda" variant="suave" size="sm" aria-label={textosRedSocial.ANTERIOR} />
          <span className="text-subtitulo font-bold text-texto">{mes}</span>
          <BotonIcono type="button" icono="flecha-derecha" variant="suave" size="sm" aria-label={textosRedSocial.SIGUIENTE} />
        </div>
        <TablaCalendarioMini semanas={semanas} />
      </div>
    </section>
  )
}
