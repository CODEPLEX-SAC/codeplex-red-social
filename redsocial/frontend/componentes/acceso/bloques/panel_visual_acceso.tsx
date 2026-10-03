import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { usarCarruselAcceso } from './usar_carrusel_acceso'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import type { PanelVisualAccesoProps } from '@/tipos/acceso/contrato_acceso'

const textos = catalogoAcceso.carrusel

export function PanelVisualAcceso({ obtenerUrlImagen }: PanelVisualAccesoProps) {
  const carrusel = usarCarruselAcceso(textos.imagenes.length, textos.intervalo_ms)
  const total = String(textos.imagenes.length)
  const contador = textos.contador.replace(':actual', String(carrusel.actual + 1)).replace(':total', total)

  return (
    <section
      aria-label={textos.etiqueta}
      onMouseEnter={carrusel.pausar}
      onMouseLeave={carrusel.reanudar}
      onFocus={carrusel.pausar}
      onBlur={carrusel.reanudar}
      className="relative flex-1 overflow-hidden bg-texto max-800:hidden"
    >
      {textos.imagenes.map((imagen, indice) => (
        <img
          key={imagen.archivo}
          src={obtenerUrlImagen(imagen.archivo)}
          alt={imagen.descripcion}
          aria-hidden={indice !== carrusel.actual}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-900 motion-reduce:transition-none ${
            indice === carrusel.actual ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-1.5">
            {textos.imagenes.map((imagen, indice) => (
              <button
                key={imagen.archivo}
                type="button"
                aria-label={textos.ir_a_imagen.replace(':numero', String(indice + 1))}
                aria-current={indice === carrusel.actual}
                onClick={() => carrusel.irA(indice)}
                className={`h-1 cursor-pointer rounded-full border-0 p-0 transition-all ${
                  indice === carrusel.actual ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
          <span className="text-auxiliar font-semibold text-white/80">{contador}</span>
        </div>
        <div className="flex gap-2">
          <BotonIcono icono="flecha-izquierda" type="button" aria-label={textos.anterior} onClick={carrusel.anterior} variant="flotante" size="default" />
          <BotonIcono icono="flecha-derecha" type="button" aria-label={textos.siguiente} onClick={carrusel.siguiente} variant="flotante" size="default" />
        </div>
      </div>
    </section>
  )
}
