import { useState } from 'react'
import { Pestanas } from '../../compartido/interfaz/pestanas'
import { ControlesFondoHistoria } from './controles_fondo_historia'
import { HerramientaTextoHistoria } from './herramienta_texto_historia'
import { LienzoHistoria } from './lienzo_historia'
import { contadorTexto } from './logica_historia'
import { PieEditorHistoria } from './pie_editor_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ElementoPestana } from '@/tipos/compartido/contrato_pestanas'
import type { FlujoHistoriaProps } from '@/tipos/inicio/contrato_historia'

const textos = catalogoInicio.historias.flujo.editor
const clases = catalogoInicio.historias.flujo.clases
const HERRAMIENTAS = textos.herramientas_texto as ElementoPestana[]

export function EditorTextoHistoria({ flujo }: FlujoHistoriaProps) {
  const [herramienta, setHerramienta] = useState(HERRAMIENTAS[0].clave)
  const { borrador } = flujo

  return (
    <>
      <div className={clases.cuerpo_editor}>
        <div className={clases.escenario}>
          <LienzoHistoria borrador={borrador} compacto onEscribir={flujo.cambiarTexto} />
          <p aria-live="polite" className={clases.contador}>
            {contadorTexto(borrador.texto)}
          </p>
        </div>
        <div className={clases.controles}>
          <nav aria-label={textos.etiqueta_herramientas}>
            <Pestanas elementos={HERRAMIENTAS} activa={herramienta} alCambiar={setHerramienta} />
          </nav>
          {herramienta === 'texto' && <HerramientaTextoHistoria flujo={flujo} />}
          {herramienta === 'fondo' && <ControlesFondoHistoria fondoId={borrador.fondoId} onCambiar={flujo.cambiarFondo} />}
        </div>
      </div>
      <PieEditorHistoria flujo={flujo} />
    </>
  )
}
