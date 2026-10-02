import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PanelDetalleAvisoProps } from '@/tipos/avisos/contrato_detalle_aviso'

export function PanelDetalleAviso({ detalle }: PanelDetalleAvisoProps) {
  return (
    <section className="rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center gap-2.5">
        <AvatarImagen src={usuarioImg} className="h-9 w-9 flex-none rounded-full bg-primario-suave" />
        <div className="min-w-0 flex-1">
          <strong className="block truncate text-nombre-entidad text-texto">{detalle.autor}</strong>
          <span className="block text-fecha-abreviada text-texto-suave">{detalle.tiempo}</span>
        </div>
        <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} variant="discreto" size="sm" className="flex-none" />
      </div>

      <h3 className="m-0 mb-1.5 text-titulo-seccion font-bold text-texto">{catalogoAvisos.secciones.comentaron_en_tu_publicacion}</h3>
      <p className="m-0 mb-3 text-cuerpo leading-1.45 text-texto-suave">{detalle.comentario}</p>

      <div className="mb-3 flex items-center gap-2.5 rounded-lg border border-borde bg-t-f9f8fc p-2.5">
        <div className="grid h-11 w-11 flex-none place-items-center rounded-md bg-t-e8e5f0 text-texto-suave">
          <Icono name="panel" className="h-4.5 w-4.5" />
        </div>
        <div className="min-w-0 flex-1">
          <strong className="block truncate text-subtitulo text-texto">{detalle.publicacion.titulo}</strong>
          <span className="block truncate text-cuerpo text-texto-suave">{detalle.publicacion.descripcion}</span>
        </div>
      </div>

      <div className="mb-3.5 flex items-center gap-2 border-b border-t-f0eef5 pb-3.5">
        <Boton type="button" variant="secundario" size="default" className="flex-1">
          <Icono name="me-gusta" className="h-3.75 w-3.75" /> {catalogoAvisos.botones.me_gusta}
        </Boton>
        <Boton type="button" variant="secundario" size="default" className="flex-1">
          <Icono name="comentario" className="h-3.75 w-3.75" /> {catalogoAvisos.botones.responder}
        </Boton>
      </div>

      <h4 className="m-0 mb-2 text-titulo-seccion font-bold text-texto">
        {catalogoAvisos.secciones.personas_que_comentaron} ({detalle.comentarios.length})
      </h4>
      <ul className="m-0 grid list-none gap-2.5 p-0">
        {detalle.comentarios.map((c) => (
          <li key={c.nombre} className="flex items-start gap-2">
            <AvatarImagen src={usuarioImg} className="h-7 w-7 flex-none rounded-full bg-primario-suave" />
            <div className="min-w-0 flex-1 text-cuerpo">
              <span className="text-nombre-entidad font-bold text-texto">{c.nombre}</span> <span className="text-texto-suave">{c.texto}</span>
              <span className="mt-0.5 block text-fecha-abreviada text-t-aaa7b5">{c.tiempo}</span>
            </div>
            <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="discreto" size="sm" className="flex-none" />
          </li>
        ))}
      </ul>

      <a href="#" className="mt-3 flex items-center justify-center gap-1 text-enlace-accion font-semibold text-primario no-underline hover:underline">
        {catalogoAvisos.botones.ver_conversacion_completa} <Icono name="flecha-derecha" className="h-3 w-3" />
      </a>
    </section>
  )
}
