import dayjs from 'dayjs'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { ColumnaReporte, ReporteColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import { etiquetaDeEstado, inicioDeVigencia } from './logica_colaboradores'

const config = catalogoColaboradores.exportacion

const COLUMNAS: ColumnaReporte[] = config.columnas.map((columna) => ({ clave: columna.clave, titulo: columna.titulo, ancho: columna.ancho, enPdf: columna.en_pdf }))

const VALORES: Record<string, (colaborador: Colaborador) => string> = {
  nombre: (c) => c.nombre,
  correo: (c) => c.correo,
  telefono: (c) => c.telefono,
  rol: (c) => c.rol,
  descripcion_rol: (c) => c.descripcionRol,
  aplicaciones: (c) => c.aplicaciones.map((app) => app.nombre).join(config.separador_aplicaciones),
  estado: (c) => etiquetaDeEstado(c.estado),
  vigencia_desde: (c) => inicioDeVigencia(c.vigencia),
  vigencia_hasta: (c) => (c.vigencia.tipo === 'rango' ? c.vigencia.hasta : ''),
  fecha_invitacion: (c) => c.fechaInvitacion ?? '',
  ultimo_acceso: (c) => c.ultimoAcceso ?? '',
}

export function construirReporte(colaboradores: Colaborador[], criterios: string[], ahora: number): ReporteColaboradores {
  return {
    titulo: config.titulo,
    fechaGeneracion: dayjs(ahora).format(config.formato_fecha_hora),
    criterios,
    columnas: COLUMNAS,
    filas: colaboradores.map((colaborador) => COLUMNAS.map((columna) => VALORES[columna.clave](colaborador))),
  }
}

export function nombreDeArchivo(base: string, extension: string, ahora: number): string {
  return [base, dayjs(ahora).format(config.formato_fecha_archivo)].join(config.separador_archivo) + extension
}
