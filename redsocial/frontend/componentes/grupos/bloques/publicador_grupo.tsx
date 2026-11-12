import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { imagenPerfilPedroRedSocial } from '../../compartido/imagenes_red_social'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { PublicadorGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'
import type { TipoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

const publicar = catalogoGrupos.detalle.publicar
const clases = catalogoGrupos.clases.detalle
const TIPOS: Record<string, TipoPublicacion> = { foto: 'publicacion', encuesta: 'encuesta' }

export function PublicadorGrupo({ rol, alAccion, alAbrirPublicacion }: PublicadorGrupoProps) {
  const esMiembro = rol === 'miembro'
  const textos = esMiembro ? publicar.miembro : publicar
  const abrir = (clave: string, etiqueta: string) => {
    if (TIPOS[clave]) alAbrirPublicacion(TIPOS[clave])
    else alAccion(etiqueta)
  }

  return (
    <section className={clases.tarjeta}>
      <div className={clases.publicador_fila}>
        <AvatarUsuario tamano="md" imagen={imagenPerfilPedroRedSocial} />
        <Boton type="button" variant="fantasma" size="default" className={clases.publicador_campo} onClick={() => alAbrirPublicacion('publicacion')}>
          {textos.placeholder}
        </Boton>
      </div>
      <div className={clases.publicador_acciones}>
        {textos.acciones.map((accion) => (
          <Boton key={accion.clave} type="button" variant="fantasma" size="default" className={clases.publicador_accion} onClick={() => abrir(accion.clave, accion.etiqueta)}>
            <Icono name={accion.icono as IconName} className="h-4 w-4" /> {accion.etiqueta}
          </Boton>
        ))}
      </div>
    </section>
  )
}
