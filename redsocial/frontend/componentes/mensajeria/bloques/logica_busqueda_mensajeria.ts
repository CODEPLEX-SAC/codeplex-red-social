import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'

export function coincidePorNombre(elemento: { nombre: string }, consulta: string): boolean {
  return contieneTexto(elemento.nombre, consulta)
}
