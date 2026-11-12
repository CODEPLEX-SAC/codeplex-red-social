import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'

const textos = catalogoEventos.panel_filtro_fecha

export function SinEventosFiltro({ onExplorar }: { onExplorar: () => void }) {
  return (
    <div className="mb-7 flex flex-col items-center rounded-xl border border-borde-suave bg-white px-6 py-10 text-center">
      <span className="grid h-28 w-28 place-items-center rounded-full bg-primario-suave text-primario">
        <Icono name="calendario" className="h-14 w-14" />
      </span>
      <MensajeVacio titulo={textos.sin_eventos_titulo} texto={textos.sin_eventos_texto} className="mt-5 max-w-90" />
      <Boton type="button" onClick={onExplorar} variant="contorno" size="md" className="mt-5">
        <Icono name="calendario" className="h-4 w-4" /> {textos.explorar_otros}
      </Boton>
    </div>
  )
}
