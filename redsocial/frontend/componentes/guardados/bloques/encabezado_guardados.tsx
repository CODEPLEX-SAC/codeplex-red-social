import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { EncabezadoGuardadosProps } from '@/tipos/guardados/contrato_guardados'

const clases = catalogoGuardados.clases

export function EncabezadoGuardados({ alCrear }: EncabezadoGuardadosProps) {
  return (
    <div className={clases.encabezado}>
      <div className={clases.encabezado_titulos}>
        <h1 className={clases.titulo}>{catalogoGuardados.titulos.principal}</h1>
        <p className={clases.subtitulo}>{catalogoGuardados.subtitulos.principal}</p>
      </div>
      <Boton type="button" variant="primario" size="md" className={clases.encabezado_crear} onClick={alCrear}>
        <Icono name="mas" className="h-4 w-4" /> {catalogoGuardados.botones.nueva_coleccion}
      </Boton>
    </div>
  )
}
