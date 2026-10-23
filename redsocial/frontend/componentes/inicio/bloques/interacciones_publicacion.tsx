import { useId, useState } from 'react'
import { DialogoCompartirPublicacion } from './dialogo_compartir_publicacion'
import { PiePublicacion } from './pie_publicacion'
import { SeccionComentariosPublicacion } from './seccion_comentarios_publicacion'
import { usarInteraccionesPublicacion } from './usar_interacciones_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { InteraccionesPublicacionProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const contadores = catalogoInicio.contadores

function contar(cantidad: number, singular: string, plural: string) {
  return `${cantidad} ${cantidad === 1 ? singular : plural}`
}

export function InteraccionesPublicacion({ nombre, texto, interaccion, compartidos, puedeCompartir, onCompartir }: InteraccionesPublicacionProps) {
  const interacciones = usarInteraccionesPublicacion(interaccion)
  const idComentarios = useId()
  const [compartiendo, setCompartiendo] = useState(false)

  return (
    <>
      <PiePublicacion
        reacciones={contar(interacciones.reacciones, contadores.reaccion_singular, contadores.reaccion_plural)}
        iconosResumen={interacciones.iconosResumen}
        comentarios={contar(interacciones.totalComentarios, contadores.comentario_singular, contadores.comentario_plural)}
        compartidos={compartidos > 0 ? contar(compartidos, contadores.compartido_singular, contadores.compartido_plural) : undefined}
        reaccion={interaccion.reaccion}
        puedeCompartir={puedeCompartir}
        comentariosAbiertos={interacciones.comentariosAbiertos}
        idComentarios={idComentarios}
        onReaccionar={interaccion.onReaccionarPublicacion}
        onComentar={interacciones.alternarComentarios}
        onCompartir={() => setCompartiendo(true)}
      />
      {interacciones.comentariosAbiertos && (
        <SeccionComentariosPublicacion
          id={idComentarios}
          comentarios={interaccion.comentarios}
          total={interacciones.totalComentarios}
          onComentar={interaccion.onComentar}
          onResponder={interaccion.onResponder}
          onEditar={interaccion.onEditar}
          onEliminar={interaccion.onEliminar}
          onReaccionar={interaccion.onReaccionar}
        />
      )}
      {compartiendo && <DialogoCompartirPublicacion nombre={nombre} texto={texto} onCompartir={onCompartir} onCerrar={() => setCompartiendo(false)} />}
    </>
  )
}
