import { Icono } from '../../compartido/icono'
import { Valoracion } from '../../compartido/interfaz/valoracion'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { EstadisticasCabeceraPerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.cabecera
const clases = catalogoPerfil.clases.cabecera

export function EstadisticasCabeceraPerfil({ estadisticas }: EstadisticasCabeceraPerfilProps) {
  return (
    <ul aria-label={textos.estadisticas} className={clases.estadisticas}>
      {estadisticas.map((estadistica) => (
        <li key={estadistica.clave} className={`${clases.dato} ${clases.divisor}`}>
          <Icono name={estadistica.icono as IconName} className={clases.dato_icono} />
          <span>
            <strong>{estadistica.valor}</strong> {estadistica.texto}
          </span>
        </li>
      ))}
      <li className={`${clases.dato} ${clases.divisor}`}>
        <Valoracion valor={textos.calificacion_valor} maximo={textos.calificacion_maximo} etiqueta={textos.etiqueta_calificacion} />
        <span>{textos.resenas}</span>
      </li>
    </ul>
  )
}
