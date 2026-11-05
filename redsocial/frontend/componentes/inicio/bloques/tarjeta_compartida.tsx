import { imagenFotoRedSocial4, imagenUsuarioPredeterminada } from '../../compartido'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { CabeceraPublicacion } from './cabecera_publicacion'
import { InteraccionesPublicacion } from './interacciones_publicacion'
import { MarcoPublicacion } from './marco_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { TarjetaCompartidaProps } from '@/tipos/inicio/contrato_publicacion_visual'
import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'

export function TarjetaCompartida({ publicacion, compartidos, interaccion, puedeCompartir, onCompartir }: TarjetaCompartidaProps) {
  return (
    <MarcoPublicacion>
      <CabeceraPublicacion autorId={publicacion.autorId} nombre={publicacion.nombre} tiempo={publicacion.tiempoCompartio} publica={publicacion.publica} leyenda={catalogoInicio.leyendas.compartio_una_publicacion} />
      {publicacion.comentario && <p className="m-0 whitespace-pre-wrap break-words pb-3 text-cuerpo leading-texto text-texto">{publicacion.comentario}</p>}
      <div className="mb-4 overflow-hidden rounded-control border border-borde">
        <div className="flex items-center gap-2.5 px-3.5 pb-2 pt-3">
          <AvatarUsuario tamano="sm" imagen={imagenUsuarioPredeterminada} />
          <div className="min-w-0 flex-1">
            <strong className="block text-nombre-entidad text-texto">{publicacion.origenNombre}</strong>
            <span className="mt-0.5 block text-fecha-abreviada text-texto-suave">{publicacion.origenTiempo}</span>
          </div>
        </div>
        <p className="m-0 px-3.5 pb-2.5 text-cuerpo leading-texto text-texto">{publicacion.texto}</p>
        {publicacion.conMedio && <div className="mx-3.5 mb-3 h-35 overflow-hidden rounded-lg"><img src={imagenFotoRedSocial4} alt={catalogoCompartido.campos.alt_decorativo} className="h-full w-full object-cover" /></div>}
        {publicacion.conMedio && <a href="#" className={[CLASE_ENLACE_ACCION, 'mx-3.5 mb-3 block'].join(' ')}>{catalogoInicio.botones.ver_mas}</a>}
      </div>
      <InteraccionesPublicacion
        nombre={publicacion.origenNombre}
        texto={publicacion.texto}
        interaccion={interaccion}
        compartidos={compartidos}
        puedeCompartir={puedeCompartir}
        onCompartir={onCompartir}
      />
    </MarcoPublicacion>
  )
}
