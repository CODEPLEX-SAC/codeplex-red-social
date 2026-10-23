import type { CodeplexInterruptorProps } from '@codeplex-sac/formularios'
import { Icono } from '../../compartido/icono'
import { Interruptor } from '../../compartido/interfaz/interruptor'
import { usarSuscripciones } from '../../compartido/carrito/contexto_suscripciones'
import { estadoModuloEmpresa } from './logica_suscripciones_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { CeldaModuloEmpresaProps } from '@/tipos/empresas/contrato_listado_empresas'
import { CLASES_TABLA } from '../../compartido/clases_tabla'

const estados = catalogoEmpresas.modulo_estado
const clases = catalogoEmpresas.clases.celda_modulo
const FONDOS_ACTIVO: Record<string, string> = clases.fondo_activo

export function CeldaModuloEmpresa({ empresa, modulo, alAlternar }: CeldaModuloEmpresaProps) {
  const { activo, contratado, planNombre } = estadoModuloEmpresa(empresa, modulo, usarSuscripciones())
  const etiquetaInterruptor = (activo ? estados.aria_activo : estados.aria_inactivo).replace(':modulo', modulo.etiqueta)

  return (
    <td className={CLASES_TABLA.celda}>
      <div className={`${clases.contenedor} ${activo ? FONDOS_ACTIVO[modulo.tono_estado] : clases.fondo_neutro}`}>
        {contratado ? (
          <>
            <Interruptor color={clases.interruptor_color as CodeplexInterruptorProps['color']} seleccionado={activo} alCambiar={alAlternar} etiqueta={<span className={clases.etiqueta_oculta}>{etiquetaInterruptor}</span>} />
            <span className={clases.plan}>{estados.plan.replace(':plan', planNombre ?? '')}</span>
          </>
        ) : (
          <span className={clases.estado}>
            <Icono name={estados.icono_no_asignado as IconName} className={clases.icono} />
            {estados.no_asignado}
          </span>
        )}
      </div>
    </td>
  )
}
