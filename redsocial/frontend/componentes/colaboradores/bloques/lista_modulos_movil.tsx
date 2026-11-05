import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { etiquetaDePerfil } from './logica_perfiles_permisos'
import type { EstadoPermisosInvitacion, Modulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const clases = catalogoColaboradores.clases.invitar_permisos
const coloresModulo: Record<string, string> = catalogoColaboradores.clases.modulo_color
const textos = catalogoColaboradores.campos_rol_permisos

function estadoDelModulo(modulo: string, PERMISOS: EstadoPermisosInvitacion): string {
  const rol = etiquetaDePerfil(PERMISOS.perfiles[modulo], PERMISOS.roles[modulo])
  return (PERMISOS.ajustados[modulo] ? textos.estado_modulo_ajustado : textos.estado_modulo_rol).replace(':rol', rol)
}

export function ListaModulosMovil({ MODULOS, PERMISOS }: { MODULOS: Modulo[]; PERMISOS: EstadoPermisosInvitacion }) {
  return (
    <div>
      <p className={clases.modulos_instruccion}>{textos.modulos_instruccion}</p>
      <ul className={clases.modulos_movil}>
        {MODULOS.map((m) => (
          <li key={m.nombre}>
            <button type="button" className={clases.modulo_movil_boton} onClick={() => PERMISOS.activarModulo(m.nombre)}>
              <span className={`${clases.movil_icono} ${coloresModulo[m.nombre]}`}>
                <Icono name={m.icono} className={clases.movil_glifo} />
              </span>
              <span className={clases.movil_texto}>
                <span className={clases.movil_nombre}>{m.nombre}</span>
                <span className={clases.movil_descripcion}>{m.descripcion}</span>
                <span className={clases.modulo_movil_estado}>{estadoDelModulo(m.nombre, PERMISOS)}</span>
              </span>
              <Icono name="flecha-derecha" className={clases.modulo_movil_flecha} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
