import { useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { BotonIcono } from './boton_icono'
import { CampoBusqueda } from './campo_busqueda'
import { ListaOpcionesBuscables } from './lista_opciones_buscables'
import type { PanelSelectorBuscableProps } from '@/tipos/compartido/contrato_selector_buscable'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.selector_buscable

export function PanelSelectorBuscable({ seleccionadaId, resultado, texto, textos, alCambiarTexto, alLimpiar, alElegir }: PanelSelectorBuscableProps) {
  const panel = useRef<HTMLDivElement>(null)

  function moverFoco(evento: KeyboardEvent<HTMLDivElement>) {
    const abajo = evento.key === clases.tecla_abajo
    if (!abajo && evento.key !== clases.tecla_arriba) return
    const enfocables = [...(panel.current?.querySelectorAll<HTMLElement>(clases.enfocables) ?? [])]
    const actual = enfocables.indexOf(document.activeElement as HTMLElement)
    const destino = enfocables[Math.min(Math.max(actual + (abajo ? 1 : -1), 0), enfocables.length - 1)]
    evento.preventDefault()
    destino?.focus()
  }

  return (
    <div ref={panel} id={clases.id_panel} role="dialog" aria-label={textos.panel} className={clases.panel} onKeyDown={moverFoco}>
      <div className={clases.buscador}>
        <CampoBusqueda
          value={texto}
          placeholder={textos.buscar}
          aria-label={textos.buscar}
          onChange={(evento) => alCambiarTexto(evento.target.value)}
          accion={texto ? <BotonIcono icono="cerrar" type="button" aria-label={textos.limpiar} variant="discreto" size="default" onClick={alLimpiar} /> : undefined}
        />
      </div>
      {resultado.opciones.length === 0 ? (
        <p role="status" className={clases.vacio}>{textos.sin_resultados}</p>
      ) : (
        <ListaOpcionesBuscables opciones={resultado.opciones} seleccionadaId={seleccionadaId} etiqueta={textos.lista} alElegir={alElegir} />
      )}
      {resultado.total > resultado.opciones.length && (
        <p role="status" className={clases.pie}>{textos.resumen.replace(':mostradas', String(resultado.opciones.length)).replace(':total', String(resultado.total))}</p>
      )}
    </div>
  )
}
