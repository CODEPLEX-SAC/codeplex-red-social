import { imagenPerfilPedroRedSocial } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import { LienzoHistoria } from './lienzo_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { FlujoHistoriaProps } from '@/tipos/inicio/contrato_historia'

const textos = catalogoInicio.historias.flujo.vista_previa
const clases = catalogoInicio.historias.flujo.clases

export function VistaPreviaHistoria({ flujo }: FlujoHistoriaProps) {
  const { usuario } = usarSesionDemostracion()

  return (
    <>
      <div className={clases.cuerpo_vista}>
        <h3 className={clases.titulo_vista}>{textos.encabezado}</h3>
        <div className={clases.autor_previo}>
          <AvatarUsuario tamano="xs" imagen={imagenPerfilPedroRedSocial} />
          <strong className={clases.nombre_previo}>{usuario?.usuario}</strong>
        </div>
        <LienzoHistoria borrador={flujo.borrador} />
      </div>
      <div className={clases.acciones}>
        <Boton type="button" variant="secundario" size="md" onClick={flujo.volverAEditar}>
          {textos.volver_a_editar}
        </Boton>
        <Boton type="button" variant="secundario" size="md" onClick={flujo.pedirCerrar}>
          {textos.cancelar}
        </Boton>
        <Boton type="button" variant="primario" size="md" onClick={flujo.publicar}>
          {textos.publicar}
        </Boton>
      </div>
    </>
  )
}
