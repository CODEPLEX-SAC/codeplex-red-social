const ARCHIVOS_IMAGEN = import.meta.glob('../../../../recursos/imagenes/*.{jpg,png}', { eager: true, import: 'default' }) as Record<string, string>

export function imagenDeRecurso(recurso: string): string | null {
  const entrada = Object.entries(ARCHIVOS_IMAGEN).find(([ruta]) => ruta.endsWith(`/${recurso}`))
  return entrada ? entrada[1] : null
}
