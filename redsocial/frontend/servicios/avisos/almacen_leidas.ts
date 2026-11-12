import type { PuertoLeidasAvisos } from '@/tipos/avisos/contrato_leidas_avisos'

const oyentes = new Set<() => void>()
let marcas: Record<string, boolean> = {}
let version = 0

function cambiar(nuevas: Record<string, boolean>) {
  marcas = { ...marcas, ...nuevas }
  version += 1
  oyentes.forEach((oyente) => oyente())
}

export const PUERTO_LEIDAS_AVISOS: PuertoLeidasAvisos = {
  suscribir: (oyente) => {
    oyentes.add(oyente)
    return () => {
      oyentes.delete(oyente)
    }
  },
  version: () => version,
  esLeida: (id, porDefecto) => marcas[id] ?? porDefecto,
  marcar: (id, leida) => cambiar({ [id]: leida }),
  marcarTodas: (ids) => cambiar(Object.fromEntries(ids.map((id) => [id, true]))),
}
