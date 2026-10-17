import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { DatosAsistenteInvitacion, DatosColaboradorInvitado } from '@/tipos/colaboradores/contrato_invitar_colaborador'
import { formatearFecha } from './logica_colaboradores'

const ROL_CLASE_PREDETERMINADO = 'predeterminado'
const textosVigencia = catalogoColaboradores.celda_vigencia

export function puedeDarDeBaja(colaborador: Colaborador): boolean {
  return colaborador.estado !== 'baja'
}

export function puedeReenviar(colaborador: Colaborador): boolean {
  return colaborador.estado === 'invitado'
}

export function opcionesMenuFila(colaborador: Colaborador, acciones: { alVer: () => void; alEditar: () => void; alDarDeBaja: () => void }): ElementoMenu[] {
  const opciones: ElementoMenu[] = [
    { etiqueta: catalogoColaboradores.botones.ver_colaborador, alHacerClick: acciones.alVer },
    { etiqueta: catalogoColaboradores.botones.editar_colaborador, alHacerClick: acciones.alEditar },
  ]
  if (puedeDarDeBaja(colaborador)) opciones.push({ etiqueta: catalogoColaboradores.botones.dar_de_baja, peligro: true, alHacerClick: acciones.alDarDeBaja })
  return opciones
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
