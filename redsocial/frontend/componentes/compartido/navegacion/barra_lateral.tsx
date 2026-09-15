import { Icono } from '../icono'
import { SuperficieColor } from '../interfaz/superficie_color'
import { AVISOS_SIDEBAR, ESPACIO_TRABAJO, MODULOS_DISPONIBLES, NAV_PRINCIPAL } from '../../../datos/compartido/navegacion'
import { ElementoNavegacion } from './elemento_navegacion'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { BarraLateralProps } from '@/tipos/compartido/barra_lateral'

export function BarraLateral({ paginaActiva, colapsado = false, movilAbierto = false, onNavegar }: BarraLateralProps) {
  return (
    <aside
      onClickCapture={(evento) => {
        if ((evento.target as HTMLElement).closest('a')) onNavegar?.()
      }}
      className={
        'flex flex-col gap-md overflow-y-auto border-r border-borde p-md ' +
        (colapsado ? 'w-19 max-[800px]:w-60' : 'w-60') +
        ' max-[800px]:fixed max-[800px]:top-16 max-[800px]:bottom-0 max-[800px]:left-0 max-[800px]:z-20 max-[800px]:bg-superficie max-[800px]:shadow-[0_12px_30px_rgba(20,15,40,.18)] max-[800px]:transition-transform max-[800px]:duration-200 ' +
        (movilAbierto ? 'max-[800px]:translate-x-0' : 'max-[800px]:-translate-x-full')
      }
    >
      <nav aria-label={textosRedSocial.NAVEGACION_PRINCIPAL}>
        <ul className="flex list-none flex-col gap-xs p-0 m-0">
          {NAV_PRINCIPAL.map((item) => (
            <ElementoNavegacion key={item.clave} item={item} activo={item.clave === paginaActiva} colapsado={colapsado} />
          ))}
          <li>
            <a href="#" className={'flex items-center gap-sm rounded-control py-2 text-sm text-texto-suave no-underline ' + (colapsado ? 'justify-center px-0' : 'px-sm')}>
              <Icono name="puntos" />
              {!colapsado && <span>{textosRedSocial.VER_MAS}</span>}
            </a>
          </li>
        </ul>
      </nav>

      <div className="h-px bg-borde" />

      {!colapsado && (
        <span className="text-xs font-extrabold uppercase tracking-wide text-texto-suave">
          {textosRedSocial.ESPACIO_DE_TRABAJO}
        </span>
      )}
      <ul className="flex list-none flex-col gap-xs p-0 m-0">
        {ESPACIO_TRABAJO.map((item) => (
          <ElementoNavegacion key={item.clave} item={item} activo={item.clave === paginaActiva} colapsado={colapsado} />
        ))}
      </ul>

      <div className="h-px bg-borde" />

      {!colapsado && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wide text-texto-suave">
            {textosRedSocial.MODULOS_DISPONIBLES}
          </span>
          <button type="button" aria-label={textosRedSocial.AGREGAR_MODULO} className="flex h-6 w-6 items-center justify-center rounded-control border-0 bg-transparent">
            <Icono name="mas" />
          </button>
        </div>
      )}

      <ul className="flex list-none flex-col gap-xs p-0 m-0">
        {MODULOS_DISPONIBLES.map((modulo) => (
          <li key={modulo.etiqueta}>
            <a href="#" className={'flex items-center gap-sm rounded-control py-2 no-underline text-texto ' + (colapsado ? 'justify-center px-0' : 'px-sm')}>
              <SuperficieColor
                as="span"
                variante={modulo.color}
                className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-control text-white"
              >
                <Icono name={modulo.icono} />
              </SuperficieColor>
              {!colapsado && (
                <>
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-[11.5px]">{modulo.etiqueta}</strong>
                    <small className="block truncate text-[9.5px] text-texto-suave">{modulo.descripcion}</small>
                  </span>
                  <Icono name="flecha-derecha" className="flex-none text-texto-suave w-[13px] h-[13px]" />
                </>
              )}
            </a>
          </li>
        ))}
      </ul>

      {!colapsado && (
        <a href="#" className="block py-2 text-center text-xs font-semibold text-primario no-underline">
          {textosRedSocial.VER_TODOS_LOS_MODULOS}
        </a>
      )}

      {!colapsado && (
        <div className="mt-3.5 rounded-control border border-borde bg-[#faf9fd] p-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="m-0 text-[13px]">{textosRedSocial.SECCION_AVISOS}</h2>
            <a href="#" className="text-[11px] text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
          </div>
          <ul className="m-0 grid list-none gap-2.5 p-0">
            {AVISOS_SIDEBAR.map((item) => (
              <li key={item.titulo} className="flex items-start gap-2">
                <i
                  className={
                    'mt-1 h-1.75 w-1.75 flex-none rounded-full ' +
                    (item.severidad === 'peligro'
                      ? 'bg-peligro'
                      : item.severidad === 'advertencia'
                        ? 'bg-[#e0972a]'
                        : 'bg-[#9c99ab]')
                  }
                />
                <div>
                  <strong className="block text-[11px]">{item.titulo}</strong>
                  <span className="mt-0.5 block text-[9.5px] text-texto-suave">{item.detalle}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
