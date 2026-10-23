import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { Insignia } from '../../compartido/interfaz/insignia'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

export function BloqueIdentidadColaborador({
  colaborador,
  estado,
  alEditar,
}: {
  colaborador: Colaborador
  estado: { insignia: string; etiqueta: string }
  alEditar: () => void
}) {
  return (
    <div>
      <div className="mb-4 flex items-start gap-3">
        <AvatarUsuario tamano="lg" imagen={usuarioImg} />
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="m-0 text-cuerpo-grande text-texto">{colaborador.nombre}</h3>
            <Insignia variant="status" className={estado.insignia}>{estado.etiqueta}</Insignia>
          </div>
          <span className="text-campo-formulario text-texto-suave">{colaborador.rol}</span>
          <span className="text-auxiliar text-texto-suave">{colaborador.correo}</span>
          <span className="text-auxiliar text-texto-suave">{colaborador.telefono}</span>
        </div>
      </div>
      <Boton type="button" variant="primario" size="md" className="w-full" onClick={alEditar}>{catalogoColaboradores.botones.editar_colaborador}</Boton>
    </div>
  )
}
