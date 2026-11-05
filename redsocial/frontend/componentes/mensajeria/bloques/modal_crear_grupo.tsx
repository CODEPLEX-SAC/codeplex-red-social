import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Icono, imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Modal } from '../../compartido/interfaz/modal'
import { nombreDeGrupoRepetido } from './logica_grupos_mensajeria'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ModalCrearGrupoProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'

const clases = catalogoMensajeria.clases.lista
const textos = catalogoMensajeria.grupos.modal
const tiposImagen = textos.tipos_aceptados.split(',')

function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

export function ModalCrearGrupo({ participantes, nombresExistentes, onCrear, onCerrar }: ModalCrearGrupoProps) {
  const selectorArchivos = useRef<HTMLInputElement>(null)
  const [consulta, setConsulta] = useState('')
  const [elegidos, setElegidos] = useState<readonly string[]>([])
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imagen, setImagen] = useState<string | null>(null)
  const [error, setError] = useState<{ campo: 'nombre' | 'imagen'; mensaje: string } | null>(null)
  const habilitado = elegidos.length > 0
  const buscado = normalizar(consulta)
  const resultados = buscado ? participantes.filter((persona) => !elegidos.includes(persona.id) && normalizar(persona.nombre).includes(buscado)) : []
  const seleccionados = elegidos.flatMap((id) => participantes.filter((persona) => persona.id === id))

  function agregar(id: string) {
    setElegidos((actual) => [...actual, id])
    setConsulta('')
  }

  function elegirImagen(evento: ChangeEvent<HTMLInputElement>) {
    const archivo = evento.target.files?.[0]
    evento.target.value = ''
    if (!archivo) return
    if (!tiposImagen.includes(archivo.type)) {
      setError({ campo: 'imagen', mensaje: textos.errores.imagen_invalida })
      return
    }
    setImagen(URL.createObjectURL(archivo))
    setError((actual) => (actual?.campo === 'imagen' ? null : actual))
  }

  function crear() {
    const limpio = nombre.trim()
    if (!limpio) return setError({ campo: 'nombre', mensaje: textos.errores.nombre_vacio })
    if (nombreDeGrupoRepetido(nombresExistentes, limpio)) return setError({ campo: 'nombre', mensaje: textos.errores.nombre_repetido })
    onCrear({ nombre: limpio, descripcion: descripcion.trim(), imagen, participantes: elegidos })
  }

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className={clases.grupo_modal}>
      <div className={clases.grupo_formulario}>
        <div className={clases.grupo_seccion}>
          <CampoEtiquetado etiqueta={textos.participantes} requerido>
            <CampoBusqueda placeholder={textos.buscar} aria-label={textos.buscar} value={consulta} onChange={(evento) => setConsulta(evento.target.value)} />
          </CampoEtiquetado>
          {buscado && (
            resultados.length > 0 ? (
              <ul className={clases.grupo_resultados} aria-label={textos.participantes}>
                {resultados.map((persona) => (
                  <li key={persona.id}>
                    <Boton type="button" variant="fantasma" size="enlace" aria-label={textos.agregar.replace(':nombre', persona.nombre)} className={clases.grupo_resultado} onClick={() => agregar(persona.id)}>
                      <AvatarUsuario tamano="sm" imagen={usuarioImg} />
                      <span className={clases.grupo_resultado_nombre}>{persona.nombre}</span>
                      <Icono name="mas" className={clases.grupo_resultado_glifo} />
                    </Boton>
                  </li>
                ))}
              </ul>
            ) : <p className={clases.vacia}>{textos.buscar_vacio}</p>
          )}
          {seleccionados.length > 0 ? (
            <ul className={clases.grupo_chips}>
              {seleccionados.map((persona) => (
                <li key={persona.id}>
                  <Boton type="button" variant="filtro" size="filtro" aria-label={textos.quitar.replace(':nombre', persona.nombre)} onClick={() => setElegidos((actual) => actual.filter((id) => id !== persona.id))}>
                    {persona.nombre}
                    <Icono name="cerrar" className={clases.grupo_chip_glifo} />
                  </Boton>
                </li>
              ))}
            </ul>
          ) : <p className={clases.grupo_ayuda}>{textos.participantes_ayuda}</p>}
        </div>
        <div className={clases.grupo_identidad}>
          <div className={clases.grupo_avatar}>
            <AvatarUsuario tamano="xl" icono="grupo" tono="solido" imagen={imagen ?? undefined} />
            <BotonIcono icono="camara" type="button" variant="flotante" size="md" disabled={!habilitado} aria-label={textos.imagen_elegir} title={textos.imagen_elegir} className={clases.grupo_camara} onClick={() => selectorArchivos.current?.click()} />
            <input ref={selectorArchivos} type="file" hidden tabIndex={-1} aria-label={textos.imagen_elegir} accept={textos.tipos_aceptados} onChange={elegirImagen} />
          </div>
          <CampoEtiquetado etiqueta={textos.nombre} requerido para={textos.id_nombre} className={clases.grupo_nombre}>
            <CampoTexto
              id={textos.id_nombre}
              anchoCompleto
              deshabilitado={!habilitado}
              marcador={textos.nombre_marcador}
              valor={nombre}
              alCambiar={(valor) => {
                setNombre(valor)
                setError((actual) => (actual?.campo === 'nombre' ? null : actual))
              }}
              error={error?.campo === 'nombre'}
              mensajeError={error?.campo === 'nombre' ? error.mensaje : undefined}
            />
          </CampoEtiquetado>
        </div>
        {error?.campo === 'imagen' && <p role="alert" className={clases.grupo_error}>{error.mensaje}</p>}
        <CampoEtiquetado etiqueta={textos.descripcion}>
          <CampoTexto anchoCompleto multilinea filasMinimas={3} deshabilitado={!habilitado} inputProps={{ 'aria-label': textos.descripcion }} marcador={textos.descripcion_marcador} valor={descripcion} alCambiar={setDescripcion} />
        </CampoEtiquetado>
      </div>
      <div className={clases.grupo_pie}>
        <Boton type="button" variant="secundario" size="md" onClick={onCerrar}>{textos.cancelar}</Boton>
        <Boton type="button" variant="primario" size="md" disabled={!habilitado} onClick={crear}>{textos.confirmar}</Boton>
      </div>
    </Modal>
  )
}
