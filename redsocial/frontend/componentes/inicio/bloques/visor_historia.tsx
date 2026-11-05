import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Modal } from '../../compartido/interfaz/modal'
import { CarruselHistorias } from './carrusel_historias'
import { TarjetaActivaHistoria } from './tarjeta_activa_historia'
import { usarReproduccionHistoria } from './usar_reproduccion_historia'
import { VistaLateralHistoria } from './vista_lateral_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { VisorHistoriaProps } from '@/tipos/inicio/contrato_historia'

const textos = catalogoInicio.historias.flujo.visor
const clases = catalogoInicio.historias.flujo.clases

export function VisorHistoria({ grupos, indiceGrupo, segmento, acciones, hayAnterior, haySiguiente, onSeleccionarGrupo, onAnterior, onSiguiente, onCerrar }: VisorHistoriaProps) {
  const grupo = grupos[indiceGrupo]
  const historia = grupo.historias[segmento]
  usarReproduccionHistoria(historia.id, haySiguiente ? onSiguiente : onCerrar)
  const eliminar = () => {
    acciones.onEliminar(historia.id)
    onCerrar()
  }
  const navegacion = { hayAnterior, haySiguiente, onAnterior, onSiguiente }
  const etiquetas = { anterior: textos.anterior, siguiente: textos.siguiente, vecina: (posicion: number, distancia: number) => `${distancia < 0 ? textos.previa_anterior : textos.previa_siguiente} ${grupos[posicion].nombre}` }
  const tarjeta = (posicion: number, distancia: number) =>
    distancia === 0 ? (
      <TarjetaActivaHistoria grupo={grupo} segmento={segmento} acciones={acciones} hayAnterior={hayAnterior} haySiguiente={haySiguiente} onAnterior={onAnterior} onSiguiente={onSiguiente} onEliminar={eliminar} />
    ) : (
      <VistaLateralHistoria historia={grupos[posicion].historias[0]} />
    )

  return (
    <Modal oscuro titulo={textos.titulo.replace(':nombre', grupo.nombre)} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} cabecera={<></>} className="relative h-full max-w-none">
      <div className={clases.cuerpo_visor}>
        <CarruselHistorias historias={grupos} indice={indiceGrupo} navegacion={navegacion} etiquetas={etiquetas} onCambiar={onSeleccionarGrupo} renderTarjeta={tarjeta} />
      </div>
      <div className={clases.acciones_visor}>
        <BotonIcono icono="cerrar" type="button" aria-label={textos.cerrar} onClick={onCerrar} variant="sobre_oscuro" size="default" />
      </div>
    </Modal>
  )
}
