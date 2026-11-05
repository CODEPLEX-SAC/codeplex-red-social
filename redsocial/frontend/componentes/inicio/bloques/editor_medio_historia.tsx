import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { Pestanas } from '../../compartido/interfaz/pestanas'
import { AjusteMedioHistoria } from './ajuste_medio_historia'
import { ControlesElementosHistoria } from './controles_elementos_historia'
import { ControlesEstiloHistoria } from './controles_estilo_historia'
import { LienzoHistoria } from './lienzo_historia'
import { PieEditorHistoria } from './pie_editor_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ElementoPestana } from '@/tipos/compartido/contrato_pestanas'
import type { FlujoHistoriaProps } from '@/tipos/inicio/contrato_historia'

const textos = catalogoInicio.historias.flujo.editor
const clases = catalogoInicio.historias.flujo.clases
const HERRAMIENTAS = textos.herramientas_media as ElementoPestana[]

export function EditorMedioHistoria({ flujo }: FlujoHistoriaProps) {
  const [herramienta, setHerramienta] = useState(HERRAMIENTAS[0].clave)
  const { borrador } = flujo

  if (!borrador.medio) return <PieEditorHistoria flujo={flujo} />

  return (
    <>
      <div className={clases.cuerpo_editor}>
        <div className={clases.escenario}>
          <LienzoHistoria borrador={borrador} compacto />
          <AjusteMedioHistoria nivel={borrador.ajusteMedio} onCambiar={flujo.cambiarAjusteMedio} />
        </div>
        <div className={clases.controles}>
          <nav aria-label={textos.etiqueta_herramientas}>
            <Pestanas elementos={HERRAMIENTAS} activa={herramienta} alCambiar={setHerramienta} />
          </nav>
          {herramienta === 'archivo' && (
            <>
              <Boton type="button" variant="secundario" size="md" onClick={flujo.abrirSelector} className="self-start">
                {textos.cambiar_archivo}
              </Boton>
              {flujo.errorArchivo && (
                <p role="alert" className={clases.error_archivo}>
                  {catalogoInicio.historias.flujo.cargador.error}
                </p>
              )}
            </>
          )}
          {herramienta === 'superpuesto' && (
            <>
              <ControlesEstiloHistoria estiloId={borrador.estiloTextoId} onCambiar={flujo.cambiarEstilo} />
              <ControlesElementosHistoria borrador={borrador} onAgregar={flujo.agregarElemento} onCambiar={flujo.cambiarElemento} onQuitar={flujo.quitarElemento} onMover={flujo.moverElemento} />
            </>
          )}
        </div>
      </div>
      <PieEditorHistoria flujo={flujo} />
    </>
  )
}
