export function obtenerRutaDelEnlaceClicado(evento: MouseEvent): string | undefined {
  const objetivo = evento.target
  if (!(objetivo instanceof Element)) return undefined
  const enlace = objetivo.closest('a')
  if (!enlace) return undefined
  const href = enlace.getAttribute('href')
  if (!href || !href.startsWith('/')) return undefined
  return href
}
