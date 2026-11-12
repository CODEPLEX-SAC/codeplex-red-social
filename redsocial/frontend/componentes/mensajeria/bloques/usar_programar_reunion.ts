import { useState } from 'react'
import { borradorInicial, datosDeBorrador, hayErrores, sumarDuracionInicial, validarBorrador } from './logica_programar_reunion'
import { minutosDeDuracion } from './logica_duracion_reunion'
import type { EstadoCopiaEnlace } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { BorradorReunion, ErroresProgramacion, ParametrosProgramarReunion, ReunionCreada } from '@/tipos/mensajeria/contrato_programar_reunion'

export function usarProgramarReunion({ candidatos, programar, copiarEnlace }: ParametrosProgramarReunion) {
  const [borrador, setBorrador] = useState<BorradorReunion>(borradorInicial)
  const [errores, setErrores] = useState<ErroresProgramacion>({})
  const [programada, setProgramada] = useState<ReunionCreada | null>(null)
  const [copia, setCopia] = useState<EstadoCopiaEnlace>('ninguna')

  function cambiar<K extends keyof BorradorReunion>(campo: K, valor: BorradorReunion[K]) {
    setBorrador((actual) => ({ ...actual, [campo]: valor }))
    setErrores((actual) => ({ ...actual, [campo]: undefined }))
  }

  function cambiarInicio(inicio: BorradorReunion['inicio']) {
    setBorrador((actual) => {
      const conflicto = inicio !== null && minutosDeDuracion(inicio, actual.fin) <= 0
      return { ...actual, inicio, fin: conflicto ? sumarDuracionInicial(inicio) : actual.fin }
    })
    setErrores((actual) => ({ ...actual, inicio: undefined, fin: undefined }))
  }

  function enviar() {
    const encontrados = validarBorrador(borrador)
    setErrores(encontrados)
    if (hayErrores(encontrados)) return
    setProgramada(programar(datosDeBorrador(borrador)))
  }

  async function copiar() {
    if (programada === null) return
    const resultado = await copiarEnlace(programada.enlace)
    setCopia(resultado.exito ? 'copiado' : 'error')
  }

  const yaInvitados = new Set(borrador.invitados)
  const disponibles = candidatos.filter((candidato) => !yaInvitados.has(candidato.nombre))

  return {
    borrador,
    errores,
    programada,
    copia,
    disponibles,
    duracion: minutosDeDuracion(borrador.inicio, borrador.fin),
    cambiar,
    cambiarInicio,
    agregar: (nombre: string) => cambiar('invitados', [...borrador.invitados, nombre]),
    quitar: (nombre: string) => cambiar('invitados', borrador.invitados.filter((invitado) => invitado !== nombre)),
    enviar,
    copiar,
  }
}
