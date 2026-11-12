import { EstructuraApp, CLASE_ENLACE_ACCION, Icono, imagenUsuarioPredeterminada } from '../../componentes/compartido'
import { PaginaNoEncontrada } from '../compartido/pagina_no_encontrada'
import { AdministracionGrupo, DetalleGrupoVista, usarVersionGrupos } from '../../componentes/grupos'
import { ProveedorDestinosCompartir } from '../../componentes/inicio'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import { usarParametroDeRuta } from '../../rutas/compartido/navegacion'
import { SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import { contactosInvitables } from '../../rutas/mensajeria/fotografias_participantes'
import { ALMACEN_HISTORIAS, ALMACEN_PUBLICACIONES } from '../../rutas/inicio/rutas_inicio'
import { AMIGOS } from '../../rutas/amigos/rutas_amigos'
import { PUERTO_GRUPOS, destinosDeGrupos, rutaDeGrupo } from '../../rutas/grupos/rutas_grupos'

const CANDIDATOS = contactosInvitables([SESION_ACTUAL.usuario])
const DESTINOS_AMIGOS = AMIGOS.map((amigo) => ({ id: amigo.nombre, nombre: amigo.nombre, imagen: imagenUsuarioPredeterminada }))

export function PaginaGruposDetalle() {
  usarVersionGrupos(PUERTO_GRUPOS)
  const grupo = PUERTO_GRUPOS.detalle(usarParametroDeRuta(catalogoGrupos.parametros_ruta.grupo))
  const contenidoInicial = usarParametroDeRuta(catalogoGrupos.parametros_ruta.vista) === catalogoGrupos.parametros_ruta.vista_contenido
  if (!grupo) return <PaginaNoEncontrada />

  return (
    <EstructuraApp paginaActiva="grupos">
      <a href={catalogoGrupos.rutas.mis_grupos} className={[CLASE_ENLACE_ACCION, 'mb-4 inline-flex items-center gap-1.5'].join(' ')}>
        <Icono name="flecha-izquierda" className="h-4 w-4" /> {catalogoGrupos.detalle.volver}
      </a>
      <ProveedorDestinosCompartir grupos={destinosDeGrupos()} amigos={DESTINOS_AMIGOS} almacenDeGrupo={PUERTO_GRUPOS.publicaciones} almacenHistorias={ALMACEN_HISTORIAS}>
        <AdministracionGrupo key={grupo.id} grupo={grupo} puerto={PUERTO_GRUPOS}>
          <DetalleGrupoVista grupo={grupo} enlace={new URL(rutaDeGrupo(grupo.id), window.location.origin).toString()} puerto={PUERTO_GRUPOS} almacenInicio={ALMACEN_PUBLICACIONES} candidatos={CANDIDATOS} contenidoInicial={contenidoInicial} />
        </AdministracionGrupo>
      </ProveedorDestinosCompartir>
    </EstructuraApp>
  )
}
