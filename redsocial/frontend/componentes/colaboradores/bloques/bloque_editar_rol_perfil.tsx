import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const opcionesRol = catalogoColaboradores.selectores.rol_perfil.opciones.slice(1)

export function BloqueEditarRolPerfil({ colaborador }: { colaborador: Colaborador }) {
  return (
    <section className="mt-4 border-t border-borde-suave pt-4">
      <h3 className="m-0 mb-2.5 text-nombre-entidad text-texto">{catalogoColaboradores.secciones.rol_y_perfil}</h3>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-etiqueta text-texto">{catalogoColaboradores.secciones.rol_perfil_etiqueta} <span className="text-negativo-kpi">*</span></label>
          <Selector variant="colaboradores" defaultValue={colaborador.rol}>
            {opcionesRol.map((o) => <option key={o}>{o}</option>)}
          </Selector>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-etiqueta text-texto">{catalogoColaboradores.editar.descripcion_del_rol}</label>
          <CampoTexto defaultValue={colaborador.descripcionRol} soloLectura anchoCompleto />
        </div>
      </div>
    </section>
  )
}
