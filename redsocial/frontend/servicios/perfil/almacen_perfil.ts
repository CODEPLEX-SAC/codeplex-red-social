import type { EdicionPerfil } from '@/tipos/perfil/modelo_perfil'

let ediciones: Record<string, EdicionPerfil> = {}
const escuchas = new Set<() => void>()

export function leerEdicionesPerfil() {
  return ediciones
}

export function suscribirEdicionesPerfil(escucha: () => void) {
  escuchas.add(escucha)
  return () => {
    escuchas.delete(escucha)
  }
}

export function guardarEdicionPerfil(id: string, edicion: EdicionPerfil) {
  ediciones = { ...ediciones, [id]: { ...ediciones[id], ...edicion } }
  escuchas.forEach((escucha) => escucha())
}

export function reiniciarEdicionesPerfilDemostracion() {
  ediciones = {}
  escuchas.forEach((escucha) => escucha())
}
