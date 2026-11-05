import type { Empresa } from '@/tipos/empresas/modelo_empresas'
import type { CodigoErrorPago, DatosPerfilPago, PaisPago, PerfilPago, RepositorioPerfilesPago } from '@/tipos/compartido/contrato_flujo_pago'

const RUC_VALIDO = /^\d{11}$/
const PREFIJO_TELEFONICO = /^\+\d+/
const NO_DIGITO = /\D/g
const ESTADO_ACTIVA = 'activa'

export class ErrorPerfilesFacturacion extends Error {
  readonly codigo: CodigoErrorPago

  constructor(codigo: CodigoErrorPago) {
    super(codigo)
    this.codigo = codigo
  }
}

export function perfilesDesdeEmpresas(empresas: Empresa[], paises: PaisPago[]): PerfilPago[] {
  return empresas
    .filter((empresa) => empresa.estado === ESTADO_ACTIVA && RUC_VALIDO.test(empresa.ruc))
    .map((empresa) => {
      const prefijo = empresa.telefono.match(PREFIJO_TELEFONICO)?.[0]
      const pais = paises.find((candidato) => candidato.prefijo === prefijo) ?? paises[0]
      return {
        id: `perfil-${empresa.codigo}`,
        documento: empresa.ruc,
        razon: empresa.nombre,
        pais: pais.id,
        direccion: empresa.direccion,
        correo: empresa.correo,
        celular: empresa.telefono.replace(PREFIJO_TELEFONICO, '').replace(NO_DIGITO, ''),
        whatsapp: false,
        sms: false,
      }
    })
}

export function idPerfilDeEmpresa(codigo: string) {
  return `perfil-${codigo}`
}

export function crearRepositorioPerfiles(semilla: PerfilPago[]): RepositorioPerfilesPago {
  let guardados = semilla.map((perfil) => ({ ...perfil }))
  let secuencia = 0

  function leer() {
    return guardados.map((perfil) => ({ ...perfil }))
  }

  function modificar(cambio: (actual: PerfilPago[]) => PerfilPago[]) {
    return Promise.resolve().then(() => {
      guardados = cambio(leer())
      return leer()
    })
  }

  return {
    leerEstadoInicial: () => ({ perfiles: leer(), estado: 'listo' }),
    listar: () => Promise.resolve().then(leer),
    registrar: (datos: DatosPerfilPago) =>
      modificar((actual) => {
        secuencia += 1
        return [...actual, { ...datos, id: `perfil-demostracion-${secuencia}` }]
      }),
    actualizar: (id: string, datos: DatosPerfilPago) =>
      modificar((actual) => {
        if (!actual.some((perfil) => perfil.id === id)) throw new ErrorPerfilesFacturacion('escritura')
        return actual.map((perfil) => (perfil.id === id ? { ...datos, id } : perfil))
      }),
    codigoDeFallo: (fallo: unknown) => (fallo instanceof ErrorPerfilesFacturacion ? fallo.codigo : 'escritura'),
  }
}
