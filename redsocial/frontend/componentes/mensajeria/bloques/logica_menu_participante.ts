import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { AccionGestion, ResultadoOperacion } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { OpcionesMenuParticipante } from '@/tipos/mensajeria/contrato_sala_llamada'

const panel = catalogoMensajeria.videollamada.textos.panel

export function elementosDeParticipante({ participante, esOrganizador, fijado, alFijar, alGestionar }: OpcionesMenuParticipante): ElementoMenu[] {
  const fijacion: ElementoMenu = { etiqueta: fijado ? panel.quitar_fijacion : panel.fijar, icono: 'fijar', alHacerClick: alFijar }
  if (!esOrganizador || participante.local) return [fijacion]
  return [
    fijacion,
    { etiqueta: panel.silenciar, icono: 'microfono-apagado', divisor: true, alHacerClick: () => alGestionar('silenciar') },
    { etiqueta: panel.quitar, icono: 'cerrar', peligro: true, alHacerClick: () => alGestionar('quitar') },
  ]
}

export function mensajeDeGestion(accion: AccionGestion, resultado: ResultadoOperacion): string {
  if (resultado.exito) return { silenciar: panel.silenciado, quitar: panel.retirado }[accion]
  if (resultado.motivo === 'sin_permiso') return panel.sin_permiso
  return panel.aviso_gestion
}
