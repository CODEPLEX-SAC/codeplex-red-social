import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { SeccionDatosDelColaborador2 } from './seccion_datos_del_colaborador2'
import type { CambiarCampoColaborador, DatosColaboradorInvitado } from '@/tipos/colaboradores/contrato_invitar_colaborador'

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
    <div className="grid grid-cols-1fr-300 max-960:grid-cols-1">
      <SeccionDatosDelColaborador2 colaborador={colaborador} alCambiarCampo={alCambiarCampo} />

      <aside className="bg-fondo px-6 py-7 max-960:px-6 max-960:py-5 max-768:p-4 max-480:p-3">
        <div>
          <h3 className="m-0 mb-5 flex items-center gap-2 text-nombre-entidad text-texto">
            <Icono name="aviso" className="w-5 h-5 text-primario" /> {catalogoColaboradores.secciones.como_funciona}
          </h3>
          <div className="flex flex-col gap-5">
            {PASOS_FUNCIONA.map((paso) => (
              <article key={paso.nombre} className="flex gap-3">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-control bg-fondo-categoria-morado">
                  <Icono name={paso.icono} className="w-4.5 h-4.5 text-primario" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-titulo-subseccion text-texto">{paso.nombre}</span>
                  <p className="m-0 text-cuerpo leading-texto text-texto-suave">{paso.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-control border border-gris-borde bg-white p-4">
          <div className="mb-1.5 flex items-center gap-2">
            <Icono name="verificado" className="w-4.5 h-4.5 text-positivo-kpi" />
            <span className="text-titulo-subseccion text-texto">{catalogoColaboradores.secciones.seguridad}</span>
          </div>
          <p className="m-0 text-auxiliar leading-texto text-texto-suave">
            {catalogoColaboradores.campos_informacion.nota_seguridad}
          </p>
        </div>
      </aside>
    </div>
  )
}
