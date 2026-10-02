import datos from './panel_lateral.json'

export const CONTACTOS_LINEA_MENSAJERIA = datos.contactosLineaMensajeria as { nombre: string; colaborador: boolean }[]
export const GRUPOS_RECIENTES_MENSAJERIA = datos.gruposRecientesMensajeria as { nombre: string; miembros: string }[]
export const EVENTOS_PROXIMOS_MENSAJERIA = datos.eventosProximosMensajeria as { dia: string; mes: string; titulo: string; detalle: string }[]
