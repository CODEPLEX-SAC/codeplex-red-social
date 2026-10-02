import { Boton } from '../../compartido/interfaz/boton'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { BloquePrioridadPublicacionProps, PrioridadPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

const textos = catalogoInicio.modal_crear_publicacion.prioridad

export function BloquePrioridadPublicacion({ prioridad, onCambiar }: BloquePrioridadPublicacionProps) {
  return (
    <div role="group" aria-label={textos.titulo} className="flex flex-wrap items-center gap-2">
      <span className="text-auxiliar font-semibold text-texto-suave">{textos.titulo}</span>
      {textos.opciones.map((opcion) => (
        <Boton
          key={opcion.valor}
          type="button"
          variant="filtro"
          size="mini"
          activo={prioridad === opcion.valor}
          aria-pressed={prioridad === opcion.valor}
          onClick={() => onCambiar(opcion.valor as PrioridadPublicacion)}
          className="rounded-full"
        >
          <span className={opcion.punto} />
          {opcion.etiqueta}
        </Boton>
      ))}
    </div>
  )
}
