import { normalizarTexto } from '../compartido/interfaz/buscar_opciones_locales'

export function filtrarEventosPorCategoria<T extends { categoriaEtiqueta: string }>(eventos: T[], seleccionadas: string[]) {
  if (seleccionadas.length === 0) return eventos
  const elegidas = seleccionadas.map(normalizarTexto)
  return eventos.filter((evento) => elegidas.includes(normalizarTexto(evento.categoriaEtiqueta)))
}
