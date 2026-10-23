import { useState } from 'react'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Icono } from '../../compartido/icono'
import { IndicadorCarga } from '../../compartido/interfaz/indicador_carga'
import { Modal } from '../../compartido/interfaz/modal'
import type { EstiloSelectorPlanes } from '@/tipos/marketplace/modelo_planes'

const textos = catalogoMarketplace.planes.visor

export function VisorCatalogoPlanes({ nombre, url, estilo, alCerrar }: { nombre: string; url: string; estilo: EstiloSelectorPlanes; alCerrar: () => void }) {
  const [cargando, setCargando] = useState(true)

  const cabecera = (
    <div className="flex flex-none items-center gap-3 border-b border-borde bg-white px-4 py-3">
      <span className={`grid h-9 w-9 flex-none place-items-center rounded-lg ${estilo.relleno}`}>
        <Icono name="documento" className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="m-0 truncate text-titulo-banner text-texto">{nombre}</h2>
        <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-enlace-accion text-primario no-underline hover:underline">
          {textos.abrir_nueva} <Icono name="flecha-arriba-derecha" className="h-3 w-3" />
        </a>
      </div>
      <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} variant="discreto" size="default" onClick={alCerrar} />
    </div>
  )

  return (
    <Modal titulo={nombre} etiquetaCerrar={textos.cerrar} onCerrar={alCerrar} cabecera={cabecera} className="h-full max-w-240 rounded-2xl max-600:rounded-none">
      <div className="relative flex min-h-0 flex-1">
        {cargando && (
          <div className="absolute inset-0 grid place-items-center text-cuerpo text-texto-suave">
            <IndicadorCarga etiqueta={textos.cargando} />
          </div>
        )}
        <iframe src={url} title={textos.marco} onLoad={() => setCargando(false)} className="min-h-0 w-full flex-1 border-0" />
      </div>
    </Modal>
  )
}
