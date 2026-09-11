export function esClicSimpleDeEnlace(evento: MouseEvent): boolean {
  if (evento.defaultPrevented) return false
  if (evento.button !== 0 || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return false
  return true
}
