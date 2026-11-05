import { useState } from 'react'
import type { FormEvent } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { PieRespuestaHistoriaProps } from '@/tipos/inicio/contrato_historia'
import type { ClaveReaccion, OpcionReaccion } from '@/tipos/inicio/contrato_reacciones'

const textos = catalogoInicio.historias.flujo.visor
const clases = catalogoInicio.historias.flujo.clases
const OPCIONES = catalogoInicio.reacciones.opciones as readonly OpcionReaccion[]

function BotonReaccionHistoria({ opcion, activa, onElegir }: { opcion: OpcionReaccion; activa: boolean; onElegir: (clave: ClaveReaccion) => void }) {
  const elegir = () => onElegir(opcion.clave)

  return <BotonIcono icono={opcion.icono as IconName} type="button" aria-label={textos.reaccionar.replace(':reaccion', opcion.etiqueta)} aria-pressed={activa} onClick={elegir} variant="sobre_oscuro" size="default" className={`${clases.boton_fila_respuesta} ${activa ? opcion.clase_color : String()}`} />
}

export function PieRespuestaHistoria({ historia, acciones }: PieRespuestaHistoriaProps) {
  const [texto, setTexto] = useState(String())
  const vacio = texto.trim().length === 0
  const enviadas = acciones.respuestasDe(historia.id)
  const reaccion = acciones.reaccionDe(historia.id)
  const reaccionar = (clave: ClaveReaccion) => acciones.onReaccionar(historia.id, clave)

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (vacio) return
    acciones.onResponder(historia.id, historia.autorId, texto.trim())
    setTexto(String())
  }

  return (
    <div className={clases.pie_visor}>
      {enviadas.length > 0 && (
        <p role="status" className={clases.estado_respuesta}>
          {textos.respuesta_enviada.replace(':nombre', historia.nombre)}
        </p>
      )}
      <form onSubmit={enviar} className={clases.fila_respuesta}>
        <div className={clases.campo_respuesta}>
          <CampoTexto valor={texto} alCambiar={setTexto} sx={catalogoCompartido.controles.campo_texto_claro.sx} marcador={textos.responder_marcador} inputProps={{ [catalogoCompartido.controles.atributo_accesible]: textos.responder_etiqueta.replace(':nombre', historia.nombre) }} />
        </div>
        <div role="group" aria-label={textos.etiqueta_reacciones} className={clases.reacciones_visor}>
          {OPCIONES.map((opcion) => (
            <BotonReaccionHistoria key={opcion.clave} opcion={opcion} activa={reaccion === opcion.clave} onElegir={reaccionar} />
          ))}
        </div>
        <BotonIcono icono="enviar" type="submit" aria-label={textos.enviar} disabled={vacio} variant="primario" size="default" className={clases.boton_fila_respuesta} />
      </form>
    </div>
  )
}
