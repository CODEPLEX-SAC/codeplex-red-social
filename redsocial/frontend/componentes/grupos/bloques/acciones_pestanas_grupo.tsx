import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'
import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { referenciaDeMenu } from './logica_menu_grupo'
import { MenuGrupo } from './menu_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { AccionesPestanasGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const clases = catalogoGrupos.clases.detalle

export function AccionesPestanasGrupo({ grupo, enlace, puerto, alBuscar, alTuContenido }: AccionesPestanasGrupoProps) {
  const referencia = referenciaDeMenu(grupo, enlace)

  return (
    <>
      <a href={catalogoGrupos.rutas.mis_grupos} className={[CLASE_ENLACE_ACCION, clases.volver_movil].join(' ')}>
        <Icono name="flecha-izquierda" className="h-4 w-4 flex-none" /> {catalogoGrupos.detalle.volver}
      </a>
      <BotonIcono icono="buscar" type="button" aria-label={catalogoGrupos.detalle.buscar_en_grupo} variant="contorno" size="default" onClick={alBuscar} />
      <MenuGrupo grupo={referencia} enlace={enlace} puerto={puerto} variante="contorno" enDetalle alTuContenido={alTuContenido} />
    </>
  )
}
