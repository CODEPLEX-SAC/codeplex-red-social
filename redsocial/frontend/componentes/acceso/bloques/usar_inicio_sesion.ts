import { useState } from 'react'
import type { FormEvent } from 'react'
import { SIN_ERROR, errorDeContrasena, errorDeCorreo } from './validaciones_acceso'
import { usarEnvioDemostracion } from './usar_envio_demostracion'
import type { ErroresInicioSesion } from '@/tipos/acceso/contrato_acceso'

export function usarInicioSesion(onAcceder: () => void) {
  const envio = usarEnvioDemostracion(onAcceder)
  const [correo, setCorreo] = useState(SIN_ERROR)
  const [contrasena, setContrasena] = useState(SIN_ERROR)
  const [errores, setErrores] = useState<ErroresInicioSesion>({ correo: SIN_ERROR, contrasena: SIN_ERROR })

  function cambiarCorreo(valor: string) {
    setCorreo(valor)
    setErrores((anteriores) => ({ ...anteriores, correo: SIN_ERROR }))
  }

  function cambiarContrasena(valor: string) {
    setContrasena(valor)
    setErrores((anteriores) => ({ ...anteriores, contrasena: SIN_ERROR }))
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (envio.cargando || envio.exitoso) return
    const nuevos = { correo: errorDeCorreo(correo.trim()), contrasena: errorDeContrasena(contrasena) }
    setErrores(nuevos)
    if (nuevos.correo || nuevos.contrasena) return
    envio.iniciar()
  }

  return { correo, contrasena, errores, cargando: envio.cargando, exitoso: envio.exitoso, cambiarCorreo, cambiarContrasena, enviar }
}
