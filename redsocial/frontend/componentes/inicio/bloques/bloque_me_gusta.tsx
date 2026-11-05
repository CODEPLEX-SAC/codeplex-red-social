import { imagenFotoRedSocial1, imagenFotoRedSocial2, imagenFotoRedSocial3 } from '../../compartido'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
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
      <p className="m-0 pb-3 text-cuerpo leading-texto text-texto">
        {PUBLICACION_INICIO.texto}<br />{catalogoInicio.publicacion.mensaje_ejemplo}
      </p>
      <div className="grid grid-cols-3 gap-1 pb-4.5">
        <div className="relative aspect-square rounded-lg degradado-lavanda-suave"><img src={imagenFotoRedSocial1} alt={catalogoCompartido.campos.alt_decorativo} className="h-full w-full rounded-lg object-cover" /></div>
        <div className="relative aspect-square rounded-lg degradado-lavanda-suave"><img src={imagenFotoRedSocial2} alt={catalogoCompartido.campos.alt_decorativo} className="h-full w-full rounded-lg object-cover" /></div>
        <div className="relative aspect-square rounded-lg degradado-lavanda-suave after:absolute after:inset-0 after:grid after:place-items-center after:rounded-lg after:bg-overlay-14 after:text-conteo after:text-white after:content-mas8"><img src={imagenFotoRedSocial3} alt={catalogoCompartido.campos.alt_decorativo} className="h-full w-full rounded-lg object-cover" /></div>
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
