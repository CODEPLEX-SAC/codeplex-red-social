import { useContext } from 'react'
import { BotonIcono } from '../interfaz/boton_icono'
import { Insignia } from '../interfaz/insignia'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { ContextoInsigniasNavegacion } from './contexto_insignias_navegacion'
import { nombreAccesibleConConteo } from './nombre_accesible_conteo'

export function BotonMensajesTopbar() {
  const pendientes = useContext(ContextoInsigniasNavegacion)[catalogoMensajeria.clave_navegacion]

  return (
    <Insignia variant="superpuesta" contenido={pendientes}>
      <BotonIcono icono="mensajes" type="button" aria-label={nombreAccesibleConConteo(textosRedSocial.MENSAJES, pendientes)} variant="sutil" size="default" />
    </Insignia>
  )
}
