import { BotonCrearGrupo } from './boton_crear_grupo'
import { PestanasGrupos } from './pestanas_grupos'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { PaginaConLateralGruposProps } from '@/tipos/grupos/contrato_lateral_grupos'

const clases = catalogoGrupos.clases.pagina_lateral

export function PaginaConLateralGrupos({ cabecera, lateral, children }: PaginaConLateralGruposProps) {
  return (
    <div className={clases.rejilla}>
      <div className={clases.encabezado}>
        <h1 className={clases.titulo_pagina}>{cabecera.titulo}</h1>
        <BotonCrearGrupo imagen={cabecera.imagenCrear} puerto={cabecera.puerto} />
      </div>
      <div className={clases.navegacion}>
        <PestanasGrupos activa={cabecera.activa} />
      </div>
      <div className={clases.principal}>{children}</div>
      <aside className={clases.lateral}>{lateral}</aside>
    </div>
  )
}
