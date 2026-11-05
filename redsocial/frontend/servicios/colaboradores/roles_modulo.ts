import type { RepositorioRolesModulo, RolModulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const SEPARADOR_AMBITO = '|'
let creados = new Map<string, RolModulo[]>()

function clave(ambito: string, modulo: string) {
  return [ambito, modulo].join(SEPARADOR_AMBITO)
}

function copiar(rol: RolModulo): RolModulo {
  return {
    ...rol,
    configuracion: {
      operaciones: Object.fromEntries(Object.entries(rol.configuracion.operaciones).map(([recurso, claves]) => [recurso, [...claves]])),
      especificos: Object.fromEntries(Object.entries(rol.configuracion.especificos).map(([recurso, lista]) => [recurso, lista.map((permiso) => ({ ...permiso }))])),
    },
  }
}

export function reiniciarRolesDemostracion() {
  creados = new Map()
}

export const REPOSITORIO_ROLES_MODULO: RepositorioRolesModulo = {
  listar: (ambito, modulo) => (creados.get(clave(ambito, modulo)) ?? []).map(copiar),
  registrar: (ambito, modulo, rol) => {
    const guardado = copiar({ ...rol, creado: true })
    creados.set(clave(ambito, modulo), [...(creados.get(clave(ambito, modulo)) ?? []), guardado])
    return copiar(guardado)
  },
  actualizar: (ambito, modulo, rol) => {
    const lista = creados.get(clave(ambito, modulo)) ?? []
    const guardado = copiar(rol)
    const existe = lista.some((existente) => existente.clave === rol.clave)
    creados.set(clave(ambito, modulo), existe ? lista.map((existente) => (existente.clave === rol.clave ? guardado : existente)) : [...lista, guardado])
    return copiar(guardado)
  },
  eliminar: (ambito, modulo, claveRol) => {
    const lista = creados.get(clave(ambito, modulo)) ?? []
    if (!lista.some((existente) => existente.clave === claveRol && existente.creado)) return false
    creados.set(clave(ambito, modulo), lista.filter((existente) => existente.clave !== claveRol))
    return true
  },
}
