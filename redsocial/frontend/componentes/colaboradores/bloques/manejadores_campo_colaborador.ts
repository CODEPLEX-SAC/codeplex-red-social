import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { CambiarCampoColaborador, CampoColaboradorInvitado } from '@/tipos/colaboradores/contrato_invitar_colaborador'

export function manejarTexto(alCambiarCampo: CambiarCampoColaborador, campo: CampoColaboradorInvitado) {
  return (texto: string) => alCambiarCampo(campo, texto)
}

export function manejarSelector(alCambiarCampo: CambiarCampoColaborador, campo: CampoColaboradorInvitado) {
  return (evento: { target: { value: unknown } }) => alCambiarCampo(campo, String(evento.target.value))
}

export function etiquetarCampo(etiqueta: string) {
  return { [catalogoCompartido.controles.atributo_accesible]: etiqueta }
}
