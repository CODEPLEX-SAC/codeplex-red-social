import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { VistaPreviaMediosPublicacionProps } from '@/tipos/inicio/contrato_crear_publicacion'

const textos = catalogoInicio.modal_crear_publicacion.medios

function columnasPara(cantidad: number) {
  if (cantidad === 1) return 'grid-cols-1'
  if (cantidad === 2) return 'grid-cols-2'
  return 'grid-cols-3'
}

export function VistaPreviaMediosPublicacion({ medios, onQuitar }: VistaPreviaMediosPublicacionProps) {
  if (medios.length === 0) return null

  const unico = medios.length === 1
  const altoMedio = unico ? 'max-h-80 w-full object-contain' : 'h-36 w-full object-cover'

  return (
    <ul aria-label={textos.vista_previa} className={`m-0 grid list-none gap-0.5 overflow-hidden rounded-control border border-borde p-0 ${columnasPara(medios.length)}`}>
      {medios.map((medio, indice) => {
        const numero = String(indice + 1)
        return (
          <li key={medio.id} className="relative overflow-hidden bg-fondo">
            {medio.esVideo ? (
              <>
                <video src={medio.url} muted preload="metadata" aria-label={textos.texto_alternativo.replace(':numero', numero)} className={`block ${altoMedio}`} />
                <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/20 text-white">
                  <Icono name="video" className="h-8 w-8" />
                </span>
              </>
            ) : (
              <AvatarImagen src={medio.url} alt={textos.texto_alternativo.replace(':numero', numero)} className={`block ${altoMedio}`} />
            )}
            <BotonIcono
              icono="cerrar"
              type="button"
              aria-label={textos.quitar.replace(':numero', numero)}
              onClick={() => onQuitar(medio.id)}
              variant="flotante"
              size="md"
              className="absolute right-2 top-2"
            />
          </li>
        )
      })}
    </ul>
  )
}
