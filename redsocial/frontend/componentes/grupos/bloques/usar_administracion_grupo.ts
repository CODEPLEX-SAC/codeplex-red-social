import { useState } from 'react'
import type { ModalAdministracion, SeccionAdministracion } from '@/tipos/grupos/contrato_administracion_grupo'

const VENTANAS: Partial<Record<SeccionAdministracion, ModalAdministracion>> = { solicitudes: 'solicitudes', estado: 'estado', configuracion: 'editar' }

export function usarAdministracionGrupo() {
  const [seccion, setSeccion] = useState<SeccionAdministracion>('inicio')
  const [cerradas, setCerradas] = useState<string[]>([])
  const [panelAbierto, setPanelAbierto] = useState(false)
  const [modal, setModal] = useState<ModalAdministracion | null>(null)

  function elegir(destino: SeccionAdministracion) {
    const ventana = VENTANAS[destino]
    if (ventana) setModal(ventana)
    else setSeccion(destino)
    setPanelAbierto(false)
  }

  function alternarCategoria(categoria: string) {
    setCerradas((actuales) => (actuales.includes(categoria) ? actuales.filter((clave) => clave !== categoria) : [...actuales, categoria]))
  }

  return { seccion, cerradas, panelAbierto, modal, elegir, alternarCategoria, alternarPanel: () => setPanelAbierto((actual) => !actual), cerrarModal: () => setModal(null) }
}
