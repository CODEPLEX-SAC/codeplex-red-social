import { Boton } from '../../compartido/interfaz/boton'
import { ESTILOS_TEXTO_HISTORIA } from './logica_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ControlesEstiloHistoriaProps } from '@/tipos/inicio/contrato_historia'
import type { EstiloTextoHistoria } from '@/tipos/inicio/modelo_historia'

const textos = catalogoInicio.historias.flujo.editor
const clases = catalogoInicio.historias.flujo.clases

function BotonEstilo({ estilo, activo, onElegir }: { estilo: EstiloTextoHistoria; activo: boolean; onElegir: (id: string) => void }) {
  const elegir = () => onElegir(estilo.id)

  return (
    <li>
      <Boton type="button" variant="filtro" size="default" activo={activo} aria-pressed={activo} onClick={elegir} className={clases.estilo_boton}>
        <span className={estilo.clases}>{estilo.etiqueta}</span>
      </Boton>
    </li>
  )
}

export function ControlesEstiloHistoria({ estiloId, onCambiar }: ControlesEstiloHistoriaProps) {
  return (
    <section className={clases.seccion_control}>
      <h3 className={clases.titulo_control}>{textos.etiqueta_estilos}</h3>
      <ul className={clases.estilos}>
        {ESTILOS_TEXTO_HISTORIA.map((estilo) => (
          <BotonEstilo key={estilo.id} estilo={estilo} activo={estilo.id === estiloId} onElegir={onCambiar} />
        ))}
      </ul>
    </section>
  )
}
