import { Icono } from '../../compartido/icono'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Radio } from '../../compartido/interfaz/radio'
import { SelectorFecha } from '../../compartido/interfaz/selector_fecha'
import { duracionVigencia } from './logica_vigencia_invitacion'
import type { EstadoVigenciaInvitacion } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const clases = catalogoColaboradores.clases.invitar_vigencia
const comun = catalogoColaboradores.clases.invitar_comun
const textos = catalogoColaboradores.campos_vigencia
const PLANTILLAS_DURACION: Record<string, string[]> = {
  anio: [textos.duracion.anio_uno, textos.duracion.anio_otros],
  mes: [textos.duracion.mes_uno, textos.duracion.mes_otros],
  dia: [textos.duracion.dia_uno, textos.duracion.dia_otros],
  incompleta: [textos.duracion.incompleta],
  invalida: [textos.duracion.invalida],
}

export function SeccionPeriodoDeVigencia2({ VIGENCIA }: { VIGENCIA: EstadoVigenciaInvitacion }) {
  const duracion = duracionVigencia(VIGENCIA.inicio, VIGENCIA.vencimiento)
  const plantilla = PLANTILLAS_DURACION[duracion.unidad][duracion.cantidad > 1 ? 1 : 0]
  const textoDuracion = duracion.cantidad > 0 ? `${textos.duracion.prefijo} ${plantilla.replace(':n', String(duracion.cantidad))}` : plantilla

  return (
    <div className={comun.tarjeta}>
      <div className={clases.periodo_cabecera}>
        <Icono name="calendario" className={comun.glifo_titulo} />
        <h3 className={comun.titulo}>{textos.periodo_de_vigencia}</h3>
      </div>

      <label className={clases.periodo_opcion}>
        <Radio name="vigencia" value="periodo" defaultChecked />
        <span className={comun.opcion_textos}>
          <span className={comun.opcion_titulo}>{textos.vigencia_por_periodo}</span>
          <span className={comun.opcion_detalle}>{textos.vigencia_por_periodo_detalle}</span>
        </span>
      </label>

      <div className={clases.fechas}>
        <CampoEtiquetado variante="compacta" etiqueta={textos.fecha_de_inicio} requerido>
          <SelectorFecha nombreAccesible={textos.fecha_de_inicio} valor={VIGENCIA.inicio} alCambiar={VIGENCIA.asignarInicio} marcador={textos.marcador_fecha} formato={textos.formato_fecha} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" etiqueta={textos.fecha_de_vencimiento} requerido>
          <SelectorFecha
            nombreAccesible={textos.fecha_de_vencimiento}
            valor={VIGENCIA.vencimiento}
            alCambiar={VIGENCIA.asignarVencimiento}
            minFecha={VIGENCIA.inicio ?? undefined}
            error={duracion.unidad === 'invalida'}
            marcador={textos.marcador_fecha}
            formato={textos.formato_fecha}
          />
        </CampoEtiquetado>
      </div>
      <span className={clases.duracion}>{textoDuracion}</span>

      <label className={clases.opcion_indefinida}>
        <Radio name="vigencia" value="indefinida" />
        <span className={comun.opcion_textos}>
          <span className={comun.opcion_titulo}>{textos.vigencia_indefinida}</span>
          <span className={comun.opcion_detalle}>{textos.vigencia_indefinida_detalle}</span>
        </span>
      </label>

      <div className={`${clases.nota_indefinida} ${comun.nota}`}>
        <Icono name="aviso" className={comun.nota_glifo} />
        <p className={comun.nota_texto}>{textos.nota_indefinida}</p>
      </div>
    </div>
  )
}
