import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { referenciaDeMenu } from './logica_menu_grupo'
import { MenuGrupo } from './menu_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { AccionesPestanasGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

export function AccionesPestanasGrupo({ grupo, enlace, puerto, alBuscar, alTuContenido }: AccionesPestanasGrupoProps) {
  const referencia = referenciaDeMenu(grupo, enlace)

  return (
    <>
      <BotonIcono icono="buscar" type="button" aria-label={catalogoGrupos.detalle.buscar_en_grupo} variant="contorno" size="default" onClick={alBuscar} />
      <MenuGrupo grupo={referencia} enlace={enlace} puerto={puerto} variante="contorno" enDetalle alTuContenido={alTuContenido} />
    </>
  )
}
