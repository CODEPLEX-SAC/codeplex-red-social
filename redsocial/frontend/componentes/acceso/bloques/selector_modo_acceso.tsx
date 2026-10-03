import type { KeyboardEvent } from 'react'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import type { ModoAcceso, SelectorModoAccesoProps } from '@/tipos/acceso/contrato_acceso'

const modos = catalogoAcceso.modos
const teclas = catalogoAcceso.teclas

function indiceDestino(tecla: string, actual: number) {
  if (tecla === teclas.siguiente) return (actual + 1) % modos.length
  if (tecla === teclas.anterior) return (actual - 1 + modos.length) % modos.length
  if (tecla === teclas.primera) return 0
  if (tecla === teclas.ultima) return modos.length - 1
  return undefined
}

export function SelectorModoAcceso({ modo, onCambiar }: SelectorModoAccesoProps) {
  function alPresionarTecla(evento: KeyboardEvent<HTMLDivElement>) {
    const destino = indiceDestino(evento.key, modos.findIndex((opcion) => opcion.clave === modo))
    if (destino === undefined) return
    evento.preventDefault()
    onCambiar(modos[destino].clave as ModoAcceso)
    document.getElementById(modos[destino].id)?.focus()
  }

  return (
    <div role="tablist" aria-label={catalogoAcceso.etiqueta_modos} onKeyDown={alPresionarTecla} className="flex rounded-control border border-borde bg-fondo p-0.75">
      {modos.map((opcion) => {
        const activa = opcion.clave === modo
        return (
          <button
            key={opcion.clave}
            id={opcion.id}
            type="button"
            role="tab"
            aria-selected={activa}
            aria-controls={catalogoAcceso.ids.panel}
            tabIndex={activa ? 0 : -1}
            onClick={() => onCambiar(opcion.clave as ModoAcceso)}
            className={`flex-1 cursor-pointer rounded-lg border-0 py-2 text-boton font-bold transition-colors ${
              activa ? 'bg-white text-primario shadow-sombra' : 'bg-transparent text-texto-suave hover:text-texto'
            }`}
          >
            {opcion.etiqueta}
          </button>
        )
      })}
    </div>
  )
}
