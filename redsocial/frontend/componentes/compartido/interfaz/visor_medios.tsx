import { BotonIcono } from './boton_icono'
import { Modal } from './modal'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { VisorMediosProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.visor
const clases = catalogoPerfil.clases.visor

export function VisorMedios({ items, indice, titulo, onCambiar, onCerrar }: VisorMediosProps) {
  const actual = items[indice]
  const posicion = textos.posicion.replace(':actual', String(indice + 1)).replace(':total', String(items.length))

  return (
    <Modal titulo={titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className="max-w-200 rounded-2xl max-600:h-full max-600:rounded-none">
      <div className={clases.cuerpo}>
        <img src={actual.url} alt={titulo} className={clases.imagen} />
        <div className={clases.controles}>
          <BotonIcono icono="flecha-izquierda" type="button" aria-label={textos.anterior} variant="contorno" size="default" disabled={indice === 0} onClick={() => onCambiar(indice - 1)} />
          <span className="text-auxiliar text-texto-suave">{posicion}</span>
          <BotonIcono icono="flecha-derecha" type="button" aria-label={textos.siguiente} variant="contorno" size="default" disabled={indice === items.length - 1} onClick={() => onCambiar(indice + 1)} />
        </div>
      </div>
    </Modal>
  )
}
