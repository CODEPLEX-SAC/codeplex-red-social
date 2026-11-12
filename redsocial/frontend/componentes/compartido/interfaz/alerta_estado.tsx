import { CodeplexAlerta } from '@codeplex-sac/ui'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { AlertaEstadoProps } from '@/tipos/compartido/contrato_alerta_estado'

const clases = catalogoCompartido.alerta_estado

export function AlertaEstado({ variante, tipo, className, children, ...resto }: AlertaEstadoProps) {
  const rol = tipo === 'estado' ? clases.roles.estado : clases.roles.error
  const varianteFinal = variante ?? clases.variante_por_rol[rol as 'status' | 'alert']
  const claseFinal = [clases.base, className].filter(Boolean).join(' ')

  return (
    <ProveedorTemaGraficos>
      <CodeplexAlerta {...resto} role={rol} variante={varianteFinal as AlertaEstadoProps['variante']} diseno="suave" icono={<span hidden />} className={claseFinal}>
        {children}
      </CodeplexAlerta>
    </ProveedorTemaGraficos>
  )
}
