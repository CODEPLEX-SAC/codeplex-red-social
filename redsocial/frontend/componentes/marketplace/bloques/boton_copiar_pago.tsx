import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'

export function BotonCopiarPago({ valor, etiqueta }: { valor: string; etiqueta: string }) {
  return <BotonIcono icono="copiar" type="button" aria-label={etiqueta} variant="sutil" size="sm" className={catalogoMarketplace.pago.clases.copiar} onClick={() => navigator.clipboard?.writeText(valor)} />
}
