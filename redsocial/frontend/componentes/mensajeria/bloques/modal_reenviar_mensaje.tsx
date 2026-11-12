import { AlertaEstado } from '../../compartido/interfaz/alerta_estado'
import { useMemo, useState } from 'react'
import { AvatarUsuario, Boton, CampoBusqueda, imagenUsuarioPredeterminada as usuarioImg, usarBusqueda, MensajeEstadoBusqueda, crearFuenteLocal } from '../../compartido'
import { Modal } from '../../compartido/interfaz/modal'
import { agruparDestinos, sinElemento } from './logica_presentacion_mensajes'
import { coincidePorNombre } from './logica_busqueda_mensajeria'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ModalReenviarMensajeProps, SeccionDestinosProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion.reenviar_modal

function SeccionDestinos({ titulo, conversaciones, enviados, fallidos, onEnviar }: SeccionDestinosProps) {
  if (conversaciones.length === 0) return null
  const idsEnviados = new Set(enviados)
  const idsFallidos = new Set(fallidos)
  return (
    <section>
      <h3 className={clases.reenviar_seccion}>{titulo}</h3>
      <ul className={clases.destinos}>
        {conversaciones.map((candidata) => {
          const enviado = idsEnviados.has(candidata.id)
          return (
            <li key={candidata.id} className={clases.reenviar_fila}>
              {candidata.esGrupo ? <AvatarUsuario tamano="sm" icono="grupo" tono="solido" /> : <AvatarUsuario tamano="sm" imagen={usuarioImg} estado={candidata.enLinea ? 'conectado' : undefined} />}
              <span className={clases.reenviar_nombre}>{candidata.nombre}</span>
              {idsFallidos.has(candidata.id) && <AlertaEstado className={clases.reenviar_error}>{textos.error}</AlertaEstado>}
              <Boton type="button" variant="secundario" size="mini" disabled={enviado} aria-label={textos.enviar_a.replace(':nombre', candidata.nombre)} onClick={() => onEnviar(candidata.id)}>
                {enviado ? textos.enviado : textos.enviar}
              </Boton>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function ModalReenviarMensaje({ destinos, fuente, onConfirmar, onCancelar }: ModalReenviarMensajeProps) {
  const [enviados, setEnviados] = useState<readonly string[]>([])
  const [fallidos, setFallidos] = useState<readonly string[]>([])
  const fuenteLocal = useMemo(() => crearFuenteLocal(destinos, coincidePorNombre), [destinos])
  const busqueda = usarBusqueda(fuente ?? fuenteLocal, { modo: fuente ? 'remota' : 'local' })
  const { personas, grupos } = agruparDestinos(busqueda.resultado.elementos)

  function enviar(id: string) {
    const correcto = onConfirmar([id]) !== false
    if (!correcto) return setFallidos((actuales) => [...actuales, id])
    setEnviados((actuales) => [...actuales, id])
    setFallidos((actuales) => sinElemento(actuales, id))
  }

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCancelar} className={clases.reenviar_modal}>
      <div className={clases.reenviar_cuerpo}>
        <CampoBusqueda className={clases.reenviar_buscador} placeholder={textos.buscar} aria-label={textos.buscar} value={busqueda.texto} onChange={(evento) => busqueda.cambiarTexto(evento.target.value)} />
        <SeccionDestinos titulo={textos.recientes} conversaciones={personas} enviados={enviados} fallidos={fallidos} onEnviar={enviar} />
        <SeccionDestinos titulo={textos.grupos} conversaciones={grupos} enviados={enviados} fallidos={fallidos} onEnviar={enviar} />
        <MensajeEstadoBusqueda estado={busqueda.estado} error={busqueda.error} sinCoincidencias={false} />
        {personas.length + grupos.length === 0 && (busqueda.estado === 'inicial' || busqueda.estado === 'sin_coincidencias') && <p className={clases.reenviar_seccion}>{textos.sin_resultados}</p>}
      </div>
    </Modal>
  )
}
