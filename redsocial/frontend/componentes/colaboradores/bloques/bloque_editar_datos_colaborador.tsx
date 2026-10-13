import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const textos = catalogoColaboradores.editar

export function BloqueEditarDatosColaborador({ colaborador }: { colaborador: Colaborador }) {
  return (
    <section>
      <h3 className="m-0 mb-2.5 text-nombre-entidad text-texto">{catalogoColaboradores.secciones.datos_del_colaborador}</h3>
      <div className="mb-3 flex items-center gap-3">
        <AvatarImagen src={usuarioImg} className="h-14 w-14 flex-none rounded-full bg-gris-borde" />
        <Boton type="button" variant="enlace" size="enlace">{textos.cambiar_foto}</Boton>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-etiqueta text-texto">{textos.nombre_completo} <span className="text-negativo-kpi">*</span></label>
          <CampoTexto defaultValue={colaborador.nombre} anchoCompleto />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-etiqueta text-texto">{catalogoColaboradores.campos.correo_electronico} <span className="text-negativo-kpi">*</span></label>
          <CampoTexto defaultValue={colaborador.correo} tipo="email" anchoCompleto />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-etiqueta text-texto">{textos.telefono}</label>
          <CampoTexto
            defaultValue={colaborador.telefono}
            tipo="tel"
            anchoCompleto
            iconoInicio={
              <Selector variant="integrado" defaultValue={catalogoColaboradores.selectores.codigo_pais.opciones[0]}>
                {catalogoColaboradores.selectores.codigo_pais.opciones.map((o) => <option key={o}>{o}</option>)}
              </Selector>
            }
          />
        </div>
      </div>
    </section>
  )
}
