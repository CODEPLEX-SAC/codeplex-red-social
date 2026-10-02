import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Boton } from '../../compartido/interfaz/boton'

export function BloqueColaborador2({
  RESUMEN_COLABORADOR,
}: {
  RESUMEN_COLABORADOR: { iniciales: string; nombreCompleto: string; correo: string; telefono: string; }
}) {
  return (
    <div className="mb-4 rounded-xl border border-gris-borde px-5 py-4.5">
      <div className="mb-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icono name="nuevo-usuario" className="w-5 h-5 text-primario" />
          <h4 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_resumen.colaborador}</h4>
        </div>
        <Boton type="button" variant="secundario" size="mini">
          {catalogoColaboradores.campos_resumen.editar}
        </Boton>
      </div>
      <div className="flex items-center gap-3.5">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-t-ede9fe text-nombre-entidad font-bold text-primario">{RESUMEN_COLABORADOR.iniciales}</div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-nombre-entidad font-bold text-gris-oscuro-texto">{RESUMEN_COLABORADOR.nombreCompleto}</span>
          <span className="text-auxiliar text-gris-texto-secundario">{RESUMEN_COLABORADOR.correo}</span>
          <span className="flex items-center gap-1 text-auxiliar text-gris-texto-secundario">
            <Icono name="llamada" className="w-3.5 h-3.5 text-positivo-kpi" /> {RESUMEN_COLABORADOR.telefono}
          </span>
        </div>
      </div>
    </div>
  )
}
