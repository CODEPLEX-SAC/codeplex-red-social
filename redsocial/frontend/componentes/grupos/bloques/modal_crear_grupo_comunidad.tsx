import { Icono } from '../../compartido/icono'
import { Boton, clasesBoton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Interruptor } from '../../compartido/interfaz/interruptor'
import { Modal } from '../../compartido/interfaz/modal'
import { usarCrearGrupoComunidad } from './usar_crear_grupo_comunidad'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ModalCrearGrupoComunidadProps } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.crear
const clases = catalogoGrupos.clases.crear

export function ModalCrearGrupoComunidad({ imagen, puerto, grupo, onCerrar }: ModalCrearGrupoComunidadProps) {
  const estado = usarCrearGrupoComunidad({ puerto, grupo, onCerrar })
  const editando = grupo !== undefined
  const titulo = editando ? textos.titulo_editar : textos.titulo
  const contador = textos.contador.replace(':n', String(estado.descripcion.length)).replace(':max', String(textos.maximo_descripcion))

  function enviar(evento: React.FormEvent) {
    evento.preventDefault()
    estado.enviar()
  }

  if (estado.creado) {
    return (
      <Modal titulo={textos.creado_titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className={clases.dialogo}>
        <div className={clases.exito}>
          <span className={clases.exito_icono}>
            <Icono name="marcar-leido" className="h-7 w-7" />
          </span>
          <h2 className={clases.titulo}>{textos.creado_titulo}</h2>
          <p aria-live="polite" className={clases.ayuda}>
            {textos.creado_texto.replace(':nombre', estado.creado.nombre)}
          </p>
          <div className={clases.pie}>
            <Boton type="button" variant="secundario" size="cta" onClick={onCerrar}>
              {textos.cerrar_confirmacion}
            </Boton>
            <a href={estado.creado.ruta} className={clasesBoton({ variant: 'primario', size: 'cta' })}>
              {textos.ver_grupo}
            </a>
          </div>
        </div>
      </Modal>
    )
  }

  const cabecera = (
    <div className={clases.cabecera}>
      <span className={clases.icono}>
        <Icono name="grupo" className="h-6 w-6" />
      </span>
      <div className={clases.titulos}>
        <h2 className={clases.titulo}>{titulo}</h2>
        {!editando && <p className={clases.subtitulo}>{textos.subtitulo}</p>}
      </div>
      <BotonIcono icono="cerrar" type="button" aria-label={textos.cerrar} variant="discreto" size="default" onClick={onCerrar} />
    </div>
  )

  return (
    <Modal titulo={titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className={clases.dialogo} cabecera={cabecera}>
      <form onSubmit={enviar} noValidate className={clases.formulario}>
        {!editando && imagen !== String() && <img src={imagen} alt="" className={clases.ilustracion} />}
        <CampoEtiquetado variante="compacta" etiqueta={textos.nombre} requerido>
          <CampoTexto valor={estado.nombre} alCambiar={estado.cambiarNombre} error={estado.errorNombre} mensajeError={estado.errorNombre ? textos.error_nombre : undefined} inputProps={{ 'aria-label': textos.nombre }} anchoCompleto />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" etiqueta={textos.descripcion}>
          <CampoTexto valor={estado.descripcion} alCambiar={estado.cambiarDescripcion} multilinea filas={4} longitudMaxima={textos.maximo_descripcion} inputProps={{ 'aria-label': textos.descripcion }} anchoCompleto />
          <span className={clases.contador}>{contador}</span>
        </CampoEtiquetado>
        {!editando && (
          <div className={clases.invitar}>
            <span className={clases.invitar_icono}>
              <Icono name="amigos" className="h-5 w-5" />
            </span>
            <div className={clases.invitar_textos}>
              <strong className={clases.invitar_titulo}>{textos.invitar_seguidores}</strong>
              <p className={clases.ayuda}>{textos.invitar_ayuda}</p>
            </div>
            <Interruptor seleccionado={estado.invitarSeguidores} alCambiar={(_, marcado) => estado.alternarSeguidores(marcado)} etiqueta={<span className="sr-only">{textos.invitar_seguidores}</span>} />
          </div>
        )}
        {!editando && estado.invitarSeguidores && <p className={clases.ayuda}>{textos.sin_seguidores}</p>}
        <div className={clases.pie}>
          <Boton type="button" variant="secundario" size="cta" onClick={onCerrar}>
            {textos.cancelar}
          </Boton>
          <Boton type="submit" variant="primario" size="cta">
            {editando ? textos.guardar : <><Icono name="mas" className="h-4 w-4" /> {textos.boton}</>}
          </Boton>
        </div>
      </form>
    </Modal>
  )
}
