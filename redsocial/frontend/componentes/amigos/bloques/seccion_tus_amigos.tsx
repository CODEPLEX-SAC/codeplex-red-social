import { useState } from 'react'
import { EncabezadoAmigos } from './encabezado_amigos'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import { PestanasAmigos } from './pestanas_amigos'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { Selector } from '../../compartido/interfaz/selector'
import { BotonPieLista } from '../../compartido/interfaz/boton_pie_lista'
import { Icono } from '../../compartido/icono'
import { BloqueMensaje } from './bloque_mensaje'
import type { Amigo } from '@/tipos/amigos/modelo_amigos_todos'

const clases = catalogoAmigos.clases

const TODOS = 'todos'

export function SeccionTusAmigos({
  RESUMEN,
  AMIGOS,
  insigniaSolicitudes,
  alMensaje,
}: {
  RESUMEN: { icono: string; peligro?: boolean | undefined; etiqueta: string; valor: string; }[]
  AMIGOS: Amigo[]
  insigniaSolicitudes?: number | undefined
  alMensaje?: ((nombre: string) => void) | undefined
}) {
  const [estado, setEstado] = useState(TODOS)
  const visibles = AMIGOS.filter((a) => estado === TODOS || (estado === 'en_linea' ? a.enLinea === true : a.enLinea !== true))

  return (
    <section className={clases.tarjeta_pagina}>
      <EncabezadoAmigos textoBoton={catalogoAmigos.botones.agregar_amigos} />
      <PestanasAmigos activa="todos" insigniaSolicitudes={insigniaSolicitudes} />

      <div className={clases.filtros.fila}>
        <CampoBusqueda
          placeholder={catalogoAmigos.placeholders.buscar_amigos}
          aria-label={catalogoAmigos.placeholders.buscar_amigos}
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
      <BloqueMensaje AMIGOS={visibles} alMensaje={alMensaje} />
      <BotonPieLista>{catalogoAmigos.botones.ver_mas_amigos}</BotonPieLista>
    </section>
  )
}
