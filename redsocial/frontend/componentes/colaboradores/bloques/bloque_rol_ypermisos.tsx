import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

export function BloqueRolYPermisos({ colaborador }: { colaborador: Colaborador }) {
  return (
    <section className="mt-4 border-t border-t-f3f4f6 pt-4">
      <h4 className="m-0 mb-2.5 text-nombre-entidad font-semibold text-gris-oscuro-texto">{catalogoColaboradores.secciones.rol_y_permisos}</h4>
      <ul className="m-0 grid list-none gap-3 p-0">
        <li className="flex items-start gap-2.5">
          <Icono name="colaborador" className="mt-0.5 w-4 h-4 flex-none text-gris-categoria" />
          <div>
            <span className="block text-auxiliar text-gris-texto-secundario">{catalogoColaboradores.secciones.rol_perfil_etiqueta}</span>
            <strong className="mt-px block text-campo-formulario font-medium text-gris-oscuro-texto">{colaborador.rol}</strong>
          </div>
        </li>
        <li className="flex items-start gap-2.5">
          <Icono name="archivo-hoja" className="mt-0.5 w-4 h-4 flex-none text-gris-categoria" />
          <div>
            <span className="block text-auxiliar text-gris-texto-secundario">{catalogoColaboradores.secciones.descripcion}</span>
            <strong className="mt-px block text-campo-formulario font-medium text-gris-oscuro-texto">{colaborador.descripcionRol}</strong>
          </div>
        </li>
      </ul>
    </section>
  )
}
