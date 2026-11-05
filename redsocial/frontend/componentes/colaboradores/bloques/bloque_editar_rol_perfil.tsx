import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { Selector } from '../../compartido/interfaz/selector'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { BorradorColaborador, CambiarBorrador } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const opcionesRol = catalogoColaboradores.selectores.rol_perfil.opciones.slice(1)
const clases = catalogoColaboradores.clases.edicion
const detalle = catalogoColaboradores.clases.detalle

export function BloqueEditarRolPerfil({ borrador, descripcionRol, alCambiar }: { borrador: BorradorColaborador; descripcionRol: string; alCambiar: CambiarBorrador }) {
  return (
    <section className={detalle.seccion}>
      <h3 className={detalle.titulo_seccion}>{catalogoColaboradores.secciones.rol_y_perfil}</h3>
      <div className={clases.campos_columna}>
        <CampoEtiquetado variante="compacta" etiqueta={catalogoColaboradores.secciones.rol_perfil_etiqueta} requerido>
          <Selector variant="colaboradores" aria-label={catalogoColaboradores.secciones.rol_perfil_etiqueta} value={borrador.rol} onChange={(evento) => alCambiar('rol', String(evento.target.value))}>
            {opcionesRol.map((o) => <option key={o}>{o}</option>)}
          </Selector>
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" etiqueta={catalogoColaboradores.editar.descripcion_del_rol}>
          <CampoTexto valor={descripcionRol} soloLectura anchoCompleto />
        </CampoEtiquetado>
      </div>
    </section>
  )
}
