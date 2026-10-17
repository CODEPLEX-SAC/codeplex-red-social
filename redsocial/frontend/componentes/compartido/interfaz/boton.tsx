import type { BotonVariant, BotonSize, BotonProps, ClasesBotonOpciones } from '@/tipos/compartido/contrato_boton'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const mapaVariante: Record<BotonVariant, string> = catalogoCompartido.boton_variantes
const mapaActivo: Partial<Record<BotonVariant, string>> = catalogoCompartido.boton_activo
const mapaTamano: Record<BotonSize, string> = catalogoCompartido.boton_tamanos
const tamanosMedios: string[] = catalogoCompartido.boton_tamanos_medios
const iconoPorTamano: Record<string, string> = catalogoCompartido.boton_icono_por_tamano
const clasesIcono: Record<string, string> = catalogoCompartido.boton_icono_clases

export function clasesBoton({ variant, size = 'default', activo, className }: ClasesBotonOpciones) {
  return [
    catalogoCompartido.boton_base,
    tamanosMedios.includes(size) ? catalogoCompartido.boton_medio : '',
    mapaTamano[size],
    clasesIcono[iconoPorTamano[size]] ?? '',
    variant ? (activo && mapaActivo[variant]) || mapaVariante[variant] : 'border-transparent',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')
}

export function Boton({ variant, size = 'default', activo, className, children, ...rest }: BotonProps) {
  const clases = clasesBoton({ variant, size, activo, className })

  return (
    <button className={clases} {...rest}>
      {children}
    </button>
  )
}
