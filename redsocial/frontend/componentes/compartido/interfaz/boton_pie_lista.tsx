import { Boton } from './boton'
import { Icono } from '../icono'
import type { BotonPieListaProps } from '@/tipos/compartido/contrato_boton_pie_lista'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const configuracion = catalogoCompartido.boton_pie_lista

export function BotonPieLista({ children, ...rest }: BotonPieListaProps) {
  return (
    <div className={configuracion.contenedor}>
      <Boton type="button" variant="enlace" size="pie_lista" className={configuracion.boton} {...rest}>
        {children}
        <Icono name={configuracion.icono} className={configuracion.clase_icono} />
      </Boton>
    </div>
  )
}
