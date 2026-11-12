import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Modal } from '../../compartido/interfaz/modal'
import { Tooltip } from '../../compartido/interfaz/tooltip'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ModalEnlaceReunionProps } from '@/tipos/mensajeria/contrato_reunion_mas_tarde'

const textos = catalogoMensajeria.videollamada.textos.mas_tarde
const clases = catalogoMensajeria.videollamada.clases.mas_tarde
const MENSAJE_COPIA = { ninguna: String(), copiado: textos.copiado, error: textos.error_copia }

export function ModalEnlaceReunion({ enlace, copia, onCopiar, onCerrar }: ModalEnlaceReunionProps) {
  const cabecera = (
    <div className={clases.cabecera}>
      <BotonIcono icono="cerrar" type="button" aria-label={textos.cerrar} variant="discreto" size="default" onClick={onCerrar} />
    </div>
  )

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className={clases.dialogo} cabecera={cabecera}>
      <div className={clases.cuerpo}>
        <span className={clases.icono}>
          <Icono name="enlace" className="h-7 w-7" />
        </span>
        <h2 className={clases.titulo}>{textos.titulo}</h2>
        <p className={clases.descripcion}>{textos.descripcion}</p>
        <div className={clases.enlace}>
          <span aria-label={textos.etiqueta_enlace} className={clases.enlace_texto}>
            {enlace}
          </span>
          <Tooltip texto={textos.copiar}>
            <BotonIcono icono="copiar" type="button" aria-label={textos.copiar} variant="discreto" size="default" onClick={onCopiar} />
          </Tooltip>
        </div>
        <p aria-live="polite" className={clases.aviso}>
          {MENSAJE_COPIA[copia]}
        </p>
      </div>
    </Modal>
  )
}
