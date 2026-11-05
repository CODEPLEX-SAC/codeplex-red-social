import { useState } from 'react'
import { BotonPieLista } from '../../compartido/interfaz/boton_pie_lista'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { clasesChip } from '../../compartido/interfaz/chip_filtro'
import { Insignia } from '../../compartido/interfaz/insignia'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { CATEGORIAS, CATEGORIA_ENVIADAS, CATEGORIA_RECIBIDAS, ETIQUETAS, SIN_FUENTE, filtrarSolicitudes, mensajeVacio, pieDeLista, tonoDelConteo } from './logica_solicitudes'
import { TarjetaSolicitudEnviada, TarjetaSolicitudRecibida } from './tarjeta_solicitud'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { CategoriaSolicitud } from '@/tipos/amigos/modelo_amigos_solicitudes'
import type { SeccionSolicitudesProps } from '@/tipos/amigos/contrato_solicitudes'

const clases = catalogoAmigos.clases.chips

export function SeccionSolicitudes({ recibidas, enviadas }: SeccionSolicitudesProps) {
  const [categoria, setCategoria] = useState<CategoriaSolicitud>(CATEGORIAS[0])
  const [texto, setTexto] = useState(String())
  const fuentes: Record<CategoriaSolicitud, readonly { nombre: string; descripcion: string }[]> = { recibidas, enviadas, ignoradas: SIN_FUENTE }
  const recibidasVisibles = filtrarSolicitudes(recibidas, texto)
  const enviadasVisibles = filtrarSolicitudes(enviadas, texto)
  const visibles = { recibidas: recibidasVisibles, enviadas: enviadasVisibles, ignoradas: SIN_FUENTE }[categoria]
  const total = fuentes[categoria].length
  const vacio = mensajeVacio(categoria, total > 0)
  const hayPie = visibles.length > 0 && pieDeLista(categoria) !== String()
  const conteos: Partial<Record<CategoriaSolicitud, number>> = { recibidas: recibidas.length, enviadas: enviadas.length }

  return (
    <>
      <CampoBusqueda
        placeholder={catalogoAmigos.placeholders.buscar_solicitudes}
        aria-label={catalogoAmigos.placeholders.buscar_solicitudes}
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        className={clases.buscador}
      />
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
      {visibles.length === 0 && <MensajeVacio texto={vacio} className={catalogoAmigos.clases.solicitud.vacio} />}
      {categoria === CATEGORIA_RECIBIDAS && recibidasVisibles.map((solicitud) => <TarjetaSolicitudRecibida key={solicitud.nombre} solicitud={solicitud} />)}
      {categoria === CATEGORIA_ENVIADAS && enviadasVisibles.map((solicitud) => <TarjetaSolicitudEnviada key={solicitud.nombre} solicitud={solicitud} />)}
      {hayPie && <BotonPieLista>{pieDeLista(categoria)}</BotonPieLista>}
    </>
  )
}
