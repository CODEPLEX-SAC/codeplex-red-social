import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'

export function BloqueAccesoAlternativo() {
  return (
    <div className="flex flex-col gap-2.5">
      <Boton type="button" variant="secundario" size="md" disabled title={catalogoAcceso.mensajes.google_proximamente} className="w-full disabled:cursor-not-allowed disabled:opacity-60">
        {catalogoAcceso.botones.continuar_con_google}
      </Boton>
      <Boton type="button" variant="contorno" size="md" disabled title={catalogoAcceso.mensajes.demo_proximamente} className="w-full disabled:cursor-not-allowed disabled:opacity-60">
        <Icono name="flecha-izquierda" className="h-4 w-4" /> {catalogoAcceso.botones.volver_al_demo}
      </Boton>
      <div className="mt-1 flex items-center gap-2.5 text-texto-suave">
        <div className="h-px flex-1 bg-borde" />
        <span className="text-auxiliar font-bold uppercase">{catalogoAcceso.separador}</span>
        <div className="h-px flex-1 bg-borde" />
      </div>
    </div>
  )
}
