import type { ReactNode } from 'react'
import { ContextoInsigniasNavegacion } from '@/componentes/compartido/navegacion/contexto_insignias_navegacion'
import { usarMensajeria } from '@/componentes/mensajeria'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA, RELOJ_MENSAJERIA } from '../mensajeria/rutas_mensajeria'
import { SESION_ACTUAL } from './rutas_compartido'

export function ProveedorInsigniasNavegacion({ children }: { children: ReactNode }) {
  const mensajeria = usarMensajeria(ALMACEN_MENSAJERIA, RELOJ_MENSAJERIA, SESION_ACTUAL.id)

  return <ContextoInsigniasNavegacion.Provider value={{ [catalogoMensajeria.clave_navegacion]: mensajeria.noLeidas.length }}>{children}</ContextoInsigniasNavegacion.Provider>
}
