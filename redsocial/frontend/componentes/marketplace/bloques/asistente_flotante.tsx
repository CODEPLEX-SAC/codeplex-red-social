import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { PanelAsistentePlanes } from './panel_asistente_planes'
import type { usarSelectorPlanes } from './usar_selector_planes'
import type { ConfiguracionPlanes } from '@/tipos/marketplace/modelo_planes'

const textos = catalogoMarketplace.planes.asistente

export function AsistenteFlotante({ configuracion, estado }: { configuracion: ConfiguracionPlanes; estado: ReturnType<typeof usarSelectorPlanes> }) {
  return (
    <>
      {estado.asistenteAbierto && (
        <>
          <div className="absolute inset-0 z-20 bg-black/20 max-768:fixed max-768:bg-black/45" onClick={estado.alternarAsistente} />
          <PanelAsistentePlanes asistente={configuracion.asistente} mensajes={estado.mensajes} nombreCatalogo={estado.tipo.catalogo.nombre} alPreguntar={estado.preguntar} alVerCatalogo={estado.abrirVisor} alCerrar={estado.alternarAsistente} />
        </>
      )}
      <BotonIcono icono={estado.asistenteAbierto ? 'cerrar' : 'comentario'} type="button" aria-label={estado.asistenteAbierto ? textos.cerrar : textos.abrir} variant="flotante" size="default" className="absolute bottom-4 right-4 z-30" onClick={estado.alternarAsistente} />
    </>
  )
}
