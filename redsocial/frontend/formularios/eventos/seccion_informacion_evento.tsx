import type { Dayjs } from 'dayjs'
import { Icono } from '../../componentes/compartido/icono'
import { CampoTexto } from '../../componentes/compartido/interfaz/campo_texto'
import { Selector } from '../../componentes/compartido/interfaz/selector'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { CampoFechaHoraEvento, CampoFormularioEvento, OpcionModalidadEvento, TarjetaFormularioEvento } from './formulario_evento'
import type { AsignadoresFormularioEvento, OpcionModalidadCatalogo, ValoresFormularioEvento } from './modelo_formulario_evento'

const textos = catalogoEventos.modal_crear_evento
const modalidades = textos.modalidad_opciones as OpcionModalidadCatalogo[]

export function SeccionInformacionEvento({
  valores,
  asignar,
  inicio,
  fin,
}: {
  valores: ValoresFormularioEvento
  asignar: AsignadoresFormularioEvento
  inicio?: Dayjs
  fin?: Dayjs
}) {
  const elegir = (asignarCampo: (valor: string) => void) => (evento: { target: { value: unknown } }) => asignarCampo(String(evento.target.value))

  return (
    <TarjetaFormularioEvento icono="documento" titulo={textos.informacion}>
      <div className="flex flex-col gap-4">
        <CampoFormularioEvento texto={textos.titulo_evento} requerido ayuda={[valores.titulo.length, textos.separador_limite, 100].join('')}>
          <CampoTexto anchoCompleto valor={valores.titulo} longitudMaxima={100} alCambiar={asignar.titulo} marcador={textos.placeholder_titulo} />
        </CampoFormularioEvento>
        <CampoFormularioEvento texto={textos.descripcion} requerido ayuda={[valores.descripcion.length, textos.separador_limite, 500].join('')}>
          <CampoTexto anchoCompleto multilinea filasMinimas={4} valor={valores.descripcion} longitudMaxima={500} alCambiar={asignar.descripcion} marcador={textos.placeholder_descripcion} />
        </CampoFormularioEvento>
        <div className="grid grid-cols-2 gap-4 max-600:grid-cols-1">
          <CampoFormularioEvento texto={textos.categoria} requerido>
            <Selector variant="colaboradores" value={valores.categoria} onChange={elegir(asignar.categoria)} placeholder={textos.placeholder_categoria}>
              {textos.categorias.map((opcion) => <option key={opcion}>{opcion}</option>)}
            </Selector>
          </CampoFormularioEvento>
          <CampoFormularioEvento texto={textos.tipo} requerido>
            <Selector variant="colaboradores" value={valores.tipo} onChange={elegir(asignar.tipo)} placeholder={textos.placeholder_tipo}>
              {textos.tipos.map((opcion) => <option key={opcion}>{opcion}</option>)}
            </Selector>
          </CampoFormularioEvento>
          <CampoFechaHoraEvento etiqueta={textos.inicio} valorInicial={inicio} />
          <CampoFechaHoraEvento etiqueta={textos.fin} valorInicial={fin} />
        </div>
        <CampoFormularioEvento texto={textos.ubicacion} requerido>
          <CampoTexto anchoCompleto valor={valores.ubicacion} alCambiar={asignar.ubicacion} marcador={textos.placeholder_ubicacion} iconoInicio={<Icono name="ubicacion" className="h-4 w-4" />} />
        </CampoFormularioEvento>
        <CampoFormularioEvento texto={textos.modalidad} requerido>
          <div role="radiogroup" aria-label={textos.modalidad} className="grid grid-cols-3 gap-3 max-600:grid-cols-1">
            {modalidades.map((opcion) => (
              <OpcionModalidadEvento key={opcion.valor} icono={opcion.icono} etiqueta={opcion.etiqueta} activa={valores.modalidad === opcion.valor} onElegir={() => asignar.modalidad(opcion.valor)} />
            ))}
          </div>
        </CampoFormularioEvento>
      </div>
    </TarjetaFormularioEvento>
  )
}
