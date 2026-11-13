import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { AvataresMiembrosGrupo } from './avatares_miembros_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { PortadaGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const detalle = catalogoGrupos.detalle
const clases = catalogoGrupos.clases.detalle

export function PortadaGrupo({ grupo, acciones, accionesPestanas, alEditarPortada, children }: PortadaGrupoProps) {
  return (
    <section className={clases.portada}>
      <div className={clases.portada_marco}>
        <div className={clases.portada_imagen}>
          <img src={grupo.portada} alt={detalle.portada.replace(':nombre', grupo.nombre)} className={clases.portada_foto} />
          {grupo.rol === 'administrador' && (
            <Boton type="button" variant="secundario" size="default" className={clases.portada_editar} onClick={alEditarPortada}>
              <Icono name="editar-oficial" className="h-4 w-4" /> {detalle.editar_portada}
            </Boton>
          )}
        </div>
      </div>
      <div className={clases.portada_cuerpo}>
        <div className={clases.portada_identidad}>
          <div className={clases.portada_textos}>
            <h1 className={clases.titulo}>{grupo.nombre}</h1>
            <p className={clases.subtitulo}>
              <Icono name="grupo" className="h-4 w-4" /> {[detalle.tipo, grupo.miembros].join(' · ')}
            </p>
            {grupo.rol === 'miembro' && <AvataresMiembrosGrupo miembros={grupo.miembrosLista} />}
          </div>
        </div>
        <div className={clases.acciones}>{acciones}</div>
      </div>
      <div className={clases.pestanas_fila}>
        <div className={clases.pestanas}>{children}</div>
        <div className={clases.pestanas_acciones}>{accionesPestanas}</div>
      </div>
    </section>
  )
}
