import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { Modal } from '../../compartido/interfaz/modal'
import type { OpcionSeleccionPago } from '@/tipos/marketplace/modelo_carrito'

export function ModalSeleccionPago({
  titulo,
  opciones,
  seleccionadoId,
  textoNueva,
  alSeleccionar,
  alNueva,
  alCerrar,
}: {
  titulo: string
  opciones: OpcionSeleccionPago[]
  seleccionadoId: string | null
  textoNueva: string
  alSeleccionar: (id: string) => void
  alNueva: () => void
  alCerrar: () => void
}) {
  return (
    <Modal titulo={titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} className="max-w-110 rounded-2xl max-600:rounded-none">
      <div className="grid min-h-0 flex-1 content-start gap-2.5 overflow-y-auto p-5 max-600:p-4">
        {opciones.map((opcion) => (
          <Boton key={opcion.id} type="button" variant={opcion.id === seleccionadoId ? 'contorno' : 'secundario'} size="md" aria-pressed={opcion.id === seleccionadoId} className="h-auto w-full py-2.5" onClick={() => alSeleccionar(opcion.id)}>
            <span className="grid min-w-0 flex-1 gap-0.5 text-left">
              <span className="text-nombre-fila">{opcion.titulo}</span>
              <span className="text-auxiliar font-etiqueta text-texto-suave">{opcion.detalle}</span>
            </span>
            {opcion.id === seleccionadoId && <Icono name="verificado" className="h-4.5 w-4.5 flex-none text-exito-texto" />}
          </Boton>
        ))}
        <Boton type="button" variant="enlace" size="enlace" onClick={alNueva}>{textoNueva}</Boton>
        <p className="m-0 text-auxiliar text-texto-suave">{catalogoMarketplace.pago.guardados.aviso_sesion}</p>
      </div>
    </Modal>
  )
}
