import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'

const clases = catalogoColaboradores.clases.invitar_resumen

export function NotaAceptacionInvitacion() {
  return (
    <div className={clases.nota}>
      <Icono name="aviso" className={clases.nota_glifo} />
      <p className={clases.nota_texto}>{catalogoColaboradores.campos_resumen.nota_aceptacion}</p>
    </div>
  )
}
