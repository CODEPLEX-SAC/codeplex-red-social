import { CodeplexDeslizador } from '@codeplex-sac/formularios'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import { NIVELES_AJUSTE_MEDIO } from './logica_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { AjusteMedioHistoriaProps } from '@/tipos/inicio/contrato_historia'

const textos = catalogoInicio.historias.ajuste_medio
const clases = catalogoInicio.historias.flujo.clases

export function AjusteMedioHistoria({ nivel, onCambiar }: AjusteMedioHistoriaProps) {
  const porcentaje = NIVELES_AJUSTE_MEDIO[nivel]?.porcentaje ?? NIVELES_AJUSTE_MEDIO[0].porcentaje

  function alCambiar(_evento: Event, valor: number | number[]) {
    onCambiar(Array.isArray(valor) ? valor[0] : valor)
  }

  return (
    <div className={clases.ajuste_medio}>
      <ProveedorTemaGraficos>
        <CodeplexDeslizador etiqueta={textos.etiqueta} valor={nivel} minimo={0} maximo={NIVELES_AJUSTE_MEDIO.length - 1} paso={1} mostrarEtiquetaValor="nunca" alCambiar={alCambiar} />
      </ProveedorTemaGraficos>
      <span className={clases.valor_ajuste}>{textos.valor.replace(':porcentaje', String(porcentaje))}</span>
    </div>
  )
}
