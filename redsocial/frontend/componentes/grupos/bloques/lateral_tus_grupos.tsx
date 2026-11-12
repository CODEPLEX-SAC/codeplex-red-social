import { Icono } from '../../compartido/icono'
import { clasesBoton } from '../../compartido/interfaz/boton'
import { TarjetaLateralGrupos } from './tarjeta_lateral_grupos'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { LateralTusGruposProps } from '@/tipos/grupos/contrato_lateral_grupos'

const textos = catalogoGrupos.lateral.tus_grupos
const clases = catalogoGrupos.clases.pagina_lateral
const TONOS: Record<string, string> = catalogoCompartido.tarjeta_indicador_icono_color

export function LateralTusGrupos({ grupos }: LateralTusGruposProps) {
  const recientes = grupos.slice(0, textos.actividad.items.length)

  return (
    <>
      <TarjetaLateralGrupos titulo={textos.informacion.titulo} texto={textos.informacion.texto} icono="grupos" />
      <section aria-label={textos.actividad.titulo} className={clases.tarjeta}>
        <div className={clases.cabecera_fila}>
          <h2 className={clases.titulo}>{textos.actividad.titulo}</h2>
          <a href={catalogoGrupos.rutas.mis_grupos} className={clasesBoton({ variant: 'enlace', size: 'enlace_accion' })}>
            {textos.actividad.ver_todo}
          </a>
        </div>
        <ul className={clases.lista}>
          {recientes.map((grupo, indice) => (
            <li key={grupo.id} className={clases.fila}>
              <span className={[clases.fila_icono, TONOS[textos.actividad.items[indice].tono]].join(' ')}>
                <Icono name={textos.actividad.items[indice].icono as IconName} className={clases.icono} />
              </span>
              <span className={clases.fila_textos}>
                <strong className={clases.fila_titulo}>{grupo.nombre}</strong>
                <span className={clases.fila_detalle}>{textos.actividad.items[indice].detalle}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <TarjetaLateralGrupos titulo={textos.descubrir.titulo} texto={textos.descubrir.texto} icono="mundo" variante="suave">
        <a href={catalogoGrupos.rutas.invitaciones} className={clasesBoton({ variant: 'contorno', size: 'md', className: clases.boton_ancho })}>
          {textos.descubrir.boton}
        </a>
      </TarjetaLateralGrupos>
    </>
  )
}
