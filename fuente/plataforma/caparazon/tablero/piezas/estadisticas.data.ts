/**
 * DOMINIO: Feed > Dashboard
 * Contexto Acotado: Estadísticas de actividad del usuario en la red social.
 */

export interface EstadisticaActividad {
  titulo: string;
  icono: string;
  iconoTamano: number;
  valor: number;
}

export const ESTADISTICAS_ACTIVIDAD: EstadisticaActividad[] = [
  { titulo: "Tus post",    icono: "tusPost",     iconoTamano: 18, valor: 10 },
  { titulo: "Tus Videos",  icono: "videos",      iconoTamano: 20, valor: 10 },
  { titulo: "Compartidos", icono: "compartidos", iconoTamano: 18, valor: 10 },
];
