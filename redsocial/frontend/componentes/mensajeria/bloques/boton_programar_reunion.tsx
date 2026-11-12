import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { ModalProgramarReunion } from './modal_programar_reunion'
import { usarVentanaProgramar } from './usar_ventana_programar'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { BotonProgramarReunionProps } from '@/tipos/mensajeria/contrato_programar_reunion'

const titulo = catalogoMensajeria.botones.programar_reunion

export function BotonProgramarReunion(props: BotonProgramarReunionProps) {
  const ventana = usarVentanaProgramar()

  return (
    <>
      <Boton type="button" variant="secundario" size="md" onClick={ventana.abrir}>
        <Icono name="calendario" className="h-4 w-4" /> {titulo}
      </Boton>
      {ventana.abierta && <ModalProgramarReunion {...props} titulo={titulo} onCerrar={ventana.cerrar} />}
    </>
  )
}
