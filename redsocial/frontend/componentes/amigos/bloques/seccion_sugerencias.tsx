import { useState } from 'react'
import { BotonPieLista, MensajeVacio } from '../../compartido'
import { TarjetaSugerencia } from './tarjeta_sugerencia'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { SeccionSugerenciasProps } from '@/tipos/amigos/contrato_sugerencias'

const clases = catalogoAmigos.clases.sugerencia
const LIMITE = catalogoAmigos.limite_sugerencias_visibles

export function SeccionSugerencias({ sugerencias }: SeccionSugerenciasProps) {
  const [expandida, setExpandida] = useState(false)
  const visibles = sugerencias.slice(0, expandida ? sugerencias.length : LIMITE)

  return (
    <>
      <div className={clases.cabecera}>
        <h2 className={clases.titulo}>{catalogoAmigos.secciones.personas_conocer}</h2>
      </div>
      <div className={clases.contenedor}>
        <div className={clases.rejilla}>
          {sugerencias.length === 0 && <MensajeVacio texto={catalogoAmigos.mensajes.sin_sugerencias} className={clases.vacio} />}
          {visibles.map((sugerencia) => (
            <TarjetaSugerencia key={sugerencia.nombre} sugerencia={sugerencia} />
          ))}
        </div>
      </div>
      {sugerencias.length > LIMITE && (
        <BotonPieLista onClick={() => setExpandida((actual) => !actual)}>
          {expandida ? catalogoAmigos.botones.ver_menos_sugerencias : catalogoAmigos.botones.ver_mas_sugerencias}
        </BotonPieLista>
      )}
    </>
  )
}
