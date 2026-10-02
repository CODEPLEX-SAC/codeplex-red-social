import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import { Icono } from '../../componentes/compartido/icono'
import { Interruptor } from '../../componentes/compartido/interfaz/interruptor'
import { Radio } from '../../componentes/compartido/interfaz/radio'
import { SelectorFecha } from '../../componentes/compartido/interfaz/selector_fecha'
import { SelectorHora } from '../../componentes/compartido/interfaz/selector_hora'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import type {
  AvisoFormularioEventoProps,
  CampoFechaHoraEventoProps,
  CampoFormularioEventoProps,
  FilaInterruptorEventoProps,
  OpcionCostoEventoProps,
  OpcionModalidadEventoProps,
  TarjetaFormularioEventoProps,
} from '@/formularios/eventos/modelo_formulario_evento'

const textos = catalogoEventos.modal_crear_evento

export function TarjetaFormularioEvento({ icono, titulo, opcional, accion, children }: TarjetaFormularioEventoProps) {
  return (
    <section className="rounded-14 border border-t-eeeeee bg-white p-4">
      <div className="mb-3.5 flex items-center gap-2.5">
        <div className="grid h-9 w-9 flex-none place-items-center rounded-control bg-primario-suave text-primario">
          <Icono name={icono} className="h-4.5 w-4.5" />
        </div>
        <h3 className="m-0 min-w-0 flex-1 text-nombre-entidad font-bold text-texto">
          {titulo} {opcional && <span className="font-normal text-texto-suave">{opcional}</span>}
        </h3>
        {accion}
      </div>
      {children}
    </section>
  )
}

export function CampoFormularioEvento({ texto, requerido, ayuda, className, children }: CampoFormularioEventoProps) {
  return (
    <div className={'min-w-0 ' + (className ?? '')}>
      <span className="mb-1.5 block text-cuerpo font-medium text-texto">
        {texto} {requerido && <span className="text-t-e11d48">*</span>}
      </span>
      {children}
      {ayuda && <span className="mt-1 block text-right text-auxiliar text-texto-suave">{ayuda}</span>}
    </div>
  )
}

export function OpcionModalidadEvento({ icono, etiqueta, activa, onElegir }: OpcionModalidadEventoProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={activa}
      onClick={onElegir}
      className={
        'flex h-12 min-w-0 cursor-pointer items-center justify-center gap-2.5 rounded-lg border text-cuerpo font-medium ' +
        (activa ? 'border-primario bg-t-f5f3ff text-primario' : 'border-borde bg-white text-texto hover:border-primario')
      }
    >
      <Icono name={icono} className="h-5 w-5 flex-none" /> {etiqueta}
    </button>
  )
}

export function OpcionCostoEvento({ etiqueta, detalle, activa, onElegir }: OpcionCostoEventoProps) {
  return (
    <div className="flex items-start">
      <Radio checked={activa} onChange={onElegir} inputProps={{ 'aria-label': etiqueta }} sx={{ mt: -0.5 }} />
      <div className="min-w-0 cursor-pointer" onClick={onElegir}>
        <span className="block text-cuerpo text-texto">{etiqueta}</span>
        <span className="block text-auxiliar text-texto-suave">{detalle}</span>
      </div>
    </div>
  )
}

export function FilaInterruptorEvento({ etiqueta, activo, onCambiar }: FilaInterruptorEventoProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2.5 text-cuerpo text-texto">
        <Icono name="configuracion" className="h-4 w-4 text-texto-suave" /> {etiqueta}
      </span>
      <Interruptor seleccionado={activo} alCambiar={(_, valor) => onCambiar(valor)} inputProps={{ 'aria-label': etiqueta }} />
    </div>
  )
}

export function AvisoFormularioEvento({ texto }: AvisoFormularioEventoProps) {
  return (
    <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-t-f5f3ff p-3 text-auxiliar text-primario">
      <Icono name="informacion" className="mt-0.5 h-4 w-4 flex-none" />
      <span>{texto}</span>
    </div>
  )
}

export function CampoFechaHoraEvento({ etiqueta, valorInicial }: CampoFechaHoraEventoProps) {
  const [fecha, setFecha] = useState<Dayjs | null>(valorInicial ?? null)
  const [hora, setHora] = useState<Dayjs | null>(valorInicial ?? null)

  return (
    <CampoFormularioEvento texto={etiqueta} requerido>
      <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-2.5">
        <SelectorFecha valor={fecha} alCambiar={setFecha} marcador={textos.marcador_fecha} formato={textos.formato_fecha} />
        <SelectorHora valor={hora} alCambiar={setHora} marcador={textos.marcador_hora} formato={textos.formato_hora} />
      </div>
    </CampoFormularioEvento>
  )
}
