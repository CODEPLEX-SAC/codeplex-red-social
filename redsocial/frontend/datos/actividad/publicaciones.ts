import type { Publicacion } from '@/tipos/actividad/pagina_actividad_publicaciones'

export const PUBLICACIONES: (Publicacion & { nombreGrupo?: string })[] = [
  { nombre: 'Ana Torres', accion: ' publicó una actualización', tiempo: '1 hora', texto: 'Terminamos la primera fase del proyecto Alfa. ¡Gracias a todo el equipo por el esfuerzo! 🚀', conImagen: true, reacciones: 92, comentarios: 18 },
  { nombre: 'Miguel Rojas', accion: ' compartió una publicación', tiempo: '2 horas', texto: 'Excelente artículo sobre las nuevas normas de seguridad en obra. Vale la pena revisarlo con el equipo.', conImagen: false, reacciones: 37, comentarios: 6 },
  { nombre: 'José Castillo', accion: ' publicó en el grupo ', nombreGrupo: 'Tecnología & Innovación', tiempo: '3 horas', texto: 'Ya está disponible la nueva versión del módulo de inventarios. Cualquier duda, escríbanme por aquí.', conImagen: true, reacciones: 64, comentarios: 15 },
  { nombre: 'Laura Pérez', accion: ' publicó una actualización', tiempo: '4 horas', texto: 'Cerramos el mes con un 18% más de ventas respecto al periodo anterior. ¡Buen trabajo equipo comercial! 📈', conImagen: false, reacciones: 110, comentarios: 21 },
  { nombre: 'Sofía Gómez', accion: ' publicó una actualización', tiempo: '5 horas', texto: 'Fotos del taller de capacitación en seguridad de esta semana. ¡Gran participación de todos!', conImagen: true, reacciones: 53, comentarios: 10 },
  { nombre: 'Diego Mendoza', accion: ' publicó una actualización', tiempo: '6 horas', texto: 'Publiqué la guía rápida del nuevo flujo de aprobación de facturas. Cualquier consulta, quedo atento.', conImagen: false, reacciones: 31, comentarios: 7 },
]
