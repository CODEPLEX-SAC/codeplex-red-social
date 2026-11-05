import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { MiniaturasMediosComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.modal_crear_publicacion.medios
const clases = catalogoInicio.publicacion.comentarios.clases

export function MiniaturasMediosComentario({ medios, onQuitar }: MiniaturasMediosComentarioProps) {
  if (medios.length === 0) return null

  return (
    <ul aria-label={textos.vista_previa} className={clases.miniaturas}>
      {medios.map((medio, indice) => {
        const numero = String(indice + 1)
        const quitar = () => onQuitar(medio.id)
        return (
          <li key={medio.id} className={clases.miniatura}>
            {medio.esVideo ? (
              <>
                <video src={medio.url} muted preload="metadata" aria-label={textos.texto_alternativo.replace(':numero', numero)} className={clases.miniatura_medio} />
                <span className="pointer-events-none absolute inset-0 grid place-items-center text-white">
                  <Icono name="video" className="h-5 w-5" />
                </span>
              </>
            ) : (
              <AvatarImagen src={medio.url} alt={textos.texto_alternativo.replace(':numero', numero)} className={clases.miniatura_medio} />
            )}
            <BotonIcono icono="cerrar" type="button" aria-label={textos.quitar.replace(':numero', numero)} onClick={quitar} variant="flotante" size="sm" className={clases.miniatura_quitar} />
          </li>
        )
      })}
    </ul>
  )
}
