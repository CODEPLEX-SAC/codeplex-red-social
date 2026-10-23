import { CabeceraPublicacion } from './cabecera_publicacion'
import { InteraccionesPublicacion } from './interacciones_publicacion'
import { MarcoPublicacion } from './marco_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { InteraccionPublicacion } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { PublicacionInicio } from '@/tipos/inicio/modelo_inicio'

export function BloqueMeGusta({ PUBLICACION_INICIO, compartidos, interaccion, puedeCompartir, onCompartir }: { PUBLICACION_INICIO: PublicacionInicio; compartidos: number; interaccion: InteraccionPublicacion; puedeCompartir: boolean; onCompartir: (comentario: string) => void }) {
  return (
    <MarcoPublicacion>
      <CabeceraPublicacion autorId={PUBLICACION_INICIO.autorId} nombre={PUBLICACION_INICIO.nombre} tiempo={PUBLICACION_INICIO.tiempo} publica={PUBLICACION_INICIO.publica} />
      <p className="m-0 px-4 pb-3 text-cuerpo leading-texto text-texto">
        {PUBLICACION_INICIO.texto}<br />{catalogoInicio.publicacion.mensaje_ejemplo}
      </p>
      <div className="grid grid-cols-3 gap-1 px-4 pb-3">
        <div className="relative aspect-square rounded-lg degradado-lavanda-suave" />
        <div className="relative aspect-square rounded-lg degradado-lavanda-suave" />
        <div className="relative aspect-square rounded-lg degradado-lavanda-suave after:absolute after:inset-0 after:grid after:place-items-center after:rounded-lg after:bg-overlay-14 after:text-conteo after:text-white after:content-mas8" />
      </div>
      <InteraccionesPublicacion
        nombre={PUBLICACION_INICIO.nombre}
        texto={PUBLICACION_INICIO.texto}
        interaccion={interaccion}
        compartidos={compartidos}
        puedeCompartir={puedeCompartir}
        onCompartir={onCompartir}
      />
    </MarcoPublicacion>
  )
}
