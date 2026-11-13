import { useState } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu } from '../../compartido/interfaz/menu'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { etiquetaUnidad } from './menus_guardados'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { FilaColeccionGuardadaProps } from '@/tipos/guardados/contrato_guardados'

const clases = catalogoGuardados.clases

export function FilaColeccionGuardada({ coleccion, acciones, alAbrir }: FilaColeccionGuardadaProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const cantidad = coleccion.grupos.length

  return (
    <li className={clases.coleccion_fila}>
      <SuperficieColor variante={coleccion.color} className={clases.coleccion_icono}>
        <Icono name={coleccion.icono} className={clases.coleccion_icono_img} />
      </SuperficieColor>
      <div className={clases.coleccion_textos}>
        <h2 className={clases.grupo_nombre}>{coleccion.nombre}</h2>
        <span className={clases.coleccion_cantidad}>
          {cantidad} {etiquetaUnidad(cantidad)}
        </span>
      </div>
      <div className={clases.coleccion_fila_acciones}>
        <Boton type="button" variant="secundario" size="default" aria-label={`${catalogoGuardados.botones.ver_coleccion}: ${coleccion.nombre}`} onClick={alAbrir}>
          {catalogoGuardados.botones.ver_coleccion}
        </Boton>
        <BotonIcono icono="puntos" type="button" aria-label={`${catalogoGuardados.botones.opciones_coleccion}: ${coleccion.nombre}`} variant="contorno" size="md" onClick={(evento) => setAncla(evento.currentTarget)} />
      </div>
      <Menu elementos={acciones} ancla={ancla} alCerrar={() => setAncla(null)} />
    </li>
  )
}
