import { useState } from 'react'
import { imagenUsuarioPredeterminada } from '../../compartido'
import { Boton } from '../../compartido/interfaz/boton'
import { EnlacePerfilUsuario } from '../../compartido/interfaz/enlace_perfil_usuario'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { VisorMedios } from '../../compartido/interfaz/visor_medios'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PanelAmigosRedSocialProps, PanelDatosPersonalesPerfilProps, PanelFotosPerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.red_social
const clases = catalogoPerfil.clases.red_social

export function PanelDatosPersonalesPerfil({ perfil, propio, onIrA }: PanelDatosPersonalesPerfilProps) {
  const irAResumen = () => onIrA('resumen')
  const irAExperiencia = () => onIrA('experiencia')
  const lineas = [perfil.ubicacion, [perfil.titular, perfil.empresa].filter(Boolean).join(' · '), perfil.estudios].filter(Boolean)

  return (
    <section className={clases.tarjeta}>
      <h2 className={clases.titulo}>{textos.datos_personales}</h2>
      <ul className={clases.lista_datos}>
        {lineas.map((linea) => (
          <li key={linea}>{linea}</li>
        ))}
      </ul>
      <ul className={catalogoPerfil.clases.habilidades}>
        {perfil.habilidades.map((habilidad) => (
          <li key={habilidad} className={catalogoPerfil.clases.habilidad}>
            {habilidad}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {propio && (
          <Boton type="button" variant="enlace" size="enlace_accion" onClick={irAResumen}>
            {textos.editar_datos}
          </Boton>
        )}
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={irAExperiencia}>
          {textos.ver_experiencia}
        </Boton>
      </div>
    </section>
  )
}

export function PanelFotosPerfil({ fotos, nombre }: PanelFotosPerfilProps) {
  const [todas, setTodas] = useState(false)
  const [abierta, setAbierta] = useState<number | null>(null)
  const visibles = todas ? fotos : fotos.slice(0, textos.fotos_maximo)
  const alternarTodas = () => setTodas((actual) => !actual)
  const cerrarVisor = () => setAbierta(null)

  return (
    <section className={clases.tarjeta}>
      <div className={clases.cabecera_panel}>
        <h2 className={clases.titulo}>{textos.fotos}</h2>
        {fotos.length > textos.fotos_maximo && (
          <Boton type="button" variant="enlace" size="enlace_accion" aria-pressed={todas} onClick={alternarTodas}>
            {todas ? textos.ver_menos_fotos : textos.ver_todas_fotos}
          </Boton>
        )}
      </div>
      {fotos.length === 0 && <MensajeVacio texto={textos.sin_fotos} />}
      <ul className={clases.fotos}>
        {visibles.map((foto, indice) => (
          <li key={foto.id}>
            <Boton type="button" variant="fantasma" size="enlace" aria-label={textos.texto_foto.replace(':numero', String(indice + 1)).replace(':nombre', nombre)} onClick={() => setAbierta(indice)} className="block w-full p-0">
              <img src={foto.url} alt="" className={clases.foto} />
            </Boton>
          </li>
        ))}
      </ul>
      {abierta !== null && <VisorMedios items={fotos} indice={abierta} titulo={catalogoPerfil.foto.visor_titulo.replace(':nombre', nombre)} onCambiar={setAbierta} onCerrar={cerrarVisor} />}
    </section>
  )
}

export function PanelAmigosRedSocial({ amigos, onVerTodos }: PanelAmigosRedSocialProps) {
  const visibles = amigos.slice(0, textos.amigos_maximo)

  return (
    <section className={clases.tarjeta}>
      <div className={clases.cabecera_panel}>
        <div>
          <h2 className={clases.titulo}>{textos.amigos}</h2>
          <span className="text-auxiliar text-texto-suave">{`${amigos.length} ${amigos.length === 1 ? textos.amigo_singular : textos.amigo_plural}`}</span>
        </div>
        {amigos.length > 0 && (
          <Boton type="button" variant="enlace" size="enlace_accion" onClick={onVerTodos}>
            {textos.ver_todos}
          </Boton>
        )}
      </div>
      {amigos.length === 0 && <MensajeVacio texto={catalogoPerfil.mensajes.sin_amigos} />}
      <ul className={clases.amigos}>
        {visibles.map((amigo) => (
          <li key={amigo.id}>
            <EnlacePerfilUsuario autorId={amigo.id} className="flex flex-col gap-1.5">
              <img src={amigo.avatar || imagenUsuarioPredeterminada} alt="" className={clases.foto_amigo} />
              <span className="max-w-full truncate text-auxiliar text-texto">{amigo.nombre}</span>
            </EnlacePerfilUsuario>
          </li>
        ))}
      </ul>
    </section>
  )
}
