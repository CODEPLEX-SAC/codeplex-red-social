import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { DestinoElegido, PasoCompartir } from '@/tipos/inicio/contrato_compartir_publicacion'

const redactar = catalogoInicio.publicacion.compartir.redactar

export function pasoDeRetorno(paso: PasoCompartir, destino: DestinoElegido | null): PasoCompartir {
  if (paso !== 'redactar' || !destino) return 'principal'
  return destino.tipo === 'grupo' ? 'grupos' : 'amigos'
}

export function alternarEtiquetaEn(actuales: readonly string[], persona: string): string[] {
  return actuales.includes(persona) ? actuales.filter((nombrePersona) => nombrePersona !== persona) : [...actuales, persona]
}

export function textoFinalCompartido(comentario: string, etiquetados: readonly string[]): string {
  const etiquetas = etiquetados.length > 0 ? redactar.etiquetados.replace(':nombres', etiquetados.join(redactar.separador_nombres)) : String()
  return [comentario.trim(), etiquetas].filter(Boolean).join(redactar.separador_texto)
}
