import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { Modal } from '../../compartido/interfaz/modal'
import { FilaCarrito } from './fila_carrito'
import { ResumenCarrito } from './resumen_carrito'
import type { ItemCarrito } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.carrito

export function ModalCarritoPlanes({
  items,
  clasesModulo,
  alCerrar,
  alQuitar,
  alCambiarPlan,
  alProceder,
}: {
  items: ItemCarrito[]
  clasesModulo: Record<string, string>
  alCerrar: () => void
  alQuitar: (aplicacion: string) => void
  alCambiarPlan: (aplicacion: string) => void
  alProceder: () => void
}) {
  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} suave className="max-w-240 rounded-2xl max-600:rounded-none">
      <div className={catalogoMarketplace.pago.clases.cuerpo}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="m-0 text-nombre-entidad text-texto">{textos.seleccionadas}</h2>
          <span className="text-auxiliar text-texto-suave">{(items.length === 1 ? textos.una : textos.varias).replace(':n', String(items.length))}</span>
        </div>
        {items.length === 0 ? (
          <div className="grid justify-items-center gap-3 py-6">
            <MensajeVacio titulo={textos.vacio_titulo} texto={textos.vacio_detalle} />
            <Boton type="button" variant="primario" size="md" onClick={alCerrar}>{textos.explorar}</Boton>
          </div>
        ) : (
          <div className={catalogoMarketplace.pago.clases.columnas}>
            <div className="grid min-w-0 gap-3">
              {items.map((item) => (
                <FilaCarrito key={item.aplicacion} item={item} claseModulo={clasesModulo[item.tema]} alQuitar={() => alQuitar(item.aplicacion)} alCambiarPlan={() => alCambiarPlan(item.aplicacion)} />
              ))}
            </div>
            <ResumenCarrito items={items} clasesModulo={clasesModulo} alProceder={alProceder} />
          </div>
        )}
      </div>
    </Modal>
  )
}
