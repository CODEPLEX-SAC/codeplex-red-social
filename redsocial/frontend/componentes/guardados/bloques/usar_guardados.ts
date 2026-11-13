import { filtrarGruposGuardados, ordenarGruposGuardados } from './logica_colecciones_guardados'
import { usarAccionesGuardados } from './usar_acciones_guardados'
import { usarColeccionesGuardados } from './usar_colecciones_guardados'
import { usarNavegacionGuardados } from './usar_navegacion_guardados'
import { usarVistaMovil } from '../../compartido/interfaz/usar_vista_movil'
import type { ControlGuardados, ParametrosUsarGuardados } from '@/tipos/guardados/contrato_control_guardados'

export function usarGuardados({ coleccionesIniciales, todosLosGrupos, busqueda }: ParametrosUsarGuardados): ControlGuardados {
  const movil = usarVistaMovil()
  const navegacion = usarNavegacionGuardados()
  const colecciones = usarColeccionesGuardados(coleccionesIniciales)
  const acciones = usarAccionesGuardados(colecciones, navegacion)
  const coleccionAbierta = colecciones.colecciones.find((coleccion) => coleccion.id === navegacion.abiertaId)
  const filtrados = filtrarGruposGuardados({ grupos: busqueda.resultado.elementos, quitados: acciones.quitados, coleccion: coleccionAbierta })
  const total = todosLosGrupos.length - acciones.quitados.length

  return { navegacion, colecciones, acciones, busqueda, coleccionAbierta, grupos: ordenarGruposGuardados(filtrados, navegacion.orden), total, movil }
}
