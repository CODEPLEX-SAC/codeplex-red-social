import { crearFuenteLocal } from '../../componentes/compartido/interfaz/fuente_busqueda_local'
import { coincideDestacado } from '../../componentes/marketplace/bloques/logica_busqueda_marketplace'
import type { ConfiguracionBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { Destacado } from '@/tipos/marketplace/modelo_marketplace'
import { DESTACADOS } from '../../servicios/marketplace/marketplace'

export const BUSQUEDA_DESTACADOS_MARKETPLACE: ConfiguracionBusqueda<Destacado> = { fuente: crearFuenteLocal(DESTACADOS, coincideDestacado), modo: 'local' }
