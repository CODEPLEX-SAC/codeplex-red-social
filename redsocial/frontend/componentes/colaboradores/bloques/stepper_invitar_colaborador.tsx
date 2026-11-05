import { CodeplexPasos } from '@codeplex-sac/navegacion'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import { usarVistaMovil } from '../../compartido/interfaz/usar_vista_movil'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { StepperInvitarColaboradorProps } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const textos = catalogoColaboradores.asistente_invitacion
const ETAPAS = catalogoColaboradores.stepper_invitar
const SIN_ETIQUETA = ''

export function StepperInvitarColaborador({ pasoActivo }: StepperInvitarColaboradorProps) {
  const movil = usarVistaMovil()
  const pasos = ETAPAS.map((etiqueta, indice) => ({ etiqueta: movil ? SIN_ETIQUETA : etiqueta, completado: indice + 1 < pasoActivo }))
  const resumen = textos.paso_movil.replace(':actual', String(pasoActivo)).replace(':total', String(ETAPAS.length)).replace(':etiqueta', ETAPAS[pasoActivo - 1])

  return (
    <nav aria-label={textos.etiqueta_pasos} className={catalogoColaboradores.clases.invitar_comun.stepper}>
      <ProveedorTemaGraficos>
        <CodeplexPasos pasos={pasos} pasoActivo={pasoActivo - 1} etiquetasAlternativas />
      </ProveedorTemaGraficos>
      {movil && <p className={catalogoColaboradores.clases.invitar_comun.stepper_movil_texto}>{resumen}</p>}
    </nav>
  )
}
