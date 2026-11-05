import { useState } from 'react'
import type { FormEvent } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { PanelEmojisComentario } from './panel_emojis_comentario'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { ControlesElementosHistoriaProps, OpcionPosicionHistoria } from '@/tipos/inicio/contrato_historia'
import type { ElementoSuperpuestoHistoria } from '@/tipos/inicio/modelo_historia'

const textos = catalogoInicio.historias.flujo.editor
const clases = catalogoInicio.historias.flujo.clases
const POSICIONES = textos.posiciones as OpcionPosicionHistoria[]

function BotonPosicion({ posicion, activa, nombre, onElegir }: { posicion: OpcionPosicionHistoria; activa: boolean; nombre: string; onElegir: (posicionId: string) => void }) {
  const elegir = () => onElegir(posicion.id)

  return (
    <Boton type="button" variant="filtro" size="pildora" activo={activa} aria-pressed={activa} aria-label={`${textos.etiqueta_posiciones.replace(':contenido', nombre)} ${posicion.etiqueta}`} onClick={elegir}>
      {posicion.etiqueta}
    </Boton>
  )
}

function FilaElemento({ elemento, numero, onCambiar, onQuitar, onMover }: { elemento: ElementoSuperpuestoHistoria; numero: number; onCambiar: (id: string, contenido: string) => void; onQuitar: (id: string) => void; onMover: (id: string, posicionId: string) => void }) {
  const cambiar = (contenido: string) => onCambiar(elemento.id, contenido)
  const quitar = () => onQuitar(elemento.id)
  const mover = (posicionId: string) => onMover(elemento.id, posicionId)

  return (
    <li className={clases.elemento_fila}>
      <CampoTexto valor={elemento.contenido} alCambiar={cambiar} inputProps={{ [catalogoCompartido.controles.atributo_accesible]: textos.elemento_modificar.replace(':numero', String(numero)) }} />
      <div className={clases.elemento_acciones}>
        <div className={clases.posiciones}>
          {POSICIONES.map((posicion) => (
            <BotonPosicion key={posicion.id} posicion={posicion} activa={elemento.posicionId === posicion.id} nombre={elemento.contenido} onElegir={mover} />
          ))}
        </div>
        <BotonIcono icono="eliminar" type="button" aria-label={textos.elemento_quitar.replace(':contenido', elemento.contenido)} onClick={quitar} variant="discreto" size="default" />
      </div>
    </li>
  )
}

export function ControlesElementosHistoria({ borrador, onAgregar, onCambiar, onQuitar, onMover }: ControlesElementosHistoriaProps) {
  const [contenido, setContenido] = useState(String())
  const [emojis, setEmojis] = useState(false)
  const vacio = contenido.trim().length === 0
  const alternarEmojis = () => setEmojis((abierto) => !abierto)
  const anadirEmoji = (emoji: string) => setContenido((actual) => actual + emoji)

  function agregar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (vacio) return
    onAgregar(contenido.trim())
    setContenido(String())
    setEmojis(false)
  }

  return (
    <section className={clases.seccion_control}>
      <h3 className={clases.titulo_control}>{textos.etiqueta_elementos}</h3>
      <form onSubmit={agregar} className={clases.elemento_formulario}>
        <div className="min-w-0 flex-1">
          <CampoTexto valor={contenido} alCambiar={setContenido} marcador={textos.elemento_marcador} inputProps={{ [catalogoCompartido.controles.atributo_accesible]: textos.elemento_etiqueta }} />
        </div>
        <BotonIcono icono="sentimiento" type="button" aria-label={catalogoInicio.publicacion.comentarios.etiqueta_emojis} aria-expanded={emojis} onClick={alternarEmojis} variant="discreto" size="default" />
        <Boton type="submit" variant="secundario" size="md" disabled={vacio}>
          {textos.elemento_agregar}
        </Boton>
      </form>
      {emojis && <PanelEmojisComentario onElegir={anadirEmoji} />}
      <ul className={clases.elementos}>
        {borrador.elementos.map((elemento, indice) => (
          <FilaElemento key={elemento.id} elemento={elemento} numero={indice + 1} onCambiar={onCambiar} onQuitar={onQuitar} onMover={onMover} />
        ))}
      </ul>
    </section>
  )
}
