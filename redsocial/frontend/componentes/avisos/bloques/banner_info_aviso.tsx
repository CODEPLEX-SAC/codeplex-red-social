import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { useState } from 'react'
import { Icono } from '../../compartido/icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { BannerInfoAvisoProps } from '@/tipos/avisos/contrato_banner_info_aviso'

export function BannerInfoAviso({ icono, titulo, descripcion, cuadrado }: BannerInfoAvisoProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="mb-4 flex items-start gap-3 rounded-xl border border-t-e4dfff bg-t-f3f0ff p-3.5">
      <span className={'grid h-9 w-9 flex-none place-items-center bg-primario text-white ' + (cuadrado ? 'rounded-lg' : 'rounded-full')}>
        <Icono name={icono} className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <strong className="block text-subtitulo text-texto">{titulo}</strong>
        <p className="m-0 mt-0.5 text-cuerpo leading-1.4 text-texto-suave">{descripcion}</p>
      </div>
      <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={() => setVisible(false)} variant="discreto" size="sm" className="flex-none" />
    </div>
  )
}
