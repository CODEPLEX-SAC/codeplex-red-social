export interface PuertoLeidasAvisos {
  suscribir: (oyente: () => void) => () => void
  version: () => number
  esLeida: (id: string, porDefecto: boolean) => boolean
  marcar: (id: string, leida: boolean) => void
  marcarTodas: (ids: readonly string[]) => void
}
