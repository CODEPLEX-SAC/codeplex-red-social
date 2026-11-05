import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const clases = catalogoColaboradores.clases.detalle

export function BloqueRolYPermisos({ colaborador }: { colaborador: Colaborador }) {
  return (
    <section className={clases.seccion}>
      <h4 className={clases.titulo_seccion}>{catalogoColaboradores.secciones.rol_y_permisos}</h4>
      <ul className={clases.lista_datos}>
        <li className={clases.dato}>
          <Icono name="colaborador" className={clases.dato_icono} />
          <div>
            <span className={clases.dato_etiqueta}>{catalogoColaboradores.secciones.rol_perfil_etiqueta}</span>
            <strong className={clases.dato_valor}>{colaborador.rol}</strong>
          </div>
        </li>
        <li className={clases.dato}>
          <Icono name="archivo-hoja" className={clases.dato_icono} />
          <div>
            <span className={clases.dato_etiqueta}>{catalogoColaboradores.secciones.descripcion}</span>
            <strong className={clases.dato_valor}>{colaborador.descripcionRol}</strong>
          </div>
        </li>
      </ul>
    </section>
  )
}
