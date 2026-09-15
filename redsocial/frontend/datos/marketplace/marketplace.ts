import type { IconName } from '../../tipos/compartido/icono'
import type { Destacado } from '@/tipos/marketplace/pagina_marketplace'

export const DESTACADOS: Destacado[] = [
  { nombre: 'Contabilidad Pro', icono: 'contabilidad', color: 'verde', puntaje: '4.8', conteo: '(124)', descripcion: 'Lleva la contabilidad de tu empresa de forma sencilla y eficiente.', precio: 'S/ 49.90' },
  { nombre: 'Integración SUNAT', icono: 'ventas', color: 'azul', puntaje: '4.9', conteo: '(89)', descripcion: 'Facturación electrónica, libros y reportes SUNAT automatizados.', precio: 'S/ 39.90' },
  { nombre: 'Planillas Perú', icono: 'planillas', color: 'morado', popular: true, puntaje: '4.7', conteo: '(156)', descripcion: 'Gestiona planillas, boletas, AFP, CTS y más en un solo lugar.', precio: 'S/ 59.90' },
  { nombre: 'Inventario Avanzado', icono: 'inventario', color: 'naranja', puntaje: '4.6', conteo: '(78)', descripcion: 'Control de stock, kardex, lotes y almacenes.', precio: 'S/ 29.90' },
]

export const CATEGORIAS: { icono: IconName; color: 'verde' | 'azul' | 'morado' | 'naranja' | 'rosa'; nombre: string; cantidad: string }[] = [
  { icono: 'contabilidad', color: 'verde', nombre: 'Contabilidad', cantidad: '32 soluciones' },
  { icono: 'ventas', color: 'azul', nombre: 'Ventas', cantidad: '18 soluciones' },
  { icono: 'planillas', color: 'morado', nombre: 'RRHH', cantidad: '24 soluciones' },
  { icono: 'inventario', color: 'naranja', nombre: 'Inventario', cantidad: '16 soluciones' },
  { icono: 'panel', color: 'rosa', nombre: 'Productividad', cantidad: '22 soluciones' },
]

export const COMPRAS: { icono: IconName; color: 'verde' | 'morado' | 'azul'; nombre: string; fecha: string }[] = [
  { icono: 'contabilidad', color: 'verde', nombre: 'Contabilidad Pro', fecha: 'Adquirido el 12/06/2026' },
  { icono: 'planillas', color: 'morado', nombre: 'Planillas Perú', fecha: 'Adquirido el 05/06/2026' },
  { icono: 'ventas', color: 'azul', nombre: 'Integración SUNAT', fecha: 'Adquirido el 01/06/2026' },
]

export const POPULARES: { icono: IconName; color: 'verde' | 'azul' | 'morado' | 'naranja' | 'rosa'; nombre: string; puntaje: string; conteo: string; precio: string }[] = [
  { icono: 'contabilidad', color: 'verde', nombre: 'Contabilidad Pro', puntaje: '4.8', conteo: '(124)', precio: 'S/ 49.90' },
  { icono: 'planillas', color: 'morado', nombre: 'Planillas Perú', puntaje: '4.7', conteo: '(156)', precio: 'S/ 59.90' },
  { icono: 'ventas', color: 'azul', nombre: 'Integración SUNAT', puntaje: '4.9', conteo: '(89)', precio: 'S/ 39.90' },
  { icono: 'inventario', color: 'naranja', nombre: 'Inventario Avanzado', puntaje: '4.6', conteo: '(78)', precio: 'S/ 29.90' },
  { icono: 'panel', color: 'rosa', nombre: 'Control de Asistencia', puntaje: '4.5', conteo: '(63)', precio: 'S/ 19.90' },
]
