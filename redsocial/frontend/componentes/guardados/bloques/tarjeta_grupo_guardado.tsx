import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { clasesBoton } from '../../compartido/interfaz/boton'
import { Menu } from '../../compartido/interfaz/menu'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { TarjetaGrupoGuardadoProps } from '@/tipos/guardados/contrato_grupo_guardado'

const clases = catalogoGuardados.clases
const categorias: Record<string, string> = catalogoGuardados.categorias
const clasesCategoria: Record<string, string> = catalogoGuardados.categorias_clases

export function TarjetaGrupoGuardado({ grupo, acciones, alQuitar }: TarjetaGrupoGuardadoProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)

  return (
    <article className={clases.grupo}>
      <img src={grupo.imagen} alt={String()} className={clases.grupo_imagen} />
      <div className={clases.grupo_cuerpo}>
        <h2 className={clases.grupo_nombre}>{grupo.nombre}</h2>
        <div className={clases.grupo_meta}>
          <span className={clases.grupo_miembros}>{grupo.miembros}</span>
          <span className={[clases.grupo_categoria, clasesCategoria[grupo.categoria]].join(' ')}>{categorias[grupo.categoria]}</span>
        </div>
        <p className={clases.grupo_descripcion}>{grupo.descripcion}</p>
      </div>
      <BotonIcono icono="guardado" type="button" aria-pressed aria-label={catalogoGuardados.botones.quitar_guardado} variant="suave" size="md" className={clases.grupo_marcador} onClick={alQuitar} />
      <div className={clases.grupo_acciones_fila}>
        <a href={catalogoGrupos.rutas.mis_grupos} className={clasesBoton({ variant: 'secundario', size: 'default' })}>
          {catalogoGuardados.botones.ir_al_grupo}
        </a>
        <BotonIcono icono="puntos" type="button" aria-label={catalogoGuardados.botones.mas_opciones} variant="contorno" size="md" onClick={(evento) => setAncla(evento.currentTarget)} />
      </div>
      <Menu elementos={acciones} ancla={ancla} alCerrar={() => setAncla(null)} />
    </article>
  )
}
