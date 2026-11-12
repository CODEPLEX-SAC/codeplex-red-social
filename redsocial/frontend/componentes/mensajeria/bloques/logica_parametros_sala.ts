import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { EstadoSalaPreparada } from '@/tipos/mensajeria/contrato_parametros_sala'

const parametros = catalogoMensajeria.parametros_ruta
const videollamada = catalogoMensajeria.videollamada

export function elegirCantidadInicial(esPredeterminada: boolean, esLlamadaDirecta: boolean, disponibles: number): number | undefined {
  if (esLlamadaDirecta) return 1
  if (esPredeterminada) return Math.min(videollamada.cantidad_predeterminada, disponibles)
  return undefined
}

export function estadoInicial(parametro: string | null, activoPorDefecto: boolean): boolean {
  if (parametro === null) return activoPorDefecto
  return parametro === videollamada.estado_activo
}

function estadoDeParametro(activo: boolean): string {
  return activo ? videollamada.estado_activo : videollamada.estado_inactivo
}

export function enlacesDeSala(contacto: string | null, estado: EstadoSalaPreparada) {
  const rutaSala = catalogoMensajeria.rutas.videollamada_en_curso
  const [clave, valor] = contacto ? [parametros.contacto, contacto] : [parametros.modo, videollamada.modo_reunion]
  const consulta = new URLSearchParams({
    [clave]: valor,
    [parametros.microfono]: estadoDeParametro(estado.microfono),
    [parametros.camara]: estadoDeParametro(estado.camara),
  })
  return { inicio: `${rutaSala}?${consulta.toString()}`, reunion: new URL(rutaSala, window.location.origin).toString() }
}
