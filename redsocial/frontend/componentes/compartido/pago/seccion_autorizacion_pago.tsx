import { AlertaEstado } from '../interfaz/alerta_estado'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { Casilla } from '../interfaz/casilla'
import { EncabezadoPasoPago } from './encabezado_paso_pago'
import { idControlAutorizacion, idErrorAutorizacion, partirEtiqueta } from './logica_autorizaciones_pago'
import type { AceptacionesPago } from '@/tipos/compartido/contrato_flujo_pago'
import type { ConfiguracionAutorizacionesPago } from '@/tipos/compartido/contrato_flujo_pago'

const clases = catalogoCompartido.flujo_pago.clases

const reglasAutorizacion = catalogoCompartido.flujo_pago.reglas.autorizacion

export function SeccionAutorizacionPago({ numero, autorizaciones, aceptaciones, errores, alCambiar }: { numero: number; autorizaciones: ConfiguracionAutorizacionesPago; aceptaciones: AceptacionesPago; errores: Record<string, string>; alCambiar: (id: string, marcado: boolean) => void }) {
  return (
    <section className={clases.seccion}>
      <EncabezadoPasoPago numero={numero} titulo={autorizaciones.titulo} detalle={autorizaciones.detalle} />
      <div className={clases.grupo_autorizaciones}>
        {autorizaciones.elementos.map((elemento) => {
          const error = errores[elemento.id]
          const { inicio, final } = partirEtiqueta(elemento.texto)
          return (
            <div key={elemento.id} className={clases.autorizacion_item}>
              <Casilla
                id={idControlAutorizacion(elemento.id)}
                seleccionado={aceptaciones[elemento.id] === true}
                alCambiar={(_, marcado) => alCambiar(elemento.id, marcado)}
                error={error !== undefined}
                className={error === undefined ? undefined : clases.texto_autorizacion_error}
                inputProps={{ 'aria-required': elemento.obligatoria, 'aria-invalid': error !== undefined, 'aria-describedby': error === undefined ? undefined : idErrorAutorizacion(elemento.id) }}
                etiqueta={
                  <>
                    {inicio}
                    {inicio && reglasAutorizacion.separador_palabras}
                    <span className={clases.sin_corte}>
                      {final}
                      {elemento.obligatoria && <span aria-hidden="true" className={clases.asterisco}>{reglasAutorizacion.asterisco}</span>}
                    </span>
                  </>
                }
              />
              {error !== undefined && <AlertaEstado id={idErrorAutorizacion(elemento.id)} className={clases.error_campo}>{error}</AlertaEstado>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
