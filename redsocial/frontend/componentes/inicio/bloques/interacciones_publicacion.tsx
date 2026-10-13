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

export function InteraccionesPublicacion({ nombre, texto, reaccionesIniciales, comentariosIniciales, iconosReacciones }: InteraccionesPublicacionProps) {
  const interacciones = usarInteraccionesPublicacion(reaccionesIniciales, comentariosIniciales)
  const idComentarios = useId()
  const [compartiendo, setCompartiendo] = useState(false)
  const reacciones = iconosReacciones ? `${iconosReacciones} ${interacciones.reacciones}` : contar(interacciones.reacciones, contadores.reaccion_singular, contadores.reaccion_plural)

  return (
    <>
      <PiePublicacion
        reacciones={reacciones}
        comentarios={contar(interacciones.totalComentarios, contadores.comentario_singular, contadores.comentario_plural)}
        compartidos={interacciones.compartidos > 0 ? contar(interacciones.compartidos, contadores.compartido_singular, contadores.compartido_plural) : undefined}
        meGusta={interacciones.meGusta}
        comentariosAbiertos={interacciones.comentariosAbiertos}
        idComentarios={idComentarios}
        onMeGusta={interacciones.alternarMeGusta}
        onComentar={interacciones.alternarComentarios}
        onCompartir={() => setCompartiendo(true)}
      />
      {interacciones.comentariosAbiertos && (
        <SeccionComentariosPublicacion id={idComentarios} comentarios={interacciones.comentarios} total={interacciones.totalComentarios} onComentar={interacciones.comentar} />
      )}
      {compartiendo && <DialogoCompartirPublicacion nombre={nombre} texto={texto} onCompartir={interacciones.compartir} onCerrar={() => setCompartiendo(false)} />}
    </>
  )
}
