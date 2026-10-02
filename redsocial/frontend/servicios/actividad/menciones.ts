import datos from './menciones.json'

export const MENCIONES = datos.menciones as { nombre: string; accion: string; nombreGrupo?: string; tiempo: string; texto: string; conImagen: boolean; reacciones: number; comentarios: number }[]
