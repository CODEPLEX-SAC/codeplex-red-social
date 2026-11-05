import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Boton } from '../../compartido/interfaz/boton'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'

const clases = catalogoColaboradores.clases.invitar_resumen
const textos = catalogoColaboradores.campos_resumen

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
      <div className={clases.correo_marco}>
        <div className={clases.correo_encabezado}>
          <div className={clases.correo_encabezado_titulo}>
            <Icono name="correo" className={clases.correo_encabezado_glifo} />
            <span className={clases.correo_encabezado_texto}>{textos.vista_previa_correo}</span>
          </div>
          <Boton type="button" variant="secundario" size="mini">
            {textos.cambiar_plantilla}
          </Boton>
        </div>

        <div className={clases.correo_cuerpo}>
          <div className={clases.correo_marca}>
            <span className={clases.correo_marca_inicial}>{INICIAL_MARCA}</span>
            <span className={clases.correo_marca_nombre}>{textosRedSocial.MARCA}</span>
          </div>

          <p className={clases.correo_parrafo}>{textos.hola_saludo.replace('{nombre}', CORREO_PREVIEW.nombrePila)}</p>
          <p className={clases.correo_parrafo}>
            <strong className={clases.correo_negrita}>{CORREO_PREVIEW.invitadoPor}</strong> {textos.invitacion_intro}{' '}
            <strong className={clases.correo_negrita}>{CORREO_PREVIEW.empresa}</strong> {textos.en_codeplex} <strong className={clases.correo_negrita}>{textosRedSocial.MARCA}</strong>.
          </p>

          <div className={clases.correo_datos}>
            <FilaCorreo icono="nuevo-usuario" etiqueta={textos.filas_correo.rol_asignado} valor={RESUMEN_ROL.rolAsignado} />
            <FilaCorreo icono="calendario" etiqueta={textos.filas_correo.vigencia} valor={CORREO_PREVIEW.vigenciaTexto} />
            <FilaCorreo icono="pantalla-compartida" etiqueta={textos.filas_correo.modulos} valor={RESUMEN_ROL.modulosTexto} />
          </div>

          <Boton type="button" variant="primario" size="md" className={clases.correo_aceptar}>
            {textos.aceptar_invitacion}
          </Boton>
          <p className={clases.correo_expira}>{CORREO_PREVIEW.expiraEnDias}</p>

          <div className={clases.correo_alterno}>
            <p className={clases.correo_alterno_texto}>{textos.si_boton_no_funciona}</p>
            <a href="#" className={`${CLASE_ENLACE_ACCION} ${clases.correo_enlace}`}>
              {textos.enlace_invitacion_preview}
            </a>
          </div>
          <p className={clases.correo_pie}>{textos.no_esperabas_invitacion}</p>
        </div>
      </div>
    </div>
  )
}
