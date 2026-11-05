import { useState } from 'react'
import { CabeceraConversacion } from './cabecera_conversacion'
import { ZonaComposicion } from './zona_composicion'
import { FranjaMensajeFijado } from './franja_mensaje_fijado'
import { HiloMensajes } from './hilo_mensajes'
import { ModalEliminarMensaje } from './modal_eliminar_mensaje'
import { ModalReenviarMensaje } from './modal_reenviar_mensaje'
import { destinosDeReenvio } from './logica_presentacion_mensajes'
import { usarContextoComposicion } from './usar_contexto_composicion'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { PanelConversacionProps } from '@/tipos/mensajeria/contrato_conversacion'
import type { AdjuntoMensaje } from '@/tipos/mensajeria/contrato_mensajes'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion

export function PanelConversacion({ conversacion, mensajes, participantes, usuarioId, ahora, conversaciones, onEnviar, onAdjuntar, onEditar, onEliminar, onReenviar, onFijar, onVolver, oculta, compacto = false }: PanelConversacionProps) {
  const [porEliminar, setPorEliminar] = useState<string | null>(null)
  const [porReenviar, setPorReenviar] = useState<string | null>(null)
  const [franjaOculta, setFranjaOculta] = useState<string | null>(null)
  const contexto = usarContextoComposicion(mensajes, usuarioId, ahora)
  const fijado = mensajes.find((mensaje) => mensaje.id === conversacion.mensajeFijadoId)

  function alEnviar(texto: string) {
    if (contexto.editando && !onEditar(contexto.editando.id, texto)) return false
    if (!contexto.editando) onEnviar(texto, contexto.referencia)
    contexto.terminar()
    return true
  }

  function alAdjuntar(adjuntos: readonly AdjuntoMensaje[]) {
    onAdjuntar?.(adjuntos, contexto.referencia)
    contexto.cancelarRespuesta()
  }

  function alternarFijado(mensajeId: string) {
    setFranjaOculta(null)
    onFijar(mensajeId)
  }

  function confirmarEliminacion() {
    if (porEliminar) onEliminar(porEliminar)
    setPorEliminar(null)
  }

  function confirmarReenvio(destinoIds: readonly string[]): boolean {
    const resultados = destinoIds.map((destinoId) => (porReenviar ? onReenviar(porReenviar, destinoId) !== false : false))
    return resultados.every(Boolean)
  }

  return (
    <section data-zona="panel-conversacion" className={`${clases.contenedor} ${oculta ? clases.oculta : ''}`}>
      <CabeceraConversacion conversacion={conversacion} compacto={compacto} onVolver={onVolver} />

      {fijado && franjaOculta !== fijado.id ? <FranjaMensajeFijado mensaje={fijado} onCerrar={() => setFranjaOculta(fijado.id)} /> : <div />}

      <HiloMensajes
        conversacion={conversacion}
        mensajes={mensajes}
        participantes={participantes}
        conversaciones={conversaciones}
        usuarioId={usuarioId}
        ahora={ahora}
        acciones={{ onResponder: contexto.iniciarRespuesta, onEditar: contexto.iniciarEdicion, onReenviar: setPorReenviar, onFijar: alternarFijado, onEliminar: setPorEliminar }}
      />

      <ZonaComposicion
        conversacion={conversacion}
        participantes={participantes}
        usuarioId={usuarioId}
        editando={contexto.editando}
        respondiendo={contexto.respondiendo}
        onEnviar={alEnviar}
        onAdjuntar={alAdjuntar}
        onCancelarEdicion={contexto.cancelarEdicion}
        onCancelarRespuesta={contexto.cancelarRespuesta}
        etiquetaGuardar={textos.guardar_edicion}
      />

      {porEliminar && <ModalEliminarMensaje onConfirmar={confirmarEliminacion} onCancelar={() => setPorEliminar(null)} />}
      {porReenviar && <ModalReenviarMensaje destinos={destinosDeReenvio(conversaciones, conversacion.id)} onConfirmar={confirmarReenvio} onCancelar={() => setPorReenviar(null)} />}
    </section>
  )
}
