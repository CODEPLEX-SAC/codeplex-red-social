import { useState } from 'react'
import { imagenUsuarioPredeterminada } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { normalizarTexto } from '../../compartido/interfaz/buscar_opciones_locales'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { EnlacePerfilUsuario } from '../../compartido/interfaz/enlace_perfil_usuario'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PestanaAmigosPerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.amigos
const clases = catalogoPerfil.clases

export function PestanaAmigosPerfil({ amigos }: PestanaAmigosPerfilProps) {
  const [consulta, setConsulta] = useState('')
  const termino = normalizarTexto(consulta)
  const visibles = termino ? amigos.filter((amigo) => normalizarTexto(amigo.nombre).includes(termino)) : amigos
  const sinAmigos = amigos.length === 0
  const sinResultados = !sinAmigos && visibles.length === 0

  return (
    <section className={clases.seccion}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 text-titulo-banner text-texto">{textos.titulo}</h2>
        <CampoBusqueda
          value={consulta}
          onChange={(evento) => setConsulta(evento.target.value)}
          placeholder={catalogoPerfil.campos.buscar_amigos}
          aria-label={catalogoPerfil.campos.buscar_amigos}
          className="w-70 max-600:w-full"
        />
      </div>
      {sinAmigos && <MensajeVacio texto={catalogoPerfil.mensajes.sin_amigos} />}
      {sinResultados && <MensajeVacio texto={catalogoPerfil.mensajes.sin_resultados_amigos} />}
      {visibles.length !== 0 && (
        <ul aria-label={textos.etiqueta_lista} className={clases.amigos}>
          {visibles.map((amigo) => (
            <li key={amigo.id}>
              <EnlacePerfilUsuario autorId={amigo.id} className={clases.amigo}>
                <AvatarUsuario tamano="md" imagen={imagenUsuarioPredeterminada} />
                <span className="min-w-0 flex-1">
                  <strong className="block truncate text-nombre-entidad text-texto">{amigo.nombre}</strong>
                  <span className="block truncate text-auxiliar text-texto-suave">{amigo.titular}</span>
                </span>
              </EnlacePerfilUsuario>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
