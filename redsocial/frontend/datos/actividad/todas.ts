export const PUBLICACION_GRUPO_TODAS = {
  nombreUsuario: 'María Fernández',
  accion: ' publicó en el grupo ',
  nombreGrupo: 'Ingenierios Civiles',
  tiempo: '2 horas',
  texto: 'Excelente avance en el proyecto del puente en la Av. Central. ¡Gran trabajo equipo! 💪🎆',
}

export const MENCION_TODAS = {
  nombreUsuario: 'Luis Rodríguez',
  accion: ' te mencionó en una publicación',
  tiempo: '3 horas',
  texto: 'revisa porfa el informe de costos del proyecto. ¡Gracias!',
}

export const COMENTARIO_TODAS = {
  nombreUsuario: 'Carmen López',
  accion: ' comentó tu publicación',
  tiempo: '5 horas',
  texto: 'Muy buen trabajo Pedro, los resultados se ven increibles. ¡Sigue así! 👏',
}

export const EVENTO_SISTEMA_TODAS = {
  nombreUsuario: 'Sistema Codeplex',
  tiempo: '6 horas',
  texto: 'Se ha completado el respaldo automático de tu empresa Construcciones Lozano SAC.',
  estado: 'Completado',
}

export const ARCHIVOS_MODULO_TODAS = {
  nombreUsuario: 'Diego Mendoza',
  accion: ' agregó 3 nuevos archivos en el módulo ',
  nombreModulo: 'Contabilidad',
  tiempo: '7 horas',
  archivos: [
    { tipo: 'pdf' as const, nombre: 'Balance General - Julio 2026.pdf', tamano: '2.4 MB' },
    { tipo: 'hoja' as const, nombre: 'Estado de Resultados - Julio 2026.xlsx', tamano: '1.6 MB' },
    { tipo: 'hoja' as const, nombre: 'Libro Diario - Julio 2026.xlsx', tamano: '1.4 MB' },
  ],
}

export const GRUPO_UNIDO_TODAS = {
  nombreUsuario: 'Ana García',
  accion: ' se unió al grupo ',
  nombreGrupo: 'Emprendedores Perú',
  tiempo: '8 horas',
  miembros: '8.7 mil miembros',
}
