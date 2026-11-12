import { BotonIcono, usarCarrusel } from '../../compartido'
import { BotonCrearHistoria } from './botones_historia_inicio'
import { BotonHistoriaContacto } from './boton_historia_contacto'
import { BotonHistoriaPropia } from './boton_historia_propia'
import { HistoriaContacto } from './historia_contacto'
import { limiteSegmentosAlcanzado } from './logica_grupos_historias'
import { historiasDeAutor } from './logica_serie_historias'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { CarruselHistoriasInicioProps } from '@/tipos/inicio/contrato_historia'

export function CarruselHistoriasInicio({ historias, publicadas, deContactos, autoresConHistorias, onCrear, onVer }: CarruselHistoriasInicioProps) {
  const carrusel = usarCarrusel()
  const crear = historias.find((historia) => historia.crear)
  const otras = historias.filter((historia) => !historia.crear)
  const conHistorias = new Set(autoresConHistorias)

  function alDesplazar(direccion: -1 | 1) {
    const pista = carrusel.pistaRef.current
    if (!pista) return
    pista.scrollBy({ left: direccion * pista.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <BotonIcono icono="flecha-izquierda" type="button" aria-label={textosRedSocial.ANTERIOR} onClick={() => alDesplazar(-1)} variant="flotante" size="default" className="absolute left-1 top-1/2 z-10 -translate-y-1/2 max-800:hidden" />
      <div ref={carrusel.pistaRef} className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-oculto">
        {crear && <BotonCrearHistoria nombre={crear.nombre} limiteAlcanzado={limiteSegmentosAlcanzado(publicadas)} onCrear={onCrear} />}
        {publicadas.length > 0 && <BotonHistoriaPropia historia={publicadas[0]} onVer={onVer} />}
        {otras.map((historia) =>
          historia.autorId && conHistorias.has(historia.autorId) ? (
            <BotonHistoriaContacto key={historia.nombre} nombre={historia.nombre} historia={historiasDeAutor(deContactos, historia.autorId)[0]} onVer={onVer} />
          ) : (
            <HistoriaContacto key={historia.nombre} nombre={historia.nombre} />
          ),
        )}
      </div>
      <BotonIcono icono="flecha-derecha" type="button" aria-label={textosRedSocial.SIGUIENTE} onClick={() => alDesplazar(1)} variant="flotante" size="default" className="absolute right-1 top-1/2 z-10 -translate-y-1/2 max-800:hidden" />
    </div>
  )
}
