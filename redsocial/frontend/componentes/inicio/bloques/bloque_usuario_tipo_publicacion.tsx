import { imagenUsuarioPredeterminada } from '../../compartido'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { BloqueUsuarioTipoPublicacionProps, TipoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

const textos = catalogoInicio.modal_crear_publicacion

export function BloqueUsuarioTipoPublicacion({ tipo, onCambiar }: BloqueUsuarioTipoPublicacionProps) {
  return (
    <div className="flex items-center gap-3">
      <AvatarImagen src={imagenUsuarioPredeterminada} className="h-10 w-10 flex-none rounded-full bg-primario-suave" />
      <div className="flex min-w-0 flex-col gap-1.5">
        <strong className="text-nombre-entidad text-texto">{catalogoCompartido.sesion_actual.usuario}</strong>
        <div role="group" aria-label={textos.etiqueta_tipos} className="flex flex-wrap gap-1.5">
          {textos.tipos.map((opcion) => (
            <Boton
              key={opcion.valor}
              type="button"
              variant="filtro"
              size="mini"
              activo={tipo === opcion.valor}
              aria-pressed={tipo === opcion.valor}
              onClick={() => onCambiar(opcion.valor as TipoPublicacion)}
              className="rounded-full"
            >
              {opcion.etiqueta}
            </Boton>
          ))}
        </div>
      </div>
    </div>
  )
}
