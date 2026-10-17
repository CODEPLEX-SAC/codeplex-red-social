import dayjs from 'dayjs'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Aplicacion, Colaborador, Vigencia } from '@/tipos/colaboradores/modelo_colaboradores'
import type { BorradorColaborador } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const FORMATO_FECHA = catalogoColaboradores.panel_filtros_avanzados.formato_fecha
const SEPARADOR_FECHA = '/'
const FECHA_COMPLETA = /^\d{2}\/\d{2}\/\d{4}$/
const ROL_CLASE_PREDETERMINADO = 'predeterminado'
const ETIQUETAS_ESTADO = catalogoColaboradores.estados as Record<Colaborador['estado'], string>
const ESTADOS = Object.keys(ETIQUETAS_ESTADO) as Colaborador['estado'][]

export function fechaDeTexto(texto: string): number {
  const [dia, mes, anio] = texto.split(SEPARADOR_FECHA)
  return new Date(Number(anio), Number(mes) - 1, Number(dia)).getTime()
}

export function etiquetaDeEstado(estado: Colaborador['estado']): string {
  return ETIQUETAS_ESTADO[estado]
}

export function estadoDeEtiqueta(etiqueta: string): Colaborador['estado'] | undefined {
  return ESTADOS.find((estado) => ETIQUETAS_ESTADO[estado] === etiqueta)
}

export function formatearFecha(instante: number): string {
  return dayjs(instante).format(FORMATO_FECHA)
}

export function fechaValida(texto: string): boolean {
  return FECHA_COMPLETA.test(texto) && formatearFecha(fechaDeTexto(texto)) === texto
}

export function inicioDeVigencia(vigencia: Vigencia): string {
  return vigencia.tipo === 'rango' ? vigencia.desde : vigencia.fecha
}

export function crearBorrador(colaborador: Colaborador): BorradorColaborador {
  const { vigencia } = colaborador
  return {
    nombre: colaborador.nombre,
    correo: colaborador.correo,
    telefono: colaborador.telefono,
    rol: colaborador.rol,
    fechaInicio: inicioDeVigencia(vigencia),
    fechaFin: vigencia.tipo === 'rango' ? vigencia.hasta : '',
    aplicaciones: colaborador.aplicaciones.map((app) => app.nombre),
    estado: colaborador.estado,
  }
}

function periodoValido(original: Colaborador, borrador: BorradorColaborador): boolean {
  const { fechaInicio, fechaFin } = borrador
  if (!fechaValida(fechaInicio)) return false
  if (!fechaFin) return original.vigencia.tipo === 'simple'
  return fechaValida(fechaFin) && fechaDeTexto(fechaFin) >= fechaDeTexto(fechaInicio)
}

export function borradorValido(original: Colaborador, borrador: BorradorColaborador, lista: Colaborador[]): boolean {
  const correoLibre = !lista.some((otro) => otro.correo !== original.correo && otro.correo.toLowerCase() === borrador.correo.trim().toLowerCase())
  return [borrador.nombre, borrador.correo].every((campo) => Boolean(campo.trim())) && correoLibre && periodoValido(original, borrador)
}

function vigenciaDeBorrador(original: Vigencia, borrador: BorradorColaborador): Vigencia {
  if (borrador.fechaFin) return { tipo: 'rango', desde: borrador.fechaInicio, hasta: borrador.fechaFin }
  return original.tipo === 'simple' ? { ...original, fecha: borrador.fechaInicio } : original
}

export function resumirAplicaciones(colaborador: Colaborador, maximo: number) {
  return { visibles: colaborador.aplicaciones.slice(0, maximo), ocultas: Math.max(0, colaborador.aplicaciones.length - maximo) }
}

export function referenciaDeRol(colaborador: Colaborador, rol: string, lista: Colaborador[]) {
  if (rol === colaborador.rol) return colaborador
  return lista.find((otro) => otro.rol === rol) ?? { rolClase: ROL_CLASE_PREDETERMINADO, descripcionRol: colaborador.descripcionRol }
}

export function aplicarBorrador(colaborador: Colaborador, borrador: BorradorColaborador, lista: Colaborador[], disponibles: Aplicacion[]): Colaborador {
  const referencia = referenciaDeRol(colaborador, borrador.rol, lista)
  return {
    ...colaborador,
    nombre: borrador.nombre.trim(),
    correo: borrador.correo.trim(),
    telefono: borrador.telefono.trim(),
    rol: borrador.rol,
    rolClase: referencia.rolClase,
    descripcionRol: referencia.descripcionRol,
    aplicaciones: disponibles.filter((app) => borrador.aplicaciones.includes(app.nombre)),
    estado: borrador.estado,
    acciones: borrador.estado === 'invitado' ? 'reenviar' : 'menu',
    vigencia: vigenciaDeBorrador(colaborador.vigencia, borrador),
  }
}

export function reemplazarColaborador(lista: Colaborador[], original: Colaborador, actualizado: Colaborador): Colaborador[] {
  return lista.map((item) => (item.correo === original.correo ? actualizado : item))
}
