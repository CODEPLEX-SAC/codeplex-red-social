import { EstructuraApp } from '../../componentes/compartido'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import { LateralAdministradosGrupos, PaginaConLateralGrupos, SeccionTusGrupos, usarVersionGrupos } from '../../componentes/grupos'
import { IMAGEN_VISTA_PREVIA_CREAR_GRUPO, PUERTO_GRUPOS } from '../../rutas/grupos/rutas_grupos'

export function PaginaGruposDescubrir() {
  usarVersionGrupos(PUERTO_GRUPOS)

  const grupos = PUERTO_GRUPOS.gruposQueAdministras()

  return (
    <EstructuraApp paginaActiva="grupos">
      <PaginaConLateralGrupos cabecera={{ titulo: catalogoGrupos.titulos.descubrir, activa: 'descubrir' as const, imagenCrear: IMAGEN_VISTA_PREVIA_CREAR_GRUPO, puerto: PUERTO_GRUPOS }} lateral={<LateralAdministradosGrupos grupos={grupos} puerto={PUERTO_GRUPOS} />}>
        <SeccionTusGrupos grupos={grupos} puerto={PUERTO_GRUPOS} administrados />
      </PaginaConLateralGrupos>
    </EstructuraApp>
  )
}
