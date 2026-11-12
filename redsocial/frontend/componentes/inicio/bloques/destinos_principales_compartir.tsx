import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { DestinosPrincipalesProps } from '@/tipos/inicio/contrato_compartir_publicacion'

const textos = catalogoInicio.publicacion.compartir

export function DestinosPrincipalesCompartir({ alElegir }: DestinosPrincipalesProps) {
  return (
    <section aria-label={textos.compartir_en} className="flex flex-col gap-3 border-t border-borde pt-4">
      <h3 className="m-0 text-titulo-banner text-texto">{textos.compartir_en}</h3>
      <div className="grid grid-cols-4 gap-2 max-480:grid-cols-2">
        {textos.destinos.map((destino) => (
          <Boton
            key={destino.clave}
            type="button"
            variant="fantasma"
            size="default"
            aria-label={destino.etiqueta}
            className="group h-auto flex-col justify-start gap-2 rounded-control border-transparent px-1 py-3 hover:bg-fondo-hover-suave focus-visible:ring-1 focus-visible:ring-borde-flotante focus-visible:ring-offset-0"
            onClick={() => alElegir(destino.clave)}
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-fondo-hover-neutro text-texto transition-colors group-hover:bg-fondo-categoria-morado group-hover:text-primario">
              <Icono name={destino.icono as IconName} className="h-6 w-6" />
            </span>
            <span className="text-center text-auxiliar text-texto">{destino.etiqueta}</span>
          </Boton>
        ))}
      </div>
    </section>
  )
}
