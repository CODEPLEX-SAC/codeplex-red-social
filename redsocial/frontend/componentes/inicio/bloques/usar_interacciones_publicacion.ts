import { useState } from 'react'
import { contarComentarios, opcionesDeResumen, totalReacciones } from './logica_feed_inicio'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { InteraccionPublicacion } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { OpcionReaccion } from '@/tipos/inicio/contrato_reacciones'

const OPCIONES = catalogoInicio.reacciones.opciones as readonly OpcionReaccion[]

export function usarInteraccionesPublicacion(interaccion: InteraccionPublicacion) {
  const [comentariosAbiertos, setComentariosAbiertos] = useState(false)

  function alternarComentarios() {
    setComentariosAbiertos((abiertos) => !abiertos)
  }

  return {
    reacciones: totalReacciones(interaccion.reaccionesPorTipo),
    iconosResumen: opcionesDeResumen(interaccion.reaccionesPorTipo, OPCIONES, catalogoInicio.reacciones.resumen_maximo),
    totalComentarios: contarComentarios(interaccion.comentarios),
    comentariosAbiertos,
    alternarComentarios,
  }
}
