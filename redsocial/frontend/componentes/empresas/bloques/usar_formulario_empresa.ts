import { useState } from 'react'
import { armarEmpresa, crearDatosIniciales, datosCompletos, rucEsValido } from './logica_formulario_empresa'
import { usarLogoEmpresa } from './usar_logo_empresa'
import type { CampoTextoEmpresa, EstadoRuc, FormularioEmpresa } from '@/tipos/empresas/contrato_formulario_empresa'

export function usarFormularioEmpresa(totalExistentes: number): FormularioEmpresa {
  const [datos, setDatos] = useState(crearDatosIniciales)
  const [estadoRuc, setEstadoRuc] = useState<EstadoRuc>('sin_validar')
  const { logo, errorLogo, elegirLogo, conservarLogo } = usarLogoEmpresa()

  function cambiarCampo(campo: CampoTextoEmpresa, valor: string) {
    setDatos((anterior) => ({ ...anterior, [campo]: valor }))
    setEstadoRuc((actual) => (campo === 'ruc' ? 'sin_validar' : actual))
  }

  function manejarTexto(campo: CampoTextoEmpresa) {
    return (texto: string) => cambiarCampo(campo, texto)
  }

  function manejarSelector(campo: CampoTextoEmpresa) {
    return (evento: { target: { value: unknown } }) => cambiarCampo(campo, String(evento.target.value))
  }

  function cambiarActiva(marcada: boolean) {
    setDatos((anterior) => ({ ...anterior, activa: marcada }))
  }

  function validarRuc() {
    setEstadoRuc(rucEsValido(datos.ruc) ? 'valido' : 'invalido')
  }

  function construirEmpresa() {
    conservarLogo()
    return armarEmpresa(datos, totalExistentes, logo)
  }

  return {
    datos,
    estadoRuc,
    logo,
    errorLogo,
    puedeGuardar: datosCompletos(datos),
    manejarTexto,
    manejarSelector,
    cambiarActiva,
    validarRuc,
    elegirLogo,
    construirEmpresa,
  }
}
