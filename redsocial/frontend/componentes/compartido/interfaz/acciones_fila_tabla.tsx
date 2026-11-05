import { useState } from 'react'
import { BotonIcono } from './boton_icono'
import { Menu } from './menu'
import { usarVistaMovil } from './usar_vista_movil'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { AccionFilaTabla, AccionesFilaTablaProps } from '@/tipos/compartido/contrato_acciones_fila_tabla'

const textos = catalogoCompartido.acciones_tabla

function BotonAccion({ accion, claseBoton }: { accion: AccionFilaTabla; claseBoton?: string }) {
  return (
    <BotonIcono
      icono={accion.icono}
      type="button"
      variant="suave"
      aria-label={accion.etiqueta}
      title={accion.etiqueta}
      className={[accion.clase, claseBoton].filter(Boolean).join(' ')}
      onClick={accion.alHacerClick}
    />
  )
}

export function AccionesFilaTabla({ acciones, nombre, claseContenedor, claseBoton }: AccionesFilaTablaProps) {
  const movil = usarVistaMovil()
  const [ancla, setAncla] = useState<HTMLElement | null>(null)

  if (!movil) {
    return (
      <div className={claseContenedor}>
        {acciones.map((accion) => <BotonAccion key={accion.etiquetaMenu} accion={accion} claseBoton={claseBoton} />)}
      </div>
    )
  }

  return (
    <>
      <BotonIcono
        icono="puntos-verticales"
        type="button"
        variant="suave"
        aria-label={textos.opciones_de.replace(':nombre', nombre)}
        aria-haspopup="menu"
        aria-expanded={Boolean(ancla)}
        className={claseBoton}
        onClick={(evento) => setAncla(evento.currentTarget)}
      />
      <Menu
        ancla={ancla}
        alCerrar={() => setAncla(null)}
        elementos={acciones.map((accion) => ({ icono: accion.icono, etiqueta: accion.etiquetaMenu, peligro: accion.peligro, alHacerClick: accion.alHacerClick }))}
      />
    </>
  )
}
