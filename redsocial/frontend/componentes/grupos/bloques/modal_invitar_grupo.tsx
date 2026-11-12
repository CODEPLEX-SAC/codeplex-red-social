import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { Modal } from '../../compartido/interfaz/modal'
import { imagenRedSocialDe } from '../../compartido'
import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'
import { usarMiembrosGrupo } from './usar_miembros_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ModalInvitarGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.invitar
const clases = catalogoGrupos.clases.invitar

export function ModalInvitarGrupo({ grupo, puerto, candidatos, onCerrar }: ModalInvitarGrupoProps) {
  const busqueda = usarMiembrosGrupo()
  const invitados = new Set(puerto.estado(grupo.id).invitados)
  const visibles = candidatos.filter((contacto) => contieneTexto(contacto.nombre, busqueda.consulta)).slice(0, textos.maximo)

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className={clases.dialogo}>
      <div className={clases.cuerpo}>
        <CampoBusqueda placeholder={textos.buscar} aria-label={textos.etiqueta_busqueda} value={busqueda.consulta} onChange={(evento) => busqueda.cambiarConsulta(evento.target.value)} />
        <ul className={clases.lista}>
          {visibles.length === 0 && <MensajeVacio texto={textos.sin_resultados} className={clases.vacio} />}
          {visibles.map((contacto) => (
            <li key={contacto.id} className={clases.fila}>
              <AvatarUsuario tamano="sm" imagen={imagenRedSocialDe(contacto.id)} />
              <div className={clases.textos}>
                <strong className={clases.nombre}>{contacto.nombre}</strong>
                <span className={clases.detalle}>{contacto.detalle}</span>
              </div>
              {invitados.has(contacto.nombre) && <span className={clases.estado}>{textos.preparada}</span>}
              {!invitados.has(contacto.nombre) && (
                <Boton type="button" variant="secundario" size="default" aria-label={textos.invitar_a.replace(':nombre', contacto.nombre)} onClick={() => puerto.invitar(grupo.id, contacto.nombre)}>
                  {textos.invitar}
                </Boton>
              )}
            </li>
          ))}
        </ul>
        <p aria-live="polite" className={clases.nota}>
          {textos.nota}
        </p>
      </div>
    </Modal>
  )
}
