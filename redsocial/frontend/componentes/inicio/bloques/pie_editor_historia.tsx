import { Boton } from '../../compartido/interfaz/boton'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { FlujoHistoriaProps } from '@/tipos/inicio/contrato_historia'

const textos = catalogoInicio.historias.flujo.editor
const clases = catalogoInicio.historias.flujo.clases

export function PieEditorHistoria({ flujo }: FlujoHistoriaProps) {
  return (
    <div className={clases.acciones}>
      <Boton type="button" variant="secundario" size="md" onClick={flujo.volverATipo}>
        {textos.volver}
      </Boton>
      <Boton type="button" variant="secundario" size="md" onClick={flujo.pedirCerrar}>
        {textos.descartar}
      </Boton>
      <Boton type="button" variant="primario" size="md" disabled={!flujo.puedePublicar} onClick={flujo.irAVistaPrevia}>
        {textos.vista_previa}
      </Boton>
    </div>
  )
}
