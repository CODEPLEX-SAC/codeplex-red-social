import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'

export function CampoResumenInvitacion({ etiqueta, valor, ancho }: { etiqueta: string; valor: string; ancho?: 'completo' }) {
  return (
    <div className={'flex flex-col gap-0.5 ' + (ancho === 'completo' ? 'col-span-2' : '')}>
      <span className="text-auxiliar text-texto-suave">{etiqueta}</span>
      <span className="break-words text-campo-formulario text-texto">{valor}</span>
    </div>
  )
}

export function FilaCorreoInvitacion({ icono, etiqueta, valor }: { icono: IconName; etiqueta: string; valor: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-borde-suave py-2 last:border-b-0">
      <Icono name={icono} className="w-4.5 h-4.5 flex-none text-primario" />
      <span className="min-w-25 text-auxiliar text-texto-suave">{etiqueta}</span>
      <span className="min-w-0 break-words text-campo-formulario text-texto">{valor}</span>
    </div>
  )
}

export function NotaAceptacionInvitacion() {
  return (
    <div className="mx-7 mb-6 flex items-start gap-2 rounded-lg border border-borde-info-suave bg-fondo-info-suave px-4 py-3 max-960:mx-4">
      <Icono name="aviso" className="mt-px w-4.5 h-4.5 flex-none text-azul-categoria-texto" />
      <p className="m-0 text-auxiliar leading-texto text-azul-categoria-texto">{catalogoColaboradores.campos_resumen.nota_aceptacion}</p>
    </div>
  )
}
