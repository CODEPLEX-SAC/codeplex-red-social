import datos from './bandejas.json'

export const FAVORITOS = datos.favoritos as { nombre: string; preview: string; contexto: string; hora: string }[]
export const NO_LEIDOS = datos.noLeidos as { nombre: string; preview: string; contexto: string; hora: string; badge: number }[]
export const MOSTRANDO_FAVORITOS = datos.mostrandoFavoritos
export const MOSTRANDO_NO_LEIDOS = datos.mostrandoNoLeidos
