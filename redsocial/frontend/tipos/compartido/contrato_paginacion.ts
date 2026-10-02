export interface PaginacionProps {
  total: number
  pagina: number
  alCambiar: (pagina: number) => void
}
