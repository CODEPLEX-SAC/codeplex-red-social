import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { SeccionDatosDelColaborador2 } from './seccion_datos_del_colaborador2'

export function SeccionDatosDelColaborador({
  FORM_INFORMACION_DEFAULT,
  PASOS_FUNCIONA,
}: {
  FORM_INFORMACION_DEFAULT: { nombres: string; apellidos: string; correo: string; telefono: string; documentoNumero: string; cargo: string; }
  PASOS_FUNCIONA: { icono: string; nombre: string; descripcion: string; }[]
}) {
  return (
    <div className="grid grid-cols-1fr-300 max-960:grid-cols-1">
      <SeccionDatosDelColaborador2 FORM_INFORMACION_DEFAULT={FORM_INFORMACION_DEFAULT} />

      <aside className="bg-t-fafafa px-6 py-7 max-960:px-6 max-960:py-5 max-768:p-4 max-480:p-3">
        <div>
          <h3 className="m-0 mb-5 flex items-center gap-2 text-titulo-seccion font-bold text-gris-oscuro-texto">
            <Icono name="aviso" className="w-5 h-5 text-primario" /> {catalogoColaboradores.secciones.como_funciona}
          </h3>
          <div className="flex flex-col gap-5">
            {PASOS_FUNCIONA.map((paso) => (
              <article key={paso.nombre} className="flex gap-3">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-control bg-t-ede9fe">
                  <Icono name={paso.icono} className="w-4.5 h-4.5 text-primario" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-navegacion font-semibold text-gris-oscuro-texto">{paso.nombre}</span>
                  <p className="m-0 text-cuerpo leading-snug text-gris-texto-secundario">{paso.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-control border border-gris-borde bg-white p-4">
          <div className="mb-1.5 flex items-center gap-2">
            <Icono name="verificado" className="w-4.5 h-4.5 text-positivo-kpi" />
            <span className="text-subtitulo font-semibold text-gris-oscuro-texto">{catalogoColaboradores.secciones.seguridad}</span>
          </div>
          <p className="m-0 text-auxiliar leading-snug text-gris-texto-secundario">
            {catalogoColaboradores.campos_informacion.nota_seguridad}
          </p>
        </div>
      </aside>
    </div>
  )
}
