import type { Dayjs } from 'dayjs'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { DuracionVigencia, EstadoVigenciaInvitacion } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const formatos = catalogoColaboradores.campos_vigencia
const CONECTOR = catalogoColaboradores.celda_vigencia.conector_hasta
const MESES_POR_ANIO = 12

export function duracionVigencia(inicio: Dayjs | null, vencimiento: Dayjs | null): DuracionVigencia {
  if (!inicio || !vencimiento) return { unidad: 'incompleta', cantidad: 0 }
  if (vencimiento.isBefore(inicio, 'day')) return { unidad: 'invalida', cantidad: 0 }
  const meses = vencimiento.diff(inicio, 'month')
  if (meses >= MESES_POR_ANIO && meses % MESES_POR_ANIO === 0) return { unidad: 'anio', cantidad: meses / MESES_POR_ANIO }
  if (meses >= 1) return { unidad: 'mes', cantidad: meses }
  return { unidad: 'dia', cantidad: Math.max(1, vencimiento.diff(inicio, 'day')) }
}

function formatear(fecha: { format: (formato: string) => string } | null, formato: string) {
  if (!fecha) return ''
  return fecha.format(formato)
}

export function fechasDeVigencia({ inicio, vencimiento }: EstadoVigenciaInvitacion) {
  const completa = inicio !== null && vencimiento !== null
  return {
    inicio: formatear(inicio, formatos.formato_resumen),
    vencimiento: formatear(vencimiento, formatos.formato_resumen),
    rango: completa ? `${inicio.format(formatos.formato_fecha)} ${CONECTOR} ${vencimiento.format(formatos.formato_fecha)}` : '',
  }
}
