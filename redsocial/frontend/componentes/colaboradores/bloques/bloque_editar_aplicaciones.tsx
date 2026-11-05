import { Casilla } from '../../compartido/interfaz/casilla'
import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Aplicacion } from '@/tipos/colaboradores/modelo_colaboradores'
import type { BorradorColaborador, CambiarBorrador } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const clases = catalogoColaboradores.clases.edicion
const detalle = catalogoColaboradores.clases.detalle
const chips = catalogoColaboradores.clases.tabla_aplicaciones
const coloresAplicacion: Record<string, string> = catalogoColaboradores.clases.aplicacion_color

export function BloqueEditarAplicaciones({ borrador, disponibles, alCambiar }: { borrador: BorradorColaborador; disponibles: Aplicacion[]; alCambiar: CambiarBorrador }) {
  function alternar(nombre: string, marcado: boolean) {
    const resto = borrador.aplicaciones.filter((actual) => actual !== nombre)
    alCambiar('aplicaciones', marcado ? [...resto, nombre] : resto)
  }

  return (
    <section className={detalle.seccion}>
      <h3 className={clases.titulo_seccion_con_subtitulo}>{catalogoColaboradores.secciones.aplicaciones_titulo}</h3>
      <p className={clases.subtitulo_seccion}>{catalogoColaboradores.editar.aplicaciones_subtitulo}</p>
      <ul className={detalle.lista_aplicaciones}>
        {disponibles.map((app) => (
          <li key={app.nombre} className={detalle.aplicacion_fila}>
            <Casilla seleccionado={borrador.aplicaciones.includes(app.nombre)} alCambiar={(_, marcado) => alternar(app.nombre, marcado)} inputProps={{ 'aria-label': app.nombre }} />
            <span className={`${chips.icono_caja} ${coloresAplicacion[app.nombre]}`}>
              <Icono name={app.icono} className={chips.glifo} />
            </span>
            <span className={detalle.aplicacion_nombre}>{app.nombre}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
