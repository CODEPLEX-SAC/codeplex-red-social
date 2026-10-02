import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
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
        <AvatarImagen src={usuarioImg} className="h-14 w-14 flex-none rounded-full bg-gris-borde" />
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="m-0 text-cuerpo-grande font-extrabold text-gris-oscuro-texto">{colaborador.nombre}</h3>
            <Insignia variant="status" className={estado.insignia}>{estado.etiqueta}</Insignia>
          </div>
          <span className="text-campo-formulario font-medium text-gris-texto-secundario">{colaborador.rol}</span>
          <span className="text-auxiliar text-gris-texto-secundario">{colaborador.correo}</span>
          <span className="text-auxiliar text-gris-texto-secundario">{colaborador.telefono}</span>
        </div>
      </div>
      <Boton type="button" variant="primario" size="md" className="w-full" onClick={alEditar}>{catalogoColaboradores.botones.editar_colaborador}</Boton>
    </div>
  )
}
