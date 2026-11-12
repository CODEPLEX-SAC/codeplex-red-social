import type { FuenteBusqueda, ResultadoBusquedaLista } from '@/tipos/compartido/contrato_busqueda'
import type { PersonaConIdentificador } from './modelo_persona_busqueda'

export const PERSONAS: readonly PersonaConIdentificador[] = [
  { id: 'p1', nombre: 'Ana García' },
  { id: 'p2', nombre: 'Luis Rodríguez' },
  { id: 'p3', nombre: 'Anabel Torres' },
]

export function coincidentes(consulta: string): ResultadoBusquedaLista<PersonaConIdentificador> {
  const elementos = PERSONAS.filter((persona) => persona.nombre.toLowerCase().includes(consulta.toLowerCase()))
  return { elementos, total: elementos.length }
}

export const fuenteLocal: FuenteBusqueda<PersonaConIdentificador> = (consulta) => coincidentes(consulta)

export function diferida<T>() {
  let resolver: (valor: T) => void = () => undefined
  let rechazar: (causa: unknown) => void = () => undefined
  const promesa = new Promise<T>((alResolver, alRechazar) => {
    resolver = alResolver
    rechazar = alRechazar
  })
  return { promesa, resolver, rechazar }
}
