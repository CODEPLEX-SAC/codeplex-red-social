import { Icono } from '../icono'
import { ALERTAS_SIDEBAR, ESPACIO_TRABAJO, MODULOS_DISPONIBLES, NAV_PRINCIPAL } from '../../../datos/compartido/navegacion'
import { ElementoNavegacion } from './elemento_navegacion'
import type { BarraLateralProps } from '@/tipos/compartido/barra_lateral'

export function BarraLateral({ paginaActiva, colapsado = false, movilAbierto = false, onNavegar }: BarraLateralProps) {
  return (
    <aside
      onClickCapture={(evento) => {
        if ((evento.target as HTMLElement).closest('a')) onNavegar?.()
      }}
      className={
        'flex flex-col gap-md overflow-y-auto p-md ' +
        (colapsado ? 'w-19 max-[800px]:w-60' : 'w-60') +
        ' max-[800px]:fixed max-[800px]:top-16 max-[800px]:bottom-0 max-[800px]:left-0 max-[800px]:z-20 max-[800px]:bg-superficie max-[800px]:shadow-[0_12px_30px_rgba(20,15,40,.18)] max-[800px]:transition-transform max-[800px]:duration-200 ' +
        (movilAbierto ? 'max-[800px]:translate-x-0' : 'max-[800px]:-translate-x-full')
      }
    >
      <nav aria-label="Navegación principal">
        <ul className="flex list-none flex-col gap-xs p-0 m-0">
          {NAV_PRINCIPAL.map((item) => (
            <ElementoNavegacion key={item.clave} item={item} activo={item.clave === paginaActiva} colapsado={colapsado} />
          ))}
          <li>
            <a href="#" className={'flex items-center gap-sm rounded-control py-2 text-sm text-texto-suave no-underline ' + (colapsado ? 'justify-center px-0' : 'px-sm')}>
              <Icono name="puntos" />
              {!colapsado && <span>Ver más</span>}
            </a>
          </li>
        </ul>
      </nav>

      <div className="h-px bg-borde" />

      {!colapsado && (
        <span className="text-xs font-extrabold uppercase tracking-wide text-texto-suave">
          Espacio de trabajo
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
            Módulos disponibles
          </span>
          <button type="button" aria-label="Agregar módulo" className="flex h-6 w-6 items-center justify-center rounded-control border-0 bg-transparent">
            <Icono name="mas" />
          </button>
        </div>
      )}

      <ul className="flex list-none flex-col gap-xs p-0 m-0">
        {MODULOS_DISPONIBLES.map((modulo) => (
          <li key={modulo.etiqueta}>
            <a href="#" className={'flex items-center gap-sm rounded-control py-2 no-underline text-texto ' + (colapsado ? 'justify-center px-0' : 'px-sm')}>
              <span
                className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-control text-white"
                style={{ background: modulo.color }}
              >
                <Icono name={modulo.icono} />
              </span>
              {!colapsado && (
                <>
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-[11.5px]">{modulo.etiqueta}</strong>
                    <small className="block truncate text-[9.5px] text-texto-suave">{modulo.descripcion}</small>
                  </span>
                  <Icono name="flecha-derecha" className="flex-none text-texto-suave" style={{ width: 13, height: 13 }} />
                </>
              )}
            </a>
          </li>
        ))}
      </ul>

      {!colapsado && (
        <a href="#" className="block py-2 text-center text-xs font-semibold text-primario no-underline">
          Ver todos los módulos
        </a>
      )}

      {!colapsado && (
        <div className="mt-3.5 rounded-control border border-borde bg-[#faf9fd] p-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="m-0 text-[13px]">Alertas y notificaciones</h2>
            <a href="#" className="text-[11px] text-primario no-underline">Ver todos</a>
          </div>
          <ul className="m-0 grid list-none gap-2.5 p-0">
            {ALERTAS_SIDEBAR.map((alerta) => (
              <li key={alerta.titulo} className="flex items-start gap-2">
                <i
                  className={
                    'mt-1 h-1.75 w-1.75 flex-none rounded-full ' +
                    (alerta.severidad === 'peligro'
                      ? 'bg-peligro'
                      : alerta.severidad === 'advertencia'
                        ? 'bg-[#e0972a]'
                        : 'bg-[#9c99ab]')
                  }
                />
                <div>
                  <strong className="block text-[11px]">{alerta.titulo}</strong>
                  <span className="mt-0.5 block text-[9.5px] text-texto-suave">{alerta.detalle}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
