import dayjs from 'dayjs'
import { CodeplexProveedorFechas } from '@codeplex-sac/selectores-fecha'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { CuerpoFormularioEvento } from '../../../formularios/eventos/cuerpo_formulario_evento'
import { usarFormularioEvento } from '../../../formularios/eventos/usar_formulario_evento'
import { valoresDeEvento } from '../../../formularios/eventos/valores_formulario_evento'
import type { EditarEventoProps } from '@/tipos/eventos/contrato_editar_evento'

const textos = catalogoEventos.modal_crear_evento
const textosEditar = catalogoEventos.editar_evento

export function EditarEvento({ evento, estiloInsignia, etiquetaInsignia, onVolver }: EditarEventoProps) {
  const { valores, asignar } = usarFormularioEvento(valoresDeEvento(evento))
  const detalle = evento.edicion

  return (
    <ProveedorTemaGraficos>
      <CodeplexProveedorFechas idioma={textos.idioma}>
        <section>
          <button type="button" onClick={onVolver} className="mb-4 flex items-center gap-1.5 border-0 bg-transparent p-0 text-cuerpo font-semibold text-primario hover:underline">
            <Icono name="flecha-izquierda" className="h-3.5 w-3.5" /> {textosEditar.volver}
          </button>

          <div className="mb-1 flex flex-wrap items-center gap-2.5">
            <h1 className="m-0 text-titulo-pagina font-extrabold text-texto">{textosEditar.titulo}</h1>
            <span className={'inline-block w-fit rounded text-etiqueta-estado font-bold uppercase tracking-wide px-2 py-0.75 ' + estiloInsignia}>
              {etiquetaInsignia}
            </span>
            <span className="text-titulo-pagina font-extrabold text-texto-suave">{evento.nombre}</span>
          </div>
          <p className="m-0 mb-5 text-subtitulo text-texto-suave">{textosEditar.subtitulo}</p>

          <CuerpoFormularioEvento
            valores={valores}
            asignar={asignar}
            inicio={detalle ? dayjs(detalle.inicioISO) : undefined}
            fin={detalle ? dayjs(detalle.finISO) : undefined}
            conImagenActual
            className="@container grid grid-cols-1 items-start gap-4 @3xl:grid-cols-[minmax(0,1fr)_22rem]"
          />

          <div className="mt-5 flex items-center justify-between gap-3 max-600:flex-col-reverse max-600:items-stretch">
            <Boton type="button" variant="secundario" size="md" onClick={onVolver} className="border-t-e11d48 text-t-e11d48">
              <Icono name="eliminar" className="h-4 w-4" /> {textosEditar.eliminar_borrador}
            </Boton>
            <div className="flex items-center gap-3 max-600:flex-col-reverse max-600:items-stretch">
              <Boton type="button" variant="secundario" size="md" onClick={onVolver}>{textos.cancelar}</Boton>
              <Boton type="button" variant="secundario" size="md" onClick={onVolver} className="border-primario text-primario">{textosEditar.guardar_cambios}</Boton>
              <Boton type="button" variant="primario" size="md" onClick={onVolver}>{textos.publicar}</Boton>
            </div>
          </div>
        </section>
      </CodeplexProveedorFechas>
    </ProveedorTemaGraficos>
  )
}
