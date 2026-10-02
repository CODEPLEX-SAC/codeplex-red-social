import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Boton } from '../../compartido/interfaz/boton'
import { BloqueColaborador2 } from './bloque_colaborador2'
import { BloqueVistaPreviaCorreo } from './bloque_vista_previa_correo'

export function BloqueColaborador({
  RESUMEN_COLABORADOR,
  RESUMEN_ROL,
  CampoResumen,
  RESUMEN_VIGENCIA,
  INICIAL_MARCA,
  CORREO_PREVIEW,
  FilaCorreo,
}: {
  RESUMEN_COLABORADOR: { iniciales: string; nombreCompleto: string; correo: string; telefono: string; }
  RESUMEN_ROL: { rolAsignado: string; modulosTexto: string; }
  CampoResumen: ({ etiqueta, valor, ancho }: { etiqueta: string; valor: string; ancho?: 'completo' | undefined; }) => React.JSX.Element
  RESUMEN_VIGENCIA: { fechaInicio: string; fechaVencimiento: string; alVencer: string; recordatorios: string; zonaHoraria: string; }
  INICIAL_MARCA: string
  CORREO_PREVIEW: { nombrePila: string; invitadoPor: string; empresa: string; vigenciaTexto: string; expiraEnDias: string; }
  FilaCorreo: ({ icono, etiqueta, valor }: { icono: string; etiqueta: string; valor: string; }) => React.JSX.Element
}) {
  return (
    <div className="grid grid-cols-2 gap-6 p-7 max-960:grid-cols-1 max-960:p-4">
      <div>
        <BloqueColaborador2 RESUMEN_COLABORADOR={RESUMEN_COLABORADOR} />

        <div className="mb-4 rounded-xl border border-gris-borde px-5 py-4.5">
          <div className="mb-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icono name="escudo" className="w-5 h-5 text-primario" />
              <h4 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_resumen.rol_y_permisos}</h4>
            </div>
            <Boton type="button" variant="secundario" size="mini">
              {catalogoColaboradores.campos_resumen.editar}
            </Boton>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="min-w-32.5 text-auxiliar text-gris-texto-secundario">{catalogoColaboradores.campos_resumen.rol_asignado}</span>
              <span className="inline-block rounded-md bg-t-ede9fe px-2.5 py-0.75 text-etiqueta-estado font-semibold text-t-5b21b6">{RESUMEN_ROL.rolAsignado}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="min-w-32.5 text-auxiliar text-gris-texto-secundario">{catalogoColaboradores.campos_resumen.modulos_y_permisos}</span>
              <a href="#" className="text-enlace-accion font-medium text-primario no-underline hover:underline">{RESUMEN_ROL.modulosTexto}</a>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gris-borde px-5 py-4.5">
          <div className="mb-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icono name="calendario" className="w-5 h-5 text-primario" />
              <h4 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_resumen.vigencia}</h4>
            </div>
            <Boton type="button" variant="secundario" size="mini">
              {catalogoColaboradores.campos_resumen.editar}
            </Boton>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <CampoResumen etiqueta={catalogoColaboradores.campos_resumen.fecha_de_inicio} valor={RESUMEN_VIGENCIA.fechaInicio} />
            <CampoResumen etiqueta={catalogoColaboradores.campos_resumen.fecha_de_vencimiento} valor={RESUMEN_VIGENCIA.fechaVencimiento} />
            <CampoResumen etiqueta={catalogoColaboradores.campos_resumen.al_vencer_la_vigencia} valor={RESUMEN_VIGENCIA.alVencer} />
            <CampoResumen etiqueta={catalogoColaboradores.campos_resumen.recordatorios} valor={RESUMEN_VIGENCIA.recordatorios} />
            <CampoResumen etiqueta={catalogoColaboradores.campos_resumen.zona_horaria} valor={RESUMEN_VIGENCIA.zonaHoraria} ancho="completo" />
          </div>
        </div>
      </div>

      <BloqueVistaPreviaCorreo
        INICIAL_MARCA={INICIAL_MARCA}
        CORREO_PREVIEW={CORREO_PREVIEW}
        FilaCorreo={FilaCorreo}
        RESUMEN_ROL={RESUMEN_ROL}
      />
    </div>
  )
}
