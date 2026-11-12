import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Tooltip } from '../../compartido/interfaz/tooltip'
import { mensajeDeCamara } from './logica_preparacion_llamada'
import { VideoFlujo } from './video_flujo'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { usarPreparacionLlamada } from './usar_preparacion_llamada'

const textos = catalogoMensajeria.videollamada.textos.preparacion
const clases = catalogoMensajeria.videollamada.clases.preparacion

function PlacaCamaraApagada({ mensaje }: { mensaje: string | null }) {
  return (
    <div className={clases.apagada}>
      <AvatarUsuario tamano="xl" imagen={usuarioImg} />
      <p className={clases.apagada_texto}>{textos.camara_desactivada}</p>
      {mensaje !== null && (
        <p aria-live="polite" className={clases.aviso}>
          {mensaje}
        </p>
      )}
    </div>
  )
}

function textoDeControl(activo: boolean, siActivo: string, siInactivo: string): string {
  if (activo) return siActivo
  return siInactivo
}

function MedioVistaPrevia({ flujo, mensaje }: { flujo: MediaStream | null; mensaje: string | null }) {
  if (flujo === null) return <PlacaCamaraApagada mensaje={mensaje} />
  return <VideoFlujo flujo={flujo} etiqueta={textos.vista_previa} className={clases.video} />
}

export function VistaPreviaLlamada({ nombre, preparacion }: { nombre: string; preparacion: ReturnType<typeof usarPreparacionLlamada> }) {
  const { micActivo, camaraActiva, flujo, errorCamara } = preparacion
  const textoMic = textoDeControl(micActivo, textos.silenciar_microfono, textos.activar_microfono)
  const textoCamara = textoDeControl(camaraActiva, textos.apagar_camara, textos.activar_camara)

  return (
    <div className={clases.vista}>
      <MedioVistaPrevia flujo={flujo} mensaje={mensajeDeCamara(errorCamara)} />
      <div className={clases.indicadores}>
        <span role="img" aria-label={micActivo ? textos.microfono_activado : textos.microfono_desactivado} className={micActivo ? clases.indicador : clases.indicador_alerta}>
          <Icono name={micActivo ? 'microfono' : 'microfono-apagado'} className="h-full w-full" />
        </span>
        <span role="img" aria-label={camaraActiva ? textos.camara_activada : textos.camara_desactivada} className={camaraActiva ? clases.indicador : clases.indicador_alerta}>
          <Icono name={camaraActiva ? 'video' : 'video-apagado'} className="h-full w-full" />
        </span>
      </div>
      <span className={clases.nombre}>{nombre}</span>
      <div className={clases.controles}>
        <Tooltip texto={textoMic}>
          <BotonIcono icono={micActivo ? 'microfono' : 'microfono-apagado'} type="button" aria-label={textoMic} aria-pressed={!micActivo} variant={micActivo ? 'llamada' : 'llamada_alerta'} size="llamada" onClick={preparacion.alternarMicrofono} />
        </Tooltip>
        <Tooltip texto={textoCamara}>
          <BotonIcono icono={camaraActiva ? 'video' : 'video-apagado'} type="button" aria-label={textoCamara} aria-pressed={!camaraActiva} variant={camaraActiva ? 'llamada' : 'llamada_alerta'} size="llamada" onClick={() => void preparacion.alternarCamara()} />
        </Tooltip>
      </div>
    </div>
  )
}
