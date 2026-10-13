import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Icono } from '../../compartido/icono'
import type { CaracteristicaPlan } from '@/tipos/marketplace/modelo_planes'

const textos = catalogoMarketplace.planes

export function ItemCaracteristica({
  caracteristica,
  claseIconoIncluido,
  claseAtenuada,
  conDetalle,
  alAbrirDetalle,
}: {
  caracteristica: CaracteristicaPlan
  claseIconoIncluido: string
  claseAtenuada: string
  conDetalle: boolean
  alAbrirDetalle: (texto: string) => void
}) {
  const incluida = caracteristica.estado === 'incluido'
  const excluida = caracteristica.estado === 'excluido'
  const clasesExcluida = [textos.clases.excluida, claseAtenuada].join(' ')
  const claseTexto = [textos.clases.texto, excluida ? clasesExcluida : undefined, caracteristica.enfasis ? textos.clases.enfasis : undefined].join(' ')

  return (
    <li className="flex items-start gap-1.5 text-auxiliar">
      {caracteristica.estado === 'neutro' ? (
        <span className="h-3.5 w-3.5 flex-none" />
      ) : (
        <>
          <Icono name={incluida ? 'verificado' : 'cerrar'} className={`mt-px h-3.5 w-3.5 flex-none ${incluida ? claseIconoIncluido : claseAtenuada}`} />
          <span className="sr-only">{incluida ? textos.incluido : textos.no_incluido}</span>
        </>
      )}
      {conDetalle ? (
        <button type="button" aria-haspopup={textos.ventana_detalle as 'dialog'} onClick={() => alAbrirDetalle(caracteristica.texto)} className={`${claseTexto} ${textos.clases.detalle}`}>
          {caracteristica.texto}
        </button>
      ) : (
        <span className={claseTexto}>{caracteristica.texto}</span>
      )}
    </li>
  )
}
