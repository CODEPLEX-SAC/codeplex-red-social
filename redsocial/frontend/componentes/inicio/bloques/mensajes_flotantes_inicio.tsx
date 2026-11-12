import { useId, useState } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { Pestanas } from '../../compartido/interfaz/pestanas'
import { FilaConversacionFlotante } from './fila_conversacion_flotante'
import { conversacionesDePestana, sumarNoLeidos } from './logica_mensajes_flotantes'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { MensajesFlotantesInicioProps, PestanaMensajesFlotantes } from '@/tipos/inicio/contrato_feed_inicio'

const textos = catalogoInicio.mensajes_flotantes
const clases = textos.clases

export function MensajesFlotantesInicio({ conversaciones, onAbrirConversacion, onAmpliar, renderHilo }: MensajesFlotantesInicioProps) {
  const idPanel = useId()
  const [abierto, setAbierto] = useState(false)
  const [pestana, setPestana] = useState<PestanaMensajesFlotantes>('todos')
  const [abierta, setAbierta] = useState<string | null>(null)
  const total = sumarNoLeidos(conversaciones)
  const visibles = conversacionesDePestana(conversaciones, pestana)
  const sinLeer = conversacionesDePestana(conversaciones, 'no_leidos').length

  function abrirHilo(id: string) {
    onAbrirConversacion(id)
    setAbierta(id)
  }

  function cerrar() {
    setAbierto(false)
    setAbierta(null)
  }

  return (
    <div className={clases.contenedor}>
      {abierto && (
        <section id={idPanel} aria-label={textos.titulo} className={`${clases.panel} ${abierta ? clases.panel_hilo : ''}`}>
          <header className={clases.cabecera}>
            <h2 className="m-0 text-nombre-entidad text-texto">{textos.titulo}</h2>
            <div className="flex items-center gap-1">
              <BotonIcono icono="flecha-arriba-derecha" type="button" aria-label={textos.ampliar} onClick={() => onAmpliar(abierta)} variant="discreto" size="default" />
              <BotonIcono icono="cerrar" type="button" aria-label={textos.cerrar} onClick={cerrar} variant="discreto" size="default" />
            </div>
          </header>
          {abierta ? (
            <div className={clases.hilo}>{renderHilo(abierta, () => setAbierta(null))}</div>
          ) : (
            <>
              <Pestanas
                className={clases.pestanas}
                activa={pestana}
                alCambiar={(clave) => setPestana(clave as PestanaMensajesFlotantes)}
                elementos={[
                  { clave: 'todos', etiqueta: textos.pestanas.todos },
                  { clave: 'no_leidos', etiqueta: textos.pestanas.no_leidos, insignia: sinLeer > 0 ? sinLeer : undefined },
                ]}
              />
              <p className={clases.recientes}>{textos.recientes}</p>
              {visibles.length === 0 && <MensajeVacio texto={pestana === 'no_leidos' ? textos.vacio_no_leidos : textos.vacio_todos} />}
              <ul className={clases.lista}>
                {visibles.map((conversacion) => (
                  <li key={conversacion.id}>
                    <FilaConversacionFlotante conversacion={conversacion} alAbrir={abrirHilo} />
                  </li>
                ))}
              </ul>
              <a href={catalogoMensajeria.rutas.todos} className={clases.ver_todos}>
                {textos.ver_todos}
              </a>
            </>
          )}
        </section>
      )}
      <Insignia variant="superpuesta" contenido={total}>
        <Boton type="button" aria-label={textos.boton} aria-expanded={abierto} aria-controls={abierto ? idPanel : undefined} onClick={() => (abierto ? cerrar() : setAbierto(true))} variant="primario" size="md" className={clases.boton_flotante}>
          <Icono name="mensaje" className="h-5 w-5" /> {textos.texto_boton}
        </Boton>
      </Insignia>
    </div>
  )
}
