export interface GrupoRecomendado {
  nombre: string
  miembros: string
}

export interface GruposRecomendadosPanelProps {
  titulo: string
  grupos: readonly GrupoRecomendado[]
}
