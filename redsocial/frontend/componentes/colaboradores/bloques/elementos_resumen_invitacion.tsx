import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'

const clases = catalogoColaboradores.clases.invitar_resumen

export function CampoResumenInvitacion({ etiqueta, valor, ancho }: { etiqueta: string; valor: string; ancho?: 'completo' }) {
  return (
    <div className={`${clases.campo} ${ancho === 'completo' ? clases.campo_completo : ''}`}>
      <span className={clases.campo_etiqueta}>{etiqueta}</span>
      <span className={clases.campo_valor}>{valor}</span>
    </div>
  )
}
