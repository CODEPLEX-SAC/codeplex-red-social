import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import type { DatosReunionProgramada, ReunionCreada } from '@/tipos/mensajeria/contrato_programar_reunion'

const AVATARES_MAXIMOS = 3
const MINUTOS_POR_HORA = 60
const HORAS_MEDIODIA = 12
const MILISEGUNDOS = 1000
const LARGO_HORA = 5
const LOCALIDAD_ISO = catalogoMensajeria.videollamada.programar.localidad_fecha_iso
const SUFIJOS_HORA = catalogoMensajeria.videollamada.programar.sufijos_hora
const RELLENO_HORA = catalogoMensajeria.videollamada.programar.relleno_hora
const FORMATO_MES = catalogoMensajeria.videollamada.programar.formato_mes
const reuniones: ReunionCreada[] = []
const oyentes = new Set<() => void>()
let secuencia = 0
let version = 0

export function suscribirReuniones(oyente: () => void): () => void {
  oyentes.add(oyente)
  return () => {
    oyentes.delete(oyente)
  }
}

export function versionReuniones(): number {
  return version
}

function horaLegible(hora: string): string {
  const [horas, minutos] = hora.split(':').map(Number)
  const sufijo = SUFIJOS_HORA[Math.floor(horas / HORAS_MEDIODIA)]
  const en12 = horas % HORAS_MEDIODIA || HORAS_MEDIODIA
  const dosDigitos = (valor: number) => String(valor).padStart(2, RELLENO_HORA)
  return `${dosDigitos(en12)}:${dosDigitos(minutos)} ${sufijo}`
}

function partesDeFecha(fecha: string) {
  const [anio, mes, dia] = fecha.split('-').map(Number)
  const referencia = new Date(anio, mes - 1, dia)
  return { dia: String(dia), mes: new Intl.DateTimeFormat(FORMATO_MES.idioma, { month: FORMATO_MES.mes as Intl.DateTimeFormatOptions['month'] }).format(referencia).replace('.', String()).toUpperCase() }
}

export function minutosEntre(inicio: string, fin: string): number {
  const [horaInicio, minutoInicio] = inicio.split(':').map(Number)
  const [horaFin, minutoFin] = fin.split(':').map(Number)
  return (horaFin - horaInicio) * MINUTOS_POR_HORA + (minutoFin - minutoInicio)
}

export function crearEnlaceReunion(id: string, origen: string): string {
  const enlace = new URL(catalogoMensajeria.rutas.videollamada_en_curso, origen)
  enlace.searchParams.set(catalogoMensajeria.parametros_ruta.reunion, id)
  return enlace.toString()
}

export function programarReunion(datos: DatosReunionProgramada, origen: string): ReunionCreada {
  secuencia += 1
  const id = `reunion-programada-${secuencia}`
  const total = datos.invitados.length + 1
  const { dia, mes } = partesDeFecha(datos.fecha)
  const reunion: ReunionCreada = {
    id,
    dia,
    mes,
    titulo: datos.nombre,
    hora: `${horaLegible(datos.inicio)} - ${horaLegible(datos.fin)}`,
    participantes: `${total} participantes`,
    totalParticipantes: total,
    avatares: Math.min(total, AVATARES_MAXIMOS),
    extra: total > AVATARES_MAXIMOS ? `+${total - AVATARES_MAXIMOS}` : String(),
    descripcion: datos.descripcion,
    fecha: datos.fecha,
    zona: datos.zona,
    invitados: datos.invitados,
    permitirCompartir: datos.permitirCompartir,
    solicitarAdmision: datos.solicitarAdmision,
    enlace: crearEnlaceReunion(id, origen),
  }
  reuniones.unshift(reunion)
  version += 1
  oyentes.forEach((oyente) => oyente())
  return reunion
}

export function crearReunionParaMasTarde(origen: string): ReunionCreada {
  const textos = catalogoMensajeria.videollamada.textos.mas_tarde
  const ahora = new Date()
  const fin = new Date(ahora.getTime() + textos.duracion_minutos * MINUTOS_POR_HORA * MILISEGUNDOS)
  const hora = (fecha: Date) => fecha.toTimeString().slice(0, LARGO_HORA)
  return programarReunion({ nombre: textos.nombre_reunion, descripcion: String(), fecha: ahora.toLocaleDateString(LOCALIDAD_ISO), zona: catalogoMensajeria.videollamada.programar.zona_inicial, inicio: hora(ahora), fin: hora(fin), invitados: [], permitirCompartir: true, solicitarAdmision: false }, origen)
}

export function reunionesCreadas(): readonly ReunionCreada[] {
  return reuniones
}

export function buscarReunionCreada(id: string): ReunionCreada | undefined {
  return reuniones.find((reunion) => reunion.id === id)
}
