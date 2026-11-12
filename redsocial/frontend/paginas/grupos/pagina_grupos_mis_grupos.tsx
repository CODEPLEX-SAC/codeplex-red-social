import { EstructuraApp } from '../../componentes/compartido'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import { LateralTusGrupos, PaginaConLateralGrupos, SeccionTusGrupos, usarVersionGrupos } from '../../componentes/grupos'
import { IMAGEN_VISTA_PREVIA_CREAR_GRUPO, PUERTO_GRUPOS } from '../../rutas/grupos/rutas_grupos'

export function PaginaGruposMisGrupos() {
  usarVersionGrupos(PUERTO_GRUPOS)

  const grupos = PUERTO_GRUPOS.tusGrupos()

  return (
    <EstructuraApp paginaActiva="grupos">
      <PaginaConLateralGrupos cabecera={{ titulo: catalogoGrupos.titulos.mis_grupos, activa: 'mis_grupos' as const, imagenCrear: IMAGEN_VISTA_PREVIA_CREAR_GRUPO, puerto: PUERTO_GRUPOS }} lateral={<LateralTusGrupos grupos={grupos} />}>
        <SeccionTusGrupos grupos={grupos} puerto={PUERTO_GRUPOS} />
      </PaginaConLateralGrupos>
    </EstructuraApp>
  )
}
