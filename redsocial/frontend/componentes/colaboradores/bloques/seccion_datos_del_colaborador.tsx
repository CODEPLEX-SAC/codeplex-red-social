import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { SeccionDatosDelColaborador2 } from './seccion_datos_del_colaborador2'
import type { CambiarCampoColaborador, DatosColaboradorInvitado } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const clases = catalogoColaboradores.clases.invitar_informacion

export function SeccionDatosDelColaborador({
  colaborador,
  alCambiarCampo,
  PASOS_FUNCIONA,
}: {
  colaborador: DatosColaboradorInvitado
  alCambiarCampo: CambiarCampoColaborador
  PASOS_FUNCIONA: { icono: string; nombre: string; descripcion: string; }[]
}) {
  return (
    <div className={clases.rejilla}>
      <SeccionDatosDelColaborador2 colaborador={colaborador} alCambiarCampo={alCambiarCampo} />

      <aside className={clases.lateral}>
        <div>
          <h3 className={clases.lateral_titulo}>
            <Icono name="aviso" className={clases.lateral_glifo} /> {catalogoColaboradores.secciones.como_funciona}
          </h3>
          <div className={clases.pasos}>
            {PASOS_FUNCIONA.map((paso) => (
              <article key={paso.nombre} className={clases.paso}>
                <div className={clases.paso_icono}>
                  <Icono name={paso.icono} className={clases.paso_glifo} />
                </div>
                <div className={clases.paso_textos}>
                  <span className={clases.paso_nombre}>{paso.nombre}</span>
                  <p className={clases.paso_descripcion}>{paso.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={clases.seguridad}>
          <div className={clases.seguridad_cabecera}>
            <Icono name="verificado" className={clases.seguridad_glifo} />
            <span className={clases.seguridad_titulo}>{catalogoColaboradores.secciones.seguridad}</span>
          </div>
          <p className={clases.seguridad_texto}>
            {catalogoColaboradores.campos_informacion.nota_seguridad}
          </p>
        </div>
      </aside>
    </div>
  )
}
