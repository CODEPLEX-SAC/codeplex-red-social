import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonReaccion } from './boton_reaccion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { AccionPublicacion, PiePublicacionProps } from '@/tipos/inicio/contrato_publicacion_visual'

const acciones = catalogoInicio.publicacion.acciones as AccionPublicacion[]
const etiquetas = catalogoInicio.botones

export function PiePublicacion({ reacciones, iconosResumen, comentarios, compartidos, reaccion, puedeCompartir, comentariosAbiertos, idComentarios, onReaccionar, onComentar, onCompartir }: PiePublicacionProps) {
  const manejadores = { comentar: onComentar, compartir: onCompartir }

  return (
    <>
      <div className="flex items-center justify-between gap-3 px-4 pb-3 text-auxiliar text-texto-suave" aria-live="polite">
        <span className="flex min-w-0 items-center gap-1.5 truncate">
          {iconosResumen.map((opcion) => (
            <Icono key={opcion.clave} name={opcion.icono} className={`h-4 w-4 flex-none ${opcion.clase_resumen}`} />
          ))}
          {reacciones}
        </span>
        <span className="flex flex-none gap-3">
          <span>{comentarios}</span>
          {compartidos && <span>{compartidos}</span>}
        </span>
      </div>
      <div className="flex gap-1 border-t border-borde-suave px-2 py-1">
        {acciones.map((accion) =>
          accion.clave === 'me_gusta' ? (
            <BotonReaccion key={accion.clave} reaccion={reaccion} variante="publicacion" onReaccionar={onReaccionar} />
          ) : (
            <Boton
              key={accion.clave}
              type="button"
              variant="fantasma"
              size="default"
              aria-expanded={accion.clave === 'comentar' ? comentariosAbiertos : undefined}
              aria-controls={accion.clave === 'comentar' && comentariosAbiertos ? idComentarios : undefined}
              disabled={accion.clave === 'compartir' && !puedeCompartir}
              title={accion.clave === 'compartir' && !puedeCompartir ? catalogoInicio.publicacion.compartir_propia : undefined}
              onClick={manejadores[accion.clave]}
              className="min-w-0 flex-1"
            >
              <Icono name={accion.icono} className="h-4 w-4" />
              <span className="max-380:sr-only">{etiquetas[accion.clave]}</span>
            </Boton>
          ),
        )}
      </div>
    </>
  )
}
