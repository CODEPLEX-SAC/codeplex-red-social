import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const textos = catalogoColaboradores.editar

export function BloqueEditarVigenciaAcceso({ colaborador }: { colaborador: Colaborador }) {
  const { vigencia } = colaborador
  const inicio = vigencia.tipo === 'rango' ? vigencia.desde : vigencia.fecha
  const fin = vigencia.tipo === 'rango' ? vigencia.hasta : undefined

  return (
    <section className="mt-4 border-t border-t-f3f4f6 pt-4">
      <h4 className="m-0 mb-2.5 text-nombre-entidad font-semibold text-gris-oscuro-texto">{catalogoColaboradores.secciones.vigencia_y_acceso}</h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-campo-formulario font-medium text-gris-texto">{textos.fecha_inicio} <span className="text-negativo-kpi">*</span></label>
          <CampoTexto defaultValue={inicio} anchoCompleto iconoFin={<Icono name="calendario" className="h-4 w-4" />} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-campo-formulario font-medium text-gris-texto">{textos.fecha_fin} <span className="text-negativo-kpi">*</span></label>
          <CampoTexto defaultValue={fin} anchoCompleto iconoFin={<Icono name="calendario" className="h-4 w-4" />} />
        </div>
        {colaborador.fechaInvitacion && (
          <div className="flex flex-col gap-1">
            <label className="text-campo-formulario font-medium text-gris-texto">{catalogoColaboradores.perfil.informacion_general.fecha_invitacion}</label>
            <CampoTexto defaultValue={colaborador.fechaInvitacion} soloLectura anchoCompleto iconoFin={<Icono name="calendario" className="h-4 w-4" />} />
          </div>
        )}
        {colaborador.ultimoAcceso && (
          <div className="flex flex-col gap-1">
            <label className="text-campo-formulario font-medium text-gris-texto">{catalogoColaboradores.perfil.informacion_general.ultimo_acceso}</label>
            <CampoTexto defaultValue={colaborador.ultimoAcceso} soloLectura anchoCompleto iconoFin={<Icono name="reloj" className="h-4 w-4" />} />
          </div>
        )}
      </div>
    </section>
  )
}
