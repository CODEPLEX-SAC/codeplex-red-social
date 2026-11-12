import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { VideoFlujo } from './video_flujo'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { EscenarioPresentacionProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const textos = catalogoMensajeria.videollamada.textos.sala
const clases = catalogoMensajeria.videollamada.clases.sala

function ContenidoCompartido({ presentacion, imagen }: Pick<EscenarioPresentacionProps, 'presentacion' | 'imagen'>) {
  if (presentacion.flujo !== null) return <VideoFlujo flujo={presentacion.flujo} etiqueta={textos.region_presentacion} className={clases.presentacion_video} />
  return (
    <>
      {imagen && <img src={imagen} alt={textos.region_presentacion} className={clases.presentacion_video} />}
      <p className={clases.presentacion_simulada}>{textos.presentacion_demostracion}</p>
    </>
  )
}

export function EscenarioPresentacion({ presentacion, presentador, imagen, onDetener }: EscenarioPresentacionProps) {
  return (
    <div className={clases.presentacion}>
      <div className={clases.presentacion_barra}>
        <p aria-live="polite" className={clases.presentacion_texto}>
          {textos.compartiendo_tu_pantalla}
          <span className="sr-only"> ({presentador})</span>
        </p>
        <Boton type="button" variant="peligro" size="md" onClick={onDetener}>
          <Icono name="pantalla-compartida" className="h-4 w-4" /> {textos.dejar_de_compartir}
        </Boton>
      </div>
      <section aria-label={textos.region_presentacion} className={clases.presentacion_principal}>
        <ContenidoCompartido presentacion={presentacion} imagen={imagen} />
      </section>
    </div>
  )
}
