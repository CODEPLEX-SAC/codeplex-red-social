import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { CabeceraCompartirProps } from '@/tipos/inicio/contrato_compartir_publicacion'

const textos = catalogoInicio.publicacion.compartir

export function CabeceraCompartir({ titulo, alVolver, onCerrar }: CabeceraCompartirProps) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center border-b border-borde px-4 py-3">
      {alVolver ? <BotonIcono icono="flecha-izquierda" type="button" aria-label={textos.volver} variant="discreto" size="default" onClick={alVolver} /> : <span />}
      <h2 className="m-0 text-center text-titulo-banner text-texto">{titulo}</h2>
      <BotonIcono icono="cerrar" type="button" aria-label={textos.cerrar} variant="discreto" size="default" onClick={onCerrar} />
    </div>
  )
}
