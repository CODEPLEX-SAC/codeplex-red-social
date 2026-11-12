import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { Icono } from '../../componentes/compartido/icono'
import type { AvisoFormularioEventoProps } from '@/formularios/eventos/modelo_formulario_evento'

const clases = catalogoEventos.clases_formulario_evento

export function NotaFormularioEvento({ texto }: AvisoFormularioEventoProps) {
  return (
    <div className={clases.aviso}>
      <Icono name="informacion" className={clases.aviso_icono} />
      <span>{texto}</span>
    </div>
  )
}
