import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { valoresServicio } from './logica_carrito_planes'
import type { ServicioAdicional } from '@/tipos/marketplace/modelo_carrito'
import type { ConfiguracionPago } from '@/tipos/marketplace/modelo_pago'

const textos = catalogoMarketplace.mis_compras
const clases = textos.clases

export function TarjetaServicio({ servicio, vip }: { servicio: ServicioAdicional; vip: ConfiguracionPago['vip'] }) {
  const valores = valoresServicio(servicio, vip)
  return (
    <article className={clases.tarjeta}>
      <div className={clases.cabecera_tarjeta}>
        <div className={clases.identidad}>
          <span className={clases.icono_servicio}>
            <Icono name="estrella" className="h-5 w-5 text-amarillo-categoria" />
          </span>
          <div className={clases.texto_identidad}>
            <h3 className="m-0 min-w-0 truncate text-nombre-entidad text-texto">{textos.servicio.titulo}</h3>
            <span className="truncate text-auxiliar text-texto-suave">{textos.servicio.para.replace(':nombre', servicio.nombre)}</span>
          </div>
        </div>
        <Insignia variant="status" className="bg-fondo-categoria-verde text-verde-categoria-texto">{textos.estado_activo}</Insignia>
      </div>
      <div className={clases.metas_servicio}>
        {textos.servicio.metas.map((m) => (
          <div key={m.id} className={clases.meta}>
            <span className={clases.etiqueta}>{m.etiqueta}</span>
            <span className={clases.valor}>{valores[m.id]}</span>
          </div>
        ))}
      </div>
    </article>
  )
}
