import { Boton } from '../../compartido/interfaz/boton'
import { Insignia } from '../../compartido/interfaz/insignia'
import { rellenarPlantilla } from './logica_resumen_empresas'
import { textoCapacidad, textoPrecio } from './logica_mejora_plan'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { TarjetaPlanMejoraProps } from '@/tipos/empresas/contrato_mejora_plan'

const textos = catalogoEmpresas.planes_asignados.mejora
const clases = textos.clases

export function TarjetaPlanMejora({ plan, limite, periodo, precio, recurso, opcion, alElegir }: TarjetaPlanMejoraProps) {
  const disponible = opcion !== undefined && opcion.motivoNoDisponible === null
  const detalles = [
    opcion?.diferenciaCapacidad ? rellenarPlantilla(textos.mas_capacidad, { n: opcion.diferenciaCapacidad }) : null,
    opcion ? rellenarPlantilla(textos.mas_precio, { monto: textoPrecio(opcion.diferenciaPrecio, periodo) }) : null,
    opcion?.motivoNoDisponible ? textos.motivos[opcion.motivoNoDisponible] : null,
  ].filter((texto): texto is string => texto !== null)

  return (
    <li className={`${clases.tarjeta} ${opcion ? '' : clases.tarjeta_actual}`}>
      <div className={clases.tarjeta_cuerpo}>
        <div className={clases.tarjeta_titulo}>
          <h4 className={clases.nombre}>{textos.plan.replace(':plan', plan.nombre)}</h4>
          {!opcion && <Insignia variant="status" className={clases.insignia_actual}>{textos.insignia_actual}</Insignia>}
          {opcion && !disponible && <Insignia variant="status" className={clases.insignia_no_disponible}>{textos.insignia_no_disponible}</Insignia>}
        </div>
        <span className={clases.detalle}>{textoCapacidad(recurso, limite)}</span>
        {detalles.map((texto) => (
          <span key={texto} className={clases.detalle}>{texto}</span>
        ))}
      </div>
      <span className={clases.precio}>{textoPrecio(precio, periodo)}</span>
      {opcion && (
        <Boton type="button" variant="primario" size="default" disabled={!disponible} aria-label={textos.etiqueta_elegir.replace(':plan', plan.nombre)} onClick={() => alElegir?.(plan)}>
          {textos.elegir}
        </Boton>
      )}
    </li>
  )
}
