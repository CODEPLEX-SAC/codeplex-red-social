import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { documentoDesdeArchivo, quitarItem } from './logica_edicion_perfil'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PestanaEditablePerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.documentos
const clases = catalogoPerfil.clases.editor

export function PestanaDocumentosPerfil({ perfil, propio, onGuardar }: PestanaEditablePerfilProps) {
  const entrada = useRef<HTMLInputElement>(null)
  const documentos = perfil.documentos

  function subir(evento: ChangeEvent<HTMLInputElement>) {
    const archivos = Array.from(evento.target.files ?? [])
    evento.target.value = ''
    if (archivos.length === 0) return
    const fecha = new Date().toLocaleDateString(catalogoPerfil.documentos.idioma)
    onGuardar({ documentos: [...documentos, ...archivos.map((archivo, indice) => documentoDesdeArchivo(archivo, fecha, documentos.length + indice))] })
  }

  function eliminar(id: string) {
    const documento = documentos.find((actual) => actual.id === id)
    if (documento) URL.revokeObjectURL(documento.url)
    onGuardar({ documentos: quitarItem(documentos, id) })
  }

  return (
    <section className={catalogoPerfil.clases.seccion}>
      <div className={clases.cabecera}>
        <h2 className="m-0 text-titulo-banner text-texto">{textos.titulo}</h2>
        {propio && (
          <Boton type="button" variant="secundario" size="md" onClick={() => entrada.current?.click()}>
            {textos.agregar}
          </Boton>
        )}
      </div>
      {propio && <input ref={entrada} type="file" multiple accept={textos.tipos_aceptados} aria-label={textos.etiqueta_archivo} onChange={subir} className={clases.oculto} />}
      {documentos.length === 0 && <MensajeVacio titulo={textos.vacio_titulo} texto={propio ? textos.subir_cv_detalle : textos.vacio_ajeno} />}
      {documentos.length === 0 && propio && (
        <div className={clases.formulario}>
          <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => entrada.current?.click()}>
            {textos.subir_cv}
          </Boton>
          <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => entrada.current?.click()}>
            {textos.subir_titulo}
          </Boton>
        </div>
      )}
      <ul className={clases.lista}>
        {documentos.map((documento) => (
          <li key={documento.id} className={clases.documento}>
            <Icono name="documento" className="h-5 w-5 flex-none text-texto-suave" />
            <div className={clases.item_cuerpo}>
              <a href={documento.url} target="_blank" rel="noreferrer" aria-label={textos.abrir.replace(':nombre', documento.nombre)} className="truncate text-campo-formulario text-texto no-underline hover:underline">
                {documento.nombre}
              </a>
              <span className="text-auxiliar text-texto-suave">{`${documento.tipo} · ${documento.fecha}`}</span>
            </div>
            {propio && <BotonIcono icono="eliminar" type="button" aria-label={textos.eliminar.replace(':nombre', documento.nombre)} onClick={() => eliminar(documento.id)} variant="discreto" size="default" />}
          </li>
        ))}
      </ul>
      {!propio && documentos.length > 0 && <p className="m-0 mt-3 text-auxiliar text-texto-suave">{textos.nota_ajeno}</p>}
    </section>
  )
}
