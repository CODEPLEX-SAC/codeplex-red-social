import { useState } from 'react'
import { datosDesdeEmpresa, edicionCompleta, empresaDesdeEdicion, opcionesDeUbigeo, reajustarUbigeo } from './logica_edicion_empresa'
import { usarLogoEmpresa } from './usar_logo_empresa'
import type { CampoEdicionEmpresa, EdicionEmpresa } from '@/tipos/empresas/contrato_edicion_empresa'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'

export function usarEdicionEmpresa(empresa: Empresa): EdicionEmpresa {
  const [datos, setDatos] = useState(() => datosDesdeEmpresa(empresa))
  const [logoQuitado, setLogoQuitado] = useState(false)
  const nuevo = usarLogoEmpresa()
  const logoVisible = nuevo.logo ?? (logoQuitado ? null : (empresa.logo ?? null))

  function cambiarCampo(campo: CampoEdicionEmpresa, valor: string) {
    setDatos((anterior) => reajustarUbigeo({ ...anterior, [campo]: valor }))
  }

  function manejarTexto(campo: CampoEdicionEmpresa) {
    return (texto: string) => cambiarCampo(campo, texto)
  }

  function manejarSelector(campo: CampoEdicionEmpresa) {
    return (evento: { target: { value: unknown } }) => cambiarCampo(campo, String(evento.target.value))
  }

  function quitarLogo() {
    nuevo.quitarLogo()
    setLogoQuitado(true)
  }

  function construirEmpresa() {
    nuevo.conservarLogo()
    return empresaDesdeEdicion(empresa, datos, logoVisible)
  }

  return {
    datos,
    opcionesUbigeo: opcionesDeUbigeo(datos.departamento, datos.provincia),
    logo: logoVisible,
    errorLogo: nuevo.errorLogo,
    puedeGuardar: edicionCompleta(datos),
    manejarTexto,
    manejarSelector,
    elegirLogo: nuevo.elegirLogo,
    quitarLogo,
    construirEmpresa,
  }
}
