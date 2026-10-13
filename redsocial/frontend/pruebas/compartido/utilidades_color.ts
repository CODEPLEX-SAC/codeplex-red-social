export function valorDeToken(css: string, nombre: string): string {
  const coincidencia = css.match(new RegExp(`--color-${nombre}:\\s*([^;]+);`))
  if (!coincidencia) throw new Error(`token no definido: ${nombre}`)
  const valor = coincidencia[1].trim().toLowerCase()
  const alias = valor.match(/^var\(--color-([a-z0-9-]+)\)$/)
  if (alias) return valorDeToken(css, alias[1])
  return valor.length === 4 ? '#' + [...valor.slice(1)].map((digito) => digito + digito).join('') : valor
}

function luminancia(hex: string): number {
  const [rojo, verde, azul] = [1, 3, 5].map((inicio) => parseInt(hex.slice(inicio, inicio + 2), 16) / 255).map((canal) => (canal <= 0.03928 ? canal / 12.92 : ((canal + 0.055) / 1.055) ** 2.4))
  return 0.2126 * rojo + 0.7152 * verde + 0.0722 * azul
}

export function contraste(primero: string, segundo: string): number {
  const [claro, oscuro] = [luminancia(primero), luminancia(segundo)].sort((a, b) => b - a)
  return (claro + 0.05) / (oscuro + 0.05)
}
