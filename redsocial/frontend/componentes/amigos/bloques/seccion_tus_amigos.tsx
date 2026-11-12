import { useMemo, useState } from 'react'
import { EncabezadoAmigos } from './encabezado_amigos'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import { PestanasAmigos } from './pestanas_amigos'
import { CampoBusqueda, usarBusqueda, MensajeEstadoBusqueda, Selector, BotonPieLista, Icono, coincideNombre, crearFuenteLocal } from '../../compartido'
import { BloqueMensaje } from './bloque_mensaje'
import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { Amigo, FiltrosAmigos } from '@/tipos/amigos/modelo_amigos_todos'

const clases = catalogoAmigos.clases

const TODOS = 'todos'
const LIMITE = catalogoAmigos.limite_amigos_visibles

function admiteAmigo(amigo: Amigo, { estado }: FiltrosAmigos): boolean {
  return estado === TODOS || (estado === 'en_linea' ? amigo.enLinea === true : amigo.enLinea !== true)
}

export function SeccionTusAmigos({
  RESUMEN,
  AMIGOS,
  fuente,
  insigniaSolicitudes,
  alMensaje,
}: {
  RESUMEN: { icono: string; peligro?: boolean | undefined; etiqueta: string; valor: string; }[]
  AMIGOS: Amigo[]
  fuente?: FuenteBusqueda<Amigo, FiltrosAmigos> | undefined
  insigniaSolicitudes?: number | undefined
  alMensaje?: ((nombre: string) => void) | undefined
}) {
  const [estado, setEstado] = useState(TODOS)
  const filtros = useMemo<FiltrosAmigos>(() => ({ estado }), [estado])
  const fuenteLocal = useMemo(() => crearFuenteLocal(AMIGOS, coincideNombre, admiteAmigo), [AMIGOS])
  const busqueda = usarBusqueda(fuente ?? fuenteLocal, { modo: fuente ? 'remota' : 'local', filtros })
  const [expandida, setExpandida] = useState(false)
  const coincidentes = busqueda.resultado.elementos
  const visibles = coincidentes.slice(0, expandida ? coincidentes.length : LIMITE)

  return (
    <section className={clases.tarjeta_pagina}>
      <EncabezadoAmigos />
      <PestanasAmigos activa="todos" insigniaSolicitudes={insigniaSolicitudes} />

      <div className={clases.filtros.fila}>
        <CampoBusqueda
          placeholder={catalogoAmigos.placeholders.buscar_amigos}
          aria-label={catalogoAmigos.placeholders.buscar_amigos}
          value={busqueda.texto}
          onChange={(evento) => busqueda.cambiarTexto(evento.target.value)}
          className={clases.filtros.buscador}
        />
        <Selector variant="default" value={estado} onChange={(evento) => setEstado(evento.target.value)} aria-label={catalogoAmigos.botones.filtrar_amigos} className={clases.filtros.selector}>
          <option value={TODOS}>{catalogoAmigos.botones.todos_los_amigos}</option>
          <option value="en_linea">{catalogoAmigos.botones.amigos_en_linea}</option>
          <option value="desconectados">{catalogoAmigos.botones.amigos_desconectados}</option>
        </Selector>
      </div>

      <div className={clases.resumen.rejilla}>
        {RESUMEN.map((r) => (
          <article key={r.etiqueta} className={clases.resumen.tarjeta}>
            <span className={`${clases.resumen.icono} ${r.peligro ? clases.resumen.icono_peligro : clases.resumen.icono_normal}`}>
              <Icono name={r.icono} className="h-4 w-4" />
            </span>
            <div>
              <span className={clases.resumen.etiqueta}>{r.etiqueta}</span>
              <strong className={clases.resumen.valor}>{r.valor}</strong>
            </div>
          </article>
        ))}
      </div>

      <h2 className={clases.titulo_seccion}>{catalogoAmigos.secciones.tus_amigos}</h2>
      <MensajeEstadoBusqueda estado={busqueda.estado} error={busqueda.error} />
      {(busqueda.estado === 'inicial' || busqueda.estado === 'con_resultados' || busqueda.estado === 'escribiendo') && <BloqueMensaje AMIGOS={[...visibles]} alMensaje={alMensaje} />}
      {coincidentes.length > LIMITE && (
        <BotonPieLista onClick={() => setExpandida((actual) => !actual)}>
          {expandida ? catalogoAmigos.botones.ver_menos_amigos : catalogoAmigos.botones.ver_mas_amigos}
        </BotonPieLista>
      )}
    </section>
  )
}
