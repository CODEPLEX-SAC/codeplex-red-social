import { useState } from 'react'
import { BarraLateral } from '../navegacion/barra_lateral'
import { BarraSuperior } from '../navegacion/barra_superior'
import type { EstructuraAppProps } from '@/tipos/compartido/contrato_estructura_app'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const DESPLAZAMIENTO = catalogoCompartido.barra_lateral.desplazamiento

export function EstructuraApp({
  children,
  paginaActiva,
  alturaCompleta,
}: EstructuraAppProps) {
  const [colapsado, setColapsado] = useState(false)

  return (
    <div className={'flex min-h-screen flex-col bg-fondo transition-all duration-200 max-800:pl-0 ' + (colapsado ? DESPLAZAMIENTO.colapsado : DESPLAZAMIENTO.expandido)}>
      <BarraLateral paginaActiva={paginaActiva} colapsado={colapsado} alAlternarColapsado={setColapsado} />

      <BarraSuperior />

      <div className="flex flex-1">
        <main
          className={
            'mx-auto min-w-0 max-w-420 flex-1 px-6 pb-10.5 pt-6.25 max-800:px-3 max-800:pb-4.5 max-800:pt-4.5 ' +
            (alturaCompleta
              ? 'flex h-dvh-navbar min-h-0 overflow-hidden'
              : '')
          }
        >
          {children}
        </main>
      </div>
    </div>
  )
}
