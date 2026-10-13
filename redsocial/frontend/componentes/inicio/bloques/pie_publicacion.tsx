import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { AccionPublicacion, PiePublicacionProps } from '@/tipos/inicio/contrato_publicacion_visual'

const acciones = catalogoInicio.publicacion.acciones as AccionPublicacion[]
const etiquetas = catalogoInicio.botones

export function PiePublicacion({ reacciones, comentarios, compartidos, meGusta, comentariosAbiertos, idComentarios, onMeGusta, onComentar, onCompartir }: PiePublicacionProps) {
  const manejadores = { me_gusta: onMeGusta, comentar: onComentar, compartir: onCompartir }

  return (
    <>
      <div className="flex items-center justify-between gap-3 px-4 pb-3 text-auxiliar text-texto-suave" aria-live="polite">
        <span className="min-w-0 truncate">{reacciones}</span>
        <span className="flex flex-none gap-3">
          <span>{comentarios}</span>
          {compartidos && <span>{compartidos}</span>}
        </span>
      </div>
      <div className="flex gap-1 border-t border-borde-suave px-2 py-1">
        {acciones.map((accion) => (
          <Boton
            key={accion.clave}
            type="button"
            variant="fantasma"
            size="default"
            activo={accion.clave === 'me_gusta' && meGusta}
            aria-pressed={accion.clave === 'me_gusta' ? meGusta : undefined}
            aria-expanded={accion.clave === 'comentar' ? comentariosAbiertos : undefined}
            aria-controls={accion.clave === 'comentar' && comentariosAbiertos ? idComentarios : undefined}
            onClick={manejadores[accion.clave]}
            className="min-w-0 flex-1"
          >
            <Icono name={accion.icono} className="h-4 w-4" />
            <span className="max-380:sr-only">{etiquetas[accion.clave]}</span>
          </Boton>
        ))}
      </div>
    </>
  )
}
