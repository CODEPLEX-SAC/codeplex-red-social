import { MensajeEmergente } from '../../compartido/interfaz/aviso_emergente'
import { Modal } from '../../compartido/interfaz/modal'
import { CabeceraCompartir } from './cabecera_compartir'
import { ContenidoPrincipalCompartir } from './contenido_principal_compartir'
import { ListaDestinosCompartir } from './lista_destinos_compartir'
import { RedactarCompartir } from './redactar_compartir'
import { usarCompartirPublicacion } from './usar_compartir_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { DialogoCompartirPublicacionProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.compartir

export function DialogoCompartirPublicacion({ nombre, texto, simple = false, titulo = textos.titulo, onCompartir, onCerrar }: DialogoCompartirPublicacionProps) {
  const compartir = usarCompartirPublicacion({ nombre, texto, onCompartir })
  const enPrincipal = compartir.paso === 'principal'
  const tituloPaso = { principal: titulo, grupos: textos.grupos.titulo, amigos: textos.amigos.titulo, redactar: textos.redactar.titulo }[compartir.paso]
  const cerrarAviso = () => {
    compartir.cerrarAviso()
    if (compartir.terminado) onCerrar()
  }

  return (
    <>
      {!compartir.terminado && (
        <Modal titulo={tituloPaso} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className="max-w-140 rounded-2xl max-600:h-full max-600:rounded-none" cabecera={<CabeceraCompartir titulo={tituloPaso} alVolver={enPrincipal ? undefined : compartir.volver} onCerrar={onCerrar} />}>
          {enPrincipal && <ContenidoPrincipalCompartir comentario={compartir.comentario} simple={simple} alCambiarComentario={compartir.cambiarComentario} alElegir={compartir.elegirPrincipal} alCompartir={compartir.compartirEnHistoria} />}
          {(compartir.paso === 'grupos' || compartir.paso === 'amigos') && <ListaDestinosCompartir tipo={compartir.paso === 'grupos' ? 'grupo' : 'amigo'} alElegir={compartir.elegirDestino} />}
          {compartir.paso === 'redactar' && compartir.destino && (
            <RedactarCompartir destino={compartir.destino} comentario={compartir.comentario} etiquetados={compartir.etiquetados} alCambiarComentario={compartir.cambiarComentario} alAlternarEtiqueta={compartir.alternarEtiqueta} alPublicar={compartir.publicar} />
          )}
        </Modal>
      )}
      {compartir.aviso && <MensajeEmergente abierto variante={compartir.aviso.variante} mensaje={compartir.aviso.mensaje} alCerrar={cerrarAviso} />}
    </>
  )
}
