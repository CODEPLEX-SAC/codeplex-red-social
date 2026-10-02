import { useState } from 'react'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador, Aplicacion } from '@/tipos/colaboradores/modelo_colaboradores'

export function BloqueEditarAplicaciones({ colaborador, disponibles }: { colaborador: Colaborador; disponibles: Aplicacion[] }) {
  const [seleccionadas, setSeleccionadas] = useState(() => new Set(colaborador.aplicaciones.map((a) => a.nombre)))

  function alternar(nombre: string, marcado: boolean) {
    setSeleccionadas((actual) => {
      const siguiente = new Set(actual)
      if (marcado) siguiente.add(nombre)
      else siguiente.delete(nombre)
      return siguiente
    })
  }

  return (
    <section className="mt-4 border-t border-t-f3f4f6 pt-4">
      <h4 className="m-0 mb-1 text-nombre-entidad font-semibold text-gris-oscuro-texto">{catalogoColaboradores.secciones.aplicaciones_titulo}</h4>
      <p className="m-0 mb-2.5 text-auxiliar text-gris-texto-secundario">{catalogoColaboradores.editar.aplicaciones_subtitulo}</p>
      <ul className="m-0 grid list-none gap-2 p-0">
        {disponibles.map((app) => (
          <li key={app.nombre} className="flex items-center gap-2.5">
            <Casilla seleccionado={seleccionadas.has(app.nombre)} alCambiar={(_, marcado) => alternar(app.nombre, marcado)} />
            <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-md ${app.clase}`}>
              <Icono name={app.icono} className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="text-campo-formulario text-gris-oscuro-texto">{app.nombre}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
