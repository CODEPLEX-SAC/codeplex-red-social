import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { rucEsValido } from './logica_formulario_empresa'
import type { DatosEdicionEmpresa, OpcionesUbigeo } from '@/tipos/empresas/contrato_edicion_empresa'
import type { ClaveModuloEmpresa, Empresa } from '@/tipos/empresas/modelo_empresas'

export const SIN_TIPO_PLAN_CUENTA = 'sin_definir'
const SEPARADOR_UBIGEO = catalogoEmpresas.edicion_empresa.separador_ubigeo
const UBIGEOS = catalogoEmpresas.modal_empresa.opciones.ubigeos.map((ubigeo) => ubigeo.split(SEPARADOR_UBIGEO))

function sinRepetidos(valores: string[]) {
  return valores.filter((valor, indice) => valores.indexOf(valor) === indice)
}

export function opcionesDeUbigeo(departamento: string, provincia: string): OpcionesUbigeo {
  const delDepartamento = UBIGEOS.filter(([d]) => d === departamento)
  return {
    departamentos: sinRepetidos(UBIGEOS.map(([d]) => d)),
    provincias: sinRepetidos(delDepartamento.map(([, p]) => p)),
    distritos: sinRepetidos(delDepartamento.filter(([, p]) => p === provincia).map(([, , d]) => d)),
  }
}

export function reajustarUbigeo(datos: DatosEdicionEmpresa): DatosEdicionEmpresa {
  const { provincias } = opcionesDeUbigeo(datos.departamento, datos.provincia)
  const provincia = provincias.includes(datos.provincia) ? datos.provincia : provincias[0]
  const { distritos } = opcionesDeUbigeo(datos.departamento, provincia)
  const distrito = distritos.includes(datos.distrito) ? datos.distrito : distritos[0]
  return { ...datos, provincia, distrito }
}

export function datosDesdeEmpresa(empresa: Empresa): DatosEdicionEmpresa {
  const [departamento, provincia, distrito] = empresa.ubigeo.split(SEPARADOR_UBIGEO)
  return {
    razon_social: empresa.nombre,
    nombre_comercial: empresa.nombreComercial,
    ruc: empresa.ruc,
    rubro: empresa.rubro,
    tipo_plan_cuenta: empresa.tipoPlanCuenta ?? SIN_TIPO_PLAN_CUENTA,
    estado: empresa.estado,
    direccion: empresa.direccion,
    departamento,
    provincia,
    distrito,
    telefono: empresa.telefono,
    email: empresa.correo,
    web: empresa.web,
  }
}

export function edicionCompleta(datos: DatosEdicionEmpresa) {
  const obligatorios = [datos.razon_social, datos.rubro, datos.estado, datos.direccion, datos.telefono, datos.email]
  return rucEsValido(datos.ruc) && obligatorios.every((campo) => campo.trim().length !== 0) && datos.email.includes('@')
}

export function alternarModulos(modulos: ClaveModuloEmpresa[], clave: ClaveModuloEmpresa): ClaveModuloEmpresa[] {
  return modulos.includes(clave) ? modulos.filter((actual) => actual !== clave) : [...modulos, clave]
}

export function empresaDesdeEdicion(original: Empresa, datos: DatosEdicionEmpresa, logo: string | null, modulos: ClaveModuloEmpresa[]): Empresa {
  return {
    ...original,
    modulos,
    nombre: datos.razon_social.trim(),
    nombreComercial: datos.nombre_comercial.trim() || datos.razon_social.trim(),
    ruc: datos.ruc,
    rubro: datos.rubro,
    tipoPlanCuenta: datos.tipo_plan_cuenta === SIN_TIPO_PLAN_CUENTA ? undefined : datos.tipo_plan_cuenta,
    estado: datos.estado as Empresa['estado'],
    direccion: datos.direccion.trim(),
    ubigeo: [datos.departamento, datos.provincia, datos.distrito].join(SEPARADOR_UBIGEO),
    telefono: datos.telefono.trim(),
    correo: datos.email.trim(),
    web: datos.web.trim(),
    logo: logo ?? undefined,
  }
}
