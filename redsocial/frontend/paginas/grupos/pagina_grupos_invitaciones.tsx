import { EstructuraApp } from '../../componentes/compartido'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import { SugerenciasGrupos, usarVersionGrupos } from '../../componentes/grupos'
import { CATEGORIAS_SUGERIDAS, IMAGEN_VISTA_PREVIA_CREAR_GRUPO, PUERTO_GRUPOS } from '../../rutas/grupos/rutas_grupos'

export function PaginaGruposInvitaciones() {
  usarVersionGrupos(PUERTO_GRUPOS)

  return (
    <EstructuraApp paginaActiva="grupos">
      <SugerenciasGrupos cabecera={{ titulo: catalogoGrupos.titulos.invitaciones, activa: 'invitaciones' as const, imagenCrear: IMAGEN_VISTA_PREVIA_CREAR_GRUPO, puerto: PUERTO_GRUPOS }} categorias={CATEGORIAS_SUGERIDAS} />
    </EstructuraApp>
  )
}
