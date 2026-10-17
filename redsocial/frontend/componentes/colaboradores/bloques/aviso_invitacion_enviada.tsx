import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'

const avisos = catalogoColaboradores.aviso

export function AvisoInvitacionEnviada({ mensaje, error = false, alCerrar }: { mensaje: string; error?: boolean; alCerrar: () => void }) {
  const estilo = error ? avisos.error : avisos.exito

  return (
    <div role={estilo.rol} className={`mb-4 flex items-center gap-3 rounded-xl border px-4 py-3 ${estilo.contenedor}`}>
      <Icono name={estilo.icono} className={`w-5 h-5 flex-none ${estilo.texto}`} />
      <p className={`m-0 min-w-0 flex-1 text-titulo-subseccion ${estilo.texto}`}>{mensaje}</p>
      <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="discreto" size="sm" />
    </div>
  )
}
