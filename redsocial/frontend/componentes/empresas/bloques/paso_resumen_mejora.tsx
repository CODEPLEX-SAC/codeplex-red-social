import { BannerInformativo } from '../../compartido/interfaz/banner_informativo'
import { Boton } from '../../compartido/interfaz/boton'
import { filasDeResumen, lineasDeResumen } from './logica_mejora_plan'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { PasoResumenMejoraProps } from '@/tipos/empresas/contrato_mejora_plan'

const textos = catalogoEmpresas.planes_asignados.mejora
const resumen = textos.resumen
const columnas = resumen.columnas
const clases = textos.clases
const ICONO_NOTA = catalogoEmpresas.planes_asignados.icono_aviso as IconName

export function PasoResumenMejora({ suscripcion, capacidad, datos, opcion, alVolver, alCancelar, alContinuar }: PasoResumenMejoraProps) {
  const filas = filasDeResumen(suscripcion, capacidad, datos, opcion)
  const lineas = lineasDeResumen(suscripcion, opcion)

  return (
    <>
      <div className={clases.cuerpo}>
        <h3 className="m-0 text-titulo-banner text-texto">{resumen.titulo}</h3>
        <table aria-label={resumen.etiqueta} className="w-full border-collapse text-subtitulo">
          <thead>
            <tr className="text-left text-encabezado-tabla text-texto-suave">
              <th className="py-2 pr-3">{columnas.concepto}</th>
              <th className="py-2 pr-3">{columnas.actual}</th>
              <th className="py-2">{columnas.nuevo}</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila) => (
              <tr key={fila.etiqueta} className="border-t border-borde-suave">
                <th scope="row" className="py-2.5 pr-3 text-left text-texto-suave">{fila.etiqueta}</th>
                <td className="py-2.5 pr-3 text-texto">{fila.actual}</td>
                <td className="py-2.5 text-nombre-fila text-texto">{fila.nuevo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className="m-0 grid gap-2 text-subtitulo">
          {lineas.map((linea) => (
            <div key={linea.etiqueta} className="flex items-center justify-between gap-3">
              <dt className="text-texto-suave">{linea.etiqueta}</dt>
              <dd className="m-0 text-texto">{linea.valor}</dd>
            </div>
          ))}
        </dl>
        <p className={clases.contexto_texto}>{resumen.impuestos}</p>
        <BannerInformativo icono={ICONO_NOTA} descripcion={resumen.demostrativo} variante="nota" />
      </div>
      <div className={clases.pie}>
        <Boton type="button" variant="secundario" size="md" onClick={alCancelar}>{resumen.cancelar}</Boton>
        <Boton type="button" variant="secundario" size="md" onClick={alVolver}>{resumen.volver}</Boton>
        <Boton type="button" variant="primario" size="md" onClick={alContinuar}>{resumen.continuar}</Boton>
      </div>
    </>
  )
}
