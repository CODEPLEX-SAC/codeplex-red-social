import { Casilla } from '../../compartido/interfaz/casilla'
import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Aplicacion } from '@/tipos/colaboradores/modelo_colaboradores'
import type { BorradorColaborador, CambiarBorrador } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

export function BloqueEditarAplicaciones({ borrador, disponibles, alCambiar }: { borrador: BorradorColaborador; disponibles: Aplicacion[]; alCambiar: CambiarBorrador }) {
  function alternar(nombre: string, marcado: boolean) {
    const resto = borrador.aplicaciones.filter((actual) => actual !== nombre)
    alCambiar('aplicaciones', marcado ? [...resto, nombre] : resto)
  }

  return (
    <section className="mt-4 border-t border-borde-suave pt-4">
      <h3 className="m-0 mb-1 text-nombre-entidad text-texto">{catalogoColaboradores.secciones.aplicaciones_titulo}</h3>
      <p className="m-0 mb-2.5 text-auxiliar text-texto-suave">{catalogoColaboradores.editar.aplicaciones_subtitulo}</p>
      <ul className="m-0 grid list-none gap-2 p-0">
        {disponibles.map((app) => (
          <li key={app.nombre} className="flex items-center gap-2.5">
            <Casilla seleccionado={borrador.aplicaciones.includes(app.nombre)} alCambiar={(_, marcado) => alternar(app.nombre, marcado)} inputProps={{ 'aria-label': app.nombre }} />
            <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-md ${app.clase}`}>
              <Icono name={app.icono} className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="text-campo-formulario text-texto">{app.nombre}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
