import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import type { TarjetaResumenEventosProps } from '@/tipos/eventos/contrato_tarjetas_laterales_eventos'

export function TarjetaResumenEventos({ resumen }: TarjetaResumenEventosProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-borde-suave bg-white">
      <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
        <h2 className="m-0 text-titulo-banner">{catalogoEventos.secciones.resumen_de_tus_eventos}</h2>
        <a href="#" className={CLASE_ENLACE_ACCION}>{catalogoEventos.leyendas.este_anio}</a>
      </div>
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-2 py-2 text-center">
          {resumen.map((s) => (
            <div key={s.etiqueta} className="flex flex-col items-center gap-0.5">
              <span className="text-valor-destacado text-texto">{s.valor}</span>
              <span className="text-auxiliar leading-compacto text-texto-suave">{s.etiqueta}</span>
            </div>
          ))}
        </div>
        <Boton type="button" variant="secundario" size="md" className="mt-3 w-full">
          <Icono name="analiticas" className="h-4 w-4" /> {catalogoEventos.botones.ver_reportes}
        </Boton>
      </div>
    </section>
  )
}
