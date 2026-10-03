import { useState } from 'react'
import type { FormEvent } from 'react'
import { SIN_ERROR, errorDeConfirmacion, errorDeContrasenaNueva, errorDeCorreo, errorDeNombre } from './validaciones_acceso'
import { usarEnvioDemostracion } from './usar_envio_demostracion'
import type { ErroresCrearCuenta } from '@/tipos/acceso/contrato_acceso'

const SIN_ERRORES: ErroresCrearCuenta = { nombre: SIN_ERROR, correo: SIN_ERROR, contrasena: SIN_ERROR, confirmacion: SIN_ERROR }

export function usarCrearCuenta() {
  const [correoEnviado, setCorreoEnviado] = useState(false)
  const envio = usarEnvioDemostracion(() => setCorreoEnviado(true))
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [confirmacion, setConfirmacion] = useState('')
  const [errores, setErrores] = useState<ErroresCrearCuenta>(SIN_ERRORES)

  function cambiarNombre(valor: string) {
    setNombre(valor)
    setErrores((anteriores) => ({ ...anteriores, nombre: SIN_ERROR }))
  }

  function cambiarCorreo(valor: string) {
    setCorreo(valor)
    setErrores((anteriores) => ({ ...anteriores, correo: SIN_ERROR }))
  }

  function cambiarContrasena(valor: string) {
    setContrasena(valor)
    setErrores((anteriores) => ({ ...anteriores, contrasena: SIN_ERROR, confirmacion: SIN_ERROR }))
  }

  function cambiarConfirmacion(valor: string) {
    setConfirmacion(valor)
    setErrores((anteriores) => ({ ...anteriores, confirmacion: SIN_ERROR }))
  }

  function validarFormulario(): ErroresCrearCuenta {
    return {
      nombre: errorDeNombre(nombre.trim()),
      correo: errorDeCorreo(correo.trim()),
      contrasena: errorDeContrasenaNueva(contrasena),
      confirmacion: errorDeConfirmacion(contrasena, confirmacion),
    }
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (envio.cargando || envio.exitoso) return
    const nuevos = validarFormulario()
    setErrores(nuevos)
    if (Object.values(nuevos).some(Boolean)) return
    envio.iniciar()
  }

  return {
    nombre,
    correo,
    contrasena,
    confirmacion,
    errores,
    correoEnviado,
    cargando: envio.cargando,
    exitoso: envio.exitoso,
    cambiarNombre,
    cambiarCorreo,
    cambiarContrasena,
    cambiarConfirmacion,
    enviar,
  }
}
