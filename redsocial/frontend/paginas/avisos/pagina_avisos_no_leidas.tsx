import { useState } from 'react'
import { Boton, Casilla, Icono, EstructuraApp, EstructuraTresColumnas, ColumnaPublicidad, Selector } from '../../componentes/compartido'
import type { SeleccionAvisos } from '@/tipos/avisos/contrato_seleccion_avisos'
import catalogoAvisos from '../../catalogos/capacidades/redsocial/avisos.json'
import { PestanasNovedades, FilaNovedad, PanelDetalleNovedad, usarAvisosLeidos, seleccionAlternada, seleccionDeTodas } from '../../componentes/avisos'
import { AVISOS_NO_LEIDAS, CONTEOS_AVISOS, DETALLE_AVISO, CLASES_ICONO_COLOR, PUERTO_LEIDAS_AVISOS } from '../../rutas/avisos/rutas_avisos'

export function PaginaAvisosNoLeidas() {
  const [orden, setOrden] = useState('recientes')
  usarAvisosLeidos(PUERTO_LEIDAS_AVISOS)
  const [seleccion, setSeleccion] = useState<SeleccionAvisos>(new Set())
  const sinLeer = AVISOS_NO_LEIDAS.filter((aviso) => !PUERTO_LEIDAS_AVISOS.esLeida(aviso.id, aviso.leida))
  const marcadas = sinLeer.filter((aviso) => seleccion.has(aviso.id))
  const todasMarcadas = sinLeer.length > 0 && marcadas.length === sinLeer.length
  const alternarTodas = (marcada: boolean) => setSeleccion(seleccionDeTodas(sinLeer.map((aviso) => aviso.id), marcada))
  const alternarUna = (id: string, marcada: boolean) => setSeleccion((actual) => seleccionAlternada(actual, id, marcada))
  const leerMarcadas = () => {
    PUERTO_LEIDAS_AVISOS.marcarTodas(marcadas.map((aviso) => aviso.id))
    setSeleccion(new Set())
  }

  return (
    <EstructuraApp paginaActiva="avisos">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5 flex items-start justify-between gap-5 max-600:flex-col max-600:items-stretch">
              <div>
                <h1 className="m-0 mb-1 text-titulo-pagina text-texto">{catalogoAvisos.titulos.principal}</h1>
                <p className="m-0 text-subtitulo text-texto-suave">{catalogoAvisos.subtitulos.principal}</p>
              </div>
              <div className="flex flex-none items-center gap-2">
                <Boton type="button" variant="secundario" size="default" className="flex-none" disabled={sinLeer.length === 0} onClick={() => PUERTO_LEIDAS_AVISOS.marcarTodas(sinLeer.map((aviso) => aviso.id))}>
                  <Icono name="verificado" className="h-3.5 w-3.5" /> {catalogoAvisos.botones.marcar_todas_leidas}
                </Boton>
              </div>
            </div>

            <PestanasNovedades activa="no_leidas" conteos={CONTEOS_AVISOS} />

            <div className={catalogoAvisos.clases_solicitud.barra_seleccion}>
              <Casilla seleccionado={todasMarcadas} indeterminado={marcadas.length > 0 && !todasMarcadas} alCambiar={(_, marcada) => alternarTodas(marcada)} etiqueta={`${catalogoAvisos.campos_lista.seleccionar_todas} (${sinLeer.length})`} />
              <Boton type="button" variant="secundario" size="default" disabled={marcadas.length === 0} onClick={leerMarcadas}>
                <Icono name="verificado" className="h-3.5 w-3.5" /> {catalogoAvisos.botones.marcar_seleccionadas_leidas}
              </Boton>
              <Selector variant="mini" value={orden} onChange={(evento) => setOrden(evento.target.value)} aria-label={catalogoAvisos.campos_lista.mas_recientes}>
                <option value="recientes">{catalogoAvisos.campos_lista.mas_recientes}</option>
                <option value="antiguas">{catalogoAvisos.campos_lista.mas_antiguas}</option>
              </Selector>
            </div>

            <section className="rounded-control border border-borde bg-white">
              {(orden === 'recientes' ? sinLeer : [...sinLeer].reverse()).map((n) => (
                <FilaNovedad key={n.id} aviso={n} claseIcono={CLASES_ICONO_COLOR[n.colorIcono]} seleccionable leida={false} seleccionada={seleccion.has(n.id)} alSeleccionar={(marcada) => alternarUna(n.id, marcada)} />
              ))}
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={<PanelDetalleNovedad detalle={DETALLE_AVISO} />}
      />
    </EstructuraApp>
  )
}
