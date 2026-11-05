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

function abreviado(contenido: unknown, maximo: number = superpuesta.maximo_predeterminado): { role: 'img'; 'aria-label': string } | Record<string, never> {
  return typeof contenido === 'number' && contenido > maximo ? { role: 'img', 'aria-label': String(contenido) } : {}
}

export function Insignia(props: InsigniaProps) {
  switch (props.variant) {
    case 'counter': {
      const real = props.children
      const excedido = typeof real === 'number' && real > superpuesta.maximo_predeterminado
      const pildora = <Pildora etiqueta={excedido ? `${superpuesta.maximo_predeterminado}+` : String(real)} clases={[estado.contador.tamanos[props.tamano ?? 'md'], estado.contador.tonos[props.tono ?? 'primario']].join(' ')} />
      return excedido ? <span role="img" aria-label={String(real)} className="inline-flex">{pildora}</span> : pildora
    }

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
          superposicion={props.superposicion}
          variante={props.punto ? 'punto' : 'estandar'}
          slotProps={{ badge: { className: [superpuesta.texto, superpuesta.inerte].join(' '), ...abreviado(props.contenido, props.maximo) } }}
          className={[superpuesta.base, superpuesta.colores[props.color ?? 'primario'], props.compacta ? superpuesta.compacta : '', props.className ?? ''].join(' ').trim()}
        >
          {props.children}
        </CodeplexInsignia>
      )
  }
}
