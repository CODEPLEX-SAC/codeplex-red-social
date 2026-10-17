import { Icono } from '../icono'
import type { ListaOpcionesBuscablesProps } from '@/tipos/compartido/contrato_selector_buscable'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.selector_buscable

export function ListaOpcionesBuscables({ opciones, seleccionadaId, etiqueta, alElegir }: ListaOpcionesBuscablesProps) {
  return (
    <ul aria-label={etiqueta} className={clases.lista}>
      {opciones.map((opcion) => {
        const seleccionada = opcion.id === seleccionadaId
        return (
          <li key={opcion.id}>
            <button
              type="button"
              aria-current={seleccionada || undefined}
              onClick={() => alElegir(opcion.id)}
              className={seleccionada ? `${clases.opcion} ${clases.opcion_seleccionada}` : clases.opcion}
            >
              <span className={clases.icono_caja}>
                <Icono name="empresa" />
              </span>
              <span className="min-w-0 flex-1">
                <strong className={clases.titulo}>{opcion.titulo}</strong>
                <span className={clases.subtitulo}>{opcion.subtitulo}</span>
              </span>
              {seleccionada && <Icono name="verificado" className="h-4 w-4 flex-none text-primario" />}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
