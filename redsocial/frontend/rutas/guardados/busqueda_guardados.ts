import { coincideNombre, crearFuenteLocal } from '../../componentes/compartido/interfaz/fuente_busqueda_local'
import type { ConfiguracionBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { GrupoGuardado } from '@/tipos/guardados/modelo_guardados'
import { GRUPOS_GUARDADOS } from '../../servicios/guardados/guardados'

export const BUSQUEDA_GRUPOS_GUARDADOS: ConfiguracionBusqueda<GrupoGuardado> = { fuente: crearFuenteLocal(GRUPOS_GUARDADOS, coincideNombre), modo: 'local' }
