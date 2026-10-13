import { Icono } from '../../compartido/icono'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ControlLlamadaProps } from '@/tipos/mensajeria/contrato_control_llamada'

export function ControlLlamada({ icono, clave, onClick, activo = false, conFlecha = false, conteo }: ControlLlamadaProps) {
  return (
    <button type="button" onClick={onClick} className="flex flex-none flex-col items-center gap-1 rounded-control border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/8">
      <span className="relative flex items-center">
        <Icono name={icono} className={activo ? 'h-4.5 w-4.5 text-exito-texto' : 'h-4.5 w-4.5'} />
        {conFlecha ? <Icono name="flecha-arriba" className="ml-0.5 h-3 w-3" /> : null}
        {conteo === undefined ? null : (
          <span className="absolute -right-2.5 -top-1.5 grid h-3.75 min-w-3.75 place-items-center rounded-lg bg-primario px-0.75 text-conteo text-white">{conteo}</span>
        )}
      </span>
      <small className="whitespace-nowrap text-boton">{catalogoMensajeria.botones[clave]}</small>
    </button>
  )
}
