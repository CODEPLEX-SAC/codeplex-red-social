const ARCHIVOS = import.meta.glob('../../../recursos/imagenes/marketplace-carrusel*.png', { eager: true, import: 'default' }) as Record<string, string>

export const IMAGENES_CARRUSEL_MARKETPLACE: string[] = Object.entries(ARCHIVOS)
  .sort(([rutaA], [rutaB]) => rutaA.localeCompare(rutaB))
  .map(([, url]) => url)
