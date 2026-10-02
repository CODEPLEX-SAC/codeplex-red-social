import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import type { Aplicacion } from '@/tipos/colaboradores/modelo_colaboradores'

const textosMas = catalogoColaboradores.perfil.mas_aplicaciones

export function BloqueAplicacionesAsignadas({ aplicaciones, masApps }: { aplicaciones: Aplicacion[]; masApps?: number }) {
  return (
    <section className="mt-4 border-t border-t-f3f4f6 pt-4">
      <div className="mb-2.5 flex items-center gap-2">
        <h4 className="m-0 text-nombre-entidad font-semibold text-gris-oscuro-texto">{catalogoColaboradores.secciones.aplicaciones_titulo}</h4>
        <Insignia variant="counter">{aplicaciones.length + (masApps ?? 0)}</Insignia>
      </div>
      <ul className="m-0 grid list-none gap-2 p-0">
        {aplicaciones.map((app) => (
          <li key={app.nombre} className="flex items-center gap-2.5">
            <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-md ${app.clase}`}>
              <Icono name={app.icono} className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="text-campo-formulario text-gris-oscuro-texto">{app.nombre}</span>
          </li>
        ))}
        {masApps ? (
          <li className="text-campo-formulario font-medium text-gris-texto-secundario">{[textosMas.prefijo, masApps, textosMas.sufijo].join(' ')}</li>
        ) : null}
      </ul>
    </section>
  )
}
