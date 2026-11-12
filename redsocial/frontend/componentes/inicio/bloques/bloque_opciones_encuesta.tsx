import { useState } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Casilla } from '../../compartido/interfaz/casilla'
import { FondoPanelFlotante } from '../../compartido/interfaz/fondo_panel_flotante'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { BloqueOpcionesEncuestaProps } from '@/tipos/inicio/contrato_crear_publicacion'

const textos = catalogoInicio.modal_crear_publicacion.encuesta
const clases = textos.clases

export function BloqueOpcionesEncuesta({ opciones, onActualizar, onAgregar, onQuitar }: BloqueOpcionesEncuestaProps) {
  const [ajustesAbiertos, setAjustesAbiertos] = useState(false)
  const [variasRespuestas, setVariasRespuestas] = useState(false)
  const [cualquieraAnade, setCualquieraAnade] = useState(false)

  return (
    <fieldset className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0">
      <legend className={clases.leyenda}>{textos.titulo}</legend>
      {opciones.map((opcion, indice) => {
        const numero = String(indice + 1)
        return (
          <div key={opcion.id} className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <CampoTexto
                valor={opcion.texto}
                alCambiar={(texto) => onActualizar(opcion.id, texto)}
                marcador={textos.marcador_opcion.replace(':numero', numero)}
                inputProps={{
                  [catalogoCompartido.controles.atributo_accesible]: textos.etiqueta_opcion.replace(':numero', numero),
                  maxLength: textos.caracteres_maximos,
                }}
              />
            </div>
            <BotonIcono
              icono="cerrar"
              type="button"
              aria-label={textos.quitar_opcion.replace(':numero', numero)}
              onClick={() => onQuitar(opcion.id)}
              disabled={opciones.length <= textos.opciones_minimas}
              variant="contorno"
              size="default"
              className="flex-none"
            />
          </div>
        )
      })}
      <div className={clases.fila_acciones}>
        {opciones.length < textos.opciones_maximas && (
          <Boton type="button" size="default" onClick={onAgregar} className={clases.boton_agregar}>
            <Icono name="mas" className="h-4 w-4" /> {textos.agregar_opcion}
          </Boton>
        )}
        <div className={clases.contenedor_ajustes}>
          <Boton type="button" size="default" aria-label={textos.ajustes.etiqueta} aria-haspopup="true" aria-expanded={ajustesAbiertos} onClick={() => setAjustesAbiertos((actual) => !actual)} className={clases.boton_ajustes}>
            <Icono name="ajustes-sistema" className="h-4 w-4" />
            <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
          </Boton>
          {ajustesAbiertos && (
            <>
              <FondoPanelFlotante onCerrar={() => setAjustesAbiertos(false)} atenuarMovil={false} />
              <div role="group" aria-label={textos.ajustes.etiqueta} className={clases.panel}>
                <div className={clases.fila_ajuste}>
                  <span>{textos.ajustes.varias}</span>
                  <Casilla seleccionado={variasRespuestas} alCambiar={(_, marcado) => setVariasRespuestas(marcado)} inputProps={{ 'aria-label': textos.ajustes.varias }} />
                </div>
                <div className={clases.fila_ajuste}>
                  <span>{textos.ajustes.cualquiera}</span>
                  <Casilla seleccionado={cualquieraAnade} alCambiar={(_, marcado) => setCualquieraAnade(marcado)} inputProps={{ 'aria-label': textos.ajustes.cualquiera }} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </fieldset>
  )
}
