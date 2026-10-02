import type { RutaApp } from '@/tipos/enrutamiento/contrato_rutas'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import catalogoDashboard from '../../catalogos/capacidades/redsocial/dashboard.json'
import catalogoEstadisticas from '../../catalogos/capacidades/redsocial/estadisticas.json'
import catalogoReportes from '../../catalogos/capacidades/redsocial/reportes.json'
import catalogoIndicadores from '../../catalogos/capacidades/redsocial/indicadores.json'
import catalogoAvisos from '../../catalogos/capacidades/redsocial/avisos.json'
import catalogoGuardados from '../../catalogos/capacidades/redsocial/guardados.json'
import { PaginaInicio } from '@/paginas/inicio/pagina_inicio'
import { PaginaActividadTodas } from '@/paginas/actividad/pagina_actividad_todas'
import { PaginaActividadPublicaciones } from '@/paginas/actividad/pagina_actividad_publicaciones'
import { PaginaActividadMenciones } from '@/paginas/actividad/pagina_actividad_menciones'
import { PaginaActividadColaboradores } from '@/paginas/actividad/pagina_actividad_colaboradores'
import { PaginaActividadGrupos } from '@/paginas/actividad/pagina_actividad_grupos'
import { PaginaActividadModulos } from '@/paginas/actividad/pagina_actividad_modulos'
import { PaginaActividadSistema } from '@/paginas/actividad/pagina_actividad_sistema'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import { PaginaMensajesNoLeidos } from '@/paginas/mensajeria/pagina_mensajes_no_leidos'
import { PaginaMensajesFavoritos } from '@/paginas/mensajeria/pagina_mensajes_favoritos'
import { PaginaMensajesVideollamadas } from '@/paginas/mensajeria/pagina_mensajes_videollamadas'
import { PaginaMensajesVideollamadaIniciar } from '@/paginas/mensajeria/pagina_mensajes_videollamada_iniciar'
import { PaginaMensajesVideollamadaEnCurso } from '@/paginas/mensajeria/pagina_mensajes_videollamada_en_curso'
import { PaginaAmigosTodos } from '@/paginas/amigos/pagina_amigos_todos'
import { PaginaAmigosSolicitudes } from '@/paginas/amigos/pagina_amigos_solicitudes'
import { PaginaAmigosSugerencias } from '@/paginas/amigos/pagina_amigos_sugerencias'
import { PaginaAmigosListas } from '@/paginas/amigos/pagina_amigos_listas'
import { PaginaGruposMisGrupos } from '@/paginas/grupos/pagina_grupos_mis_grupos'
import { PaginaGruposDescubrir } from '@/paginas/grupos/pagina_grupos_descubrir'
import { PaginaGruposInvitaciones } from '@/paginas/grupos/pagina_grupos_invitaciones'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import { PaginaEventosParaTi } from '@/paginas/eventos/pagina_eventos_para_ti'
import { PaginaEventosProximos } from '@/paginas/eventos/pagina_eventos_proximos'
import { PaginaEventosPopulares } from '@/paginas/eventos/pagina_eventos_populares'
import { PaginaEventosMisEventos } from '@/paginas/eventos/pagina_eventos_mis_eventos'
import { PaginaEventosInvitaciones } from '@/paginas/eventos/pagina_eventos_invitaciones'
import { PaginaEventosInvitacionesPendientes } from '@/paginas/eventos/pagina_eventos_invitaciones_pendientes'
import { PaginaEventosInvitacionesAceptadas } from '@/paginas/eventos/pagina_eventos_invitaciones_aceptadas'
import { PaginaEventosInvitacionesRechazadas } from '@/paginas/eventos/pagina_eventos_invitaciones_rechazadas'
import { PaginaEventosCalendario } from '@/paginas/eventos/pagina_eventos_calendario'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { PaginaColaboradorPerfil } from '@/paginas/colaboradores/pagina_colaborador_perfil'
import { PaginaInvitarColaboradorInformacion } from '@/paginas/colaboradores/pagina_invitar_colaborador_informacion'
import { PaginaInvitarColaboradorRolPermisos } from '@/paginas/colaboradores/pagina_invitar_colaborador_rol_permisos'
import { PaginaInvitarColaboradorVigencia } from '@/paginas/colaboradores/pagina_invitar_colaborador_vigencia'
import { PaginaInvitarColaboradorResumen } from '@/paginas/colaboradores/pagina_invitar_colaborador_resumen'
import { PaginaDashboard } from '@/paginas/dashboard/pagina_dashboard'
import { PaginaEstadisticasTodosModulos } from '@/paginas/estadisticas/pagina_estadisticas_todos_modulos'
import { PaginaEstadisticasModulo } from '@/paginas/estadisticas/pagina_estadisticas_modulo'
import { PaginaReportes } from '@/paginas/reportes/pagina_reportes'
import { PaginaIndicadoresClave } from '@/paginas/indicadores/pagina_indicadores_clave'
import { PaginaAvisos } from '@/paginas/avisos/pagina_avisos'
import { PaginaAvisosNoLeidas } from '@/paginas/avisos/pagina_avisos_no_leidas'
import { PaginaAvisosMenciones } from '@/paginas/avisos/pagina_avisos_menciones'
import { PaginaAvisosSolicitudes } from '@/paginas/avisos/pagina_avisos_solicitudes'
import { PaginaAvisosEventos } from '@/paginas/avisos/pagina_avisos_eventos'
import { PaginaGuardados } from '@/paginas/guardados/pagina_guardados'

export const RUTA_INICIAL = catalogoInicio.rutas.principal

export const RUTAS: readonly RutaApp[] = [
  { path: catalogoInicio.rutas.principal, render: () => <PaginaInicio /> },

  { path: catalogoAvisos.rutas.todas, render: () => <PaginaAvisos /> },
  { path: catalogoAvisos.rutas.no_leidas, render: () => <PaginaAvisosNoLeidas /> },
  { path: catalogoAvisos.rutas.menciones, render: () => <PaginaAvisosMenciones /> },
  { path: catalogoAvisos.rutas.solicitudes, render: () => <PaginaAvisosSolicitudes /> },
  { path: catalogoAvisos.rutas.eventos, render: () => <PaginaAvisosEventos /> },

  { path: catalogoGuardados.rutas.principal, render: () => <PaginaGuardados /> },

  { path: catalogoActividad.rutas.todas, render: () => <PaginaActividadTodas /> },
  { path: catalogoActividad.rutas.publicaciones, render: () => <PaginaActividadPublicaciones /> },
  { path: catalogoActividad.rutas.menciones, render: () => <PaginaActividadMenciones /> },
  { path: catalogoActividad.rutas.colaboradores, render: () => <PaginaActividadColaboradores /> },
  { path: catalogoActividad.rutas.grupos, render: () => <PaginaActividadGrupos /> },
  { path: catalogoActividad.rutas.modulos, render: () => <PaginaActividadModulos /> },
  { path: catalogoActividad.rutas.sistema, render: () => <PaginaActividadSistema /> },

  { path: catalogoMensajeria.rutas.todos, render: () => <PaginaMensajesTodos /> },
  { path: catalogoMensajeria.rutas.no_leidos, render: () => <PaginaMensajesNoLeidos /> },
  { path: catalogoMensajeria.rutas.favoritos, render: () => <PaginaMensajesFavoritos /> },
  { path: catalogoMensajeria.rutas.videollamadas, render: () => <PaginaMensajesVideollamadas /> },
  { path: catalogoMensajeria.rutas.videollamada_iniciar, render: () => <PaginaMensajesVideollamadaIniciar /> },
  { path: catalogoMensajeria.rutas.videollamada_en_curso, render: () => <PaginaMensajesVideollamadaEnCurso /> },

  { path: catalogoAmigos.rutas.todos, render: () => <PaginaAmigosTodos /> },
  { path: catalogoAmigos.rutas.solicitudes, render: () => <PaginaAmigosSolicitudes /> },
  { path: catalogoAmigos.rutas.sugerencias, render: () => <PaginaAmigosSugerencias /> },
  { path: catalogoAmigos.rutas.listas, render: () => <PaginaAmigosListas /> },

  { path: catalogoGrupos.rutas.mis_grupos, render: () => <PaginaGruposMisGrupos /> },
  { path: catalogoGrupos.rutas.descubrir, render: () => <PaginaGruposDescubrir /> },
  { path: catalogoGrupos.rutas.invitaciones, render: () => <PaginaGruposInvitaciones /> },

  { path: catalogoMarketplace.rutas.principal, render: () => <PaginaMarketplace /> },

  { path: catalogoEventos.rutas.para_ti, render: () => <PaginaEventosParaTi /> },
  { path: catalogoEventos.rutas.proximos, render: () => <PaginaEventosProximos /> },
  { path: catalogoEventos.rutas.populares, render: () => <PaginaEventosPopulares /> },
  { path: catalogoEventos.rutas.mis_eventos, render: () => <PaginaEventosMisEventos /> },
  { path: catalogoEventos.rutas.invitaciones, render: () => <PaginaEventosInvitaciones /> },
  { path: catalogoEventos.rutas.invitaciones_pendientes, render: () => <PaginaEventosInvitacionesPendientes /> },
  { path: catalogoEventos.rutas.invitaciones_aceptadas, render: () => <PaginaEventosInvitacionesAceptadas /> },
  { path: catalogoEventos.rutas.invitaciones_rechazadas, render: () => <PaginaEventosInvitacionesRechazadas /> },
  { path: catalogoEventos.rutas.calendario, render: () => <PaginaEventosCalendario /> },

  { path: catalogoColaboradores.rutas.listado, render: () => <PaginaColaboradores /> },
  { path: catalogoColaboradores.rutas.perfil, render: () => <PaginaColaboradorPerfil /> },
  { path: catalogoColaboradores.rutas.invitar, render: () => <PaginaInvitarColaboradorInformacion /> },
  { path: catalogoColaboradores.rutas.invitar_rol_permisos, render: () => <PaginaInvitarColaboradorRolPermisos /> },
  { path: catalogoColaboradores.rutas.invitar_vigencia, render: () => <PaginaInvitarColaboradorVigencia /> },
  { path: catalogoColaboradores.rutas.invitar_resumen, render: () => <PaginaInvitarColaboradorResumen /> },

  { path: catalogoDashboard.rutas.principal, render: () => <PaginaDashboard /> },

  { path: catalogoEstadisticas.rutas.todos_modulos, render: () => <PaginaEstadisticasTodosModulos /> },
  { path: catalogoEstadisticas.rutas.ventas, render: () => <PaginaEstadisticasModulo modulo="ventas" /> },
  { path: catalogoEstadisticas.rutas.contabilidad, render: () => <PaginaEstadisticasModulo modulo="contabilidad" /> },
  { path: catalogoEstadisticas.rutas.planillas, render: () => <PaginaEstadisticasModulo modulo="planillas" /> },

  { path: catalogoReportes.rutas.principal, render: () => <PaginaReportes /> },
  { path: catalogoIndicadores.rutas.clave, render: () => <PaginaIndicadoresClave /> },
]

const POR_PATH = new Map(RUTAS.map((r) => [r.path, r]))

export function resolverRuta(pathname: string): RutaApp | undefined {
  return POR_PATH.get(pathname)
}
