import type { EventoModulo } from '@/tipos/actividad/pagina_actividad_modulos'

export const EVENTOS_MODULO: EventoModulo[] = [
  { nombre: 'Contabilidad', icono: 'contabilidad', color: 'verde', descripcion: 'María Fernández registró un asiento contable', referencia: 'Asiento: A-006587', colorReferencia: 'verde', detalles: 'Empresa: Constructora del Norte SAC', tiempo: 'Hace 2 horas' },
  { nombre: 'Compras', icono: 'compras', color: 'azul', descripcion: 'Carlos Mendoza aprobó una orden de compra', referencia: 'OC: C-2026-0451', colorReferencia: 'azul', detalles: 'Proveedor: Inversiones Globales SAC', tiempo: 'Hace 3 horas' },
  { nombre: 'Ventas', icono: 'ventas', color: 'naranja', descripcion: 'Lucía Gómez emitió una factura electrónica', referencia: 'Factura: F001-0001523', colorReferencia: 'naranja', detalles: 'Cliente: Servicios Generales SAC', tiempo: 'Hace 4 horas' },
  { nombre: 'Inventario', icono: 'inventario', color: 'azul', descripcion: 'Diego Torres actualizó el stock de un producto', referencia: 'Producto: Cemento Tipo I', colorReferencia: 'rosa', detalles: 'Almacén: Principal', tiempo: 'Hace 5 horas' },
  { nombre: 'Planillas', icono: 'planillas', color: 'naranja', descripcion: 'Sofía Ramírez procesó las planillas de abril 2026', referencia: 'Período: 2026-04', colorReferencia: 'verde', detalles: 'Trabajadores: 52', tiempo: 'Hace 6 horas' },
  { nombre: 'Reportes', icono: 'reportes-barra', color: 'naranja', descripcion: 'Jorge Luis generó el reporte de Estado de Resultados', referencia: 'Reporte: ER_Abril_2026', colorReferencia: 'naranja', detalles: 'Formato: PDF', tiempo: 'Hace 7 horas' },
]
