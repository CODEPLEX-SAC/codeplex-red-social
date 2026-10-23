import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonReaccion } from './boton_reaccion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { MetaComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { OpcionReaccion } from '@/tipos/inicio/contrato_reacciones'

const textos = catalogoInicio.publicacion.comentarios
const opcionesReaccion = catalogoInicio.reacciones.opciones as readonly OpcionReaccion[]

export function MetaComentario({ comentario, respondiendo, onReaccionar, onAlternarRespuesta }: MetaComentarioProps) {
  const reaccion = opcionesReaccion.find((opcion) => opcion.clave === comentario.reaccion)

  return (
    <div className={textos.clases.meta}>
      <span>{comentario.tiempo}</span>
      {comentario.editado && <span>{textos.editado}</span>}
      <BotonReaccion reaccion={comentario.reaccion} variante="comentario" onReaccionar={onReaccionar} />
      {reaccion && (
        <span className="inline-flex items-center gap-1 text-conteo">
          <Icono name={reaccion.icono} className={`h-3.5 w-3.5 ${reaccion.clase_resumen}`} />1
        </span>
      )}
      <Boton type="button" variant="fantasma" size="enlace_accion" aria-expanded={respondiendo} onClick={onAlternarRespuesta} className="rounded-md px-1 py-0.5">
        {textos.responder}
      </Boton>
    </div>
  )
}
