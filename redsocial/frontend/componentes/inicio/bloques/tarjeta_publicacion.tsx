import { imagenUsuarioPredeterminada } from '../../compartido'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { TarjetaPublicacionProps } from '@/tipos/inicio/contrato_tarjeta_publicacion'

const botones = catalogoInicio.botones
const contadores = catalogoInicio.contadores

function formatearContador(cantidad: number, singular: string, plural: string) {
  return `${cantidad} ${cantidad === 1 ? singular : plural}`
}

export function TarjetaPublicacion({ publicacion }: TarjetaPublicacionProps) {
  return (
    <article className="mb-4 rounded-xl border border-borde bg-white shadow-sombra">
      <div className="flex items-center gap-2.5 px-4 py-3.5">
        <AvatarImagen src={imagenUsuarioPredeterminada} className="h-10 w-10 flex-none rounded-full bg-primario-suave" />
        <div className="min-w-0 flex-1">
          <strong className="block text-nombre-entidad text-texto">{publicacion.nombre}</strong>
          <span className="mt-0.5 block text-fecha-abreviada text-texto-suave">{publicacion.tiempo}</span>
        </div>
        <BotonIcono icono="puntos" type="button" aria-label={botones.mas_opciones} variant="sutil" size="default" className="flex-none" />
      </div>
      <p className="m-0 whitespace-pre-wrap break-words px-4 pb-3.5 text-cuerpo leading-1.55 text-t-3c394f">{publicacion.texto}</p>
      <div className="flex items-center justify-between border-t border-t-f0eef5 px-4 py-2.5 text-auxiliar text-texto-suave">
        <span>{formatearContador(publicacion.reacciones, contadores.reaccion_singular, contadores.reaccion_plural)}</span>
        <span>{formatearContador(publicacion.comentarios, contadores.comentario_singular, contadores.comentario_plural)}</span>
      </div>
      <div className="flex border-t border-t-f0eef5">
        <Boton type="button" variant="fantasma" size="default" className="flex-1">
          <Icono name="me-gusta" className="h-3.75 w-3.75" /> {botones.me_gusta}
        </Boton>
        <Boton type="button" variant="fantasma" size="default" className="flex-1">
          <Icono name="comentario" className="h-3.75 w-3.75" /> {botones.comentar}
        </Boton>
        <Boton type="button" variant="fantasma" size="default" className="flex-1">
          <Icono name="compartir" className="h-3.75 w-3.75" /> {botones.compartir}
        </Boton>
      </div>
    </article>
  )
}
