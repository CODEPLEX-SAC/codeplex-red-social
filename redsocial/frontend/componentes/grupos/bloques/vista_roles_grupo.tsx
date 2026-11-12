import { EncabezadoVistaAdministracion } from './encabezado_vista_administracion'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { InformacionGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const vista = catalogoGrupos.administracion.vistas.roles
const clases = catalogoGrupos.clases.administracion

export function VistaRolesGrupo({ grupo }: InformacionGrupoProps) {
  const cantidades = grupo.miembrosLista.reduce<Record<string, number>>((total, miembro) => ({ ...total, [miembro.rol]: (total[miembro.rol] ?? 0) + 1 }), {})

  return (
    <section className={clases.vista}>
      <EncabezadoVistaAdministracion titulo={vista.titulo} descripcion={vista.descripcion} />
      <ul aria-label={vista.titulo} className={clases.lista}>
        {vista.roles.map((rol) => (
          <li key={rol.clave} className={clases.fila_lista}>
            <div className={clases.fila_textos}>
              <strong className={clases.fila_titulo}>{rol.etiqueta}</strong>
              <span className={clases.fila_detalle}>{rol.detalle}</span>
            </div>
            <span className={clases.fila_detalle}>{vista.personas.replace(':n', String(cantidades[rol.clave] ?? 0))}</span>
          </li>
        ))}
      </ul>
      <p className={clases.nota}>{vista.nota}</p>
    </section>
  )
}
