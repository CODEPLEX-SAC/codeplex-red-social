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

const TODOS = 'todos'

export function SeccionTusAmigos({
  RESUMEN,
  AMIGOS,
}: {
  RESUMEN: { icono: string; peligro?: boolean | undefined; etiqueta: string; valor: string; }[]
  AMIGOS: Amigo[]
}) {
  const [estado, setEstado] = useState(TODOS)
  const visibles = AMIGOS.filter((a) => estado === TODOS || (estado === 'en_linea' ? a.enLinea === true : a.enLinea !== true))

  return (
    <section className="rounded-xl border border-borde bg-white py-4.5 px-5">
      <EncabezadoAmigos textoBoton={catalogoAmigos.botones.agregar_amigos} />
      <PestanasAmigos activa="todos" />

      <div className="my-4.5 flex gap-3 max-800:flex-col">
        <CampoBusqueda
          placeholder={catalogoAmigos.placeholders.buscar_amigos}
          aria-label={catalogoAmigos.placeholders.buscar_amigos}
          className="min-w-0 flex-1 max-800:w-full max-800:flex-none"
        />
        <Selector variant="mini" value={estado} onChange={(evento) => setEstado(evento.target.value)} aria-label={catalogoAmigos.botones.filtrar_amigos} className="min-w-47.5 flex-none self-center max-800:w-full">
          <option value={TODOS}>{catalogoAmigos.botones.todos_los_amigos}</option>
          <option value="en_linea">{catalogoAmigos.botones.amigos_en_linea}</option>
          <option value="desconectados">{catalogoAmigos.botones.amigos_desconectados}</option>
        </Selector>
      </div>

      <div className="mb-5 grid grid-cols-4 gap-3 max-900:grid-cols-2">
        {RESUMEN.map((r) => (
          <article key={r.etiqueta} className="flex items-center gap-2.5 rounded-control border border-borde bg-white p-3.5">
            <span className={'grid h-8.5 w-8.5 flex-none place-items-center rounded-9 ' + (r.peligro ? 'bg-fondo-categoria-rojo text-peligro-texto' : 'bg-primario-suave text-primario')}>
              <Icono name={r.icono} className="h-4 w-4" />
            </span>
            <div>
              <span className="block text-auxiliar text-texto-suave">{r.etiqueta}</span>
              <strong className="mt-0.5 block text-valor-destacado text-texto">{r.valor}</strong>
            </div>
          </article>
        ))}
      </div>

      <h2 className="mb-3.5 text-titulo-seccion text-texto">{catalogoAmigos.secciones.tus_amigos}</h2>
      <BloqueMensaje AMIGOS={visibles} />
      <BotonPieLista>{catalogoAmigos.botones.ver_mas_amigos}</BotonPieLista>
    </section>
  )
}
