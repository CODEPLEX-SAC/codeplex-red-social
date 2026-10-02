export interface ContactoPersona {
  nombre: string
  subtitulo: string
}

export interface ContactosPanelProps {
  titulo?: string
  contactos: readonly ContactoPersona[]
}
