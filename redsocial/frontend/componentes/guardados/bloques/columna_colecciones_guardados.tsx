import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { BannerOrganizaGuardados } from './banner_organiza_guardados'
import { etiquetaUnidad } from './menus_guardados'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { ColumnaColeccionesGuardadosProps } from '@/tipos/guardados/contrato_guardados'

const clases = catalogoGuardados.clases

export function ColumnaColeccionesGuardados({ control }: ColumnaColeccionesGuardadosProps) {
  const { navegacion, colecciones, acciones, total } = control
  const enTodos = navegacion.pestana === 'elementos'

  return (
    <div className={clases.columna}>
      <section className={clases.tarjeta}>
        <div className={clases.tarjeta_cabecera}>
          <h2 className={clases.tarjeta_titulo}>{catalogoGuardados.secciones.mis_colecciones}</h2>
        </div>
        <ul className={clases.colecciones_lista}>
          <li>
            <button type="button" aria-pressed={enTodos} className={[clases.coleccion_boton, enTodos ? clases.coleccion_activa : ''].join(' ')} onClick={navegacion.irATodos}>
              <span className={clases.coleccion_icono_activa}>
                <Icono name="guardado" className={clases.coleccion_icono_img} />
              </span>
              <span className={clases.coleccion_textos}>
                <span className={clases.coleccion_nombre}>{catalogoGuardados.secciones.todos_grupos}</span>
                <span className={clases.coleccion_cantidad}>
                  {total} {etiquetaUnidad(total)}
                </span>
              </span>
            </button>
          </li>
          {colecciones.colecciones.map((coleccion) => (
            <li key={coleccion.id}>
              <button type="button" aria-pressed={navegacion.abiertaId === coleccion.id} className={[clases.coleccion_boton, navegacion.abiertaId === coleccion.id ? clases.coleccion_activa : ''].join(' ')} onClick={() => navegacion.abrirColeccion(coleccion.id)}>
                <SuperficieColor variante={coleccion.color} className={clases.coleccion_icono}>
                  <Icono name={coleccion.icono} className={clases.coleccion_icono_img} />
                </SuperficieColor>
                <span className={clases.coleccion_textos}>
                  <span className={clases.coleccion_nombre}>{coleccion.nombre}</span>
                  <span className={clases.coleccion_cantidad}>
                    {coleccion.grupos.length} {etiquetaUnidad(coleccion.grupos.length)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => navegacion.cambiarPestana('colecciones')}>
          {catalogoGuardados.botones.ver_todas}
        </Boton>
      </section>
      <BannerOrganizaGuardados alCrear={() => acciones.abrir({ tipo: 'crear' })} />
    </div>
  )
}
