import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { etiquetarCampo } from './manejadores_campo_colaborador'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { BorradorColaborador, CambiarBorrador } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const textos = catalogoColaboradores.editar

export function BloqueEditarVigenciaAcceso({ colaborador, borrador, alCambiar }: { colaborador: Colaborador; borrador: BorradorColaborador; alCambiar: CambiarBorrador }) {
  return (
    <section className="mt-4 border-t border-borde-suave pt-4">
      <h3 className="m-0 mb-2.5 text-nombre-entidad text-texto">{catalogoColaboradores.secciones.vigencia_y_acceso}</h3>
      <div className="grid grid-cols-2 gap-3">
        <CampoEtiquetado variante="compacta" etiqueta={textos.fecha_inicio} requerido>
          <CampoTexto valor={borrador.fechaInicio} alCambiar={(texto) => alCambiar('fechaInicio', texto)} inputProps={etiquetarCampo(textos.fecha_inicio)} anchoCompleto iconoFin={<Icono name="calendario" className="h-4 w-4" />} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" etiqueta={textos.fecha_fin} requerido>
          <CampoTexto valor={borrador.fechaFin} alCambiar={(texto) => alCambiar('fechaFin', texto)} inputProps={etiquetarCampo(textos.fecha_fin)} anchoCompleto iconoFin={<Icono name="calendario" className="h-4 w-4" />} />
        </CampoEtiquetado>
        {colaborador.fechaInvitacion && (
          <CampoEtiquetado variante="compacta" etiqueta={catalogoColaboradores.perfil.informacion_general.fecha_invitacion}>
            <CampoTexto defaultValue={colaborador.fechaInvitacion} soloLectura anchoCompleto iconoFin={<Icono name="calendario" className="h-4 w-4" />} />
          </CampoEtiquetado>
        )}
        {colaborador.ultimoAcceso && (
          <CampoEtiquetado variante="compacta" etiqueta={catalogoColaboradores.perfil.informacion_general.ultimo_acceso}>
            <CampoTexto defaultValue={colaborador.ultimoAcceso} soloLectura anchoCompleto iconoFin={<Icono name="reloj" className="h-4 w-4" />} />
          </CampoEtiquetado>
        )}
      </div>
    </section>
  )
}
