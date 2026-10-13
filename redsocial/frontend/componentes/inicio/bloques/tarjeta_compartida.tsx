import { imagenUsuarioPredeterminada } from '../../compartido'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { CabeceraPublicacion } from './cabecera_publicacion'
import { MarcoPublicacion } from './marco_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { TarjetaCompartidaProps } from '@/tipos/inicio/contrato_publicacion_visual'

export function TarjetaCompartida({ publicacion }: TarjetaCompartidaProps) {
  return (
    <MarcoPublicacion>
      <CabeceraPublicacion autorId={publicacion.autorId} nombre={publicacion.nombre} tiempo={publicacion.tiempoCompartio} leyenda={catalogoInicio.leyendas.compartio_una_publicacion} />
      <div className="mx-4 mb-4 overflow-hidden rounded-control border border-borde">
        <div className="flex items-center gap-2.5 px-3.5 pb-2 pt-3">
          <AvatarImagen src={imagenUsuarioPredeterminada} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
          <div className="min-w-0 flex-1">
            <strong className="block text-nombre-entidad text-texto">{publicacion.origenNombre}</strong>
            <span className="mt-0.5 block text-fecha-abreviada text-texto-suave">{publicacion.origenTiempo}</span>
          </div>
        </div>
        <p className="m-0 px-3.5 pb-2.5 text-cuerpo leading-texto text-texto">{publicacion.texto}</p>
        <div className="mx-3.5 mb-3 h-35 rounded-lg degradado-lavanda-suave" />
        <a href="#" className="mx-3.5 mb-3 block text-enlace-accion text-primario no-underline">{catalogoInicio.botones.ver_mas}</a>
      </div>
    </MarcoPublicacion>
  )
}
