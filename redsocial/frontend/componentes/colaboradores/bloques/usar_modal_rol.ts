import { useState } from 'react'
import { copiarConfiguracion, mismaConfiguracion } from './logica_permisos_invitacion'
import { agregarPermisoEspecifico } from './logica_permisos_especificos'
import type { CampoErrorRol, ConfiguracionPermisos } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'
import type { ModalRolProps } from '@/tipos/colaboradores/contrato_modal_rol'

export function usarModalRol({ modo, recursos, nombreInicial, configuracionInicial, alGuardar, alCerrar }: ModalRolProps) {
  const conPermisos = modo === 'editar'
  const [nombre, setNombre] = useState(nombreInicial)
  const [configuracion, setConfiguracion] = useState(() => copiarConfiguracion(configuracionInicial))
  const [expandidos, setExpandidos] = useState<string[]>([])
  const [error, setError] = useState<{ campo: CampoErrorRol; mensaje: string } | null>(null)
  const [guardando, setGuardando] = useState(false)
  const [confirmandoSalida, setConfirmandoSalida] = useState(false)
  const pendiente = nombre !== nombreInicial || (conPermisos && !mismaConfiguracion(configuracion, configuracionInicial))

  function intentarCerrar() {
    if (pendiente && conPermisos) setConfirmandoSalida(true)
    else alCerrar()
  }

  function guardar() {
    if (guardando) return
    setGuardando(true)
    const resultado = alGuardar(nombre, configuracion)
    if (resultado.error === null) {
      alCerrar()
      return
    }
    setGuardando(false)
    setError({ campo: resultado.campo ?? 'nombre', mensaje: resultado.error })
  }

  function cambiarNombre(valor: string) {
    setNombre(valor)
    setError((actual) => (actual?.campo === 'nombre' ? null : actual))
  }

  function cambiar(cambio: (actual: ConfiguracionPermisos) => ConfiguracionPermisos) {
    setConfiguracion(cambio)
    setError((actual) => (actual?.campo === 'permisos' ? null : actual))
  }

  function agregar(recurso: string, etiqueta: string) {
    const resultado = agregarPermisoEspecifico(configuracion, recursos.find((candidato) => candidato.nombre === recurso), etiqueta)
    if (resultado.error === null) setConfiguracion(resultado.configuracion)
    return resultado.error
  }

  return { conPermisos, nombre, configuracion, expandidos, error, guardando, confirmandoSalida, setExpandidos, setConfirmandoSalida, intentarCerrar, guardar, cambiarNombre, cambiar, agregar }
}
