import { posicionesDe } from '../../compartido/posiciones'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { useState } from 'react'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { TarjetaGrupoGuardadoProps } from '@/tipos/guardados/contrato_grupo_guardado'

export function TarjetaGrupoGuardado({ grupo: g }: TarjetaGrupoGuardadoProps) {
  const claseCategoria = (catalogoGuardados.categorias_clases as Record<string, string>)[g.categoria]
  const etiquetaCategoria = (catalogoGuardados.categorias as Record<string, string>)[g.categoria]
  const [guardado, setGuardado] = useState(true)

  return (
    <article className="min-w-0 overflow-hidden rounded-control border border-borde bg-white max-600:flex max-600:items-stretch max-600:gap-3 max-600:rounded-none max-600:border-x-0 max-600:border-t-0 max-600:p-3">
      <SuperficieColor
        variante={g.colorPortada}
        className="relative flex h-32.5 flex-col items-center justify-center gap-1 p-4 text-center text-white max-600:h-19 max-600:w-19 max-600:flex-none max-600:self-center max-600:rounded-2xl max-600:p-0"
      >
        {g.tituloPortada && (
          <div className="max-600:hidden">
            <strong className="text-subtitulo font-extrabold leading-tight">{g.tituloPortada}</strong>
            {g.subtituloPortada && <span className="mt-1 block text-auxiliar text-white/80">{g.subtituloPortada}</span>}
          </div>
        )}
        <BotonIcono icono="guardado" type="button" aria-pressed={guardado} aria-label={guardado ? catalogoGuardados.botones.quitar_guardado : catalogoGuardados.botones.guardar_grupo} onClick={() => setGuardado((actual) => !actual)} variant="sutil" size="md" className="absolute right-2.5 top-2.5 max-600:hidden" />
      </SuperficieColor>

      <div className="p-3.5 max-600:flex max-600:min-w-0 max-600:flex-1 max-600:flex-col max-600:justify-between max-600:p-0">
        <div>
          <h3 className="m-0 mb-1 truncate text-nombre-entidad font-bold text-texto">{g.nombre}</h3>
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5 max-600:mb-0">
            <span className="text-auxiliar text-texto-suave">{g.miembros}</span>
            <span className={'rounded px-1.5 py-px text-etiqueta-estado font-semibold max-600:hidden ' + claseCategoria}>{etiquetaCategoria}</span>
          </div>
        </div>
        <span className={'hidden self-start rounded px-1.5 py-px text-etiqueta-estado font-semibold max-600:inline-block ' + claseCategoria}>{etiquetaCategoria}</span>
        <p className="m-0 mb-2.5 text-cuerpo leading-1.4 text-texto-suave max-600:hidden">{g.descripcion}</p>
        <div className="flex items-center gap-1.5 max-600:hidden">
          <div className="flex flex-none items-center">
            {posicionesDe(3).map((posicion) => (
              <AvatarImagen key={posicion.id} src={usuarioImg} className={'h-5 w-5 rounded-full border-2 border-white bg-primario-suave' + (posicion.orden > 0 ? ' -ml-1.5' : '')} />
            ))}
          </div>
          <span className="min-w-0 flex-1 truncate text-auxiliar text-texto-suave">
            {catalogoGuardados.campos_lista.actividad_reciente}: {g.actividadReciente}
          </span>
          <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="discreto" size="sm" className="flex-none" />
        </div>
      </div>

      <div className="hidden flex-none flex-col items-center justify-between max-600:flex">
        <BotonIcono icono="guardado" type="button" aria-pressed={guardado} aria-label={guardado ? catalogoGuardados.botones.quitar_guardado : catalogoGuardados.botones.guardar_grupo} onClick={() => setGuardado((actual) => !actual)} variant="sutil" size="sm" className="flex-none" />
        <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="discreto" size="sm" className="flex-none" />
      </div>
    </article>
  )
}
