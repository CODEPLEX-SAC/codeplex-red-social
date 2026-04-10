/**
 * PUERTO: SubidaMedios — Contexto: Publicaciones · Comentarios · Respuestas
 * PARA BACKEND
 * Reemplazar el cuerpo de `subirMedio` con la llamada real (S3, Cloudinary, etc.).
 * El contrato no cambia: entrada File → salida Promise<ResultadoSubida>
 */

import type { Medio } from "../../feed/publicaciones/publicaciones.data";

/** Resultado de subir un Medio: su UrlMedio y tipo. */
export type ResultadoSubida = Medio;

/**
 * Sube un Medio y retorna su UrlMedio + tipo.
 * Mock: blob URL temporal (válida solo en sesión). En producción: URL permanente.
 */
export async function subirMedio(archivo: File): Promise<ResultadoSubida> {
  return {
    url:  URL.createObjectURL(archivo),
    tipo: archivo.type.startsWith("video/") ? "video" : "imagen",
  };
}

/**
 * Sube múltiples Medios en paralelo, ignorando archivos que no sean imagen o video.
 */
export async function subirMedios(archivos: File[] | FileList): Promise<ResultadoSubida[]> {
  const validos = Array.from(archivos).filter(
    (f) => f.type.startsWith("image/") || f.type.startsWith("video/")
  );
  return Promise.all(validos.map(subirMedio));
}
