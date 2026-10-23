import { useId, useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { sumarNoLeidos } from './logica_mensajes_flotantes'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { MensajesFlotantesInicioProps } from '@/tipos/inicio/contrato_feed_inicio'

const textos = catalogoInicio.mensajes_flotantes
const clases = textos.clases

export function MensajesFlotantesInicio({ mensajes }: MensajesFlotantesInicioProps) {
  const idPanel = useId()
  const [abierto, setAbierto] = useState(false)
  const total = sumarNoLeidos(mensajes)

  return (
    <div className={clases.contenedor}>
      {abierto && (
        <section id={idPanel} aria-label={textos.titulo} className={clases.panel}>
          <header className={clases.cabecera}>
            <h2 className="m-0 text-nombre-entidad text-texto">{textos.titulo}</h2>
            <BotonIcono icono="cerrar" type="button" aria-label={textos.cerrar} onClick={() => setAbierto(false)} variant="discreto" size="default" />
          </header>
          {mensajes.length === 0 && <MensajeVacio texto={textos.vacio} />}
          <ul className={clases.lista}>
            {mensajes.map((mensaje) => (
              <li key={`${mensaje.nombre}-${mensaje.hora}`}>
                <a href={catalogoMensajeria.rutas.no_leidos} className={clases.fila}>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <strong className="truncate text-nombre-entidad text-texto">{mensaje.nombre}</strong>
                    <span className="truncate text-auxiliar text-texto-suave">{mensaje.preview}</span>
                  </span>
                  <span className="flex flex-none flex-col items-end gap-1">
                    <span className="text-fecha-abreviada text-texto-suave">{mensaje.hora}</span>
                    <Insignia variant="counter">{mensaje.badge}</Insignia>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a href={catalogoMensajeria.rutas.todos} className={clases.ver_todos}>
            {textos.ver_todos}
          </a>
        </section>
      )}
      <div className="relative">
        <BotonIcono icono="mensaje" type="button" aria-label={textos.boton} aria-expanded={abierto} aria-controls={abierto ? idPanel : undefined} onClick={() => setAbierto((actual) => !actual)} variant="primario" size="md" />
        {total > 0 && (
          <span className={clases.insignia}>
            <Insignia variant="counter">{total}</Insignia>
          </span>
        )}
      </div>
    </div>
  )
}
