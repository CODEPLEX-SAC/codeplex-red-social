import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { Insignia } from '../../compartido/interfaz/insignia'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const clases = catalogoColaboradores.clases.detalle
const coloresEstado: Record<string, { texto: string; punto: string; insignia: string }> = catalogoColaboradores.clases.estado_color
const etiquetasEstado: Record<string, string> = catalogoColaboradores.estados

export function BloqueIdentidadColaborador({
  colaborador,
  alEditar,
}: {
  colaborador: Colaborador
  alEditar: () => void
}) {
  return (
    <div>
      <div className={clases.identidad}>
        <AvatarUsuario tamano="lg" imagen={usuarioImg} />
        <div className={clases.identidad_textos}>
          <div className={clases.identidad_encabezado}>
            <h3 className={clases.identidad_nombre}>{colaborador.nombre}</h3>
            <Insignia variant="status" className={coloresEstado[colaborador.estado].insignia}>{etiquetasEstado[colaborador.estado]}</Insignia>
          </div>
          <span className={clases.identidad_rol}>{colaborador.rol}</span>
          <span className={clases.identidad_contacto}>{colaborador.correo}</span>
          <span className={clases.identidad_contacto}>{colaborador.telefono}</span>
        </div>
      </div>
      <Boton type="button" variant="primario" size="md" className={clases.identidad_accion} onClick={alEditar}>{catalogoColaboradores.botones.editar_colaborador}</Boton>
    </div>
  )
}
