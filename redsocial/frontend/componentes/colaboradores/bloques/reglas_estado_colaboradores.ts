import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { DatosAsistenteInvitacion, DatosColaboradorInvitado } from '@/tipos/colaboradores/contrato_invitar_colaborador'
import { formatearFecha } from './logica_colaboradores'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { AccionesColaborador } from '@/tipos/colaboradores/contrato_listado_colaboradores'

const ROL_CLASE_PREDETERMINADO = 'predeterminado'
const textosVigencia = catalogoColaboradores.celda_vigencia

export function puedeDarDeBaja(colaborador: Colaborador): boolean {
  return colaborador.estado !== 'baja'
}

export function elementosMenuColaborador(colaborador: Colaborador, acciones: AccionesColaborador): ElementoMenu[] {
  const botones = catalogoColaboradores.botones
  if (puedeReenviar(colaborador)) return [{ etiqueta: botones.menu_reenviar, icono: 'enviar', alHacerClick: () => acciones.alReenviar(colaborador) }]
  const opciones: ElementoMenu[] = [
    { etiqueta: botones.menu_ver, icono: 'ver', alHacerClick: () => acciones.alVerColaborador(colaborador) },
    { etiqueta: botones.menu_editar, icono: 'editar-oficial', alHacerClick: () => acciones.alEditarColaborador(colaborador) },
  ]
  if (!puedeDarDeBaja(colaborador)) return opciones
  return [...opciones, { etiqueta: botones.dar_de_baja, icono: 'persona-menos', peligro: true, alHacerClick: () => acciones.alConfirmarBaja(colaborador) }]
}

export function puedeReenviar(colaborador: Colaborador): boolean {
  return colaborador.estado === 'invitado'
}

export function registrarBaja(colaborador: Colaborador, fecha: string): Colaborador {
  if (!puedeDarDeBaja(colaborador)) return colaborador
  return {
    ...colaborador,
    estado: 'baja',
    acciones: 'menu',
    vigencia: { tipo: 'simple', etiqueta: textosVigencia.etiqueta_baja, fecha },
  }
}

export function reenviarInvitacion(colaborador: Colaborador, hoy: number): Colaborador {
  if (!puedeReenviar(colaborador)) return colaborador
  const fecha = formatearFecha(hoy)
  const vigencia = colaborador.vigencia.tipo === 'simple' ? { ...colaborador.vigencia, fecha } : colaborador.vigencia
  return { ...colaborador, fechaInvitacion: fecha, vigencia }
}

export function existeCorreo(lista: Colaborador[], correo: string): boolean {
  return lista.some((item) => item.correo.toLowerCase() === correo.trim().toLowerCase())
}

export function crearInvitado(invitado: DatosColaboradorInvitado, datos: DatosAsistenteInvitacion, hoy: number): Colaborador {
  const fecha = formatearFecha(hoy)
  return {
    nombre: `${invitado.nombres} ${invitado.apellidos}`.trim(),
    correo: invitado.correo.trim(),
    telefono: invitado.telefono.trim(),
    rol: datos.resumenRol.rolAsignado,
    rolClase: ROL_CLASE_PREDETERMINADO,
    descripcionRol: datos.resumenRol.modulosTexto,
    aplicaciones: [],
    estado: 'invitado',
    vigencia: { tipo: 'simple', etiqueta: textosVigencia.etiqueta_invitacion, fecha },
    acciones: 'reenviar',
    fechaInvitacion: fecha,
  }
}
