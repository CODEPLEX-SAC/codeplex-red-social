import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'

const etiqueta = catalogoMarketplace.placeholders.buscar

export function CampoBuscadorMarketplace({ busqueda, alBuscar }: { busqueda: string; alBuscar: (texto: string) => void }) {
  const accion = <BotonIcono icono="buscar" type="button" aria-label={etiqueta} variant="primario" size="md" />

  return <CampoBusqueda className="max-w-95" placeholder={etiqueta} aria-label={etiqueta} value={busqueda} onChange={(evento) => alBuscar(evento.target.value)} accion={accion} />
}
