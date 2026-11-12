import { useState } from 'react'

export function usarPestanaMarketplace() {
  const [pestana, setPestana] = useState<string | null>(null)

  return {
    pestana,
    elegir: (nombre: string) => setPestana((actual) => (actual === nombre ? null : nombre)),
    limpiar: () => setPestana(null),
  }
}
