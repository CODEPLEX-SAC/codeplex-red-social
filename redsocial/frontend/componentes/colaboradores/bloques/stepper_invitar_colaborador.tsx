import { CodeplexPasos } from '@codeplex-sac/navegacion'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { StepperInvitarColaboradorProps } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const textos = catalogoColaboradores.asistente_invitacion
const ETAPAS = catalogoColaboradores.stepper_invitar

export function StepperInvitarColaborador({ pasoActivo }: StepperInvitarColaboradorProps) {
  const pasos = ETAPAS.map((etiqueta, indice) => ({ etiqueta, completado: indice + 1 < pasoActivo }))

  return (
    <nav aria-label={textos.etiqueta_pasos} className="flex-none border-b border-borde px-6 py-4 max-480:px-2">
      <ProveedorTemaGraficos>
        <CodeplexPasos pasos={pasos} pasoActivo={pasoActivo - 1} etiquetasAlternativas />
      </ProveedorTemaGraficos>
    </nav>
  )
}
