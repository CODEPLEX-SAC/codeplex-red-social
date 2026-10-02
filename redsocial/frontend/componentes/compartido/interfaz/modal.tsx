import type { MouseEvent as EventoRaton, ReactNode } from 'react'
import { Box } from '@mui/material'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import { BotonIcono } from './boton_icono'
import { usarModal } from './usar_modal'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.modal

export function Modal({
  titulo,
  etiquetaCerrar,
  onCerrar,
  children,
  className = '',
}: {
  titulo: string
  etiquetaCerrar: string
  onCerrar: () => void
  children: ReactNode
  className?: string
}) {
  const { dialogoRef, mantenerFoco } = usarModal(onCerrar)

  function cerrarAlPulsarFuera(evento: EventoRaton<HTMLDivElement>) {
    if (evento.target === evento.currentTarget) onCerrar()
  }

  return (
    <ProveedorTemaGraficos>
      <Box sx={{ zIndex: (tema) => tema.zIndex.modal }} className={clases.clase_fondo} onClick={cerrarAlPulsarFuera}>
        <div
          ref={dialogoRef}
          role="dialog"
          aria-modal="true"
          aria-label={titulo}
          tabIndex={-1}
          onKeyDown={mantenerFoco}
          className={`${clases.clase_dialogo} ${className}`}
        >
          <div className={clases.clase_cabecera}>
            <span />
            <h2 className={clases.clase_titulo}>{titulo}</h2>
            <BotonIcono icono="cerrar" type="button" aria-label={etiquetaCerrar} onClick={onCerrar} variant="discreto" size="default" />
          </div>
          {children}
        </div>
      </Box>
    </ProveedorTemaGraficos>
  )
}
