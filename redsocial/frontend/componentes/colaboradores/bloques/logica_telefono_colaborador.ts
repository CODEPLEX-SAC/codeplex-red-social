import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'

const CODIGOS: string[] = catalogoColaboradores.selectores.codigo_pais.opciones
const SEPARADOR = ' '

export function separarTelefono(valor: string) {
  const codigo = CODIGOS.find((candidato) => valor === candidato || valor.startsWith(candidato + SEPARADOR))
  return codigo ? { codigo, numero: valor.slice(codigo.length).trim() } : { codigo: CODIGOS[0], numero: valor }
}

export function componerTelefono(codigo: string, numero: string): string {
  return [codigo, numero].join(SEPARADOR).trim()
}
