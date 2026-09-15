import type { Kpi, FilaTabla, TarjetaModulo } from '@/tipos/indicadores/pagina_indicadores_clave'

export const KPIS: Kpi[] = [
  {
    icono: 'carrito', color: 'verde', etiqueta: 'Ventas Netas', valor: 'S/ 1,250,000',
    variacion: { direccion: 'positiva', texto: '12.5%' },
    sparklinePuntos: '0,20 14,16 28,18 42,10 56,13 70,7 84,10 100,4', sparklineColor: '#22c55e',
  },
  {
    icono: 'documento', color: 'verde', etiqueta: 'Utilidad Neta', valor: 'S/ 400,000',
    variacion: { direccion: 'positiva', texto: '18.7%' },
    sparklinePuntos: '0,18 14,20 28,14 42,16 56,10 70,13 84,7 100,9', sparklineColor: '#06b6d4',
  },
  {
    icono: 'estadisticas', color: 'morado', etiqueta: 'Margen de Utilidad', valor: '32.0%',
    variacion: { direccion: 'positiva', texto: '4.5 pp' },
    sparklinePuntos: '0,16 14,19 28,12 42,14 56,8 70,11 84,6 100,9', sparklineColor: '#7c3aed',
  },
  {
    icono: 'documento', color: 'naranja', etiqueta: 'EBITDA', valor: 'S/ 520,000',
    variacion: { direccion: 'positiva', texto: '15.2%' },
    sparklinePuntos: '0,19 14,15 28,17 42,9 56,12 70,6 84,11 100,5', sparklineColor: '#f97316',
  },
  {
    icono: 'documento', color: 'verde', etiqueta: 'Flujo de Caja', valor: 'S/ 320,000',
    variacion: { direccion: 'positiva', texto: '22.1%' },
    sparklinePuntos: '0,18 14,9 28,15 42,7 56,17 70,5 84,13 100,10', sparklineColor: '#22c55e',
  },
]

export const RENTABILIDAD: FilaTabla[] = [
  { indicador: 'ROE (Rentabilidad sobre Patrimonio)', valor: '18.6%', estado: 'optimo', variacion: '↑ 2.3 pp', tipo: 'positiva' },
  { indicador: 'ROA (Rentabilidad sobre Activos)', valor: '11.2%', estado: 'optimo', variacion: '↑ 1.4 pp', tipo: 'positiva' },
  { indicador: 'Margen Bruto', valor: '36.8%', estado: 'optimo', variacion: '↑ 3.1 pp', tipo: 'positiva' },
  { indicador: 'Margen Operativo', valor: '12.4%', estado: 'optimo', variacion: '↑ 1.8 pp', tipo: 'positiva' },
  { indicador: 'Margen Neto', valor: '8.5%', estado: 'optimo', variacion: '↑ 1.2 pp', tipo: 'positiva' },
]

export const LIQUIDEZ: FilaTabla[] = [
  { indicador: 'Liquidez Corriente', valor: '2.15', estado: 'optimo', variacion: '↑ 0.18', tipo: 'positiva' },
  { indicador: 'Prueba Ácida', valor: '1.48', estado: 'optimo', variacion: '↑ 0.12', tipo: 'positiva' },
  { indicador: 'Capital de Trabajo', valor: 'S/ 850,000', estado: 'optimo', variacion: '↑ 8.3%', tipo: 'positiva' },
  { indicador: 'Liquidez Inmediata', valor: '0.85', estado: 'regular', variacion: '↓ -0.03', tipo: 'negativa' },
]

export const GESTION: FilaTabla[] = [
  { indicador: 'Rotación de Inventario (días)', valor: '6.8', estado: 'optimo', variacion: '↓ 0.6', tipo: 'negativa' },
  { indicador: 'Rotación de Cuentas por Cobrar (días)', valor: '32', estado: 'optimo', variacion: '↑ 3', tipo: 'positiva' },
  { indicador: 'Rotación de Cuentas por Pagar (días)', valor: '28', estado: 'regular', variacion: '↑ 2', tipo: 'positiva' },
  { indicador: 'Ciclo de Conversión de Efectivo (días)', valor: '10', estado: 'optimo', variacion: '↓ 1', tipo: 'negativa' },
]

export const BARRAS_COMBO: { mes: string; claseAlto: string | null; activa?: boolean }[] = [
  { mes: 'Ene', claseAlto: 'h-[60%]' }, { mes: 'Feb', claseAlto: 'h-[66%]' }, { mes: 'Mar', claseAlto: 'h-[70%]' },
  { mes: 'Abr', claseAlto: 'h-[76%]' }, { mes: 'May', claseAlto: 'h-[80%]' }, { mes: 'Jun', claseAlto: 'h-[100%]', activa: true },
  { mes: 'Jul', claseAlto: null }, { mes: 'Ago', claseAlto: null }, { mes: 'Sep', claseAlto: null },
  { mes: 'Oct', claseAlto: null }, { mes: 'Nov', claseAlto: null }, { mes: 'Dic', claseAlto: null },
]

export const COSTOS = {
  total: 'S/ 850,000',
  items: [
    { color: '#3b82f6', etiqueta: 'Mano de Obra', pct: '35%', valor: 'S/ 297,500' },
    { color: '#f97316', etiqueta: 'Materiales', pct: '30%', valor: 'S/ 255,000' },
    { color: '#22c55e', etiqueta: 'Servicios', pct: '20%', valor: 'S/ 170,000' },
    { color: '#ec4899', etiqueta: 'Gastos Generales', pct: '10%', valor: 'S/ 85,000' },
    { color: '#eab308', etiqueta: 'Otros', pct: '5%', valor: 'S/ 42,500' },
  ],
}

export const COMPARATIVO_KPI = 'vs. Mayo 2026'

export const MESES_EJE_X_INDICADORES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export const TOOLTIP_UTILIDAD_NETA = { mes: 'Junio 2026', utilidad: 'Utilidad Neta: S/ 400,000', margen: 'Margen Neto: 8.5%' }

export const TOOLTIP_VENTAS_PROYECCION = { mes: 'Junio 2026', ventas: 'Ventas: S/ 1,250,000', proyeccion: 'Proyección: S/ 1,380,000' }

export const MODULOS_IND: TarjetaModulo[] = [
  { icono: 'planillas', color: 'verde', nombre: 'Planillas', etiquetaDato: 'Costo de Personal', valor: 'S/ 285,000', variacion: '↑ 6.2%', estado: 'optimo', sparklinePuntos: '0,17 20,13 40,15 60,8 80,11 100,4', sparklineColor: '#22c55e' },
  { icono: 'moneda', color: 'morado', nombre: 'Contabilidad', etiquetaDato: 'Resultado del Ejercicio', valor: 'S/ 400,000', variacion: '↑ 18.7%', estado: 'optimo', sparklinePuntos: '0,18 20,14 40,16 60,9 80,12 100,5', sparklineColor: '#7c3aed' },
  { icono: 'caja', color: 'naranja', nombre: 'Inventarios', etiquetaDato: 'Stock Valorizado', valor: 'S/ 2,350,000', variacion: '↑ 7.4%', estado: 'optimo', sparklinePuntos: '0,10 20,15 40,8 60,17 80,11 100,6', sparklineColor: '#f97316' },
  { icono: 'ventas', color: 'azul', nombre: 'Ventas', etiquetaDato: 'Pedidos del Mes', valor: '78', variacion: '↑ 14.8%', estado: 'optimo', sparklinePuntos: '0,16 20,12 40,14 60,7 80,10 100,3', sparklineColor: '#3b82f6' },
  { icono: 'maletin', color: 'morado', nombre: 'Proyectos', etiquetaDato: 'Avance Promedio', valor: '65%', variacion: '↑ 5.2 pp', estado: 'optimo', sparklinePuntos: '0,15 20,17 40,10 60,13 80,7 100,9', sparklineColor: '#7c3aed' },
  { icono: 'compras', color: 'rojo', nombre: 'Compras', etiquetaDato: 'Ahorro por Compras', valor: 'S/ 120,000', variacion: '↑ 9.1%', estado: 'optimo', sparklinePuntos: '0,17 20,11 40,14 60,6 80,10 100,4', sparklineColor: '#ef4444' },
]
