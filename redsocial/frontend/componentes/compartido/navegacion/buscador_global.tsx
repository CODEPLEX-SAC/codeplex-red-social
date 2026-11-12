import { imagenRedSocialDe } from '../imagenes_red_social'
import { AvatarUsuario } from '../interfaz/avatar_usuario'
import { CampoBusqueda } from '../interfaz/campo_busqueda'
import { EnlacePerfilUsuario } from '../interfaz/enlace_perfil_usuario'
import { resaltarNombre } from './logica_buscador_global'
import { usarBuscadorGlobal } from './usar_buscador_global'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { FocusEvent, KeyboardEvent } from 'react'

const textos = catalogoCompartido.buscador_global
const clases = textos.clases

export function BuscadorGlobal() {
  const buscador = usarBuscadorGlobal()

  function alPerderFoco(evento: FocusEvent<HTMLDivElement>) {
    if (!evento.currentTarget.contains(evento.relatedTarget)) buscador.cerrar()
  }

  function alPulsarTecla(evento: KeyboardEvent<HTMLDivElement>) {
    if (evento.key === textos.tecla_cerrar) buscador.cerrar()
  }

  return (
    <div className={clases.contenedor} onFocus={buscador.abrir} onBlur={alPerderFoco} onKeyDown={alPulsarTecla}>
      <CampoBusqueda placeholder={textosRedSocial.BUSCAR_EN_CODEPLEX} aria-label={textosRedSocial.BUSCAR} value={buscador.texto} onChange={(evento) => buscador.cambiarTexto(evento.target.value)} />
      {buscador.abierto && (
        <ul aria-label={textos.etiqueta_resultados} className={clases.panel}>
          {buscador.resultados.length === 0 && <li className={clases.vacio}>{textos.sin_resultados}</li>}
          {buscador.resultados.map((usuario) => {
            const nombre = resaltarNombre(usuario.nombre, buscador.texto)
            return (
              <li key={usuario.id}>
                <EnlacePerfilUsuario autorId={usuario.id} className={clases.fila}>
                  <AvatarUsuario tamano="md" imagen={usuario.avatar || imagenRedSocialDe(usuario.id)} />
                  <span className={clases.cuerpo}>
                    <span className={clases.nombre}>
                      {nombre.coincidencia}
                      <strong>{nombre.resto}</strong>
                    </span>
                    <span className={clases.detalle}>{usuario.titular}</span>
                  </span>
                </EnlacePerfilUsuario>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
