import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'

export function AvisoInvitacionEnviada({ alCerrar }: { alCerrar: () => void }) {
  return (
    <div role="status" className="mb-4 flex items-center gap-3 rounded-xl border border-borde-exito-suave bg-fondo-exito-suave px-4 py-3">
      <Icono name="verificado" className="w-5 h-5 flex-none text-verde-categoria-texto" />
      <p className="m-0 min-w-0 flex-1 text-titulo-subseccion text-verde-categoria-texto">{catalogoColaboradores.mensajes.invitacion_completada_demostracion}</p>
      <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="discreto" size="sm" />
    </div>
  )
}
