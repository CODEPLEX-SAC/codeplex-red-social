/**
 * PUERTO: SubidaMedios — Contexto: Publicaciones · Comentarios · Respuestas
 * Sube archivos a Supabase Storage (bucket: media).
 * Devuelve URL pública permanente → persiste entre sesiones.
 */

import { supabase } from "@/integraciones/persistencia/supabase-red-social";
import type { Medio } from "@/capacidades/publicaciones/contratos/publicaciones.contratos";

const BUCKET = "publicaciones-medios";

/** Resultado de subir un Medio: su url y tipo. */
export type ResultadoSubida = Medio;

/**
 * Sube un archivo a Supabase Storage y retorna su URL pública permanente.
 * Si falla el upload (bucket no creado, permisos, etc.) cae a blob URL temporal
 * para no romper el flujo durante desarrollo.
 */
export async function subirMedio(archivo: File): Promise<ResultadoSubida> {
  const tipo: Medio["tipo"] = archivo.type.startsWith("video/") ? "video" : "imagen";

  // Nombre único: timestamp + random + extensión original
  const ext      = archivo.name.split(".").pop() ?? (tipo === "video" ? "mp4" : "jpg");
  const nombre   = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const path     = `publicaciones/${nombre}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, archivo, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    // Fallback: blob URL temporal (solo válida en sesión actual)
    console.warn("[SubidaMedios] Upload fallido, usando blob URL temporal:", error.message);
    return { url: URL.createObjectURL(archivo), tipo };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, tipo };
}

/**
 * Sube múltiples archivos en paralelo, ignorando los que no sean imagen o video.
 */
export async function subirMedios(archivos: File[] | FileList): Promise<ResultadoSubida[]> {
  const validos = Array.from(archivos).filter(
    (f) => f.type.startsWith("image/") || f.type.startsWith("video/")
  );
  return Promise.all(validos.map(subirMedio));
}
