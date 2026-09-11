export interface GrupoActividad {
  nombre: string
  color: 'morado' | 'azul' | 'naranja' | 'rosa' | 'teal'
  privacidad: 'publico' | 'privado'
  miembros: string
  usuario: string
  accion: string
  tiempo: string
  actividades: string
}
