import { CodeplexEstadoBadge, CodeplexInsignia } from '@codeplex-sac/ui'
import type { InsigniaProps } from '@/tipos/compartido/contrato_insignia'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const mapaPrivacidad: Record<'publico' | 'privado', string> = catalogoCompartido.insignia_privacidad
const estado = catalogoCompartido.insignia_estado
const superpuesta = catalogoCompartido.insignia_superpuesta
const puntos: Record<string, string> = estado.puntos

function Pildora({ etiqueta, clases, punto }: { etiqueta: string; clases: string; punto?: string }) {
  const clasePunto = punto === undefined ? undefined : puntos[punto]
  return <CodeplexEstadoBadge etiqueta={etiqueta} variante="neutro" mostrarPunto={clasePunto !== undefined} className={[clases, clasePunto ?? ''].join(' ').trim()} sx={estado.sx} />
}

export function Insignia(props: InsigniaProps) {
  switch (props.variant) {
    case 'counter':
      return <Pildora etiqueta={String(props.children)} clases={[estado.contador.tamanos[props.tamano ?? 'md'], estado.contador.tonos[props.tono ?? 'primario']].join(' ')} />

    case 'status':
      return <Pildora etiqueta={props.children} clases={[estado.pildora, props.className].join(' ')} punto={props.punto} />

    case 'privacy':
      return <Pildora etiqueta={props.children} clases={[estado.privacidad, mapaPrivacidad[props.tone]].join(' ')} />

    case 'privado':
      return <Pildora etiqueta={props.children} clases={estado.privado} />

    case 'superpuesta':
      return (
        <CodeplexInsignia
          contenido={props.contenido}
          color={props.color ?? 'primario'}
          maximo={props.maximo}
          slotProps={{ badge: { className: superpuesta.texto } }}
          className={[superpuesta.base, superpuesta.colores[props.color ?? 'primario'], props.className ?? ''].join(' ').trim()}
        >
          {props.children}
        </CodeplexInsignia>
      )
  }
}
