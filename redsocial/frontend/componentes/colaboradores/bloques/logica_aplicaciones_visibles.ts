export function contarOcultos(fila: HTMLElement, anchoInsignia: number): number {
  const hijos = Array.from(fila.children) as HTMLElement[]
  if (hijos.length === 0) return 0
  const primeraLinea = hijos[0].offsetTop
  const ocultos = hijos.filter((hijo) => hijo.offsetTop > primeraLinea).length
  if (ocultos === 0) return 0
  const brecha = hijos.length > 1 ? Math.max(0, hijos[1].offsetLeft - hijos[0].offsetLeft - hijos[0].offsetWidth) : 0
  const necesario = hijos.reduce((suma, hijo) => suma + hijo.offsetWidth, 0) + brecha * (hijos.length - 1)
  return necesario <= fila.clientWidth + anchoInsignia + brecha ? 0 : ocultos
}
