import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import { AvisoEmergente } from '../../compartido/interfaz/aviso_emergente'
import { usarVistaMovil } from '../../compartido/interfaz/usar_vista_movil'
import { SeccionSeleccionarNivelTitulo2 } from './seccion_seleccionar_nivel_titulo2'
import type { CodeplexNotificacionPosicion } from '@codeplex-sac/feedback'
import type { EstadoPermisosInvitacion, Modulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const clases = catalogoColaboradores.clases.invitar_permisos
const coloresModulo: Record<string, string> = catalogoColaboradores.clases.modulo_color

export function SeccionSeleccionarNivelTitulo({ MODULOS, PERMISOS }: { MODULOS: Modulo[]; PERMISOS: EstadoPermisosInvitacion }) {
  const moduloActivo = PERMISOS.moduloActivo ?? MODULOS[0].nombre
  const movil = usarVistaMovil()

  return (
    <div className={clases.contenedor}>
      {!movil && (
      <aside className={clases.lateral}>
        <p className={clases.lateral_titulo}>{catalogoColaboradores.campos_rol_permisos.seleccionar_modulo}</p>
        <ul className={clases.modulos}>
          {MODULOS.map((m) => {
            const activo = m.nombre === moduloActivo
            return (
              <li key={m.nombre}>
                <button type="button" aria-current={activo} onClick={() => PERMISOS.activarModulo(m.nombre)} className={`${clases.modulo_boton} ${activo ? clases.modulo_activo : clases.modulo_inactivo}`}>
                  {activo && <span className={clases.modulo_marca} />}
                  <span className={`${clases.modulo_icono} ${coloresModulo[m.nombre]}`}>
                    <Icono name={m.icono} className={clases.modulo_glifo} />
                  </span>
                  <span className={clases.modulo_texto}>
                    <span className={`${clases.modulo_nombre} ${activo ? clases.modulo_nombre_activo : clases.modulo_nombre_inactivo}`}>{m.nombre}</span>
                    <span className={clases.modulo_descripcion}>{m.descripcion}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </aside>
      )}

      <SeccionSeleccionarNivelTitulo2 MODULO={moduloActivo} MODULOS={MODULOS} PERMISOS={PERMISOS} />
      {PERMISOS.aviso && <AvisoEmergente abierto {...(movil ? { posicion: catalogoColaboradores.dialogos_rol.posicion_aviso_movil as CodeplexNotificacionPosicion } : {})} variante={PERMISOS.aviso.variante} titulo={PERMISOS.aviso.titulo} mensaje={PERMISOS.aviso.mensaje} alCerrar={PERMISOS.cerrarAviso} />}
    </div>
  )
}
