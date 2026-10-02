import { useLayoutEffect, useRef } from 'react'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { EditorPublicacionProps } from '@/tipos/inicio/contrato_crear_publicacion'

const { clase_editor: claseEditor } = catalogoInicio.modal_crear_publicacion

export function EditorPublicacion({ valor, marcador, etiqueta, filasMinimas, onCambiar }: EditorPublicacionProps) {
  const areaTexto = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    const elemento = areaTexto.current
    if (!elemento) return
    elemento.style.height = 'auto'
    elemento.style.height = `${elemento.scrollHeight}px`
  }, [valor])

  return (
    <textarea
      ref={areaTexto}
      value={valor}
      rows={filasMinimas}
      placeholder={marcador}
      aria-label={etiqueta}
      onChange={(evento) => onCambiar(evento.target.value)}
      data-foco-inicial
      className={claseEditor}
    />
  )
}
