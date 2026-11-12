import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { Icono } from '../../componentes/compartido/icono'
import type { TarjetaFormularioEventoProps } from '@/formularios/eventos/modelo_formulario_evento'

const clases = catalogoEventos.clases_formulario_evento

export function TarjetaFormularioEvento({ icono, titulo, opcional, accion, children }: TarjetaFormularioEventoProps) {
  return (
    <section className={clases.tarjeta}>
      <div className={clases.cabecera}>
        <div className={clases.icono_caja}>
          <Icono name={icono} className={clases.icono} />
        </div>
        <h3 className={clases.titulo}>
          {titulo} {opcional && <span className={clases.opcional}>{opcional}</span>}
        </h3>
        {accion}
      </div>
      {children}
    </section>
  )
}
