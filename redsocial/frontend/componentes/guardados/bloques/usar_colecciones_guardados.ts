import { useState } from 'react'
import { agregarColeccion, agregarGrupoAColeccion, eliminarColeccion, quitarGrupoDeColeccion, quitarGrupoDeTodas, renombrarColeccion } from './logica_colecciones_guardados'
import type { ControlColeccionesGuardados } from '@/tipos/guardados/contrato_control_guardados'
import type { ColeccionGuardada } from '@/tipos/guardados/modelo_guardados'

export function usarColeccionesGuardados(iniciales: readonly ColeccionGuardada[]): ControlColeccionesGuardados {
  const [colecciones, setColecciones] = useState<ColeccionGuardada[]>(() => [...iniciales])

  return {
    colecciones,
    crear: (nombre) => setColecciones((actual) => agregarColeccion(actual, nombre)),
    renombrar: (id, nombre) => setColecciones((actual) => renombrarColeccion(actual, id, nombre)),
    eliminar: (id) => setColecciones((actual) => eliminarColeccion(actual, id)),
    agregarGrupo: (id, grupoId) => setColecciones((actual) => agregarGrupoAColeccion(actual, id, grupoId)),
    quitarGrupo: (id, grupoId) => setColecciones((actual) => quitarGrupoDeColeccion(actual, id, grupoId)),
    quitarGrupoDeTodas: (grupoId) => setColecciones((actual) => quitarGrupoDeTodas(actual, grupoId)),
  }
}
