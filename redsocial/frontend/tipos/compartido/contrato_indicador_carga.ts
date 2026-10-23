export interface IndicadorCargaProps {
  tamano?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primario' | 'secundario' | 'error' | 'info' | 'exito' | 'advertencia' | 'blanco' | 'gris'
  tipo?: 'borde' | 'anillo' | 'puntos' | 'pulso' | 'segmentos' | 'lineas' | 'puntos-circulo' | 'cuadricula'
  etiqueta?: string
  className?: string
}
