import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'

const textos = catalogoMarketplace.mis_compras

export function ConfirmacionDesinstalar({ nombre, conVip, alCancelar, alConfirmar }: { nombre: string; conVip: boolean; alCancelar: () => void; alConfirmar: () => void }) {
  const titulo = textos.confirmar_titulo.replace(':nombre', nombre)
  return (
    <Modal titulo={titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCancelar} suave className="max-w-105 rounded-2xl">
      <div className={textos.clases.confirmar}>
        <h3 className="m-0 text-titulo-banner text-texto">{titulo}</h3>
        <p className="m-0 text-cuerpo leading-texto text-texto-suave">{[textos.confirmar_detalle.replace(':nombre', nombre), conVip ? textos.confirmar_vip : ''].join(' ').trim()}</p>
        <div className={textos.clases.confirmar_botones}>
          <Boton type="button" variant="secundario" size="md" onClick={alCancelar}>{textos.cancelar}</Boton>
          <Boton type="button" variant="peligro" size="md" onClick={alConfirmar}>{textos.confirmar_si}</Boton>
        </div>
      </div>
    </Modal>
  )
}
