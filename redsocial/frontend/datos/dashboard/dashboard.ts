import type { Kpi, Modulo } from '@/tipos/dashboard/pagina_dashboard'

export const KPIS: Kpi[] = [
  {
    icono: 'documento', color: 'azul', etiqueta: 'Ventas del mes', valor: 'S/ 1,250,000',
    variacion: { direccion: 'positiva', texto: '12.5%' },
    sparklinePuntos: '0,20 14,16 28,18 42,10 56,13 70,7 84,10 100,4', sparklineColor: '#3b82f6',
  },
  {
    icono: 'tarjeta-pago', color: 'rojo', etiqueta: 'Egresos del mes', valor: 'S/ 850,000',
    variacion: { direccion: 'negativa', texto: '8.3%' },
    sparklinePuntos: '0,6 14,12 28,8 42,16 56,12 70,20 84,15 100,18', sparklineColor: '#ef4444',
  },
  {
    icono: 'documento', color: 'azul', etiqueta: 'Utilidad neta', valor: 'S/ 400,000',
    variacion: { direccion: 'positiva', texto: '18.7%' },
    sparklinePuntos: '0,20 14,17 28,19 42,13 56,15 70,9 84,12 100,5', sparklineColor: '#3b82f6',
  },
  {
    icono: 'documento', color: 'morado', etiqueta: 'Margen de utilidad', valor: '32.0%',
    variacion: { direccion: 'positiva', texto: '4.5 pp' },
    sparklinePuntos: '0,16 14,19 28,12 42,14 56,8 70,11 84,6 100,9', sparklineColor: '#7c3aed',
  },
  {
    icono: 'documento', color: 'cian', etiqueta: 'Flujo de caja', valor: 'S/ 320,000',
    variacion: { direccion: 'positiva', texto: '22.1%' },
    sparklinePuntos: '0,18 14,9 28,15 42,7 56,17 70,5 84,13 100,10', sparklineColor: '#06b6d4',
  },
]

export const RATIOS = [
  { nombre: 'Liquidez corriente', valor: '2.15', estado: 'optimo' as const },
  { nombre: 'Prueba ácida', valor: '1.48', estado: 'optimo' as const },
  { nombre: 'Endeudamiento', valor: '0.35', estado: 'bajo' as const },
  { nombre: 'ROE', valor: '18.6%', estado: 'optimo' as const },
  { nombre: 'ROA', valor: '11.2%', estado: 'optimo' as const },
  { nombre: 'Rotación de inventario', valor: '6.8', estado: 'optimo' as const },
]

export const MODULOS: Modulo[] = [
  { icono: 'planillas', color: 'verde', nombre: 'Planillas', filas: [{ etiqueta: 'Empleados activos', valor: '120' }, { etiqueta: 'Planilla de junio', valor: 'Generada', badge: { estado: 'optimo', texto: 'Generada' } }] },
  { icono: 'moneda', color: 'azul', nombre: 'Contabilidad', filas: [{ etiqueta: 'Asientos del mes', valor: '152' }, { etiqueta: 'Estados financieros', valor: 'Actualizados' }] },
  { icono: 'caja', color: 'naranja', nombre: 'Inventarios', filas: [{ etiqueta: 'Productos activos', valor: '1,248' }, { etiqueta: 'Stock valorizado', valor: 'S/ 2,350,000' }] },
  { icono: 'maletin', color: 'morado', nombre: 'Proyectos', filas: [{ etiqueta: 'Proyectos en curso', valor: '8' }, { etiqueta: 'Avance promedio', valor: '65%' }] },
  { icono: 'carrito', color: 'cian', nombre: 'Ventas', filas: [{ etiqueta: 'Pedidos del mes', valor: '78' }, { etiqueta: 'Facturación del mes', valor: 'S/ 1,250,000' }] },
]

export const RANKING = [
  { nombre: 'Cemento Tipo I (42.5 kg)', ancho: 'w-[100%]', cantidad: '1,250', valor: 'S/ 125,000' },
  { nombre: 'Acero de Construcción 1/2"', ancho: 'w-[78%]', cantidad: '980', valor: 'S/ 98,000' },
  { nombre: 'Ladrillo King Kong 18 huecos', ancho: 'w-[68%]', cantidad: '850', valor: 'S/ 68,000' },
  { nombre: 'Arena Gruesa', ancho: 'w-[58%]', cantidad: '720', valor: 'S/ 43,000' },
  { nombre: 'Pintura Látex Blanca 4L', ancho: 'w-[49%]', cantidad: '610', valor: 'S/ 30,500' },
]

export const BARRAS_PROYECCION = [
  { mes: 'Jun', claseAlto: 'h-[75%]', tipo: 'real' as const },
  { mes: 'Jul', claseAlto: 'h-[80%]', tipo: 'real' as const },
  { mes: 'Ago', claseAlto: 'h-[88%]', tipo: 'real' as const },
  { mes: 'Sep', claseAlto: 'h-[100%]', tipo: 'proyeccion' as const },
  { mes: 'Oct', claseAlto: 'h-[92%]', tipo: 'proyeccion' as const },
  { mes: 'Nov', claseAlto: 'h-[96%]', tipo: 'proyeccion' as const },
]

export const DONA_SEGMENTOS = [
  { etiqueta: 'Construcción', color: 'azul', porcentaje: '45%', monto: 'S/ 562,500' },
  { etiqueta: 'Consultoría', color: 'morado', porcentaje: '25%', monto: 'S/ 312,500' },
  { etiqueta: 'Servicios', color: 'verde', porcentaje: '20%', monto: 'S/ 250,000' },
  { etiqueta: 'Otros', color: 'amarillo', porcentaje: '10%', monto: 'S/ 125,000' },
]

export const RESUMEN_DASHBOARD = {
  fecha: '15 de junio de 2026',
  comparativo: 'vs. Mayo 2026',
}

export const MESES_EJE_X_VENTAS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
export const MESES_EJE_X_FLUJO = ['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export const VENTAS_TOTAL_CHART = 'S/ 1,250,000'

export const TOOLTIP_PROYECCION_VENTAS = { mes: 'Octubre 2026', texto: 'Proyección: S/ 1,650,000' }
export const TOOLTIP_FLUJO_CAJA = { mes: 'Noviembre 2026', texto: 'Flujo proyectado: S/ 385,000' }
