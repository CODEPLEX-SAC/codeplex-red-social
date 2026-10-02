import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Boton } from '../../compartido/interfaz/boton'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'

export function BloqueVistaPreviaCorreo({
  INICIAL_MARCA,
  CORREO_PREVIEW,
  FilaCorreo,
  RESUMEN_ROL,
}: {
  INICIAL_MARCA: string
  CORREO_PREVIEW: { nombrePila: string; invitadoPor: string; empresa: string; vigenciaTexto: string; expiraEnDias: string; }
  FilaCorreo: ({ icono, etiqueta, valor }: { icono: string; etiqueta: string; valor: string; }) => React.JSX.Element
  RESUMEN_ROL: { rolAsignado: string; modulosTexto: string; }
}) {
  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gris-borde">
        <div className="flex items-center justify-between border-b border-gris-borde px-4.5 py-3.5">
          <div className="flex items-center gap-2">
            <Icono name="correo" className="w-4.5 h-4.5 text-primario" />
            <span className="text-subtitulo font-semibold text-gris-texto">{catalogoColaboradores.campos_resumen.vista_previa_correo}</span>
          </div>
          <Boton type="button" variant="secundario" size="mini">
            {catalogoColaboradores.campos_resumen.cambiar_plantilla}
          </Boton>
        </div>

        <div className="bg-t-fafafa px-6 py-7">
          <div className="mb-5 text-center">
            <span className="mr-1.5 inline-block h-6 w-6 rounded-md bg-primario text-center text-auxiliar leading-6 text-white">{INICIAL_MARCA}</span>
            <span className="text-nombre-entidad font-extrabold tracking-wide text-primario">{textosRedSocial.MARCA}</span>
          </div>

          <p className="mb-4 text-cuerpo leading-snug text-gris-texto">{catalogoColaboradores.campos_resumen.hola_saludo.replace('{nombre}', CORREO_PREVIEW.nombrePila)}</p>
          <p className="mb-4 text-cuerpo leading-snug text-gris-texto">
            <strong className="text-gris-oscuro-texto">{CORREO_PREVIEW.invitadoPor}</strong> {catalogoColaboradores.campos_resumen.invitacion_intro}{' '}
            <strong className="text-gris-oscuro-texto">{CORREO_PREVIEW.empresa}</strong> {catalogoColaboradores.campos_resumen.en_codeplex} <strong className="text-gris-oscuro-texto">{textosRedSocial.MARCA}</strong>.
          </p>

          <div className="mb-5 rounded-lg border border-gris-borde bg-white px-4 py-3.5">
            <FilaCorreo icono="nuevo-usuario" etiqueta={catalogoColaboradores.campos_resumen.filas_correo.rol_asignado} valor={RESUMEN_ROL.rolAsignado} />
            <FilaCorreo icono="calendario" etiqueta={catalogoColaboradores.campos_resumen.filas_correo.vigencia} valor={CORREO_PREVIEW.vigenciaTexto} />
            <FilaCorreo icono="pantalla-compartida" etiqueta={catalogoColaboradores.campos_resumen.filas_correo.modulos} valor={RESUMEN_ROL.modulosTexto} />
          </div>

          <Boton type="button" variant="primario" size="md" className="mb-2 w-full">
            {catalogoColaboradores.campos_resumen.aceptar_invitacion}
          </Boton>
          <p className="mb-5 text-center text-auxiliar text-gris-texto-terciario">{CORREO_PREVIEW.expiraEnDias}</p>

          <div className="mb-3 rounded-lg bg-t-f9fafb p-3.5 text-center">
            <p className="m-0 mb-1.5 text-auxiliar text-gris-texto-secundario">{catalogoColaboradores.campos_resumen.si_boton_no_funciona}</p>
            <a href="#" className="break-all text-enlace-accion text-primario no-underline hover:underline">
              {catalogoColaboradores.campos_resumen.enlace_invitacion_preview}
            </a>
          </div>
          <p className="m-0 text-center text-auxiliar text-gris-texto-terciario">{catalogoColaboradores.campos_resumen.no_esperabas_invitacion}</p>
        </div>
      </div>
    </div>
  )
}
