import type { Kpi, EstadoRatio } from '@/tipos/estadisticas/pagina_estadisticas_todos_modulos'

export const KPIS: Kpi[] = [
  {
    icono: 'documento', color: 'azul', etiqueta: 'Ventas netas', valor: 'S/ 1,250,000',
    variacion: { direccion: 'positiva', texto: '12.5%' },
    sparklinePuntos: '0,22 15,20 30,16 45,18 60,10 75,12 100,4', sparklineColor: '#3b82f6',
  },
  {
    icono: 'flecha-abajo', color: 'rojo', etiqueta: 'Egresos', valor: 'S/ 850,000',
    variacion: { direccion: 'negativa', texto: '8.3%' },
    sparklinePuntos: '0,8 15,14 30,10 45,20 60,16 75,24 100,18', sparklineColor: '#ef4444',
  },
  {
    icono: 'documento', color: 'verde', etiqueta: 'Utilidad neta', valor: 'S/ 400,000',
    variacion: { direccion: 'positiva', texto: '18.7%' },
    sparklinePuntos: '0,24 15,20 30,22 45,14 60,16 75,8 100,6', sparklineColor: '#22c55e',
  },
  {
    icono: 'estadisticas', color: 'morado', etiqueta: 'Margen de utilidad', valor: '32.0%',
    variacion: { direccion: 'positiva', texto: '4.5 pp' },
    sparklinePuntos: '0,18 15,22 30,14 45,16 60,10 75,14 100,8', sparklineColor: '#7c3aed',
  },
  {
    icono: 'actualizar', color: 'cian', etiqueta: 'Flujo de caja', valor: 'S/ 320,000',
    variacion: { direccion: 'positiva', texto: '22.1%' },
    sparklinePuntos: '0,20 15,10 30,16 45,8 60,18 75,6 100,12', sparklineColor: '#06b6d4',
  },
]

export const COMPOSICION_INGRESOS = {
  total: 'S/ 1,250,000',
  items: [
    { color: '#3b82f6', etiqueta: 'Construcción', pct: '45%', valor: 'S/ 562,500' },
    { color: '#7c3aed', etiqueta: 'Consultoría', pct: '25%', valor: 'S/ 312,500' },
    { color: '#22c55e', etiqueta: 'Servicios', pct: '20%', valor: 'S/ 250,000' },
    { color: '#f97316', etiqueta: 'Otros', pct: '10%', valor: 'S/ 125,000' },
  ],
}

export const GASTOS_CATEGORIA = {
  total: 'S/ 850,000',
  items: [
    { color: '#3b82f6', etiqueta: 'Mano de obra', pct: '35%', valor: 'S/ 297,500' },
    { color: '#f97316', etiqueta: 'Materiales', pct: '30%', valor: 'S/ 255,000' },
    { color: '#22c55e', etiqueta: 'Servicios', pct: '15%', valor: 'S/ 127,500' },
    { color: '#7c3aed', etiqueta: 'Administrativos', pct: '10%', valor: 'S/ 85,000' },
    { color: '#9ca3af', etiqueta: 'Otros', pct: '10%', valor: 'S/ 85,000' },
  ],
}

export const TOP_CLIENTES = [
  { nombre: 'Inversiones Andinas SAC', ancho: 'w-[100%]', valor: 'S/ 320,000' },
  { nombre: 'Inmobiliaria Los Álamos', ancho: 'w-[66%]', valor: 'S/ 210,000' },
  { nombre: 'Constructora Horizonte', ancho: 'w-[56%]', valor: 'S/ 180,000' },
  { nombre: 'Municipalidad de Surco', ancho: 'w-[37%]', valor: 'S/ 120,000' },
  { nombre: 'Servicios Generales SRL', ancho: 'w-[30%]', valor: 'S/ 95,000' },
]

export const ESTADO_RESULTADOS: { concepto: string; actual: string; pct: string; variacion: string; tipo: 'positiva' | 'negativa'; fuerte?: boolean }[] = [
  { concepto: 'Ventas netas', actual: 'S/ 1,250,000', pct: '100%', variacion: '↑ 12.5%', tipo: 'positiva' },
  { concepto: 'Costo de ventas', actual: '-S/ 650,000', pct: '-52%', variacion: '↑ 8.2%', tipo: 'positiva' },
  { concepto: 'Utilidad bruta', actual: 'S/ 600,000', pct: '48%', variacion: '↑ 16.9%', tipo: 'positiva', fuerte: true },
  { concepto: 'Gastos operativos', actual: '-S/ 200,000', pct: '-16%', variacion: '↓ 5.1%', tipo: 'negativa' },
  { concepto: 'Utilidad operativa', actual: 'S/ 400,000', pct: '32%', variacion: '↑ 22.3%', tipo: 'positiva', fuerte: true },
  { concepto: 'Impuestos', actual: '-S/ 120,000', pct: '-9.6%', variacion: '↑ 15.4%', tipo: 'positiva' },
  { concepto: 'Utilidad neta', actual: 'S/ 400,000', pct: '32%', variacion: '↑ 18.7%', tipo: 'positiva', fuerte: true },
]

export const RATIOS_FINANCIEROS: { nombre: string; valor: string; variacion: string; tipo: 'positiva' | 'negativa'; estado: EstadoRatio }[] = [
  { nombre: 'Liquidez corriente', valor: '2.15', variacion: '↑ 0.18', tipo: 'positiva', estado: 'optimo' },
  { nombre: 'Prueba ácida', valor: '1.48', variacion: '↑ 0.12', tipo: 'positiva', estado: 'optimo' },
  { nombre: 'Endeudamiento', valor: '0.35', variacion: '↓ -0.03', tipo: 'negativa', estado: 'bajo' },
  { nombre: 'ROE', valor: '18.6%', variacion: '↑ 2.3 pp', tipo: 'positiva', estado: 'optimo' },
  { nombre: 'ROA', valor: '11.2%', variacion: '↑ 1.4 pp', tipo: 'positiva', estado: 'optimo' },
  { nombre: 'Rotación de inventario', valor: '6.8', variacion: '↑ 0.9', tipo: 'positiva', estado: 'optimo' },
  { nombre: 'Periodo de cobranza (días)', valor: '32', variacion: '↓ -4', tipo: 'positiva', estado: 'optimo' },
  { nombre: 'Periodo de pago (días)', valor: '45', variacion: '↑ 3', tipo: 'negativa', estado: 'aceptable' },
]

export const PROYECCION_VENTAS: { mes: string; claseAlto: string; tipo: 'real' | 'proyeccion' }[] = [
  { mes: 'Ene', claseAlto: 'h-[38%]', tipo: 'real' },
  { mes: 'Feb', claseAlto: 'h-[44%]', tipo: 'real' },
  { mes: 'Mar', claseAlto: 'h-[50%]', tipo: 'real' },
  { mes: 'Abr', claseAlto: 'h-[56%]', tipo: 'real' },
  { mes: 'May', claseAlto: 'h-[62%]', tipo: 'real' },
  { mes: 'Jun', claseAlto: 'h-[100%]', tipo: 'real' },
  { mes: 'Jul', claseAlto: 'h-[68%]', tipo: 'proyeccion' },
  { mes: 'Ago', claseAlto: 'h-[74%]', tipo: 'proyeccion' },
  { mes: 'Sep', claseAlto: 'h-[78%]', tipo: 'proyeccion' },
  { mes: 'Oct', claseAlto: 'h-[82%]', tipo: 'proyeccion' },
  { mes: 'Nov', claseAlto: 'h-[88%]', tipo: 'proyeccion' },
  { mes: 'Dic', claseAlto: 'h-[94%]', tipo: 'proyeccion' },
]

export const RENTABILIDAD_PROYECTO: { nombre: string; margen: string; estado: EstadoRatio }[] = [
  { nombre: 'Edificio Corporativo Alpha', margen: '28.5%', estado: 'optimo' },
  { nombre: 'Puente San Miguel', margen: '24.8%', estado: 'optimo' },
  { nombre: 'Centro Comercial Plaza Norte', margen: '19.3%', estado: 'aceptable' },
  { nombre: 'Residencial Los Parques', margen: '16.1%', estado: 'riesgo' },
  { nombre: 'Carretera Interoceánica', margen: '22.7%', estado: 'optimo' },
]

export const COMPARATIVO_KPI = 'vs. Mayo 2026'

export const TOOLTIP_VENTAS = { mes: 'Jun 2026', ventas: 'Ventas: S/ 1,250,000', proyeccion: 'Proyección: S/ 1,350,000' }
export const ESCALA_TOP_CLIENTES = ['0', '100K', '200K', '300K', '400K']

export const TOOLTIP_FLUJO_CAJA_TODOS_MODULOS = { mes: 'Junio 2026', texto: 'Flujo proyectado: S/ 320,000' }
