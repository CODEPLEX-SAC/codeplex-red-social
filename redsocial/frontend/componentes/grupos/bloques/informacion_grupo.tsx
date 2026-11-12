import { Icono } from '../../compartido/icono'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { InformacionGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const informacion = catalogoGrupos.detalle.informacion
const clases = catalogoGrupos.clases.detalle

export function InformacionGrupo({ grupo }: InformacionGrupoProps) {
  return (
    <section className={clases.tarjeta}>
      <h2 className={clases.titulo_tarjeta}>{informacion.titulo}</h2>
      <p className={clases.descripcion}>{grupo.descripcion}</p>
      <div className={clases.datos}>
        <span className={clases.dato}>
          <Icono name="grupo" className={clases.dato_icono} /> {grupo.miembros}
        </span>
        <span className={clases.dato}>
          <Icono name="calendario" className={clases.dato_icono} /> {grupo.creado}
        </span>
        <span className={clases.dato}>
          <Icono name="usuarios" className={clases.dato_icono} /> {informacion.administrador.replace(':nombre', grupo.administradores.join(', '))}
        </span>
      </div>
    </section>
  )
}
