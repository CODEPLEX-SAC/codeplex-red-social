import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { DisparadorMenuGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

export function DisparadorMenuGrupo({ etiqueta, variante, alAbrir }: DisparadorMenuGrupoProps) {
  if (variante === 'relleno') {
    return (
      <Boton type="button" size="default" aria-label={etiqueta} className={catalogoGrupos.clases.tus_grupos.menu_relleno} onClick={alAbrir}>
        <Icono name="puntos" className="h-4 w-4" />
      </Boton>
    )
  }
  return <BotonIcono icono="puntos" type="button" aria-label={etiqueta} variant={variante} size="default" className="flex-none" onClick={alAbrir} />
}
