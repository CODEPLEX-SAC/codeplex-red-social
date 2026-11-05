import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { DetalleModuloMovil } from './detalle_modulo_movil'
import { ListaModulosMovil } from './lista_modulos_movil'
import type { EstadoPermisosInvitacion, Modulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const clases = catalogoColaboradores.clases.invitar_permisos

function llevarAlInicio(elemento: HTMLDivElement | null) {
  elemento?.scrollIntoView?.({ block: 'nearest' })
}

export function PermisosModulosMovil({ MODULOS, PERMISOS }: { MODULOS: Modulo[]; PERMISOS: EstadoPermisosInvitacion }) {
  const activo = MODULOS.find((m) => m.nombre === PERMISOS.moduloActivo)

  return (
    <div key={activo ? activo.nombre : String()} ref={llevarAlInicio} className={clases.contenedor_movil}>
      {activo ? <DetalleModuloMovil modulo={activo} PERMISOS={PERMISOS} alVolver={() => PERMISOS.activarModulo(null)} /> : <ListaModulosMovil MODULOS={MODULOS} PERMISOS={PERMISOS} />}
    </div>
  )
}
