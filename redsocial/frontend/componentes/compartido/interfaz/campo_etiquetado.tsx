import type { CampoEtiquetadoProps } from '@/tipos/compartido/contrato_campo_etiquetado'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.campo_etiquetado

export function CampoEtiquetado({ etiqueta, requerido, className, children, variante = 'normal', tono = 'normal', ayuda, envolver, para }: CampoEtiquetadoProps) {
  const base = clases[variante]
  const claseRaiz = className ? `${base.contenedor} ${className}` : base.contenedor
  const claseEtiqueta = tono === 'suave' ? base.etiqueta_suave : base.etiqueta
  const texto = (
    <>
      {etiqueta} {requerido && <span className={clases.requerido}>{clases.simbolo_requerido}</span>}
    </>
  )
  const contenido = (
    <>
      {para ? <label htmlFor={para} className={claseEtiqueta}>{texto}</label> : <span className={claseEtiqueta}>{texto}</span>}
      {children}
      {ayuda && <span className={clases.ayuda}>{ayuda}</span>}
    </>
  )

  return envolver ? <label className={claseRaiz}>{contenido}</label> : <div className={claseRaiz}>{contenido}</div>
}
