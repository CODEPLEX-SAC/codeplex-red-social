import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { Pestanas } from '../../compartido/interfaz/pestanas'
import { fondoDe } from './logica_historia'
import { fondosDeTipo, tiposFondoDisponibles } from './logica_fondos_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ControlesFondoHistoriaProps } from '@/tipos/inicio/contrato_historia'
import type { FondoHistoria, TipoFondoHistoria } from '@/tipos/inicio/modelo_historia'

const textos = catalogoInicio.historias.flujo.editor
const clases = catalogoInicio.historias.flujo.clases

function MuestraFondo({ fondo, activo, onElegir }: { fondo: FondoHistoria; activo: boolean; onElegir: (id: string) => void }) {
  const elegir = () => onElegir(fondo.id)
  const etiqueta = textos.muestra_fondo.replace(':nombre', fondo.etiqueta)

  return (
    <li>
      <Boton type="button" variant="fantasma" size="enlace" aria-label={etiqueta} title={etiqueta} aria-pressed={activo} onClick={elegir} className={`${clases.muestra} ${fondo.clase} ${activo ? clases.muestra_activa : ''}`} />
    </li>
  )
}

export function ControlesFondoHistoria({ fondoId, onCambiar }: ControlesFondoHistoriaProps) {
  const [tipo, setTipo] = useState<TipoFondoHistoria>(fondoDe(fondoId).tipo)

  return (
    <section className={clases.seccion_control}>
      <h3 className={clases.titulo_control}>{textos.etiqueta_fondos}</h3>
      <nav aria-label={textos.etiqueta_pestanas_fondo}>
        <Pestanas elementos={tiposFondoDisponibles()} activa={tipo} alCambiar={(clave) => setTipo(clave as TipoFondoHistoria)} />
      </nav>
      <ul className={clases.muestras}>
        {fondosDeTipo(tipo).map((fondo) => (
          <MuestraFondo key={fondo.id} fondo={fondo} activo={fondo.id === fondoId} onElegir={onCambiar} />
        ))}
      </ul>
    </section>
  )
}
