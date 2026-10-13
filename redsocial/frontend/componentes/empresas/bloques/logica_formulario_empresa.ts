import dayjs from 'dayjs'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { DatosFormularioEmpresa } from '@/tipos/empresas/contrato_formulario_empresa'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'

const textos = catalogoEmpresas.modal_empresa
const registro = textos.registro

export function crearDatosIniciales(): DatosFormularioEmpresa {
  return {
    ruc: '',
    nombre_comercial: '',
    razon_social: '',
    direccion: '',
    ubigeo: textos.opciones.ubigeos[0],
    codigo_pais: textos.opciones.codigos_pais[0],
    telefono: '',
    email: '',
    web: '',
    rubro: catalogoEmpresas.selectores.rubro.opciones[1],
    tipo_plan_cuenta: textos.opciones.tipos_plan_cuenta[0],
    activa: true,
  }
}

export function rucEsValido(ruc: string) {
  return ruc.length === registro.longitud_ruc && /^\d+$/.test(ruc)
}

export function datosCompletos(datos: DatosFormularioEmpresa) {
  return rucEsValido(datos.ruc) && [datos.razon_social, datos.direccion, datos.telefono, datos.email].every((campo) => campo.trim().length !== 0) && datos.email.includes('@')
}

export function armarEmpresa(datos: DatosFormularioEmpresa, totalExistentes: number, logo: string | null): Empresa {
  const numero = String(totalExistentes + 1).padStart(registro.digitos_codigo, '0')
  return {
    codigo: registro.prefijo_codigo + numero,
    nombre: datos.razon_social.trim(),
    ruc: datos.ruc,
    correo: datos.email.trim(),
    nombreComercial: datos.nombre_comercial.trim() || datos.razon_social.trim(),
    direccion: datos.direccion.trim(),
    ubigeo: datos.ubigeo,
    telefono: datos.codigo_pais + ' ' + datos.telefono.trim(),
    web: datos.web.trim(),
    rubro: datos.rubro,
    plan: 'basico',
    usuarios: 0,
    estado: datos.activa ? 'activa' : 'inactiva',
    fechaRegistro: dayjs().format(registro.formato_fecha),
    ...(logo ? { logo } : {}),
  }
}
