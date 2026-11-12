import { Icono } from '../../compartido/icono'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { DetallesCabeceraPerfilProps } from '@/tipos/perfil/contrato_perfil'

const clases = catalogoPerfil.clases.cabecera

export function DetallesCabeceraPerfil({ perfil }: DetallesCabeceraPerfilProps) {
  const datos = catalogoPerfil.cabecera.datos.filter((dato) => perfil.detallesFijados[dato.fijado as keyof typeof perfil.detallesFijados] && perfil[dato.clave as 'ubicacion' | 'estudios' | 'empresa'])

  if (datos.length === 0) return null

  return (
    <ul className={clases.detalles}>
      {datos.map((dato) => (
        <li key={dato.clave} className={`${clases.dato} ${clases.divisor}`}>
          <Icono name={dato.icono as IconName} className={clases.dato_icono} />
          <span>{perfil[dato.clave as 'ubicacion' | 'estudios' | 'empresa']}</span>
        </li>
      ))}
    </ul>
  )
}
