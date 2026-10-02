import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { BloqueOpcionesEncuestaProps } from '@/tipos/inicio/contrato_crear_publicacion'

const textos = catalogoInicio.modal_crear_publicacion.encuesta

export function BloqueOpcionesEncuesta({ opciones, onActualizar, onAgregar, onQuitar }: BloqueOpcionesEncuestaProps) {
  return (
    <fieldset className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0">
      <legend className="mb-2 p-0 text-auxiliar font-semibold text-texto-suave">
        {textos.titulo} <span className="font-normal">{textos.minimo}</span>
      </legend>
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
              className="flex-none disabled:cursor-not-allowed disabled:opacity-40"
            />
          </div>
        )
      })}
      {opciones.length < textos.opciones_maximas && (
        <Boton type="button" variant="secundario" size="default" onClick={onAgregar} className="self-start">
          <Icono name="mas" className="h-4 w-4" /> {textos.agregar_opcion}
        </Boton>
      )}
    </fieldset>
  )
}
