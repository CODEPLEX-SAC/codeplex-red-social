import { Children, isValidElement } from 'react'
import type { OptionHTMLAttributes } from 'react'
import { CodeplexSelector } from '@codeplex-sac/formularios'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import type { ManejadorSelectorLibreria, SelectorConfiguracionLibreria, SelectorVariant, SelectorProps } from '@/tipos/compartido/contrato_selector'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const mapaEnvoltorio: Record<SelectorVariant, string> = catalogoCompartido.selector_envoltorio
const mapaLabel: Record<string, string> = catalogoCompartido.selector_label
const mapaLibreria = catalogoCompartido.selector_libreria as Record<SelectorVariant, SelectorConfiguracionLibreria>

export function Selector({ variant = 'default', label, className, children, 'aria-label': ariaLabel, value, defaultValue, onChange, disabled, name, placeholder }: SelectorProps) {
  const opciones = Children.toArray(children)
    .filter(isValidElement<OptionHTMLAttributes<HTMLOptionElement>>)
    .map((opcion) => {
      const etiqueta = opcion.props.children as string
      return { valor: (opcion.props.value ?? etiqueta) as string, etiqueta, deshabilitado: opcion.props.disabled }
    })
  const valorInicial = value === undefined ? (defaultValue ?? opciones[0]?.valor) as string : undefined
  const configuracion = mapaLibreria[variant]
  const propiedadesVisibles = { [catalogoCompartido.selector_atributo_accesible]: label ?? ariaLabel ?? catalogoCompartido.campos.seleccionar_opcion }

  const propiedadesLibreria = {
    opciones,
    tamano: configuracion.tamano,
    anchoCompleto: configuracion.anchoCompleto,
    sx: configuracion.sx,
    valor: value === undefined ? undefined : (value as string),
    defaultValue: valorInicial,
    disabled,
    name,
    marcador: placeholder,
    alCambiar: onChange as ManejadorSelectorLibreria,
    SelectDisplayProps: propiedadesVisibles,
  }

  const select = (
    <div className={[mapaEnvoltorio[variant], className].filter(Boolean).join(' ')}>
      <ProveedorTemaGraficos>
        <CodeplexSelector {...propiedadesLibreria} />
      </ProveedorTemaGraficos>
    </div>
  )

  if (!label || !configuracion.conEtiqueta) {
    return select
  }

  return <label className={`flex flex-col gap-1 ${mapaLabel[variant]}`}>{label}{select}</label>
}
