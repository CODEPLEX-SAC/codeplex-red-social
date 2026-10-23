import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { RedesCabeceraPerfilProps } from '@/tipos/perfil/contrato_perfil'
import type { RedesPerfil } from '@/tipos/perfil/modelo_perfil'

const textos = catalogoPerfil.redes
const clases = catalogoPerfil.clases.editor

export function RedesCabeceraPerfil({ redes, propio, onAgregar }: RedesCabeceraPerfilProps) {
  return (
    <ul aria-label={textos.etiqueta} className={`m-0 list-none p-0 ${clases.redes}`}>
      {textos.botones.map((boton) => {
        const valor = redes[boton.clave as keyof RedesPerfil]
        if (valor) {
          return (
            <li key={boton.clave}>
              <a href={`${boton.prefijo}${valor}`} target="_blank" rel="noreferrer" aria-label={boton.titulo} title={boton.titulo} className={clases.red}>
                <Icono name={boton.icono as IconName} className="h-4 w-4" />
              </a>
            </li>
          )
        }
        return propio ? (
          <li key={boton.clave}>
            <BotonIcono icono={boton.icono as IconName} type="button" aria-label={textos.agregar.replace(':red', boton.titulo)} title={textos.agregar.replace(':red', boton.titulo)} onClick={onAgregar} variant="contorno" size="md" className="rounded-full" />
          </li>
        ) : null
      })}
    </ul>
  )
}
