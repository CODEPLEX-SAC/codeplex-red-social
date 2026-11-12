import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { TarjetaFormularioEvento } from './formulario_evento'
import { NotaFormularioEvento } from './aviso_formulario_evento'

const textos = catalogoEventos.modal_crear_evento

export function SeccionOrganizadorEvento() {
  return (
    <TarjetaFormularioEvento icono="grupos" titulo={textos.organizador}>
      <div>
        <span className="block text-nombre-entidad text-texto">{textos.organizador_nombre}</span>
        <span className="block text-auxiliar text-texto-suave">{textos.organizador_detalle}</span>
      </div>
      <NotaFormularioEvento texto={textos.organizador_aviso} />
    </TarjetaFormularioEvento>
  )
}
