import { Menu } from '../../compartido/interfaz/menu'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { useState } from 'react'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { FilaMencionProps } from '@/tipos/avisos/contrato_mencion'

const SESION_ACTUAL = catalogoCompartido.sesion_actual

const BADGE_ICONO_POR_TIPO = {
  publicacion: 'imagen',
  comentario: 'comentario',
  evento: 'calendario',
  grupo: 'grupos',
} as const

export function FilaMencion({ mencion: m }: FilaMencionProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const [antes, despues] = m.texto.split(':usuario')

  return (
    <article className="flex items-start gap-3 border-b border-t-f0eef5 p-3.5 last:border-b-0 hover:bg-t-fdfcff">
      {m.tipo === 'grupo' ? (
        <SuperficieColor variante={m.vistaPrevia.colorSuperficie} className="grid h-10 w-10 flex-none place-items-center rounded-full text-white">
          <Icono name={BADGE_ICONO_POR_TIPO[m.tipo]} className="h-4.5 w-4.5" />
        </SuperficieColor>
      ) : (
        <span className="relative flex-none">
          <AvatarImagen src={usuarioImg} className="h-10 w-10 rounded-full bg-primario-suave" />
          <SuperficieColor variante="morado" className="absolute -bottom-0.5 -right-0.5 grid h-4.5 w-4.5 place-items-center rounded-full border-2 border-white text-white">
            <Icono name={BADGE_ICONO_POR_TIPO[m.tipo]} className="h-2.5 w-2.5" />
          </SuperficieColor>
        </span>
      )}

      <div className="min-w-0 flex-1">
        <p className="m-0 text-cuerpo text-texto">
          <span className="font-bold text-texto">{m.nombre}</span> <span className="text-texto-suave">{catalogoAvisos.acciones_mencion[m.tipo]}</span>
        </p>
        <span className="mt-0.5 block text-fecha-abreviada text-t-aaa7b5">{m.tiempo}</span>
        <p className="m-0 mt-1 text-cuerpo leading-1.4 text-texto-suave">
          {antes}
          <span className="font-semibold text-primario">@{SESION_ACTUAL.usuario}</span>
          {despues}
        </p>
      </div>

      <div className="flex w-45 flex-none items-center gap-2 rounded-lg border border-borde bg-t-f9f8fc p-2 max-800:hidden">
        {m.vistaPrevia.fecha ? (
          <SuperficieColor variante="rojo" className="grid h-11 w-11 flex-none place-items-center rounded-md text-center text-white">
            <span>
              <strong className="block text-dia-evento leading-none">{m.vistaPrevia.fecha.dia}</strong>
              <span className="block text-mes-evento leading-none">{m.vistaPrevia.fecha.mes}</span>
            </span>
          </SuperficieColor>
        ) : (
          <SuperficieColor variante={m.vistaPrevia.colorSuperficie} className="grid h-11 w-11 flex-none place-items-center rounded-md text-white">
            <Icono name={m.vistaPrevia.icono} className="h-4.5 w-4.5" />
          </SuperficieColor>
        )}
        <div className="min-w-0 flex-1">
          <strong className="block truncate text-subtitulo text-texto">{m.vistaPrevia.titulo}</strong>
          {m.vistaPrevia.subtitulo && <span className="block truncate text-auxiliar text-texto-suave">{m.vistaPrevia.subtitulo}</span>}
        </div>
      </div>

      <div className="flex-none">
        <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} onClick={(evento) => setAncla(evento.currentTarget)} variant="discreto" size="sm" className="flex-none" />
        <Menu
          ancla={ancla}
          alCerrar={() => setAncla(null)}
          elementos={[
            { icono: 'ver', etiqueta: catalogoAvisos.menu_mencion.ver_publicacion },
            { icono: 'comentario', etiqueta: catalogoAvisos.menu_mencion.responder },
            { icono: 'me-gusta', etiqueta: catalogoAvisos.menu_mencion.dar_me_gusta },
            { icono: 'compartir', etiqueta: catalogoAvisos.menu_mencion.compartir },
            { icono: 'verificado', etiqueta: catalogoAvisos.menu_mencion.marcar_como_leida },
            { icono: 'silenciado', etiqueta: [catalogoAvisos.menu_mencion.silenciar_menciones_de, m.nombre].join(' ') },
            { icono: 'aviso-critico', etiqueta: catalogoAvisos.menu_mencion.reportar, peligro: true },
          ]}
        />
      </div>
    </article>
  )
}
