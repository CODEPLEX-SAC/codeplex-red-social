import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { BannerOrganizaGuardadosProps } from '@/tipos/guardados/contrato_guardados'

const clases = catalogoGuardados.clases

export function BannerOrganizaGuardados({ alCrear, horizontal = false }: BannerOrganizaGuardadosProps) {
  return (
    <section className={horizontal ? clases.banner_organiza : clases.organiza}>
      <span className={clases.organiza_icono}>
        <Icono name="guardados" className="h-6 w-6" />
      </span>
      <div className={horizontal ? clases.banner_organiza_textos : undefined}>
        <h2 className={clases.organiza_titulo}>{catalogoGuardados.secciones.organiza_titulo}</h2>
        <p className={clases.organiza_texto}>{catalogoGuardados.secciones.organiza_texto}</p>
      </div>
      <Boton type="button" variant="contorno" size="md" className={horizontal ? undefined : clases.boton_ancho} onClick={alCrear}>
        <Icono name="mas" className="h-4 w-4" /> {catalogoGuardados.botones.crear_coleccion}
      </Boton>
    </section>
  )
}
