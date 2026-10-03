const MODULOS_IMAGENES = import.meta.glob<string>('../../../recursos/imagenes/carrusel*.jpg', {
  eager: true,
  import: 'default',
})

export function urlImagenCarruselAcceso(archivo: string): string {
  const ruta = Object.keys(MODULOS_IMAGENES).find((clave) => clave.endsWith(archivo))
  return ruta ? MODULOS_IMAGENES[ruta] : ''
}
