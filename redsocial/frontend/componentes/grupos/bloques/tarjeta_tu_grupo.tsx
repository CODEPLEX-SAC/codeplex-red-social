import { clasesBoton } from '../../compartido/interfaz/boton'
import { MenuGrupo } from './menu_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { TarjetaTuGrupoProps } from '@/tipos/grupos/contrato_tus_grupos'

const clases = catalogoGrupos.clases.tus_grupos

export function TarjetaTuGrupo({ grupo, puerto }: TarjetaTuGrupoProps) {
  return (
    <article className={clases.tarjeta}>
      <div className={clases.cabecera}>
        <img src={grupo.imagen} alt="" className={clases.miniatura} />
        <div className={clases.textos}>
          <h3 className={clases.nombre}>{grupo.nombre}</h3>
          <span className={clases.visita}>{catalogoGrupos.tus_grupos.ultima_visita}</span>
          <span className={clases.visita}>{grupo.ultimaVisita}</span>
          {grupo.fijado && <span className={clases.fijado}>{catalogoGrupos.tus_grupos.fijado_etiqueta}</span>}
        </div>
      </div>
      <div className={clases.acciones}>
        <a href={grupo.ruta} className={clasesBoton({ size: 'default', className: clases.ver })}>
          {catalogoGrupos.botones.ver_grupo}
        </a>
        <MenuGrupo grupo={grupo} enlace={new URL(grupo.ruta, window.location.origin).toString()} puerto={puerto} variante="relleno" />
      </div>
    </article>
  )
}
