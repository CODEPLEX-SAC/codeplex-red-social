import { CampoNumero } from '../../componentes/compartido/interfaz/campo_numero'
import { Interruptor } from '../../componentes/compartido/interfaz/interruptor'
import { Radio } from '../../componentes/compartido/interfaz/radio'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { CampoFormularioEvento, OpcionCostoEvento, TarjetaFormularioEvento } from './formulario_evento'
import type { AsignadoresFormularioEvento, ValoresFormularioEvento } from './modelo_formulario_evento'

const textos = catalogoEventos.modal_crear_evento

export function SeccionCostoLimiteEvento({ valores, asignar }: { valores: ValoresFormularioEvento; asignar: AsignadoresFormularioEvento }) {
  return (
    <div className="grid grid-cols-2 gap-4 max-600:grid-cols-1">
      <TarjetaFormularioEvento icono="tarjeta-pago" titulo={textos.costo}>
        <div className="flex flex-col gap-2.5">
          {textos.costo_opciones.map((opcion) => (
            <OpcionCostoEvento key={opcion.valor} etiqueta={opcion.etiqueta} detalle={opcion.detalle} activa={valores.costo === opcion.valor} onElegir={() => asignar.costo(opcion.valor)} />
          ))}
        </div>
      </TarjetaFormularioEvento>
      <TarjetaFormularioEvento
        icono="grupos"
        titulo={textos.limite}
        accion={<Interruptor seleccionado={valores.limiteActivo} alCambiar={(_, valor) => asignar.limiteActivo(valor)} inputProps={{ 'aria-label': textos.limite }} />}
      >
        <div className="flex items-center">
          <Radio checked={valores.limiteActivo} onChange={() => asignar.limiteActivo(!valores.limiteActivo)} inputProps={{ 'aria-label': textos.limite_texto }} edge="start" />
          <span className="text-cuerpo text-texto-suave">{textos.limite_texto}</span>
        </div>
        <CampoFormularioEvento texto={textos.limite_numero} requerido className="mt-2">
          <CampoNumero anchoCompleto deshabilitado={!valores.limiteActivo} minimo={textos.limite_minimo} valor={valores.limite} alCambiar={asignar.limite} mostrarControles={false} />
        </CampoFormularioEvento>
      </TarjetaFormularioEvento>
    </div>
  )
}
