import type { Plantilla, ReporteReciente } from '@/tipos/reportes/pagina_reportes'

export const PLANTILLAS: Plantilla[] = [
  {
    nombre: 'Estado de Resultados', icono: 'documento', color: 'morado',
    descripcion: 'Resumen de ingresos, costos y gastos para determinar la utilidad neta.',
    modulo: 'Contabilidad',
    grafico: { tipo: 'barras', barras: [
      { v: '35%', c: '#c4b5fd' }, { v: '55%', c: '#c4b5fd' }, { v: '45%', c: '#7c3aed' },
      { v: '75%', c: '#c4b5fd' }, { v: '90%', c: '#7c3aed' }, { v: '60%', c: '#c4b5fd' },
    ] },
  },
  {
    nombre: 'Balance General', icono: 'documento', color: 'verde',
    descripcion: 'Situación financiera de la empresa en una fecha determinada.',
    modulo: 'Contabilidad',
    grafico: { tipo: 'linea', color: '#22c55e', puntos: '0,30 20,26 40,32 60,18 80,22 100,10 120,14' },
  },
  {
    nombre: 'Flujo de Caja', icono: 'actualizar', color: 'naranja',
    descripcion: 'Entradas y salidas de efectivo en el periodo seleccionado.',
    modulo: 'Tesorería',
    grafico: { tipo: 'barras', barras: [
      { v: '30%', c: '#fed7aa' }, { v: '50%', c: '#fed7aa' }, { v: '65%', c: '#f97316' },
      { v: '45%', c: '#fed7aa' }, { v: '85%', c: '#f97316' }, { v: '55%', c: '#fed7aa' },
    ] },
  },
  {
    nombre: 'Ventas por Producto', icono: 'ventas', color: 'azul',
    descripcion: 'Análisis de productos más vendidos y su rentabilidad.',
    modulo: 'Ventas',
    grafico: { tipo: 'dona-lista', conic: 'conic-gradient(#3b82f6 0% 60%, #93c5fd 60% 100%)' },
  },
  {
    nombre: 'Cuentas por Cobrar', icono: 'documento', color: 'verde',
    descripcion: 'Detalle de saldos pendientes de cobro de clientes.',
    modulo: 'Contabilidad',
    grafico: { tipo: 'lista' },
  },
  {
    nombre: 'Cuentas por Pagar', icono: 'documento', color: 'rojo',
    descripcion: 'Detalle de saldos pendientes de pago a proveedores.',
    modulo: 'Contabilidad',
    grafico: { tipo: 'lista' },
  },
  {
    nombre: 'Inventario Valorizado', icono: 'caja', color: 'morado',
    descripcion: 'Valor total del inventario por categoría y almacén.',
    modulo: 'Inventarios',
    grafico: { tipo: 'barras', barras: [
      { v: '40%', c: '#ddd6fe' }, { v: '60%', c: '#ddd6fe' }, { v: '50%', c: '#7c3aed' },
      { v: '80%', c: '#ddd6fe' }, { v: '95%', c: '#7c3aed' }, { v: '65%', c: '#ddd6fe' },
    ] },
  },
  {
    nombre: 'Rotación de Inventario', icono: 'actualizar', color: 'azul',
    descripcion: 'Análisis de rotación y días de inventario.',
    modulo: 'Inventarios',
    grafico: { tipo: 'linea', color: '#3b82f6', puntos: '0,20 20,30 40,15 60,25 80,12 100,22 120,8' },
  },
  {
    nombre: 'Planilla de Empleados', icono: 'planillas', color: 'verde',
    descripcion: 'Resumen de remuneraciones y beneficios del personal.',
    modulo: 'Planillas',
    grafico: { tipo: 'lista' },
  },
  {
    nombre: 'Rentabilidad por Proyecto', icono: 'maletin', color: 'morado',
    descripcion: 'Análisis de ingresos, costos y utilidad por proyecto.',
    modulo: 'Proyectos',
    grafico: { tipo: 'barras', barras: [
      { v: '45%', c: '#ddd6fe' }, { v: '65%', c: '#7c3aed' }, { v: '55%', c: '#ddd6fe' },
      { v: '85%', c: '#7c3aed' }, { v: '70%', c: '#ddd6fe' }, { v: '90%', c: '#7c3aed' },
    ] },
  },
]

export const REPORTES_RECIENTES: ReporteReciente[] = [
  { nombre: 'Estado de Resultados', modulo: 'Contabilidad', periodo: 'Junio 2026', autor: 'Pedro Lozano', fecha: '15/06/2026 09:15 AM', formato: 'pdf' },
  { nombre: 'Flujo de Caja', modulo: 'Tesorería', periodo: 'Junio 2026', autor: 'María Fernández', fecha: '15/06/2026 08:45 AM', formato: 'excel' },
  { nombre: 'Ventas por Producto', modulo: 'Ventas', periodo: 'Junio 2026', autor: 'Luis Rodríguez', fecha: '14/06/2026 06:30 PM', formato: 'pdf' },
  { nombre: 'Inventario Valorizado', modulo: 'Inventarios', periodo: 'Junio 2026', autor: 'Ana García', fecha: '14/06/2026 04:20 PM', formato: 'excel' },
  { nombre: 'Balance General', modulo: 'Contabilidad', periodo: 'Mayo 2026', autor: 'Pedro Lozano', fecha: '13/06/2026 11:10 AM', formato: 'pdf' },
]
