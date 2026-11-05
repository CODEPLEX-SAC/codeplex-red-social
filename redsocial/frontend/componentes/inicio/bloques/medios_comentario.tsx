import { useState } from 'react'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { Boton } from '../../compartido/interfaz/boton'
import { VisorMedios } from '../../compartido/interfaz/visor_medios'
import { imagenesDe } from './logica_caja_comentario'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import type { MediosComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.comentarios
const alternativo = catalogoInicio.modal_crear_publicacion.medios.texto_alternativo

function ImagenComentario({ medio, numero, onAbrir }: { medio: MedioLocalPublicacion; numero: string; onAbrir: (id: string) => void }) {
  const abrir = () => onAbrir(medio.id)

  return (
    <Boton type="button" variant="fantasma" size="default" onClick={abrir} aria-label={alternativo.replace(':numero', numero)} className={textos.clases.medio_boton}>
      <AvatarImagen src={medio.url} alt={alternativo.replace(':numero', numero)} className={textos.clases.medio} />
    </Boton>
  )
}

export function MediosComentario({ medios }: MediosComentarioProps) {
  const [abierta, setAbierta] = useState<number | null>(null)
  const imagenes = imagenesDe(medios)
  const abrirImagen = (id: string) => setAbierta(imagenes.findIndex((imagen) => imagen.id === id))
  const cerrarVisor = () => setAbierta(null)

  return (
    <>
      <ul aria-label={textos.etiqueta_medios} className={textos.clases.medios}>
        {medios.map((medio, indice) => (
          <li key={medio.id} className={textos.clases.medio_item}>
            {medio.esVideo ? (
              <video src={medio.url} controls preload="metadata" aria-label={alternativo.replace(':numero', String(indice + 1))} className={textos.clases.medio} />
            ) : (
              <ImagenComentario medio={medio} numero={String(indice + 1)} onAbrir={abrirImagen} />
            )}
          </li>
        ))}
      </ul>
      {abierta !== null && <VisorMedios items={imagenes} indice={abierta} titulo={textos.etiqueta_visor} onCambiar={setAbierta} onCerrar={cerrarVisor} />}
    </>
  )
}
