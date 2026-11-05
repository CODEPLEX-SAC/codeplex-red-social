import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Boton } from '../../compartido/interfaz/boton'
import { BloqueColaborador2 } from './bloque_colaborador2'
import type { PasoInvitacion } from '@/tipos/colaboradores/contrato_invitar_colaborador'
import { BloqueVistaPreviaCorreo } from './bloque_vista_previa_correo'
import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'

const clases = catalogoColaboradores.clases.invitar_resumen
const comun = catalogoColaboradores.clases.invitar_comun
const textos = catalogoColaboradores.campos_resumen

export function BloqueColaborador({
  RESUMEN_COLABORADOR,
  RESUMEN_ROL,
  CampoResumen,
  RESUMEN_VIGENCIA,
  INICIAL_MARCA,
  CORREO_PREVIEW,
  FilaCorreo,
  alEditar,
}: {
  RESUMEN_COLABORADOR: { iniciales: string; nombreCompleto: string; correo: string; telefono: string; }
  RESUMEN_ROL: { rolAsignado: string; modulosTexto: string; }
  CampoResumen: ({ etiqueta, valor, ancho }: { etiqueta: string; valor: string; ancho?: 'completo' | undefined; }) => React.JSX.Element
  RESUMEN_VIGENCIA: { fechaInicio: string; fechaVencimiento: string; alVencer: string; recordatorios: string; zonaHoraria: string; }
  INICIAL_MARCA: string
  CORREO_PREVIEW: { nombrePila: string; invitadoPor: string; empresa: string; vigenciaTexto: string; expiraEnDias: string; }
  FilaCorreo: ({ icono, etiqueta, valor }: { icono: string; etiqueta: string; valor: string; }) => React.JSX.Element
  alEditar: (paso: PasoInvitacion) => void
}) {
  function editarColaborador() {
    alEditar(1)
  }

  function editarRol() {
    alEditar(2)
  }

  function editarVigencia() {
    alEditar(3)
  }

  return (
    <div className={clases.rejilla}>
      <div>
        <BloqueColaborador2 RESUMEN_COLABORADOR={RESUMEN_COLABORADOR} alEditar={editarColaborador} />

        <div className={`${comun.tarjeta_compacta} ${comun.separacion}`}>
          <div className={clases.cabecera}>
            <div className={clases.cabecera_titulo}>
              <Icono name="escudo" className={comun.glifo_titulo} />
              <h4 className={comun.titulo}>{textos.rol_y_permisos}</h4>
            </div>
            <Boton type="button" variant="secundario" size="mini" onClick={editarRol} aria-label={textos.editar_rol}>
              {textos.editar}
            </Boton>
          </div>
          <div className={clases.datos}>
            <div className={clases.dato_fila}>
              <span className={clases.dato_etiqueta}>{textos.rol_asignado}</span>
              <span className={clases.dato_insignia}>{RESUMEN_ROL.rolAsignado}</span>
            </div>
            <div className={clases.dato_fila}>
              <span className={clases.dato_etiqueta}>{textos.modulos_y_permisos}</span>
              <a href="#" className={`${CLASE_ENLACE_ACCION} ${clases.dato_enlace}`}>{RESUMEN_ROL.modulosTexto}</a>
            </div>
          </div>
        </div>

        <div className={comun.tarjeta_compacta}>
          <div className={clases.cabecera}>
            <div className={clases.cabecera_titulo}>
              <Icono name="calendario" className={comun.glifo_titulo} />
              <h4 className={comun.titulo}>{textos.vigencia}</h4>
            </div>
            <Boton type="button" variant="secundario" size="mini" onClick={editarVigencia} aria-label={textos.editar_vigencia}>
              {textos.editar}
            </Boton>
          </div>
          <div className={clases.vigencia_rejilla}>
            <CampoResumen etiqueta={textos.fecha_de_inicio} valor={RESUMEN_VIGENCIA.fechaInicio} />
            <CampoResumen etiqueta={textos.fecha_de_vencimiento} valor={RESUMEN_VIGENCIA.fechaVencimiento} />
            <CampoResumen etiqueta={textos.al_vencer_la_vigencia} valor={RESUMEN_VIGENCIA.alVencer} />
            <CampoResumen etiqueta={textos.recordatorios} valor={RESUMEN_VIGENCIA.recordatorios} />
            <CampoResumen etiqueta={textos.zona_horaria} valor={RESUMEN_VIGENCIA.zonaHoraria} ancho="completo" />
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
