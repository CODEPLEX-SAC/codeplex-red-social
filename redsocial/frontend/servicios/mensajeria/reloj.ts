const RELOJ_DEL_SISTEMA = () => new Date()

let fuente: () => Date = RELOJ_DEL_SISTEMA

export function ahoraMensajeria(): Date {
  return fuente()
}

export function sustituirRelojMensajeria(nueva: () => Date) {
  fuente = nueva
}

export function restaurarRelojMensajeria() {
  fuente = RELOJ_DEL_SISTEMA
}
