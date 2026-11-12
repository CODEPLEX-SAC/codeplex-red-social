import { AlertaEstado } from '../../compartido/interfaz/alerta_estado'
import { Icono, imagenUsuarioPredeterminada as usuarioImg, AvatarUsuario, Boton, BotonIcono, CampoBusqueda, CampoEtiquetado, CampoTexto, MensajeEstadoBusqueda } from '../../compartido'
import { Modal } from '../../compartido/interfaz/modal'
import { usarModalCrearGrupo } from './usar_modal_crear_grupo'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ModalCrearGrupoProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'

const clases = catalogoMensajeria.clases.lista
const textos = catalogoMensajeria.grupos.modal

export function ModalCrearGrupo(props: ModalCrearGrupoProps) {
  const { onCerrar } = props
  const { selectorArchivos, nombre, descripcion, imagen, error, habilitado, busqueda, buscado, resultados, seleccionados, setDescripcion, cambiarNombre, quitar, agregar, elegirImagen, crear } = usarModalCrearGrupo(props)

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className={clases.grupo_modal}>
      <div className={clases.grupo_formulario}>
        <div className={clases.grupo_seccion}>
          <CampoEtiquetado etiqueta={textos.participantes} requerido>
            <CampoBusqueda placeholder={textos.buscar} aria-label={textos.buscar} value={busqueda.texto} onChange={(evento) => busqueda.cambiarTexto(evento.target.value)} />
          </CampoEtiquetado>
          <MensajeEstadoBusqueda estado={busqueda.estado} error={busqueda.error} sinCoincidencias={false} />
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
            ) : busqueda.estado === 'sin_coincidencias' ? <p className={clases.vacia}>{textos.buscar_vacio}</p> : null
          )}
          {seleccionados.length > 0 ? (
            <ul className={clases.grupo_chips}>
              {seleccionados.map((persona) => (
                <li key={persona.id}>
                  <Boton type="button" variant="filtro" size="filtro" aria-label={textos.quitar.replace(':nombre', persona.nombre)} onClick={() => quitar(persona.id)}>
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
              alCambiar={cambiarNombre}
              error={error?.campo === 'nombre'}
              mensajeError={error?.campo === 'nombre' ? error.mensaje : undefined}
            />
          </CampoEtiquetado>
        </div>
        {error?.campo === 'imagen' && <AlertaEstado className={clases.grupo_error}>{error.mensaje}</AlertaEstado>}
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
