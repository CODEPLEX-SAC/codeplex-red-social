import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { BloquePiePublicacionProps } from '@/tipos/inicio/contrato_crear_publicacion'

const textos = catalogoInicio.modal_crear_publicacion

export function BloquePiePublicacion({ puedeAgregarMedios, contenidoValido, onAgregarMedios, onPublicar }: BloquePiePublicacionProps) {
  const selectorArchivos = useRef<HTMLInputElement>(null)

  function alElegirArchivos(evento: ChangeEvent<HTMLInputElement>) {
    onAgregarMedios(Array.from(evento.target.files ?? []))
    evento.target.value = ''
  }

  return (
    <div className="flex flex-col gap-3 border-t border-borde px-5 py-4">
      <div className="flex items-center justify-between gap-3 rounded-control border border-borde px-4 py-2">
        <span className="text-subtitulo font-semibold text-texto">{textos.agregar_a_publicacion}</span>
        <BotonIcono
          icono="foto-video"
          type="button"
          aria-label={textos.foto_video}
          title={textos.foto_video}
          disabled={!puedeAgregarMedios}
          onClick={() => selectorArchivos.current?.click()}
          variant="suave"
          size="default"
          className="disabled:cursor-not-allowed disabled:opacity-40"
        />
        <input
          ref={selectorArchivos}
          type="file"
          multiple
          hidden
          tabIndex={-1}
          accept={textos.medios.tipos_aceptados}
          aria-label={textos.medios.etiqueta_selector}
          onChange={alElegirArchivos}
        />
      </div>
      <Boton type="button" variant="primario" size="md" disabled={!contenidoValido} onClick={onPublicar} className="w-full disabled:cursor-not-allowed disabled:opacity-40">
        {textos.publicar}
      </Boton>
    </div>
  )
}
