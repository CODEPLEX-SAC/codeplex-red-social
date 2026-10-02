import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import type { PublicacionInicio } from '@/tipos/inicio/modelo_inicio'

const AVATAR = 'h-8 w-8 flex-none rounded-full bg-primario-suave'

export function BloqueMeGusta({ PUBLICACION_INICIO }: { PUBLICACION_INICIO: PublicacionInicio }) {
  return (
    <article className="mb-4 rounded-xl border border-borde bg-white shadow-sombra">
      <div className="flex items-center gap-2.5 px-4 py-3.5">
        <AvatarImagen src={usuarioImg} className={AVATAR} />
        <div className="min-w-0 flex-1">
          <strong className="block text-nombre-entidad text-texto">{PUBLICACION_INICIO.nombre}</strong>
          <span className="mt-0.5 block text-fecha-abreviada text-texto-suave">{PUBLICACION_INICIO.tiempo}</span>
        </div>
        <BotonIcono icono="puntos" type="button" aria-label={catalogoInicio.botones.mas_opciones} variant="sutil" size="default" className="flex-none" />
      </div>
      <p className="m-0 px-4 pb-3.5 text-cuerpo leading-1.55 text-t-3c394f">
        {PUBLICACION_INICIO.texto}<br />¡Gran trabajo equipo! 💪🎉
      </p>
      <div className="grid grid-cols-3 gap-1 px-4 pb-3.5">
        <div className="relative aspect-square rounded-lg degradado-lavanda-suave" />
        <div className="relative aspect-square rounded-lg degradado-lavanda-suave" />
        <div className="relative aspect-square rounded-lg degradado-lavanda-suave after:absolute after:inset-0 after:grid after:place-items-center after:rounded-lg after:bg-overlay-14 after:text-contador after:font-extrabold after:text-white after:content-mas8" />
      </div>
      <div className="flex items-center justify-between border-t border-t-f0eef5 px-4 py-2.5 text-auxiliar text-texto-suave">
        <span>{PUBLICACION_INICIO.reacciones}</span><span>{PUBLICACION_INICIO.comentarios}</span>
      </div>
      <div className="flex border-t border-t-f0eef5">
        <Boton type="button" variant="fantasma" size="default" className="flex-1">
          <Icono name="me-gusta" className="h-3.75 w-3.75" /> {catalogoInicio.botones.me_gusta}
        </Boton>
        <Boton type="button" variant="fantasma" size="default" className="flex-1">
          <Icono name="comentario" className="h-3.75 w-3.75" /> {catalogoInicio.botones.comentar}
        </Boton>
        <Boton type="button" variant="fantasma" size="default" className="flex-1">
          <Icono name="compartir" className="h-3.75 w-3.75" /> {catalogoInicio.botones.compartir}
        </Boton>
      </div>
    </article>
  )
}
