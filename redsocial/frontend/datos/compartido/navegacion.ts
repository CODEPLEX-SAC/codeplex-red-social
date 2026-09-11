import type { AlertaBarraLateral, ModuloDisponible, ElementoNavegacion } from '../../tipos/compartido/navegacion'

export const NAV_PRINCIPAL: readonly ElementoNavegacion[] = [
  { clave: 'inicio', etiqueta: 'Inicio', archivo: '01-01-inicio-web.html', icono: 'inicio' },
  { clave: 'actividad', etiqueta: 'Actividad', archivo: '02-02-actividad-01-todas-web.html', icono: 'actividad' },
  { clave: 'notificaciones', etiqueta: 'Notificaciones', archivo: null, insignia: 3, icono: 'notificaciones' },
  { clave: 'mensajes', etiqueta: 'Mensajes', archivo: '09-04-mensajes-01-todos-web.html', insignia: 5, icono: 'mensajes' },
  { clave: 'amigos', etiqueta: 'Amigos', archivo: '15-05-amigos-01-todos-web.html', icono: 'amigos' },
  { clave: 'grupos', etiqueta: 'Grupos', archivo: '19-06-grupos-01-web-misgrupos.html', icono: 'grupos' },
  { clave: 'marketplace', etiqueta: 'Marketplace', archivo: '22-07-marketplace-web-03.html', icono: 'marketplace' },
  { clave: 'eventos', etiqueta: 'Eventos', archivo: '23-08-eventos-01-para-ti-web.html', icono: 'eventos' },
  { clave: 'guardados', etiqueta: 'Guardados', archivo: null, icono: 'guardados' },
]

export const ESPACIO_TRABAJO: readonly ElementoNavegacion[] = [
  { clave: 'colaboradores', etiqueta: 'Colaboradores', archivo: '29-10-colaboradores-todos.html', icono: 'colaboradores' },
  { clave: 'dashboard', etiqueta: 'Dashboard', archivo: '34-11-dashboard.html', icono: 'dashboard' },
  { clave: 'estadisticas', etiqueta: 'Estadísticas', archivo: '35-12-estadisticas-01-todos-modulos.html', icono: 'estadisticas' },
  { clave: 'reportes', etiqueta: 'Reportes', archivo: '39-13-reportes.html', icono: 'reportes' },
  { clave: 'indicadores', etiqueta: 'Indicadores clave', archivo: '40-14-indicadores-clave.html', icono: 'indicadores' },
]

export const MODULOS_DISPONIBLES: readonly ModuloDisponible[] = [
  { etiqueta: 'Planillas', descripcion: 'RRHH y nómina', color: '#1e9a68', icono: 'colaboradores' },
  { etiqueta: 'Contabilidad', descripcion: 'Finanzas y registros', color: '#3d6bf4', icono: 'moneda' },
  { etiqueta: 'Inventario', descripcion: 'Almacén y stock', color: '#e08a1e', icono: 'caja' },
  { etiqueta: 'Ventas', descripcion: 'Facturación y clientes', color: '#0f9ea8', icono: 'marketplace' },
  { etiqueta: 'Proyectos', descripcion: 'Gestión de proyectos', color: '#e5484d', icono: 'maletin' },
  { etiqueta: 'Reportes', descripcion: 'Análisis e informes', color: '#7a5af4', icono: 'reportes' },
]

export const ALERTAS_SIDEBAR: readonly AlertaBarraLateral[] = [
  { severidad: 'peligro', titulo: '3 facturas por vencer', detalle: 'Por cobrar S/ 45,000' },
  { severidad: 'advertencia', titulo: 'Stock bajo en 5 productos', detalle: 'Requieren reposición' },
  { severidad: 'neutro', titulo: '2 pagos pendientes', detalle: 'Vencen en los próximos 7 días' },
]
