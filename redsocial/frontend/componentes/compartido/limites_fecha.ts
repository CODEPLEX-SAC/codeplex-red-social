import type { Dayjs } from 'dayjs'

export function inicioDelDia<T>(fecha: Dayjs | null, vacio: T): number | T {
  if (!fecha) return vacio
  return fecha.startOf('day').valueOf()
}

export function finDelDia<T>(fecha: Dayjs | null, vacio: T): number | T {
  if (!fecha) return vacio
  return fecha.endOf('day').valueOf()
}
