import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { FilaColeccionGuardada } from './fila_coleccion_guardada'
import { filtrarColeccionesPorNombre } from './logica_colecciones_guardados'
import { accionesDeColeccion } from './menus_guardados'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { VistaColeccionesGuardadasProps } from '@/tipos/guardados/contrato_guardados'

const clases = catalogoGuardados.clases

export function VistaColeccionesGuardadas({ control, texto }: VistaColeccionesGuardadasProps) {
  const visibles = filtrarColeccionesPorNombre(control.colecciones.colecciones, texto)

  return (
    <section className={clases.columna}>
      <h2 className={clases.lista_titulo}>{catalogoGuardados.secciones.mis_colecciones_total.replace(':n', String(visibles.length))}</h2>
      {visibles.length === 0 && <MensajeVacio texto={catalogoGuardados.vacios.colecciones} className={clases.vacio} />}
      <ul className={clases.colecciones_lista}>
        {visibles.map((coleccion) => (
          <FilaColeccionGuardada key={coleccion.id} coleccion={coleccion} acciones={accionesDeColeccion(control, coleccion)} alAbrir={() => control.navegacion.abrirColeccion(coleccion.id)} />
        ))}
      </ul>
    </section>
  )
}
