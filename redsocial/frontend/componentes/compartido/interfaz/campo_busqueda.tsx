import { Icono } from '../icono'
import { CampoTexto } from './campo_texto'
import type { CampoBusquedaCambio, CampoBusquedaProps } from '@/tipos/compartido/contrato_campo_busqueda'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function CampoBusqueda({ className, icono = 'buscar', 'aria-label': ariaLabel, value, onChange, placeholder, name, accion }: CampoBusquedaProps) {
  return (
    <div className={className}>
    <CampoTexto
      anchoCompleto
      tipo={catalogoCompartido.controles.tipo_busqueda}
      valor={value}
      alCambiar={(texto) => onChange?.({ target: { value: texto } } as CampoBusquedaCambio)}
      marcador={placeholder}
      name={name}
      iconoFin={accion}
      iconoInicio={<Icono name={icono} className="h-4 w-4" />}
      inputProps={{ [catalogoCompartido.controles.atributo_accesible]: ariaLabel ?? catalogoCompartido.campos.buscar_en_codeplex }}
    />
    </div>
  )
}
