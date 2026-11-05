import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { PanelPermisosModulo } from './panel_permisos_modulo'
import type { EstadoPermisosInvitacion, Modulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const clases = catalogoColaboradores.clases.invitar_permisos
const coloresModulo: Record<string, string> = catalogoColaboradores.clases.modulo_color
const textos = catalogoColaboradores.campos_rol_permisos

export function DetalleModuloMovil({ modulo, PERMISOS, alVolver }: { modulo: Modulo; PERMISOS: EstadoPermisosInvitacion; alVolver: () => void }) {
  return (
    <div className={clases.detalle_movil}>
      <Boton type="button" variant="enlace" size="enlace_accion" onClick={alVolver} className={clases.volver}>
        <Icono name="flecha-izquierda" className={clases.volver_glifo} /> {textos.volver_modulos}
      </Boton>

      <div className={clases.detalle_cabecera}>
        <span className={`${clases.movil_icono} ${coloresModulo[modulo.nombre]}`}>
          <Icono name={modulo.icono} className={clases.movil_glifo} />
        </span>
        <span className={clases.movil_texto}>
          <h3 className={clases.movil_nombre}>{modulo.nombre}</h3>
          <span className={clases.movil_descripcion}>{modulo.descripcion}</span>
        </span>
      </div>

      <PanelPermisosModulo modulo={modulo.nombre} PERMISOS={PERMISOS} />
    </div>
  )
}
