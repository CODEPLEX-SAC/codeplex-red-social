import { useState } from 'react'
import { imagenesDePublicacion, mediosVisibles, restantesDe } from './logica_medios_publicacion'
import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

export function usarMediosPublicacion(medios: MedioLocalPublicacion[]) {
  const [abierta, setAbierta] = useState<number | null>(null)
  const imagenes = imagenesDePublicacion(medios)

  return {
    abierta,
    imagenes,
    visibles: mediosVisibles(medios),
    restantes: restantesDe(medios),
    setAbierta,
    abrirImagen: (id: string) => setAbierta(imagenes.findIndex((imagen) => imagen.id === id)),
    cerrarVisor: () => setAbierta(null),
  }
}
