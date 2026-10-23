import { useState } from 'react'
import { BotonIcono } from './boton_icono'
import { Icono } from '../icono'
import type { BannerInformativoProps } from '@/tipos/compartido/contrato_banner_informativo'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.banner_informativo

export function BannerInformativo({ icono, descripcion, titulo, variante = 'destacado', iconoCuadrado, etiquetaCerrar, className }: BannerInformativoProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  const raiz = [clases[variante].contenedor, className].filter(Boolean).join(' ')

  if (variante === 'nota') {
    return (
      <div className={raiz}>
        <Icono name={icono} className={clases.nota.icono} />
        <p className={clases.nota.texto}>{descripcion}</p>
      </div>
    )
  }

  return (
    <div className={raiz}>
      <span className={[clases.destacado.icono_caja, iconoCuadrado ? clases.destacado.icono_cuadrado : clases.destacado.icono_circular].join(' ')}>
        <Icono name={icono} className={clases.destacado.icono} />
      </span>
      <div className={clases.destacado.cuerpo}>
        {titulo && <strong className={clases.destacado.titulo}>{titulo}</strong>}
        <p className={clases.destacado.texto}>{descripcion}</p>
      </div>
      {etiquetaCerrar && <BotonIcono icono="cerrar" type="button" aria-label={etiquetaCerrar} onClick={() => setVisible(false)} variant="discreto" size="sm" className={clases.destacado.cerrar} />}
    </div>
  )
}
