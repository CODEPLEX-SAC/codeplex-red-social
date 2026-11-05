import { Boton } from '../../compartido/interfaz/boton'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import { CabeceraVisorHistoria } from './cabecera_visor_historia'
import { LienzoHistoria } from './lienzo_historia'
import { estadosDeSegmentos } from './logica_grupos_historias'
import { PieRespuestaHistoria } from './pie_respuesta_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { TarjetaActivaHistoriaProps } from '@/tipos/inicio/contrato_historia'

const textos = catalogoInicio.historias.flujo.visor
const clases = catalogoInicio.historias.flujo.clases

export function TarjetaActivaHistoria({ grupo, segmento, acciones, hayAnterior, haySiguiente, onAnterior, onSiguiente, onEliminar }: TarjetaActivaHistoriaProps) {
  const { usuario } = usarSesionDemostracion()
  const historia = grupo.historias[segmento]
  const segmentos = estadosDeSegmentos(grupo.historias.length, segmento)
  const progreso = textos.progreso.replace(':actual', String(segmento + 1)).replace(':total', String(grupo.historias.length))
  const respondible = historia.autorId !== usuario?.id

  return (
    <div className={clases.marco_visor}>
      <LienzoHistoria borrador={historia.borrador} inmersivo />
      <Boton type="button" variant="fantasma" size="enlace" aria-label={textos.zona_anterior} disabled={!hayAnterior} onClick={onAnterior} className={`${clases.zona_toque} ${clases.zona_toque_anterior}`} />
      <Boton type="button" variant="fantasma" size="enlace" aria-label={textos.zona_siguiente} disabled={!haySiguiente} onClick={onSiguiente} className={`${clases.zona_toque} ${clases.zona_toque_siguiente}`} />
      <CabeceraVisorHistoria historia={historia} segmentos={segmentos} propia={!respondible} onEliminar={onEliminar} />
      {respondible && <PieRespuestaHistoria key={historia.id} historia={historia} acciones={acciones} />}
      <span className="sr-only">{progreso}</span>
    </div>
  )
}
