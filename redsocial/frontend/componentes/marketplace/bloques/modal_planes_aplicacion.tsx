import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Modal } from '../../compartido/interfaz/modal'
import { AsistenteFlotante } from './asistente_flotante'
import { CuerpoPlanes } from './cuerpo_planes'
import { claseModalPlanes } from './logica_carrito_planes'
import { usarSelectorPlanes } from './usar_selector_planes'
import { PanelPaquetesPlanes, VentanaCaracteristica, VisorCatalogoPlanes } from './ventanas_planes'
import type { ConfiguracionPlanes, EstiloPlanDestacado, EstiloSelectorPlanes, SeleccionPlan } from '@/tipos/marketplace/modelo_planes'

const textos = catalogoMarketplace.planes

export function ModalPlanesAplicacion({
  configuracion,
  claseModulo,
  estilo,
  estiloDestacado,
  alCerrar,
  alConfirmar,
}: {
  configuracion: ConfiguracionPlanes
  claseModulo: string
  estilo: EstiloSelectorPlanes
  estiloDestacado: EstiloPlanDestacado
  alCerrar: () => void
  alConfirmar: (seleccion: SeleccionPlan) => void
}) {
  const estado = usarSelectorPlanes(configuracion, alConfirmar, alCerrar)
  const cierre = <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} variant="flotante" size="default" className="absolute right-3.5 top-3.5 z-10" onClick={estado.cerrarPlanes} />

  return (
    <>
      <Modal titulo={textos.titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={estado.cerrarPlanes} cabecera={cierre} className={claseModalPlanes(configuracion)}>
        <CuerpoPlanes configuracion={configuracion} claseModulo={claseModulo} estilo={estilo} estiloDestacado={estiloDestacado} estado={estado} />
        <AsistenteFlotante configuracion={configuracion} estado={estado} />
      </Modal>
      {estado.paquetesAbiertos && configuracion.paquetes && <PanelPaquetesPlanes paquetes={configuracion.paquetes} alCerrar={estado.cerrarPaquetes} />}
      {estado.detalle && <VentanaCaracteristica detalle={estado.detalle} alCerrar={estado.cerrarCaracteristica} />}
      {estado.visorAbierto && <VisorCatalogoPlanes nombre={estado.tipo.catalogo.nombre} url={estado.tipo.catalogo.url} estilo={estilo} alCerrar={estado.cerrarVisor} />}
    </>
  )
}
