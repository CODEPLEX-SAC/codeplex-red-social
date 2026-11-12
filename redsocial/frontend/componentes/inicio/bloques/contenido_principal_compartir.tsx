import { imagenPerfilPedroRedSocial } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import { DestinosPrincipalesCompartir } from './destinos_principales_compartir'
import { EditorPublicacion } from './editor_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ContenidoPrincipalCompartirProps } from '@/tipos/inicio/contrato_compartir_publicacion'

const textos = catalogoInicio.publicacion.compartir

export function ContenidoPrincipalCompartir({ comentario, simple, alCambiarComentario, alElegir, alCompartir }: ContenidoPrincipalCompartirProps) {
  const { usuario } = usarSesionDemostracion()

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
        <div className="flex items-center gap-3">
          <AvatarUsuario tamano="lg" imagen={imagenPerfilPedroRedSocial} estado="conectado" />
          <div className="min-w-0">
            <strong className="block truncate text-nombre-entidad text-texto">{usuario?.usuario}</strong>
            <span className="block text-auxiliar text-texto-suave">{textos.contexto}</span>
          </div>
        </div>
        <div className="shrink-0">
          <EditorPublicacion valor={comentario} marcador={textos.marcador} etiqueta={textos.etiqueta_campo} filasMinimas={3} onCambiar={alCambiarComentario} />
        </div>
        {!simple && <DestinosPrincipalesCompartir alElegir={alElegir} />}
      </div>
      <div className="border-t border-borde px-6 py-4">
        <Boton type="button" variant="primario" size="md" className="w-full justify-center" onClick={alCompartir}>
          {textos.confirmar}
        </Boton>
      </div>
    </>
  )
}
