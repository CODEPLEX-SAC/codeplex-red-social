import { useMemo, useState } from 'react'
import { BotonPieLista, clasesChip, Insignia, MensajeVacio, MensajeEstadoBusqueda, usarBusqueda, crearFuenteLocal } from '../../compartido'
import { CATEGORIAS, ETIQUETAS, LIMITE_VISIBLES, admiteSolicitud, armarItemsSolicitudes, coincideSolicitud, mensajeVacio, textoDelPie, tonoDelConteo } from './logica_solicitudes'
import { TarjetaSolicitudRecibida } from './tarjeta_solicitud'
import { TarjetaSolicitudEnviada } from './tarjeta_solicitud_enviada'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { CategoriaSolicitud } from '@/tipos/amigos/modelo_amigos_solicitudes'
import type { FiltrosSolicitudes, ItemSolicitud, SeccionSolicitudesProps } from '@/tipos/amigos/contrato_solicitudes'

const clases = catalogoAmigos.clases.chips

function tarjetaDeSolicitud(item: ItemSolicitud) {
  return item.categoria === 'recibidas' ? <TarjetaSolicitudRecibida key={item.solicitud.nombre} solicitud={item.solicitud} /> : <TarjetaSolicitudEnviada key={item.solicitud.nombre} solicitud={item.solicitud} />
}

export function SeccionSolicitudes({ recibidas, enviadas, fuente }: SeccionSolicitudesProps) {
  const [categoria, setCategoria] = useState<CategoriaSolicitud>(CATEGORIAS[0])
  const [expandida, setExpandida] = useState(false)
  const filtros = useMemo<FiltrosSolicitudes>(() => ({ categoria }), [categoria])
  const fuenteLocal = useMemo(() => crearFuenteLocal(armarItemsSolicitudes(recibidas, enviadas), coincideSolicitud, admiteSolicitud), [recibidas, enviadas])
  const busqueda = usarBusqueda(fuente ?? fuenteLocal, { modo: fuente ? 'remota' : 'local', filtros })
  const coincidentes = busqueda.resultado.elementos
  const recortada = categoria === 'recibidas' && !expandida
  const visibles = recortada ? coincidentes.slice(0, LIMITE_VISIBLES) : coincidentes
  const fuentes: Record<CategoriaSolicitud, readonly unknown[]> = { recibidas, enviadas }
  const vacio = mensajeVacio(categoria, fuentes[categoria].length > 0)
  const hayPie = categoria === 'recibidas' && coincidentes.length > LIMITE_VISIBLES
  const sinResultados = visibles.length === 0 && (busqueda.estado === 'inicial' || busqueda.estado === 'sin_coincidencias')
  const conteos: Partial<Record<CategoriaSolicitud, number>> = { recibidas: recibidas.length, enviadas: enviadas.length }

  return (
    <>
      <div role="group" aria-label={catalogoAmigos.secciones.solicitudes_amistad} className={clases.fila}>
        {CATEGORIAS.map((clave) => (
          <button key={clave} type="button" aria-pressed={clave === categoria} onClick={() => setCategoria(clave)} className={clasesChip({ activo: clave === categoria, className: clases.chip })}>
            {ETIQUETAS[clave]}
            {conteos[clave] !== undefined && (
              <Insignia variant="counter" tamano="sm" tono={tonoDelConteo(clave === categoria)}>{conteos[clave]}</Insignia>
            )}
          </button>
        ))}
      </div>
      <MensajeEstadoBusqueda estado={busqueda.estado} error={busqueda.error} sinCoincidencias={false} />
      {sinResultados && <MensajeVacio texto={vacio} className={catalogoAmigos.clases.solicitud.vacio} />}
      {visibles.map(tarjetaDeSolicitud)}
      {hayPie && <BotonPieLista onClick={() => setExpandida((actual) => !actual)}>{textoDelPie(expandida)}</BotonPieLista>}
    </>
  )
}
