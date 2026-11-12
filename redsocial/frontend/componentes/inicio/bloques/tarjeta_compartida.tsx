import { imagenFotoRedSocial4, imagenUsuarioPredeterminada } from '../../compartido'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { BloqueMediosPublicacion } from './bloque_medios_publicacion'
import { CabeceraPublicacion } from './cabecera_publicacion'
import { InteraccionesPublicacion } from './interacciones_publicacion'
import { MarcoPublicacion } from './marco_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { TarjetaCompartidaProps } from '@/tipos/inicio/contrato_publicacion_visual'

const clases = catalogoInicio.compartida.clases
const audiencia = catalogoInicio.publicacion.audiencia

export function TarjetaCompartida({ publicacion, compartidos, interaccion, puedeCompartir, onCompartir }: TarjetaCompartidaProps) {
  const medios = publicacion.medios ?? []
  const conMedios = medios.length > 0
  const conImagenDemostracion = publicacion.conMedio && !conMedios

  return (
    <MarcoPublicacion>
      <CabeceraPublicacion autorId={publicacion.autorId} nombre={publicacion.nombre} tiempo={publicacion.tiempoCompartio} publica={publicacion.publica} leyenda={catalogoInicio.leyendas.compartio_una_publicacion} />
      {publicacion.comentario && <p className={clases.comentario}>{publicacion.comentario}</p>}
      <article aria-label={catalogoInicio.compartida.etiqueta_origen.replace(':nombre', publicacion.origenNombre)} className={clases.origen}>
        {publicacion.texto && <p className={clases.texto}>{publicacion.texto}</p>}
        {conMedios && (
          <div className={clases.medios}>
            <BloqueMediosPublicacion medios={medios} />
          </div>
        )}
        {conImagenDemostracion && <img src={imagenFotoRedSocial4} alt={catalogoCompartido.campos.alt_decorativo} className={clases.demo_medio} />}
        <div className={clases.pie}>
          {publicacion.origenEsGrupo ? <AvatarUsuario tamano="sm" icono="grupo" tono="solido" /> : <AvatarUsuario tamano="sm" imagen={imagenUsuarioPredeterminada} />}
          <div className={clases.pie_textos}>
            {publicacion.origenRuta ? (
              <a href={publicacion.origenRuta} className={clases.pie_enlace}>
                {publicacion.origenNombre}
              </a>
            ) : (
              <strong className={clases.pie_nombre}>{publicacion.origenNombre}</strong>
            )}
            <span className={clases.pie_tiempo}>
              {publicacion.origenTiempo}
              {` ${audiencia.separador}`}
              <Icono name={audiencia.icono as IconName} className={audiencia.clase} />
            </span>
          </div>
        </div>
      </article>
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
