import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu } from '../../compartido/interfaz/menu'
import { etiquetaUnidad } from './menus_guardados'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { EncabezadoColeccionAbiertaProps } from '@/tipos/guardados/contrato_guardados'

const clases = catalogoGuardados.clases

export function EncabezadoColeccionAbierta({ coleccion, acciones, alVolver }: EncabezadoColeccionAbiertaProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const cantidad = coleccion.grupos.length

  return (
    <div className={clases.cabecera_abierta}>
      <BotonIcono icono="flecha-izquierda" type="button" aria-label={catalogoGuardados.botones.volver_colecciones} variant="contorno" size="md" onClick={alVolver} />
      <div className={clases.cabecera_abierta_textos}>
        <h2 className={clases.lista_titulo}>{coleccion.nombre}</h2>
        <span className={clases.coleccion_cantidad}>
          {cantidad} {etiquetaUnidad(cantidad)}
        </span>
      </div>
      <BotonIcono icono="puntos" type="button" aria-label={`${catalogoGuardados.botones.opciones_coleccion}: ${coleccion.nombre}`} variant="contorno" size="md" onClick={(evento) => setAncla(evento.currentTarget)} />
      <Menu elementos={acciones} ancla={ancla} alCerrar={() => setAncla(null)} />
    </div>
  )
}
