import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { navegar } from '../../enrutamiento/navegacion'
import { ARCHIVO_A_RUTA } from '../../enrutamiento/rutas'
import type { IconName } from '../../tipos/compartido/icono'
import type { Modulo, ClavePermiso, FilaPermiso } from '@/tipos/colaboradores/pagina_invitar_colaborador_rol_permisos'

const MODULOS: Modulo[] = [
  { icono: 'planillas', clase: 'bg-[#ede9fe] text-morado-categoria', nombre: 'Planillas', descripcion: 'Empleados, planillas, cálculos y pagos', activo: true },
  { icono: 'contabilidad', clase: 'bg-[#d1fae5] text-[#059669]', nombre: 'Contabilidad', descripcion: 'Asientos, libros y reportes contables' },
  { icono: 'inventario', clase: 'bg-[#ffedd5] text-[#ea580c]', nombre: 'Inventario', descripcion: 'Productos, almacenes y movimientos' },
  { icono: 'ventas', clase: 'bg-[#dbeafe] text-[#2563eb]', nombre: 'Ventas', descripcion: 'Cotizaciones, pedidos y facturación' },
  { icono: 'compras', clase: 'bg-[#fee2e2] text-[#dc2626]', nombre: 'Compras', descripcion: 'Proveedores, órdenes y compras' },
  { icono: 'proyectos' as IconName, clase: 'bg-[#cffafe] text-[#0891b2]', nombre: 'Proyectos', descripcion: 'Tareas, avances y costos' },
  { icono: 'reportes', clase: 'bg-[#fef9c3] text-[#ca8a04]', nombre: 'Reportes', descripcion: 'Dashboards y tableros' },
  { icono: 'configuracion', clase: 'bg-[#f3f4f6] text-[#6b7280]', nombre: 'Configuración', descripcion: 'Parámetros y configuración del sistema' },
]

const COLUMNAS: { clave: ClavePermiso; icono: IconName; color: string; etiqueta: string }[] = [
  { clave: 'sin-acceso', icono: 'sin-acceso', color: '#ef4444', etiqueta: 'Sin acceso' },
  { clave: 'ver', icono: 'ver', color: '#3b82f6', etiqueta: 'Ver' },
  { clave: 'crear', icono: 'mas', color: '#10b981', etiqueta: 'Crear' },
  { clave: 'editar', icono: 'editar', color: '#f97316', etiqueta: 'Editar' },
  { clave: 'eliminar', icono: 'eliminar', color: '#ef4444', etiqueta: 'Eliminar' },
  { clave: 'imprimir', icono: 'imprimir', color: '#8b5cf6', etiqueta: 'Imprimir' },
  { clave: 'exportar', icono: 'descargar', color: '#10b981', etiqueta: 'Exportar' },
]

const CLASES_RADIO: Record<ClavePermiso, { bg: string; punto: string }> = {
  'sin-acceso': { bg: 'bg-[#fef2f2] border-[#ef4444]', punto: 'bg-[#ef4444]' },
  ver: { bg: 'bg-[#eff6ff] border-azul-categoria', punto: 'bg-azul-categoria' },
  crear: { bg: 'bg-[#ecfdf5] border-[#10b981]', punto: 'bg-[#10b981]' },
  editar: { bg: 'bg-[#fff7ed] border-naranja-categoria', punto: 'bg-naranja-categoria' },
  eliminar: { bg: 'bg-[#fef2f2] border-[#ef4444]', punto: 'bg-[#ef4444]' },
  imprimir: { bg: 'bg-[#f5f3ff] border-[#8b5cf6]', punto: 'bg-[#8b5cf6]' },
  exportar: { bg: 'bg-[#ecfdf5] border-[#10b981]', punto: 'bg-[#10b981]' },
}

const FILAS: FilaPermiso[] = [
  { nombre: 'Empleados', descripcion: 'Ver y gestionar información de empleados', activos: ['ver'] },
  { nombre: 'Planillas', descripcion: 'Crear y editar planillas', activos: ['ver', 'crear', 'editar'] },
  { nombre: 'Cálculos', descripcion: 'Realizar cálculos de planillas', activos: ['ver', 'crear', 'editar'] },
  { nombre: 'Pagos', descripcion: 'Registrar y gestionar pagos', activos: ['ver', 'crear', 'editar'] },
  { nombre: 'Reportes', descripcion: 'Generar reportes de planillas', activos: ['ver', 'exportar'] },
  { nombre: 'Configuración del módulo', descripcion: 'Configurar parámetros de planillas', activos: ['sin-acceso'] },
]

function RadioPermiso({ activo }: { activo: boolean }) {
  if (!activo) {
    return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#d1d5db] bg-white" />
  }
  return null
}

function CeldaPermiso({ columna, activa }: { columna: (typeof COLUMNAS)[number]; activa: boolean }) {
  if (!activa) return <RadioPermiso activo={false} />
  const clases = CLASES_RADIO[columna.clave]
  return (
    <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full border-2 ${clases.bg}`}>
      <span className={`h-2.5 w-2.5 rounded-full ${clases.punto}`} />
    </span>
  )
}

const NAVEGAR_A = (archivo: string) => {
  navegar(ARCHIVO_A_RUTA[archivo] ?? archivo)
}

export function PaginaInvitarColaboradorRolPermisos() {
  return (
    <EstructuraApp paginaActiva="colaboradores">
      <div className="mx-auto my-5 max-w-[960px] overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-[960px]:m-3 max-[960px]:rounded-xl max-[480px]:m-1">
        <div className="flex items-start justify-between px-7 pt-6 max-[768px]:px-4 max-[768px]:pt-4 max-[480px]:px-3 max-[480px]:pt-3">
          <div>
            <h1 className="m-0 mb-1 text-[1.35rem] font-bold text-gris-oscuro-texto max-[768px]:text-[1.1rem]">Invitar colaborador</h1>
            <p className="m-0 max-w-[500px] text-[0.85rem] leading-snug text-gris-texto-secundario max-[768px]:text-[0.8rem]">
              Envía una invitación para que sea una a tu equipo y pueda usar los sistemas según el rol asignado.
            </p>
          </div>
          <div className="flex flex-none items-center gap-2 max-[768px]:gap-1">
            <button type="button" title="Configuración" className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8">
              <Icono name="ajustes-sistema" className="w-5 h-5" />
            </button>
            <button type="button" title="Aplicaciones" className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8">
              <Icono name={'aplicaciones' as IconName} className="w-5 h-5" />
            </button>
            <button type="button" title="Notificaciones" className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8">
              <Icono name="notificaciones" className="w-5 h-5" />
            </button>
            <button
              type="button"
              title="Cerrar"
              onClick={() => NAVEGAR_A('29-10-colaboradores-todos.html')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8"
            >
              <Icono name="cerrar" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex items-center gap-0 px-7 pt-5 max-[960px]:overflow-x-auto max-[960px]:[scrollbar-width:none] max-[960px]:[&::-webkit-scrollbar]:hidden max-[768px]:px-4 max-[768px]:pt-3.5 max-[480px]:px-3 max-[480px]:pt-2.5">
          {['Información', 'Rol y permisos', 'Vigencia', 'Resumen'].map((paso, i) => (
            <span key={paso} className="contents">
              <span className="flex flex-none items-center gap-2">
                <span
                  className={
                    'flex h-7 w-7 flex-none items-center justify-center rounded-full text-[0.8rem] font-bold transition-all max-[480px]:h-6 max-[480px]:w-6 max-[480px]:text-[0.72rem] ' +
                    (i === 0 ? 'bg-[#d1fae5] text-[#059669]' : i === 1 ? 'bg-primario text-white' : '')
                  }
                >
                  {i + 1}
                </span>
                <span
                  className={
                    'whitespace-nowrap text-[0.82rem] max-[480px]:text-xs ' +
                    (i === 1 ? 'font-semibold text-gris-oscuro-texto' : i === 0 ? 'font-medium text-gris-texto-secundario' : 'font-medium text-[#9ca3af]')
                  }
                >
                  {paso}
                </span>
              </span>
              {i < 3 && <span className={'mx-3 h-0.5 flex-1 max-[480px]:mx-2 ' + (i === 0 ? 'bg-primario' : 'bg-gris-borde')} />}
            </span>
          ))}
        </nav>

        <div className="px-7 pt-5 max-[768px]:px-4">
          <h2 className="m-0 mb-1 text-[1.15rem] font-bold text-gris-oscuro-texto max-[480px]:text-[0.9rem]">2. Rol y permisos</h2>
          <p className="m-0 text-[0.85rem] leading-snug text-gris-texto-secundario">Selecciona el rol del colaborador y asigna los permisos por módulo.</p>
        </div>

        <div className="grid grid-cols-[240px_1fr] min-h-[400px] max-[960px]:grid-cols-1">
          <aside className="border-r border-gris-borde py-6 max-[960px]:flex max-[960px]:gap-1 max-[960px]:overflow-x-auto max-[960px]:border-b max-[960px]:border-r-0 max-[960px]:px-4 max-[960px]:py-3">
            <p className="mb-2 px-5 text-[0.82rem] font-semibold text-gris-texto max-[960px]:hidden">Seleccionar módulo</p>
            <ul className="m-0 list-none p-0 max-[960px]:flex max-[960px]:gap-1">
              {MODULOS.map((m) => (
                <li
                  key={m.nombre}
                  className={
                    'relative flex cursor-pointer items-center gap-3 px-5 py-3 hover:bg-[#f9fafb] max-[960px]:flex-shrink-0 max-[960px]:px-3 max-[960px]:py-2 ' +
                    (m.activo ? 'bg-[#f0f0ff]' : '')
                  }
                >
                  {m.activo && <span className="absolute inset-y-0 left-0 w-[3px] bg-primario" />}
                  <div className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg ${m.clase}`}>
                    <Icono name={m.icono} className="w-[18px] h-[18px]" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className={'text-[0.85rem] font-semibold ' + (m.activo ? 'text-primario' : 'text-gris-oscuro-texto')}>{m.nombre}</span>
                    <span className="truncate text-[0.72rem] text-gris-texto-terciario max-[960px]:hidden">{m.descripcion}</span>
                  </div>
                  {m.activo && (
                    <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primario">
                      <Icono name="verificado" className="w-3 h-3 text-white" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="mx-4 mt-4 rounded-lg border border-[#bfdbfe] bg-[#f0f7ff] px-3 py-2.5 max-[960px]:hidden">
              <p className="m-0 text-[0.72rem] leading-snug text-[#1e40af]">
                Los permisos asignados se aplicarán únicamente a este módulo. Podrás configurar otros módulos en los siguientes pasos.
              </p>
            </div>
          </aside>

          <div className="flex flex-col p-7 max-[960px]:p-4">
            <div className="mb-3 flex items-center justify-between gap-3 rounded-[10px] bg-[#f9fafb] px-4 py-3.5 max-[960px]:flex-col max-[960px]:items-start">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primario">
                  <Icono name="inicio-sesion" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="m-0 text-[0.85rem] font-semibold text-gris-oscuro-texto">Seleccionar nivel rápido (perfil del módulo)</h3>
                  <p className="m-0 mt-0.5 text-[0.72rem] text-gris-texto-terciario">Aplica un conjunto de permisos predefinido para este módulo.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 max-[960px]:w-full max-[960px]:flex-col max-[960px]:items-start">
                <select
                  defaultValue="Supervisor de Planillas"
                  className="min-w-[200px] rounded-lg border border-[#d1d5db] bg-white px-3 py-2 text-[0.82rem] text-gris-oscuro-texto max-[960px]:w-full"
                >
                  <option>Supervisor de Planillas</option>
                  <option>Operador de Planillas</option>
                  <option>Consultor de Planillas</option>
                  <option>Solo lectura</option>
                  <option>Sin permisos</option>
                </select>
                <a href="#" className="flex items-center gap-1 whitespace-nowrap text-[0.82rem] font-medium text-primario no-underline hover:underline">
                  Ver perfiles <Icono name="alerta" className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between gap-2 rounded-lg border border-[#a7f3d0] bg-[#ecfdf5] px-3.5 py-2.5 max-[960px]:flex-col max-[960px]:items-start">
              <div className="flex items-center gap-2">
                <Icono name="verificado" className="w-[18px] h-[18px] text-[#059669]" />
                <span className="text-[0.82rem] font-semibold text-[#065f46]">
                  Perfil aplicado: <strong className="font-bold">Supervisor de Planillas</strong>
                </span>
              </div>
              <span className="text-[0.75rem] text-[#059669]">Puedes modificar cualquier permiso de forma personalizada.</span>
            </div>

            <div className="mb-4 overflow-x-auto">
              <table className="w-full border-collapse max-[480px]:text-[0.7rem]">
                <thead>
                  <tr>
                    <th className="min-w-[180px] whitespace-nowrap border-b border-gris-borde py-2 pr-1.5 text-left text-[0.72rem] font-semibold text-gris-texto-secundario">Permiso</th>
                    {COLUMNAS.map((c) => (
                      <th key={c.clave} className="whitespace-nowrap border-b border-gris-borde px-1.5 py-2 text-center text-[0.72rem] font-semibold text-gris-texto-secundario">
                        {c.etiqueta} <Icono name={c.icono} className="inline-block w-4 h-4 align-middle" style={{ color: c.color }} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FILAS.map((fila) => (
                    <tr key={fila.nombre}>
                      <td className="border-b border-[#f3f4f6] py-2.5 pr-1.5 text-left align-middle">
                        <div className="flex flex-col gap-px">
                          <span className="flex items-center gap-1.5 text-[0.82rem] font-semibold text-gris-oscuro-texto">
                            <span className="text-[0.7rem] text-gris-texto-terciario">›</span> {fila.nombre}
                          </span>
                          <span className="text-[0.7rem] text-gris-texto-terciario">{fila.descripcion}</span>
                        </div>
                      </td>
                      {COLUMNAS.map((c) => (
                        <td key={c.clave} className="border-b border-[#f3f4f6] px-1.5 py-2.5 text-center align-middle">
                          <CeldaPermiso columna={c} activa={fila.activos.includes(c.clave)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 max-[960px]:flex-col max-[960px]:items-start">
              <button type="button" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#d1d5db] bg-white px-3.5 py-[7px] text-[0.78rem] font-medium text-gris-texto hover:bg-[#f9fafb]">
                <Icono name="configuracion" className="w-[14px] h-[14px]" /> Restablecer permisos
              </button>
              <div className="flex flex-wrap items-center gap-3.5">
                {COLUMNAS.map((c) => (
                  <span key={c.clave} className="flex items-center gap-1.5 text-[0.72rem] text-gris-texto-secundario">
                    <span className={'h-2 w-2 rounded-full ' + CLASES_RADIO[c.clave].punto} /> {c.etiqueta}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gris-borde px-7 py-4 max-[768px]:flex-col-reverse max-[480px]:px-3 max-[480px]:py-2.5">
          <button
            type="button"
            onClick={() => NAVEGAR_A('29-10-colaboradores-todos.html')}
            className="rounded-lg border border-[#d1d5db] bg-white px-6 py-2.5 text-[0.875rem] font-medium text-gris-texto hover:bg-[#f9fafb] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => NAVEGAR_A('30-10-colaboradores-popub-invitar-colaborador-01-informacion.html')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d1d5db] bg-white px-6 py-2.5 text-[0.875rem] font-medium text-gris-texto hover:bg-[#f9fafb] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            <span>‹</span> Anterior
          </button>
          <button
            type="button"
            onClick={() => NAVEGAR_A('32-10-colaboradores-popub-invitar-colaborador-03-vigencia.html')}
            className="inline-flex items-center gap-1.5 rounded-lg border-0 bg-primario px-6 py-2.5 text-[0.875rem] font-semibold text-white hover:bg-[#4a35d4] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            Siguiente <span>›</span>
          </button>
        </div>
      </div>
    </EstructuraApp>
  )
}
