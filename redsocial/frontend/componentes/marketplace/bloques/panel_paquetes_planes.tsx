import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Modal } from '../../compartido/interfaz/modal'
import type { PaquetesPlanes } from '@/tipos/marketplace/modelo_planes'

const clases = catalogoMarketplace.planes.clases

export function PanelPaquetesPlanes({ paquetes, alCerrar }: { paquetes: PaquetesPlanes; alCerrar: () => void }) {
  return (
    <Modal titulo={paquetes.titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} className="max-w-110 rounded-2xl max-600:rounded-none">
      <div className="grid min-h-0 flex-1 content-start gap-3.5 overflow-y-auto p-5 max-600:p-4">
        <p className="m-0 text-cuerpo leading-texto text-texto-suave">{paquetes.descripcion}</p>
        <div className="grid gap-2">
          {paquetes.filas.map((f) => (
            <div key={f.rango} className={clases.paquetes_fila}>
              <div className="min-w-0">
                <div className="text-nombre-fila text-texto">{f.rango}</div>
                <div className="text-auxiliar text-texto-suave">{f.tarifa}</div>
              </div>
              <div className="flex-none text-nombre-fila text-texto">{f.total}</div>
            </div>
          ))}
        </div>
        <div className={clases.paquetes_bloque}>
          <h4 className="m-0 text-titulo-subseccion text-texto">{paquetes.base_datos.titulo}</h4>
          <ul className="m-0 grid list-none gap-1 p-0">
            {paquetes.base_datos.items.map((item) => (
              <li key={item} className="text-auxiliar text-texto-suave">{item}</li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-3">
            <span className="text-etiqueta text-texto-suave">{paquetes.base_datos.pago_unico.etiqueta}</span>
            <span className="text-valor-destacado text-texto">{paquetes.base_datos.pago_unico.valor}</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
