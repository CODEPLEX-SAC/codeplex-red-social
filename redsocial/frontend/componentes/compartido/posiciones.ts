export function posicionesDe(cantidad: number) {
  return Array.from({ length: cantidad }, (_, orden) => ({ id: String(orden), orden }))
}
