import { useState } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { EncabezadoVistaAdministracion } from './encabezado_vista_administracion'
import { usarElementosDemostracion } from './usar_elementos_demostracion'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'

const vista = catalogoGrupos.administracion.vistas.preguntas
const clases = catalogoGrupos.clases.administracion

export function VistaPreguntasGrupo() {
  const preguntas = usarElementosDemostracion(catalogoGrupos.administracion.demo.preguntas)
  const [texto, setTexto] = useState(String())

  function agregar(evento: React.FormEvent) {
    evento.preventDefault()
    if (texto.trim() === String()) return
    preguntas.agregar(texto.trim())
    setTexto(String())
  }

  return (
    <section className={clases.vista}>
      <EncabezadoVistaAdministracion titulo={vista.titulo} descripcion={vista.descripcion} />
      <form onSubmit={agregar} className={clases.formulario}>
        <div className={clases.campo}>
          <CampoTexto valor={texto} alCambiar={setTexto} marcador={vista.placeholder} inputProps={{ 'aria-label': vista.nueva }} anchoCompleto />
        </div>
        <Boton type="submit" variant="primario" size="default">
          <Icono name="mas" className="h-4 w-4" /> {vista.agregar}
        </Boton>
      </form>
      {preguntas.elementos.length === 0 && <MensajeVacio texto={vista.vacio} className={clases.vacio} />}
      <ul aria-label={vista.lista} className={clases.lista}>
        {preguntas.elementos.map((pregunta) => (
          <li key={pregunta.id} className={clases.fila_lista}>
            <span className={clases.fila_titulo}>{pregunta.titulo}</span>
            <BotonIcono icono="cerrar" type="button" aria-label={vista.quitar.replace(':pregunta', pregunta.titulo)} variant="discreto" size="sm" className="ml-auto" onClick={() => preguntas.quitar(pregunta.id, vista.resultado)} />
          </li>
        ))}
      </ul>
      {preguntas.resultado !== String() && (
        <p aria-live="polite" className={clases.aviso}>
          {preguntas.resultado}
        </p>
      )}
    </section>
  )
}
