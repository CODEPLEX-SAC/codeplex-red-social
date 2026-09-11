export function obtenerArchivoDelEnlaceClicado(evento: MouseEvent): string | undefined {
  const objetivo = evento.target
  if (!(objetivo instanceof Element)) return undefined
  const enlace = objetivo.closest('a')
  if (!enlace) return undefined
  const href = enlace.getAttribute('href')
  if (!href) return undefined
  return href.slice(href.lastIndexOf('/') + 1)
}
