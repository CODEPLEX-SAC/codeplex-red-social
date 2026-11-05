import type { ReactNode } from 'react'
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
  cabecera,
  suave = false,
  oscuro = false,
}: {
  titulo: string
  etiquetaCerrar: string
  onCerrar: () => void
  children: ReactNode
  className?: string
  cabecera?: ReactNode
  suave?: boolean
  oscuro?: boolean
}) {
  const { dialogoRef, mantenerFoco, registrarPulsacion, cerrarAlPulsarFuera } = usarModal(onCerrar)

  return (
    <ProveedorTemaGraficos>
      <Box sx={{ zIndex: (tema) => tema.zIndex.modal }} className={oscuro ? clases.clase_fondo_oscuro : clases.clase_fondo} onMouseDown={registrarPulsacion} onClick={cerrarAlPulsarFuera}>
        <div
          ref={dialogoRef}
          role="dialog"
          aria-modal="true"
          aria-label={titulo}
          tabIndex={-1}
          onKeyDown={mantenerFoco}
          className={`${oscuro ? clases.clase_dialogo_oscuro : suave ? clases.clase_dialogo_suave : clases.clase_dialogo} ${className}`}
        >
          {cabecera ?? (
            <div className={clases.clase_cabecera}>
              <span />
              <h2 className={clases.clase_titulo}>{titulo}</h2>
              <BotonIcono icono="cerrar" type="button" aria-label={etiquetaCerrar} onClick={onCerrar} variant="discreto" size="default" />
            </div>
          )}
          {children}
        </div>
      </Box>
    </ProveedorTemaGraficos>
  )
}
