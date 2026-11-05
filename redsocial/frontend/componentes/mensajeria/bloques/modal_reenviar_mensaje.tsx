import { useState } from 'react'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { Modal } from '../../compartido/interfaz/modal'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import { agruparDestinos, sinElemento } from './logica_presentacion_mensajes'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ModalReenviarMensajeProps, SeccionDestinosProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion.reenviar_modal

function SeccionDestinos({ titulo, conversaciones, enviados, fallidos, onEnviar }: SeccionDestinosProps) {
  if (conversaciones.length === 0) return null
  return (
    <section>
      <h3 className={clases.reenviar_seccion}>{titulo}</h3>
      <ul className={clases.destinos}>
        {conversaciones.map((candidata) => {
          const enviado = enviados.includes(candidata.id)
          return (
            <li key={candidata.id} className={clases.reenviar_fila}>
              {candidata.esGrupo ? <AvatarUsuario tamano="sm" icono="grupo" tono="solido" /> : <AvatarUsuario tamano="sm" imagen={usuarioImg} estado={candidata.enLinea ? 'conectado' : undefined} />}
              <span className={clases.reenviar_nombre}>{candidata.nombre}</span>
              {fallidos.includes(candidata.id) && <span role="alert" className={clases.reenviar_error}>{textos.error}</span>}
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

export function ModalReenviarMensaje({ destinos, onConfirmar, onCancelar }: ModalReenviarMensajeProps) {
  const [busqueda, setBusqueda] = useState(String())
  const [enviados, setEnviados] = useState<readonly string[]>([])
  const [fallidos, setFallidos] = useState<readonly string[]>([])
  const { personas, grupos } = agruparDestinos(destinos, busqueda)

  function enviar(id: string) {
    const correcto = onConfirmar([id]) !== false
    setEnviados((actuales) => (correcto ? [...actuales, id] : actuales))
    setFallidos((actuales) => (correcto ? sinElemento(actuales, id) : [...actuales, id]))
  }

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCancelar} className={clases.reenviar_modal}>
      <div className={clases.reenviar_cuerpo}>
        <CampoBusqueda className={clases.reenviar_buscador} placeholder={textos.buscar} aria-label={textos.buscar} value={busqueda} onChange={(evento) => setBusqueda(evento.target.value)} />
        <SeccionDestinos titulo={textos.recientes} conversaciones={personas} enviados={enviados} fallidos={fallidos} onEnviar={enviar} />
        <SeccionDestinos titulo={textos.grupos} conversaciones={grupos} enviados={enviados} fallidos={fallidos} onEnviar={enviar} />
        {personas.length + grupos.length === 0 && <p className={clases.reenviar_seccion}>{textos.sin_resultados}</p>}
      </div>
    </Modal>
  )
}
