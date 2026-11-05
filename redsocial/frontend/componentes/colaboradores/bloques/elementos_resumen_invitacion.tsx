import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'

const clases = catalogoColaboradores.clases.invitar_resumen

export function CampoResumenInvitacion({ etiqueta, valor, ancho }: { etiqueta: string; valor: string; ancho?: 'completo' }) {
  return (
    <div className={`${clases.campo} ${ancho === 'completo' ? clases.campo_completo : ''}`}>
      <span className={clases.campo_etiqueta}>{etiqueta}</span>
      <span className={clases.campo_valor}>{valor}</span>
    </div>
  )
}

export function FilaCorreoInvitacion({ icono, etiqueta, valor }: { icono: IconName; etiqueta: string; valor: string }) {
  return (
    <div className={clases.correo_fila}>
      <Icono name={icono} className={clases.correo_fila_glifo} />
      <span className={clases.correo_fila_etiqueta}>{etiqueta}</span>
      <span className={clases.correo_fila_valor}>{valor}</span>
    </div>
  )
}

export function NotaAceptacionInvitacion() {
  return (
    <div className={clases.nota}>
      <Icono name="aviso" className={clases.nota_glifo} />
      <p className={clases.nota_texto}>{catalogoColaboradores.campos_resumen.nota_aceptacion}</p>
    </div>
  )
}
