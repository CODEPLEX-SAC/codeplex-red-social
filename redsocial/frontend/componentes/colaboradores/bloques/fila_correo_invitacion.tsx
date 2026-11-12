import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'

const clases = catalogoColaboradores.clases.invitar_resumen

export function FilaCorreoInvitacion({ icono, etiqueta, valor }: { icono: IconName; etiqueta: string; valor: string }) {
  return (
    <div className={clases.correo_fila}>
      <Icono name={icono} className={clases.correo_fila_glifo} />
      <span className={clases.correo_fila_etiqueta}>{etiqueta}</span>
      <span className={clases.correo_fila_valor}>{valor}</span>
    </div>
  )
}
