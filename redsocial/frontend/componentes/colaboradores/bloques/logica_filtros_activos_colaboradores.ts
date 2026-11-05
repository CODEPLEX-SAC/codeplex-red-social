import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { FiltroActivo, FiltrosAvanzadosColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import { listarFiltrosAvanzados } from './criterios_exportacion_colaboradores'
import { interpolarPlantilla } from './colaboradores_tabla_config'
import { crearFiltrosAvanzadosColaboradores } from './logica_filtros_avanzados_colaboradores'

const plantillas = catalogoColaboradores.exportacion.criterios
const CLAVES = catalogoColaboradores.filtros_activos.claves
const OPCION_TODOS = catalogoColaboradores.selectores.rol_perfil.opciones[0]
const OPCION_TODAS = catalogoColaboradores.selectores.aplicaciones.opciones[0]

export function crearFiltrosActivos(rol: string, aplicacion: string, avanzados: FiltrosAvanzadosColaboradores): FiltroActivo[] {
  const basicos: FiltroActivo[] = []
  if (rol !== OPCION_TODOS) basicos.push({ clave: CLAVES.rol, etiqueta: interpolarPlantilla(plantillas.rol, { valor: rol }) })
  if (aplicacion !== OPCION_TODAS) basicos.push({ clave: CLAVES.aplicacion, etiqueta: interpolarPlantilla(plantillas.aplicacion, { valor: aplicacion }) })
  return [...basicos, ...listarFiltrosAvanzados(avanzados)]
}

export function quitarFiltroAvanzado(avanzados: FiltrosAvanzadosColaboradores, clave: string): FiltrosAvanzadosColaboradores {
  const vacios = crearFiltrosAvanzadosColaboradores()
  const campo = clave as keyof FiltrosAvanzadosColaboradores
  return { ...avanzados, [campo]: vacios[campo] }
}
