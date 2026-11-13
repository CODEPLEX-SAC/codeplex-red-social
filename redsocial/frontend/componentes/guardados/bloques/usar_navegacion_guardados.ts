import { useState } from 'react'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { ControlNavegacionGuardados } from '@/tipos/guardados/contrato_control_guardados'
import type { PestanaGuardado, PestanaPrincipalGuardados, VistaGruposGuardados } from '@/tipos/guardados/modelo_guardados'

const PESTANAS: Record<string, PestanaPrincipalGuardados> = { elementos: 'elementos', colecciones: 'colecciones' }

export function usarNavegacionGuardados(): ControlNavegacionGuardados {
  const [pestana, setPestana] = useState<PestanaPrincipalGuardados>('elementos')
  const [filtro, setFiltro] = useState<PestanaGuardado>('todo')
  const [abiertaId, setAbiertaId] = useState<string | null>(null)
  const [expandido, setExpandido] = useState(false)
  const [orden, setOrden] = useState(catalogoGuardados.orden_inicial)
  const [vista, setVista] = useState<VistaGruposGuardados>('listas')

  function cambiarPestana(clave: string) {
    setPestana(PESTANAS[clave] ?? 'elementos')
    setAbiertaId(null)
  }

  function abrirColeccion(id: string) {
    setPestana('colecciones')
    setAbiertaId(id)
  }

  function irATodos() {
    setPestana('elementos')
    setAbiertaId(null)
  }

  return {
    pestana,
    filtro,
    abiertaId,
    expandido,
    orden,
    vista,
    cambiarPestana,
    cambiarFiltro: (clave) => setFiltro(clave as PestanaGuardado),
    abrirColeccion,
    irATodos,
    cerrarColeccion: () => setAbiertaId(null),
    alternarExpandido: () => setExpandido((actual) => !actual),
    cambiarOrden: setOrden,
    cambiarVista: setVista,
  }
}
