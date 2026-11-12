import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import { CampoEtiquetado } from '../../componentes/compartido/interfaz/campo_etiquetado'
import { SelectorFecha } from '../../componentes/compartido/interfaz/selector_fecha'
import { SelectorHora } from '../../componentes/compartido/interfaz/selector_hora'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import type { CampoFechaHoraEventoProps } from '@/formularios/eventos/modelo_formulario_evento'

const textos = catalogoEventos.modal_crear_evento

export function CampoFechaHoraEvento({ etiqueta, valorInicial }: CampoFechaHoraEventoProps) {
  const [fecha, setFecha] = useState<Dayjs | null>(valorInicial ?? null)
  const [hora, setHora] = useState<Dayjs | null>(valorInicial ?? null)

  return (
    <CampoEtiquetado etiqueta={etiqueta} requerido>
      <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-2.5">
        <SelectorFecha valor={fecha} alCambiar={setFecha} marcador={textos.marcador_fecha} formato={textos.formato_fecha} />
        <SelectorHora valor={hora} alCambiar={setHora} marcador={textos.marcador_hora} formato={textos.formato_hora} />
      </div>
    </CampoEtiquetado>
  )
}
