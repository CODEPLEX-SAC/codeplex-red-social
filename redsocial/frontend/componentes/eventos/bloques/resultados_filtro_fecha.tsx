import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { Boton } from '../../compartido/interfaz/boton'
import { TextoColor } from '../../compartido/interfaz/texto_color'
import { imagenEventoPredeterminada as imagenEvento } from '../../compartido/icono'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ResultadosFiltroFechaProps } from '@/tipos/eventos/contrato_resultados_filtro_fecha'
import { formatearFechaCorta, formatearRangoLargo, obtenerClaveDia, unirExtremos } from '../formato_fecha_filtro'
import { AvataresEvento, DatosEventoFiltro, InsigniaFechaEvento, SinEventosFiltro, TarjetaEventoSugerido, TarjetaOtroEvento } from './elementos_resultado_filtro'

const textos = catalogoEventos.panel_filtro_fecha
const MESES = catalogoEventos.meses

export function ResultadosFiltroFecha({ filtro, resultados, onExplorar }: ResultadosFiltroFechaProps) {
  const { destacado, otros, sugeridos } = resultados[obtenerClaveDia(filtro.inicio)] ?? resultados[obtenerClaveDia(new Date(2026, 8, 23))]
  const total = destacado === null ? 0 : otros.length + 1

  return (
    <div>
      <h2 className="m-0 text-titulo-seccion font-extrabold text-texto">
        {textos.eventos_del} <span className="text-primario">{formatearRangoLargo(filtro)}</span>
      </h2>
      <p className="m-0 mb-6 mt-1 text-cuerpo text-texto-suave">{[String(total), textos.espacio, textos.eventos_encontrados].join('')}</p>

      {destacado === null ? (
        <SinEventosFiltro onExplorar={onExplorar} />
      ) : (
        <>
          <h3 className="m-0 mb-4 text-titulo-seccion font-bold text-texto">{catalogoEventos.secciones.destacados}</h3>
          <article className="mb-7 grid grid-cols-2 overflow-hidden rounded-xl border border-t-eeeeee bg-white max-900:grid-cols-1">
            <div className="relative min-h-45 overflow-hidden">
              <AvatarImagen src={imagenEvento} className="h-full w-full" />
              <InsigniaFechaEvento dia={String(filtro.inicio.getDate())} mes={MESES[filtro.inicio.getMonth()].slice(0, 3)} />
            </div>
            <div className="flex flex-col gap-2 px-5 py-4">
              <TextoColor variante={destacado.categoriaColor} className="inline-block text-etiqueta-estado font-bold uppercase tracking-wide">{destacado.categoria}</TextoColor>
              <h4 className="m-0 text-titulo-seccion font-extrabold text-gris-oscuro-texto">{destacado.nombre}</h4>
              <p className="m-0 text-cuerpo leading-snug text-gris-texto-secundario">{destacado.descripcion}</p>
              <DatosEventoFiltro evento={destacado} fecha={filtro.inicio} />
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                <AvataresEvento cantidad={destacado.avatares} asistentes={destacado.asistentes} />
                <Boton type="button" variant="contorno" size="default">{catalogoEventos.botones.ver_detalles}</Boton>
              </div>
            </div>
          </article>

          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="m-0 text-titulo-seccion font-bold text-texto">{[textos.otros_eventos_del, textos.espacio, unirExtremos(filtro, formatearFechaCorta)].join('')}</h3>
            <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
          </div>
          <div className="grid grid-cols-3 gap-4 max-1100:grid-cols-2 max-600:grid-cols-1">
            {otros.map((evento) => (
              <TarjetaOtroEvento key={evento.nombre} evento={evento} fecha={filtro.inicio} />
            ))}
          </div>
        </>
      )}

      {sugeridos.length > 0 && (
        <div className="mt-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="m-0 text-titulo-seccion font-bold text-texto">{textos.sugeridos}</h3>
            <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
          </div>
          <div className="grid grid-cols-4 gap-4 max-1100:grid-cols-2 max-600:grid-cols-1">
            {sugeridos.map((evento) => (
              <TarjetaEventoSugerido key={evento.nombre} evento={evento} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
