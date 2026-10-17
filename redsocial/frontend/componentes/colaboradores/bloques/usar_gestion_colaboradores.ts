import { useState } from 'react'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Aplicacion, Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { AvisoColaboradores, BorradorColaborador } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import type { DatosAsistenteInvitacion, DatosColaboradorInvitado } from '@/tipos/colaboradores/contrato_invitar_colaborador'
import { aplicarBorrador, reemplazarColaborador } from './logica_colaboradores'
import { crearInvitado, existeCorreo, registrarBaja, reenviarInvitacion } from './reglas_estado_colaboradores'

const mensajes = catalogoColaboradores.mensajes

export function usarGestionColaboradores(iniciales: Colaborador[], disponibles: Aplicacion[], datosAsistente: DatosAsistenteInvitacion) {
  const [colaboradores, setColaboradores] = useState(iniciales)
  const [aviso, setAviso] = useState<AvisoColaboradores | null>(null)

  function actualizar(original: Colaborador, actualizado: Colaborador) {
    setColaboradores((lista) => reemplazarColaborador(lista, original, actualizado))
    return actualizado
  }

  function guardarEdicion(original: Colaborador, borrador: BorradorColaborador) {
    return actualizar(original, aplicarBorrador(original, borrador, colaboradores, disponibles))
  }

  function darDeBaja(colaborador: Colaborador, fecha: string) {
    return actualizar(colaborador, registrarBaja(colaborador, fecha))
  }

  function reenviar(colaborador: Colaborador) {
    actualizar(colaborador, reenviarInvitacion(colaborador, Date.now()))
    setAviso({ texto: mensajes.invitacion_reenviada_demostracion, error: false })
  }

  function invitar(invitado: DatosColaboradorInvitado) {
    if (!existeCorreo(colaboradores, invitado.correo)) setColaboradores((lista) => [crearInvitado(invitado, datosAsistente, Date.now()), ...lista])
    setAviso({ texto: mensajes.invitacion_completada_demostracion, error: false })
  }

  function avisarFalloExportacion() {
    setAviso({ texto: mensajes.exportacion_fallida, error: true })
  }

  return { colaboradores, aviso, cerrarAviso: () => setAviso(null), guardarEdicion, darDeBaja, reenviar, invitar, avisarFalloExportacion }
}
