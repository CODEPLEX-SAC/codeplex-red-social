import { useId, useState } from 'react'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { monto } from './logica_pago_planes'
import type { ConfiguracionPago } from '@/tipos/marketplace/modelo_pago'

const textos = catalogoMarketplace.pago.vip
const clases = textos.clases

export function SeccionPagoVip({ vip, seleccionado, alCambiar }: { vip: ConfiguracionPago['vip']; seleccionado: boolean; alCambiar: (marcado: boolean) => void }) {
  const idBeneficios = useId()
  const [abierto, setAbierto] = useState(false)
  return (
    <section className={clases.tarjeta}>
      <div className={clases.cabecera}>
        <div className={clases.cabecera_texto}>
          <span className="text-etiqueta uppercase text-texto-sobre-oscuro-claro">{textos.etiqueta}</span>
          <div className={clases.titulo_fila}>
            <Icono name="estrella" className="h-4.5 w-4.5 text-amarillo-categoria" />
            <h3 className="m-0 text-nombre-entidad">{textos.titulo}</h3>
            <Insignia variant="status" className="bg-white/15 text-white">{textos.extra}</Insignia>
          </div>
          <p className="m-0 text-auxiliar text-texto-sobre-oscuro-claro">{textos.subtitulo}</p>
        </div>
        <BotonIcono
          icono={abierto ? 'flecha-arriba' : 'flecha-abajo'}
          variant="sobre_oscuro"
          aria-label={abierto ? textos.ocultar : textos.mostrar}
          aria-expanded={abierto}
          aria-controls={abierto ? idBeneficios : undefined}
          onClick={() => setAbierto(!abierto)}
        />
      </div>
      {abierto && (
        <div id={idBeneficios}>
          <ul className={clases.lista}>
            {vip.beneficios.map((b) => (
              <li key={b.n} className={clases.item}>
                <span className={clases.numero}>{b.n}</span>
                <span className={clases.descripcion}>
                  <strong className="font-titulo">{b.titulo}:</strong> {b.desc}
                </span>
              </li>
            ))}
          </ul>
          <p className={clases.nota}>{textos.actualizaciones}</p>
        </div>
      )}
      <div className={abierto ? [clases.pie, clases.pie_abierto].join(' ') : clases.pie}>
        <Casilla seleccionado={seleccionado} alCambiar={(_, marcado) => alCambiar(marcado)} etiqueta={textos.agregar} />
        <div className={clases.precios}>
          <span className="text-auxiliar text-texto-suave line-through">{[textos.antes, monto(vip.precio_antes)].join(' ')}</span>
          <span className="text-nombre-fila text-texto">{[monto(vip.precio), textos.mes].join('')}</span>
          <Insignia variant="status" className="bg-fondo-categoria-verde text-verde-categoria-texto">{textos.descuento}</Insignia>
          <Insignia variant="status" className="bg-fondo-categoria-naranja text-naranja-categoria-texto">{textos.cupos}</Insignia>
        </div>
      </div>
    </section>
  )
}
