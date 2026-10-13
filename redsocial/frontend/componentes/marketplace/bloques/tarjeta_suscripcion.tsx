import { useState } from 'react'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { Menu, irARuta } from '../../compartido/interfaz/menu'
import { elementosMenuCompra, estadoSuscripcion, metasCompra, valoresSuscripcion } from './logica_carrito_planes'
import type { AccionesCompra, CompraRealizada } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.mis_compras
const clases = textos.clases

export function TarjetaSuscripcion({
  compra,
  claseModulo,
  acciones,
  vipContratado,
}: {
  compra: CompraRealizada
  claseModulo: string
  acciones: AccionesCompra
  vipContratado: boolean
}) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const valores = valoresSuscripcion(compra)
  const abrirAplicacion = textos.abrir_aria.replace(':nombre', compra.nombre)
  const elementos = elementosMenuCompra(compra, acciones, vipContratado)
  const estado = estadoSuscripcion(compra)
  return (
    <article className={clases.tarjeta}>
      <div className={clases.cabecera_tarjeta}>
        <div className={clases.identidad}>
          <span className={`grid h-11 w-11 flex-none place-items-center rounded-xl ${claseModulo}`}>
            <Icono name={compra.icono} className="h-5 w-5 text-white" />
          </span>
          <div className={clases.texto_identidad}>
            <div className={clases.nombre_fila}>
              <h3 className="m-0 min-w-0 truncate text-nombre-entidad text-texto">{compra.nombre}</h3>
              {compra.ruta && <BotonIcono icono="flecha-arriba-derecha" variant="discreto" size="sm" aria-label={abrirAplicacion} onClick={() => irARuta(compra.ruta as string)} />}
            </div>
            <span className="truncate text-auxiliar text-texto-suave">{compra.lema}</span>
          </div>
        </div>
        <div className={clases.estado_fila}>
          <Insignia variant="status" className={estado.clase}>{estado.etiqueta}</Insignia>
          <BotonIcono icono="puntos" variant="discreto" size="md" aria-label={textosRedSocial.MAS_OPCIONES} onClick={(evento) => setAncla(evento.currentTarget)} />
        </div>
      </div>
      <div className={clases.cuerpo}>
        <div className={clases.izquierda}>
          <div className={clases.metas}>
            {metasCompra(compra, textos.metas).map((m) => (
              <div key={m.id} className={clases.meta}>
                <span className={clases.etiqueta}>{m.etiqueta}</span>
                <span className={m.acento ? clases.valor_acento : clases.valor}>{valores[m.id]}</span>
              </div>
            ))}
          </div>
          {estado.enPrueba && (
            <p className={clases.aviso}>
              <Icono name="informacion" className="mt-0.5 h-4 w-4 flex-none text-primario" />
              <span>{textos.aviso}</span>
            </p>
          )}
        </div>
        <div className={clases.acciones}>
          <Boton type="button" variant="primario" size="md" className="w-full justify-center" onClick={acciones.mejorar}>{textos.mejorar}</Boton>
          <Boton type="button" variant="secundario" size="md" className="w-full justify-center" onClick={acciones.detalles}>{textos.detalles}</Boton>
        </div>
      </div>
      {ancla && <Menu ancla={ancla} alCerrar={() => setAncla(null)} elementos={elementos} />}
    </article>
  )
}
