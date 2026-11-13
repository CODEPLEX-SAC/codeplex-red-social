import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { EncabezadoColeccionAbierta } from './encabezado_coleccion_abierta'
import { ListaGruposGuardados } from './lista_grupos_guardados'
import { accionesDeColeccion, accionesDeGrupo } from './menus_guardados'
import { VistaColeccionesGuardadas } from './vista_colecciones_guardadas'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { PanelCentralGuardadosProps } from '@/tipos/guardados/contrato_guardados'
import type { GrupoGuardado } from '@/tipos/guardados/modelo_guardados'

const clases = catalogoGuardados.clases
const VACIOS: Record<string, string> = catalogoGuardados.vacios

export function PanelCentralGuardados({ control }: PanelCentralGuardadosProps) {
  const { navegacion, coleccionAbierta, busqueda } = control
  const lista = <ListaGruposGuardados control={control} accionesDe={(grupo: GrupoGuardado) => accionesDeGrupo(control, grupo)} />

  if (navegacion.pestana === 'colecciones' && coleccionAbierta) {
    return (
      <div className={clases.centro}>
        <EncabezadoColeccionAbierta coleccion={coleccionAbierta} acciones={accionesDeColeccion(control, coleccionAbierta)} alVolver={navegacion.cerrarColeccion} />
        {lista}
      </div>
    )
  }
  if (navegacion.pestana === 'colecciones') return <VistaColeccionesGuardadas control={control} texto={busqueda.texto} />
  if (navegacion.filtro === 'todo' || navegacion.filtro === 'grupos') return <div className={clases.centro}>{lista}</div>
  return <MensajeVacio texto={VACIOS[navegacion.filtro]} className={clases.vacio} />
}
