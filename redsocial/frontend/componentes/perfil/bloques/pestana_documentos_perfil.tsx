import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import { FilaPlaceholderPerfil } from './fila_placeholder_perfil'
import { documentoDesdeArchivo, quitarItem } from './logica_edicion_perfil'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PestanaEditablePerfilProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.documentos
const clases = catalogoPerfil.clases.editor

export function PestanaDocumentosPerfil({ perfil, propio, onGuardar }: PestanaEditablePerfilProps) {
  const entrada = useRef<HTMLInputElement>(null)
  const documentos = perfil.documentos
  const abrirSelector = () => entrada.current?.click()

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
        {propio && <BotonIcono icono="editar-oficial" type="button" aria-label={textos.agregar} onClick={abrirSelector} variant="discreto" size="default" />}
      </div>
      {propio && <input ref={entrada} type="file" multiple accept={textos.tipos_aceptados} aria-label={textos.etiqueta_archivo} onChange={subir} className={clases.oculto} />}
      {!propio && documentos.length === 0 && <p className={clases.vacio_ajeno}>{textos.vacio_ajeno}</p>}
      <ul className={clases.lista}>
        {documentos.map((documento) => (
          <li key={documento.id} className={clases.fila_lista}>
            <span className={`${clases.caja_icono} ${clases.insignia_tipo}`}>{documento.tipo}</span>
            <div className={clases.item_cuerpo}>
              <a href={documento.url} target="_blank" rel="noreferrer" aria-label={textos.abrir.replace(':nombre', documento.nombre)} className="truncate text-campo-formulario text-texto no-underline hover:text-primario">
                <strong>{documento.nombre}</strong>
              </a>
              <span className="text-auxiliar text-texto-suave">{`${documento.tipo} · ${textos.subido.replace(':fecha', documento.fecha)}`}</span>
            </div>
            {propio && <BotonIcono icono="eliminar" type="button" aria-label={textos.eliminar.replace(':nombre', documento.nombre)} onClick={() => eliminar(documento.id)} variant="discreto" size="default" />}
          </li>
        ))}
      </ul>
      {propio && documentos.length > 0 && (
        <Boton type="button" variant="contorno" size="md" onClick={abrirSelector} className="mt-3">
          {textos.agregar}
        </Boton>
      )}
      {propio && documentos.length === 0 && (
        <>
          <FilaPlaceholderPerfil etiqueta={textos.subir_cv} accesible={textos.subir_cv} detalle={textos.subir_cv_detalle} icono="mas" onClick={abrirSelector} />
          <FilaPlaceholderPerfil etiqueta={textos.subir_titulo} accesible={textos.subir_titulo} detalle={textos.subir_titulo_detalle} icono="mas" onClick={abrirSelector} />
        </>
      )}
    </section>
  )
}
