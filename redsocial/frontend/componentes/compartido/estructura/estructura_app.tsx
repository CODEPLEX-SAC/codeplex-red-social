import { useEffect, useState } from 'react'
import { BarraLateral } from '../navegacion/barra_lateral'
import { BarraSuperior } from '../navegacion/barra_superior'
import type { EstructuraAppProps } from '@/tipos/compartido/estructura_app'

const CONSULTA_MOVIL = '(max-width: 800px)'

export function EstructuraApp({
  children,
  paginaActiva,
  alturaCompleta,
}: EstructuraAppProps) {
  const [colapsado, setColapsado] = useState(false)

  const [movilAbierto, setMovilAbierto] = useState(false)

  useEffect(() => {
    const consulta = window.matchMedia(CONSULTA_MOVIL)

    const cerrarMovil = () => setMovilAbierto(false)

    consulta.addEventListener('change', cerrarMovil)

    return () => consulta.removeEventListener('change', cerrarMovil)
  }, [])


  function alAlternarSidebar() {
    if (window.matchMedia(CONSULTA_MOVIL).matches) {
      setMovilAbierto((abierto) => !abierto)
      return
    }
    setColapsado((actual) => !actual)
  }

  return (
    <div className="flex min-h-screen flex-col bg-fondo">
      <BarraSuperior
        onAlternarSidebar={alAlternarSidebar}
        colapsado={colapsado}
      />

      <div className="flex flex-1">
        <BarraLateral
          paginaActiva={paginaActiva}
          colapsado={colapsado}
          movilAbierto={movilAbierto}
          onNavegar={() => setMovilAbierto(false)}
        />

        {movilAbierto && (
          <div
            onClick={() => setMovilAbierto(false)}
            className="fixed inset-x-0 bottom-0 top-16 z-[19] hidden bg-[rgba(15,12,30,.35)] max-[800px]:block"
          />
        )}

        <main
          className={
            'mx-auto min-w-0 max-w-[1680px] flex-1 px-6 pb-[42px] pt-[25px] max-[800px]:px-3 max-[800px]:pb-[18px] max-[800px]:pt-[18px] ' +
            (alturaCompleta
              ? 'flex h-[calc(100dvh-64px)] min-h-0 overflow-hidden'
              : '')
          }
        >
          {children}
        </main>
      </div>
    </div>
  )
 }