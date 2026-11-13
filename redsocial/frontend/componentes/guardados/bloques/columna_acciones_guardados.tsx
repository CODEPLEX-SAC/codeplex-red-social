import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { compartirColeccion } from './menus_guardados'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { ColumnaAccionesGuardadosProps } from '@/tipos/guardados/contrato_guardados'
import type { IconName } from '@/tipos/compartido/contrato_icono'

const clases = catalogoGuardados.clases
const ACCIONES = catalogoGuardados.acciones_rapidas

export function ColumnaAccionesGuardados({ control }: ColumnaAccionesGuardadosProps) {
  const { navegacion, acciones, coleccionAbierta } = control
  const irAColecciones = () => navegacion.cambiarPestana('colecciones')
  const alCompartir = () => (coleccionAbierta ? acciones.abrir(compartirColeccion(coleccionAbierta)) : irAColecciones())
  const alHacerClick: Record<string, () => void> = { nueva: () => acciones.abrir({ tipo: 'crear' }), compartir: alCompartir, administrar: irAColecciones }

  return (
    <div className={clases.columna}>
      <section className={clases.banner}>
        <span className={clases.banner_icono}>
          <Icono name="guardados" className="h-5 w-5" />
        </span>
        <h2 className={clases.banner_titulo}>{catalogoGuardados.banner_lateral.titulo}</h2>
        <p className={clases.banner_texto}>{catalogoGuardados.banner_lateral.descripcion}</p>
      </section>

      <section className={clases.tarjeta}>
        <div className={clases.tarjeta_cabecera}>
          <h2 className={clases.tarjeta_titulo}>{catalogoGuardados.secciones.acciones_rapidas}</h2>
        </div>
        <ul className={clases.acciones_lista}>
          {ACCIONES.map((accion) => (
            <li key={accion.clave}>
              <Boton type="button" variant="fantasma" size="default" className={clases.accion} onClick={alHacerClick[accion.clave]}>
                <span className={clases.accion_icono}>
                  <Icono name={accion.icono as IconName} className="h-4 w-4" />
                </span>
                <span className={clases.accion_textos}>
                  <span className={clases.accion_etiqueta}>{accion.etiqueta}</span>
                  <span className={clases.accion_descripcion}>{accion.descripcion}</span>
                </span>
              </Boton>
            </li>
          ))}
        </ul>
      </section>

      <section className={clases.consejo}>
        <Icono name="idea" className={clases.consejo_icono} />
        <div className={clases.consejo_textos}>
          <h2 className={clases.consejo_titulo}>{catalogoGuardados.secciones.consejo}</h2>
          <p className={clases.consejo_texto}>{catalogoGuardados.secciones.consejo_texto}</p>
        </div>
      </section>
    </div>
  )
}
