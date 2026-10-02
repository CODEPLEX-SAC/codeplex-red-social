import { CampoTexto } from '../../componentes/compartido/interfaz/campo_texto'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { AvisoFormularioEvento, FilaInterruptorEvento, TarjetaFormularioEvento } from './formulario_evento'
import type { AsignadoresFormularioEvento, ValoresFormularioEvento } from './modelo_formulario_evento'

const textos = catalogoEventos.modal_crear_evento

export function SeccionOrganizadorEvento() {
  return (
    <TarjetaFormularioEvento icono="grupos" titulo={textos.organizador}>
      <div>
        <span className="block text-nombre-entidad font-bold text-texto">{textos.organizador_nombre}</span>
        <span className="block text-auxiliar text-texto-suave">{textos.organizador_detalle}</span>
      </div>
      <AvisoFormularioEvento texto={textos.organizador_aviso} />
    </TarjetaFormularioEvento>
  )
}

export function SeccionConfiguracionEvento({ valores, asignar }: { valores: ValoresFormularioEvento; asignar: AsignadoresFormularioEvento }) {
  return (
    <TarjetaFormularioEvento icono="configuracion" titulo={textos.configuracion}>
      <div className="flex flex-col gap-1">
        <FilaInterruptorEvento etiqueta={textos.permitir_inscripciones} activo={valores.inscripciones} onCambiar={asignar.inscripciones} />
        <FilaInterruptorEvento etiqueta={textos.mostrar_calendario} activo={valores.calendarioPublico} onCambiar={asignar.calendarioPublico} />
        <FilaInterruptorEvento etiqueta={textos.permitir_comentarios} activo={valores.comentarios} onCambiar={asignar.comentarios} />
      </div>
      <div className="mt-4 border-t border-t-f0eef5 pt-4">
        <h4 className="m-0 mb-2 text-nombre-entidad font-bold text-texto">{textos.enlace} <span className="font-normal text-texto-suave">{textos.opcional}</span></h4>
        <CampoTexto anchoCompleto valor={valores.enlace} alCambiar={asignar.enlace} marcador={textos.enlace_marcador} />
        <span className="mt-1 block text-auxiliar text-texto-suave">{textos.enlace_ayuda}</span>
      </div>
      <div className="mt-4 border-t border-t-f0eef5 pt-4">
        <h4 className="m-0 mb-2 text-nombre-entidad font-bold text-texto">{textos.etiquetas} <span className="font-normal text-texto-suave">{textos.opcional}</span></h4>
        <CampoTexto anchoCompleto valor={valores.etiquetas} alCambiar={asignar.etiquetas} marcador={textos.etiquetas_marcador} />
        <span className="mt-1 block text-auxiliar text-texto-suave">{textos.etiquetas_ayuda}</span>
      </div>
      <AvisoFormularioEvento texto={textos.configuracion_aviso} />
    </TarjetaFormularioEvento>
  )
}
