import datos from './detalle_grupos.json'

const ARCHIVOS_IMAGEN = import.meta.glob('../../../recursos/imagenes/*.{jpg,png}', { eager: true, import: 'default' }) as Record<string, string>
const IMAGENES_POR_GRUPO = new Map(Object.entries(datos.imagenes))

function imagenDe(nombre: string): string {
  const entrada = Object.entries(ARCHIVOS_IMAGEN).find(([ruta]) => ruta.endsWith(`/${nombre}`))
  return entrada ? entrada[1] : String()
}

export const IMAGEN_CREAR_GRUPO = imagenDe('crear-grupo.png')
export const IMAGEN_VISTA_PREVIA_CREAR_GRUPO = imagenDe('vista-previa-crear-grupo.png')
const IMAGENES_PROVISIONALES = [imagenDe('descargas-drive.jpg'), imagenDe('data-analytics.jpg')]

export function imagenesRecientes(): string[] {
  return [imagenDe('descargas-drive.jpg'), imagenDe('data-analytics.jpg'), imagenDe('python.jpg'), imagenDe('foto1_red-social.jpg')]
}

export function imagenesGaleria(): string[] {
  const nombres = ['descargas-drive.jpg', 'data-analytics.jpg', 'python.jpg', 'foto1_red-social.jpg', 'foto2_red-social.jpg', 'foto3_red-social.jpg', 'foto4_red-social.jpg', 'carrusel1.jpg', 'carrusel2.jpg', 'carrusel3.jpg', 'concierto.jpg', 'maxresdefault.jpg']
  return nombres.map(imagenDe).filter(Boolean)
}

export function imagenDeGrupo(nombre: string, indice: number): string {
  const archivo = IMAGENES_POR_GRUPO.get(nombre)
  if (archivo) return imagenDe(archivo)
  return IMAGENES_PROVISIONALES[indice % IMAGENES_PROVISIONALES.length]
}
