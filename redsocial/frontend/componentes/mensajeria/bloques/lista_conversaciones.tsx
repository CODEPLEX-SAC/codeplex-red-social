import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { clasesChip } from '../../compartido/interfaz/chip_filtro'
import { useLayoutEffect, useRef } from 'react'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Insignia } from '../../compartido/interfaz/insignia'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ListaConversacionesProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'

const clases = catalogoMensajeria.clases.lista

export function ListaConversaciones({ conversaciones, activa, onSeleccionar, oculta, contadorNoLeidos }: ListaConversacionesProps) {
  const pistaRef = useRef<HTMLDivElement>(null)
  const scrollGuardado = useRef(0)

  useLayoutEffect(() => {
    if (!oculta && pistaRef.current) {
      pistaRef.current.scrollTop = scrollGuardado.current
    }
  }, [oculta])

  function alSeleccionar(nombre: string) {
    if (pistaRef.current) scrollGuardado.current = pistaRef.current.scrollTop
    onSeleccionar(nombre)
  }

  return (
    <aside data-zona="lista-conversaciones" className={`${clases.contenedor} ${oculta ? clases.oculta : ''}`}>
      <CampoBusqueda placeholder={catalogoMensajeria.placeholders.buscar_mensajes} aria-label={catalogoMensajeria.placeholders.buscar_mensajes} className={clases.buscador} />

      <div className={clases.filtros}>
        <a href={catalogoMensajeria.rutas.todos} className={clasesChip({ activo: true, className: clases.chip })}>{catalogoMensajeria.titulos_pestanas.todos}</a>
        <a href={catalogoMensajeria.rutas.no_leidos} className={clasesChip({ className: clases.chip })}>
          {catalogoMensajeria.titulos_pestanas.no_leidos} <Insignia variant="counter" tamano="sm">{contadorNoLeidos}</Insignia>
        </a>
        <a href={catalogoMensajeria.rutas.favoritos} className={clasesChip({ className: clases.chip })}>{catalogoMensajeria.titulos_pestanas.favoritos}</a>
      </div>

      <div ref={pistaRef} className={clases.pista}>
        {conversaciones.map((c) => (
          <button
            key={c.nombre}
            type="button"
            onClick={() => alSeleccionar(c.nombre)}
            className={`${clases.fila} ${c.nombre === activa ? clases.fila_activa : clases.fila_inactiva}`}
          >
            {c.esGrupo ? (
              <AvatarUsuario tamano="md" icono="grupo" tono="solido" />
            ) : (
              <AvatarUsuario tamano="md" imagen={usuarioImg} />
            )}
            <span className={clases.texto}>
              <strong className={clases.nombre}>{c.nombre}</strong>
              <small className={clases.extracto}>{c.extracto}</small>
            </span>
            <span className={clases.meta}>
              <time className={clases.hora}>{c.hora}</time>
              {c.noLeidos !== undefined && <Insignia variant="counter">{c.noLeidos}</Insignia>}
              {c.silenciado && <Icono name="silenciado" className={clases.silenciado} />}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}
