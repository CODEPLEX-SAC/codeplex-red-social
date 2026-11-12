import { DialogoCompartirPublicacion } from '../../inicio/bloques/dialogo_compartir_publicacion'
import { ModalCrearPublicacion } from '../../inicio/bloques/modal_crear_publicacion'
import { ModalCrearGrupoComunidad } from './modal_crear_grupo_comunidad'
import { ModalInvitarGrupo } from './modal_invitar_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ModalesDetalleGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const detalle = catalogoGrupos.detalle

export function ModalesDetalleGrupo({ grupo, puerto, candidatos, estado, alPublicar, alCompartir }: ModalesDetalleGrupoProps) {
  return (
    <>
      {estado.publicando && <ModalCrearPublicacion tipoInicial={estado.publicando} onPublicar={alPublicar} onCerrar={estado.cerrarPublicacion} />}
      {estado.modal === 'compartir' && <DialogoCompartirPublicacion simple titulo={detalle.compartir_grupo.titulo} nombre={grupo.nombre} texto={grupo.descripcion} onCompartir={alCompartir} onCerrar={estado.cerrarModal} />}
      {estado.modal === 'invitar' && <ModalInvitarGrupo grupo={grupo} puerto={puerto} candidatos={candidatos} onCerrar={estado.cerrarModal} />}
      {estado.modal === 'editar' && <ModalCrearGrupoComunidad imagen={String()} puerto={puerto} grupo={{ id: grupo.id, nombre: grupo.nombre, descripcion: grupo.descripcion }} onCerrar={estado.cerrarModal} />}
    </>
  )
}
