import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { ModalEnlaceReunion } from './modal_enlace_reunion'
import { usarReunionMasTarde } from './usar_reunion_mas_tarde'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { BotonReunionMasTardeProps } from '@/tipos/mensajeria/contrato_reunion_mas_tarde'

const textos = catalogoMensajeria.videollamada.textos.mas_tarde

export function BotonReunionMasTarde({ crearEnlace, copiarEnlace }: BotonReunionMasTardeProps) {
  const reunion = usarReunionMasTarde({ crearEnlace, copiarEnlace })

  return (
    <>
      <Boton type="button" variant="secundario" size="md" onClick={reunion.abrir}>
        <Icono name="crear-evento" className="h-4 w-4" /> {textos.boton}
      </Boton>
      {reunion.enlace !== null && <ModalEnlaceReunion enlace={reunion.enlace} copia={reunion.copia} onCopiar={() => void reunion.copiar()} onCerrar={reunion.cerrar} />}
    </>
  )
}
