import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { SelectorTipoHistoriaProps } from '@/tipos/inicio/contrato_historia'
import type { TipoHistoria } from '@/tipos/inicio/modelo_historia'

const textos = catalogoInicio.historias.flujo.crear
const clases = catalogoInicio.historias.flujo.clases

function OpcionTipoHistoria({ opcion, elegida, onElegir }: { opcion: (typeof textos.tipos)[number]; elegida: boolean; onElegir: (tipo: TipoHistoria) => void }) {
  const elegir = () => onElegir(opcion.valor as TipoHistoria)

  return (
    <Boton type="button" variant="filtro" size="default" activo={elegida} aria-pressed={elegida} onClick={elegir} className={clases.opcion}>
      <Icono name={opcion.icono as IconName} className="h-6 w-6" />
      {opcion.etiqueta}
    </Boton>
  )
}

export function SelectorTipoHistoria({ tipo, error, onElegir, onContinuar, onCancelar }: SelectorTipoHistoriaProps) {
  return (
    <>
      <div role="group" aria-label={textos.etiqueta_tipos} className={clases.tipos}>
        {textos.tipos.map((opcion) => (
          <OpcionTipoHistoria key={opcion.valor} opcion={opcion} elegida={tipo === opcion.valor} onElegir={onElegir} />
        ))}
      </div>
      {error && (
        <p role="alert" className={clases.error_archivo}>
          {catalogoInicio.historias.flujo.cargador.error}
        </p>
      )}
      <div className={clases.acciones}>
        <Boton type="button" variant="secundario" size="md" onClick={onCancelar}>
          {textos.cancelar}
        </Boton>
        <Boton type="button" variant="primario" size="md" disabled={tipo === null} onClick={onContinuar}>
          {textos.continuar}
        </Boton>
      </div>
    </>
  )
}
