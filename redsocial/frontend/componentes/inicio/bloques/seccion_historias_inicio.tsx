import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { usarCarrusel } from '../../compartido/usar_carrusel'
import { BotonCrearHistoria, BotonHistoriaContacto, BotonHistoriaPropia, HistoriaContacto } from './botones_historia_inicio'
import { limiteSegmentosAlcanzado } from './logica_grupos_historias'
import { historiasDeAutor } from './logica_serie_historias'
import { ModalCrearHistoria } from './modal_crear_historia'
import { usarSeccionHistorias } from './usar_seccion_historias'
import { VisorHistoria } from './visor_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { SeccionHistoriasInicioProps } from '@/tipos/inicio/contrato_historia'

export function SeccionHistoriasInicio({ historias, publicadas, deContactos, acciones, onPublicar }: SeccionHistoriasInicioProps) {
  const carrusel = usarCarrusel()
  const seccion = usarSeccionHistorias(historias, publicadas, deContactos)
  const crear = historias.find((historia) => historia.crear)
  const otras = historias.filter((historia) => !historia.crear)

  function alDesplazar(direccion: -1 | 1) {
    const pista = carrusel.pistaRef.current
    if (!pista) return
    pista.scrollBy({ left: direccion * pista.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <section className="relative mb-4 rounded-xl border border-borde bg-white pt-4">
      <h2 className="m-0 mb-3 px-4 text-titulo-seccion text-texto">{catalogoInicio.secciones.historias}</h2>
      <div className="relative">
        <BotonIcono icono="flecha-izquierda" type="button" aria-label={textosRedSocial.ANTERIOR} onClick={() => alDesplazar(-1)} variant="flotante" size="default" className="absolute left-1 top-1/2 z-10 -translate-y-1/2 max-800:hidden" />
        <div ref={carrusel.pistaRef} className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-oculto">
          {crear && <BotonCrearHistoria nombre={crear.nombre} limiteAlcanzado={limiteSegmentosAlcanzado(publicadas)} onCrear={seccion.abrirCreador} />}
          {publicadas.length > 0 && <BotonHistoriaPropia historia={publicadas[0]} onVer={seccion.abrirVisor} />}
          {otras.map((historia) =>
            historia.autorId && seccion.autoresConHistorias.includes(historia.autorId) ? (
              <BotonHistoriaContacto key={historia.nombre} nombre={historia.nombre} historia={historiasDeAutor(deContactos, historia.autorId)[0]} onVer={seccion.abrirVisor} />
            ) : (
              <HistoriaContacto key={historia.nombre} nombre={historia.nombre} />
            ),
          )}
        </div>
        <BotonIcono icono="flecha-derecha" type="button" aria-label={textosRedSocial.SIGUIENTE} onClick={() => alDesplazar(1)} variant="flotante" size="default" className="absolute right-1 top-1/2 z-10 -translate-y-1/2 max-800:hidden" />
      </div>
      {seccion.creando && <ModalCrearHistoria onPublicar={onPublicar} onCerrar={seccion.cerrarCreador} />}
      {seccion.abierto && (
        <VisorHistoria
          grupos={seccion.grupos}
          indiceGrupo={seccion.indiceGrupo}
          segmento={seccion.segmento}
          acciones={acciones}
          hayAnterior={seccion.hayAnterior}
          haySiguiente={seccion.haySiguiente}
          onSeleccionarGrupo={seccion.seleccionarGrupo}
          onAnterior={seccion.retroceder}
          onSiguiente={seccion.avanzar}
          onCerrar={seccion.cerrarVisor}
        />
      )}
    </section>
  )
}
