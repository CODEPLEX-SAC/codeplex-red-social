import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { DatosPerfilPago, ErroresPerfilPago, PaisPago, PerfilPago, TextosFlujoPago } from '@/tipos/compartido/contrato_flujo_pago'

const VACIO = catalogoCompartido.controles.texto_vacio
const reglas = catalogoCompartido.flujo_pago.reglas.perfil

export function perfilVacio(paises: PaisPago[]): DatosPerfilPago {
  return { documento: VACIO, razon: VACIO, pais: paises[0]?.id ?? VACIO, direccion: VACIO, correo: VACIO, celular: VACIO, whatsapp: false, sms: false }
}

export function datosDePerfil(perfil: PerfilPago): DatosPerfilPago {
  const { documento, razon, pais, direccion, correo, celular, whatsapp, sms } = perfil
  return { documento, razon, pais, direccion, correo, celular, whatsapp, sms }
}

export function prefijoDePais(paises: PaisPago[], id: string) {
  return paises.find((pais) => pais.id === id)?.prefijo ?? paises[0]?.prefijo ?? VACIO
}

export function nombreDePais(paises: PaisPago[], id: string) {
  return paises.find((pais) => pais.id === id)?.nombre ?? id
}

export function agruparTelefono(celular: string) {
  return celular.replace(/(\d{3})(?=\d)/g, '$1 ')
}

export function telefonoDePerfil(perfil: DatosPerfilPago, paises: PaisPago[]) {
  return perfil.celular ? [prefijoDePais(paises, perfil.pais), agruparTelefono(perfil.celular)].join(' ') : VACIO
}

export function canalesDePerfil(perfil: DatosPerfilPago, textos: TextosFlujoPago) {
  const canales = [perfil.whatsapp && textos.perfiles.canal_whatsapp, perfil.sms && textos.perfiles.canal_sms].filter(Boolean)
  return canales.length > 0 ? canales.join(textos.perfiles.canales_union) : textos.perfiles.sin_canales
}

export function perfilConDatos(datos: DatosPerfilPago) {
  return Boolean(datos.documento.trim() || datos.razon.trim())
}

export function validarPerfil(datos: DatosPerfilPago, textos: TextosFlujoPago): ErroresPerfilPago {
  const resultado: ErroresPerfilPago = {}
  if (!reglas.documento_longitudes.includes(datos.documento.trim().length)) resultado.documento = textos.perfiles.errores.documento
  if (!datos.razon.trim()) resultado.razon = textos.perfiles.errores.razon
  if (datos.correo.trim() && !new RegExp(reglas.correo_patron).test(datos.correo.trim())) resultado.correo = textos.perfiles.errores.correo
  return resultado
}

export function mismosDatosDePerfil(a: DatosPerfilPago, b: DatosPerfilPago) {
  return (Object.keys(a) as (keyof DatosPerfilPago)[]).every((clave) => a[clave] === b[clave])
}
