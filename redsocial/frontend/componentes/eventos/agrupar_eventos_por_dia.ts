export function agruparEventosPorDia<T extends { dia: number }>(eventos: readonly T[], totalDias: number): T[][] {
  const grupos: T[][] = Array.from({ length: totalDias }, () => [])
  for (const evento of eventos) grupos[evento.dia]?.push(evento)
  return grupos
}
