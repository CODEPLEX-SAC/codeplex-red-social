import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { DispositivoMultimedia, InventarioDispositivos, MotivoFallo, PuertoDispositivos, ResultadoFlujo, ResultadosPruebaDispositivos, SeleccionDispositivos, TipoDispositivo } from '@/tipos/mensajeria/contrato_integracion_llamada'

const preparacion = catalogoMensajeria.videollamada.textos.preparacion

export const SIN_PROBAR: ResultadosPruebaDispositivos = { camara: 'sin_probar', microfono: 'sin_probar', altavoz: 'sin_probar' }
export const SELECCION_VACIA: SeleccionDispositivos = { camara: String(), microfono: String(), altavoz: String() }

export function mensajeDeCamara(motivo: MotivoFallo | null): string | null {
  return motivo === null ? null : preparacion.camara_mensajes[motivo]
}

export function dispositivosPorTipo(inventario: InventarioDispositivos, tipo: TipoDispositivo): DispositivoMultimedia[] {
  return inventario.dispositivos.filter((dispositivo) => dispositivo.tipo === tipo)
}

export function idSeleccionado(seleccion: SeleccionDispositivos, inventario: InventarioDispositivos, tipo: TipoDispositivo): string {
  const lista = dispositivosPorTipo(inventario, tipo)
  const elegido = lista.find((dispositivo) => dispositivo.id === seleccion[tipo])
  return elegido?.id ?? lista[0]?.id ?? String()
}

export function subtituloPreparacion(contacto: string | null, esReunion: boolean): string {
  if (esReunion) return preparacion.nueva_reunion_detalle
  if (contacto !== null) return catalogoMensajeria.subtitulos.videollamada_con.replace(':nombre', contacto)
  return catalogoMensajeria.subtitulos.videollamada_iniciar
}

export function tituloPreparacion(esReunion: boolean): string {
  return esReunion ? preparacion.nueva_reunion : catalogoMensajeria.titulos.videollamada_iniciar
}

export function cargarInventario(puerto: PuertoDispositivos, alCargar: (inventario: InventarioDispositivos) => void) {
  async function cargar() {
    alCargar(await puerto.listar())
  }
  void cargar()
  const detener = () => puerto.detenerCamara()
  return detener
}

export function estadoTrasAbrirCamara(resultado: ResultadoFlujo, actual: MediaStream | null): { error: MotivoFallo | null; flujo: MediaStream | null } {
  if (!resultado.exito) return { error: resultado.motivo, flujo: actual }
  return { error: null, flujo: resultado.flujo }
}
