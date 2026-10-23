import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { CLASES_TABLA, claseEncabezadoTabla } from '../../compartido/clases_tabla'
import { FilaEmpresa } from './fila_empresa'
import { MODULOS_EMPRESA } from './logica_listado_empresas'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { TablaEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

const TEXTOS = catalogoEmpresas.tabla
const ARIA_ORDEN: Record<string, string> = catalogoEmpresas.orden.aria
const TONOS_ICONO: Record<string, string> = catalogoCompartido.tarjeta_indicador_icono_color
const clasesModulo = catalogoEmpresas.clases.encabezado_modulo
const encabezado = claseEncabezadoTabla()

export function TablaEmpresas({ listado, alElegirAccion, alAlternarModulo }: TablaEmpresasProps) {
  const ordenAria = ARIA_ORDEN[listado.orden ?? 'ninguno']

  return (
    <div className={CLASES_TABLA.contenedor}>
      <table className={CLASES_TABLA.tabla}>
        <thead>
          <tr>
            <th className={encabezado} aria-sort={ordenAria as 'none'}>
              <Boton type="button" variant="fantasma" size="enlace" onClick={listado.alternarOrden} aria-label={catalogoEmpresas.botones.ordenar_empresas} className={catalogoEmpresas.clases.encabezado_orden}>
                {TEXTOS.empresa}
                <Icono name={catalogoEmpresas.orden.icono as IconName} className={catalogoEmpresas.clases.encabezado_orden_icono} />
              </Boton>
            </th>
            <th className={encabezado}>{TEXTOS.ruc}</th>
            <th className={encabezado}>{TEXTOS.rubro}</th>
            {MODULOS_EMPRESA.map((modulo) => (
              <th key={modulo.clave} className={encabezado}>
                <span className={clasesModulo.contenedor}>
                  <span className={`${clasesModulo.icono_caja} ${TONOS_ICONO[modulo.tono]}`}>
                    <Icono name={modulo.icono} className={clasesModulo.icono} />
                  </span>
                  {modulo.etiqueta}
                </span>
              </th>
            ))}
            <th className={`${encabezado} ${CLASES_TABLA.celdaFija}`}>{TEXTOS.acciones}</th>
          </tr>
        </thead>
        <tbody>
          {listado.filas.length === 0 ? (
            <tr>
              <td colSpan={Object.keys(TEXTOS).length + MODULOS_EMPRESA.length} className={CLASES_TABLA.mensajeVacio}>{catalogoEmpresas.mensajes.sin_empresas}</td>
            </tr>
          ) : (
            listado.filas.map((empresa) => (
              <FilaEmpresa key={empresa.codigo} empresa={empresa} alElegirAccion={alElegirAccion} alAlternarModulo={alAlternarModulo} />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
