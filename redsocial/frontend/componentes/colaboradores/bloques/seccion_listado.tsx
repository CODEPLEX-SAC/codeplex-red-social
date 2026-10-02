import { Pestanas } from '../../compartido/interfaz/pestanas'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Paginacion } from '../../compartido/interfaz/paginacion'
import { SeccionListado2 } from './seccion_listado2'
import { BloqueColaboradores1 } from './bloque_colaboradores1'
import { BloqueReenviar } from './bloque_reenviar'
import { BloqueFiltrosAvanzados } from './bloque_filtros_avanzados'
import { BloqueExportarColaboradores } from './bloque_exportar_colaboradores'
import { usarTablaColaboradores } from './usar_tabla_colaboradores'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

export function SeccionListado({ datos }: {
  datos: {
    COLABORADORES: Colaborador[]
    FILTROS_ESTADO_COLABORADORES: readonly { etiqueta: string; total: number; activa?: boolean }[]
    ESTADO_CLASES: Record<'activo' | 'invitado' | 'inactivo' | 'baja', { texto: string; punto: string; etiqueta: string; }>
    ROL_CLASES: Record<string, string>
    setMenuAbierto: (valor: number | null | ((actual: number | null) => number | null)) => void
    setAnclaMenu: (valor: HTMLElement | null | ((actual: HTMLElement | null) => HTMLElement | null)) => void
    menuAbierto: number | null
    anclaMenu: HTMLElement | null
    cerrarMenus: () => void
    alVerColaborador: (colaborador: Colaborador) => void
    alEditarColaborador: (colaborador: Colaborador) => void
    alConfirmarBaja: (colaborador: Colaborador) => void
  }
}) {
  const {
    COLABORADORES,
    FILTROS_ESTADO_COLABORADORES,
    ESTADO_CLASES,
    ROL_CLASES,
    setMenuAbierto,
    setAnclaMenu,
    menuAbierto,
    anclaMenu,
    cerrarMenus,
    alVerColaborador,
    alEditarColaborador,
    alConfirmarBaja,
  } = datos

  const {
    pestanaActiva, cambiarPestana, elementosPestana,
    busqueda, cambiarBusqueda,
    rol, cambiarRol, aplicacion, cambiarAplicacion, ordenarPor, cambiarOrdenarPor,
    tabla, filas, resumen,
  } = usarTablaColaboradores(COLABORADORES, FILTROS_ESTADO_COLABORADORES)

  const { pageIndex } = tabla.getState().pagination

  return (
    <section className="flex flex-col area-colaboradores">
      <SeccionListado2 />

      <Pestanas elementos={elementosPestana} activa={pestanaActiva} alCambiar={cambiarPestana} className="mb-5" />

      <div className="mb-4 flex flex-wrap items-center gap-3 max-900:flex-col max-900:items-stretch max-900:gap-2">
        <CampoBusqueda placeholder={catalogoColaboradores.placeholders.buscar_colaborador} className="min-w-60 flex-1 max-900:min-w-full" value={busqueda} onChange={cambiarBusqueda} />
        <div className="flex flex-none gap-2 max-900:grid max-900:w-full max-900:grid-cols-2">
          <BloqueFiltrosAvanzados />
          <BloqueExportarColaboradores />
        </div>
      </div>

      <BloqueColaboradores1 datos={{ rol, cambiarRol, aplicacion, cambiarAplicacion, ordenarPor, cambiarOrdenarPor }} />

      <div className="overflow-x-auto rounded-xl border border-gris-borde bg-white">
        <table className="w-full border-collapse text-cuerpo">
          <thead className="bg-t-f9fafb">
            <tr>
              <th className="w-10 whitespace-nowrap border-b border-gris-borde p-3.5 text-center text-encabezado-tabla font-semibold uppercase text-gris-texto-secundario">
                <Casilla
                  seleccionado={tabla.getIsAllPageRowsSelected()}
                  indeterminado={tabla.getIsSomePageRowsSelected() && !tabla.getIsAllPageRowsSelected()}
                  alCambiar={(_, marcado) => tabla.toggleAllPageRowsSelected(marcado)}
                  inputProps={{ 'aria-label': catalogoColaboradores.botones.seleccionar_todos }}
                />
              </th>
              <th className="whitespace-nowrap border-b border-gris-borde p-3.5 text-left text-encabezado-tabla font-semibold uppercase text-gris-texto-secundario">{catalogoColaboradores.tabla.colaborador}</th>
              <th className="whitespace-nowrap border-b border-gris-borde p-3.5 text-left text-encabezado-tabla font-semibold uppercase text-gris-texto-secundario">{catalogoColaboradores.tabla.rol_perfil}</th>
              <th className="whitespace-nowrap border-b border-gris-borde p-3.5 text-left text-encabezado-tabla font-semibold uppercase text-gris-texto-secundario">{catalogoColaboradores.tabla.aplicaciones}</th>
              <th className="whitespace-nowrap border-b border-gris-borde p-3.5 text-left text-encabezado-tabla font-semibold uppercase text-gris-texto-secundario">{catalogoColaboradores.tabla.estado}</th>
              <th className="whitespace-nowrap border-b border-gris-borde p-3.5 text-left text-encabezado-tabla font-semibold uppercase text-gris-texto-secundario">{catalogoColaboradores.tabla.vigencia}</th>
              <th className="whitespace-nowrap border-b border-gris-borde p-3.5 text-left text-encabezado-tabla font-semibold uppercase text-gris-texto-secundario">{catalogoColaboradores.tabla.acciones}</th>
            </tr>
          </thead>
          <tbody>
            {filas.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-cuerpo text-gris-texto-secundario">{catalogoColaboradores.mensajes.sin_colaboradores}</td>
              </tr>
            )}
            {filas.map((fila, i) => {
              const c = fila.original
              const estado = ESTADO_CLASES[c.estado]
              return (
                <BloqueReenviar key={fila.id}
                  datos={{
                    c,
                    ROL_CLASES,
                    estado,
                    setMenuAbierto,
                    i,
                    setAnclaMenu,
                    menuAbierto,
                    anclaMenu,
                    cerrarMenus,
                    alVerColaborador,
                    alEditarColaborador,
                    alConfirmarBaja,
                    seleccionado: fila.getIsSelected(),
                    alCambiarSeleccion: (_, marcado) => fila.toggleSelected(marcado),
                  }}
                />
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 py-4">
        <span className="text-auxiliar text-gris-texto-secundario">{resumen}</span>
        <Paginacion total={tabla.getPageCount()} pagina={pageIndex + 1} alCambiar={(nuevaPagina) => tabla.setPageIndex(nuevaPagina - 1)} />
      </div>
    </section>
  )
}
