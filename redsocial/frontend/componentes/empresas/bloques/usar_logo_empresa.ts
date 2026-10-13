import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { LogoEmpresa } from '@/tipos/empresas/contrato_formulario_empresa'

const textosLogo = catalogoEmpresas.modal_empresa.logo
const TIPOS_ACEPTADOS = textosLogo.tipos_aceptados.split(',')
const LIMITE_BYTES_LOGO = textosLogo.tamano_maximo_bytes

export function usarLogoEmpresa(): LogoEmpresa {
  const [logo, setLogo] = useState<string | null>(null)
  const [errorLogo, setErrorLogo] = useState<string | null>(null)
  const logoActual = useRef<string | null>(null)
  const logoConservado = useRef(false)

  useEffect(
    () => () => {
      if (logoActual.current && !logoConservado.current) URL.revokeObjectURL(logoActual.current)
    },
    [],
  )

  function liberarLogo() {
    if (logoActual.current) URL.revokeObjectURL(logoActual.current)
    logoActual.current = null
  }

  function elegirLogo(evento: ChangeEvent<HTMLInputElement>) {
    const archivo = evento.target.files?.[0]
    evento.target.value = ''
    if (!archivo) return
    if (!TIPOS_ACEPTADOS.includes(archivo.type)) return setErrorLogo(textosLogo.error_tipo)
    if (archivo.size > LIMITE_BYTES_LOGO) return setErrorLogo(textosLogo.error_tamano)
    liberarLogo()
    logoActual.current = URL.createObjectURL(archivo)
    setLogo(logoActual.current)
    setErrorLogo(null)
  }

  function quitarLogo() {
    liberarLogo()
    setLogo(null)
    setErrorLogo(null)
  }

  function conservarLogo() {
    logoConservado.current = true
  }

  return { logo, errorLogo, elegirLogo, quitarLogo, conservarLogo }
}
