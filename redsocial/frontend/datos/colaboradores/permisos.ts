import type { IconName } from '../../tipos/compartido/icono'
import type { Modulo, FilaPermiso } from '@/tipos/colaboradores/pagina_invitar_colaborador_rol_permisos'

export const MODULOS: Modulo[] = [
  { icono: 'planillas', clase: 'bg-[#ede9fe] text-morado-categoria', nombre: 'Planillas', descripcion: 'Empleados, planillas, cálculos y pagos', activo: true },
  { icono: 'contabilidad', clase: 'bg-[#d1fae5] text-[#059669]', nombre: 'Contabilidad', descripcion: 'Asientos, libros y reportes contables' },
  { icono: 'inventario', clase: 'bg-[#ffedd5] text-[#ea580c]', nombre: 'Inventario', descripcion: 'Productos, almacenes y movimientos' },
  { icono: 'ventas', clase: 'bg-[#dbeafe] text-[#2563eb]', nombre: 'Ventas', descripcion: 'Cotizaciones, pedidos y facturación' },
  { icono: 'compras', clase: 'bg-[#fee2e2] text-[#dc2626]', nombre: 'Compras', descripcion: 'Proveedores, órdenes y compras' },
  { icono: 'proyectos' as IconName, clase: 'bg-[#cffafe] text-[#0891b2]', nombre: 'Proyectos', descripcion: 'Tareas, avances y costos' },
  { icono: 'reportes', clase: 'bg-[#fef9c3] text-[#ca8a04]', nombre: 'Reportes', descripcion: 'Dashboards y tableros' },
  { icono: 'configuracion', clase: 'bg-[#f3f4f6] text-[#6b7280]', nombre: 'Configuración', descripcion: 'Parámetros y configuración del sistema' },
]

export const PERFILES_NIVEL_RAPIDO = ['Supervisor de Planillas', 'Operador de Planillas', 'Consultor de Planillas', 'Solo lectura', 'Sin permisos']

export const PERFIL_APLICADO = 'Supervisor de Planillas'

export const FILAS: FilaPermiso[] = [
  { nombre: 'Empleados', descripcion: 'Ver y gestionar información de empleados', activos: ['ver'] },
  { nombre: 'Planillas', descripcion: 'Crear y editar planillas', activos: ['ver', 'crear', 'editar'] },
  { nombre: 'Cálculos', descripcion: 'Realizar cálculos de planillas', activos: ['ver', 'crear', 'editar'] },
  { nombre: 'Pagos', descripcion: 'Registrar y gestionar pagos', activos: ['ver', 'crear', 'editar'] },
  { nombre: 'Reportes', descripcion: 'Generar reportes de planillas', activos: ['ver', 'exportar'] },
  { nombre: 'Configuración del módulo', descripcion: 'Configurar parámetros de planillas', activos: ['sin-acceso'] },
]
