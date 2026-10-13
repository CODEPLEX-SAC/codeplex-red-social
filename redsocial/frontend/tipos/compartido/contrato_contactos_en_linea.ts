export interface ContactoEnLinea {
  nombre: string
  colaborador?: boolean | undefined
}

export interface ContactosEnLineaPanelProps {
  contactos: readonly ContactoEnLinea[]
}
