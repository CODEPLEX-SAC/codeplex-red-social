import { CodeplexCargadorArchivos } from '@codeplex-sac/formularios'
import type { CodeplexArchivoInfo } from '@codeplex-sac/formularios'
import { Icono, imagenEventoPredeterminada as imagenEvento } from '../../componentes/compartido/icono'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import { Boton } from '../../componentes/compartido/interfaz/boton'
import { BotonIcono } from '../../componentes/compartido/interfaz/boton_icono'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { TarjetaFormularioEvento } from './formulario_evento'
import type { AsignadoresFormularioEvento, ValoresFormularioEvento } from './modelo_formulario_evento'

const textos = catalogoEventos.modal_crear_evento
const textosEditar = catalogoEventos.editar_evento

export function SeccionImagenEvento({
  valores,
  asignar,
  conImagenActual,
}: {
  valores: ValoresFormularioEvento
  asignar: AsignadoresFormularioEvento
  conImagenActual: boolean
}) {
  const mostrarActual = valores.imagenActualVisible && valores.imagenes.length === 0

  function agregarImagenes(nuevas: CodeplexArchivoInfo[]) {
    asignar.imagenes(nuevas.slice(-textos.imagen_max_archivos))
  }

  function eliminarImagen(id: string) {
    asignar.imagenes(valores.imagenes.filter((imagen) => imagen.id !== id))
  }

  function ocultarImagenActual() {
    asignar.imagenActualVisible(false)
  }

  return (
    <TarjetaFormularioEvento icono="imagen" titulo={textos.imagen}>
      {mostrarActual && (
        <div className="relative mb-2.5 overflow-hidden rounded-lg">
          <AvatarImagen src={imagenEvento} className="h-40 w-full" />
          <BotonIcono
            icono="cerrar"
            type="button"
            aria-label={textosEditar.quitar_imagen}
            onClick={ocultarImagenActual}
            variant="discreto"
            size="sm"
            className="absolute right-2 top-2 bg-white/90"
          />
        </div>
      )}
      {!mostrarActual && (
        <CodeplexCargadorArchivos
          archivos={valores.imagenes}
          alAgregar={agregarImagenes}
          alEliminar={eliminarImagen}
          tiposAceptados={textos.imagen_tipos}
          tamanoMaximo={textos.imagen_tamano_maximo}
          maxArchivos={textos.imagen_max_archivos}
          textoArrastrar={conImagenActual ? textosEditar.cambiar_imagen : textos.imagen_titulo}
          textoSecundario={textos.imagen_ayuda}
        />
      )}
      {mostrarActual && (
        <Boton type="button" variant="secundario" size="default" className="w-full" onClick={ocultarImagenActual}>
          <Icono name="imagen" className="h-4 w-4" /> {textosEditar.cambiar_imagen}
        </Boton>
      )}
      <p className="m-0 mt-2.5 text-center text-auxiliar text-texto-suave">{textos.imagen_formatos}</p>
    </TarjetaFormularioEvento>
  )
}
