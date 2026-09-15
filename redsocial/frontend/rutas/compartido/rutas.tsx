import type { RutaApp } from '@/tipos/enrutamiento/rutas'
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

export const RUTA_INICIAL = catalogoInicio.rutas.principal

export const RUTAS: readonly RutaApp[] = [
  { path: catalogoInicio.rutas.principal, archivo: '01-01-inicio-web.html', render: () => <PaginaInicio /> },

  { path: catalogoActividad.rutas.todas, archivo: '02-02-actividad-01-todas-web.html', render: () => <PaginaActividadTodas /> },
  { path: catalogoActividad.rutas.publicaciones, archivo: '03-02-actividad-02-publicaciones.html', render: () => <PaginaActividadPublicaciones /> },
  { path: catalogoActividad.rutas.menciones, archivo: '04-02-actividad-03-menciones.html', render: () => <PaginaActividadMenciones /> },
  { path: catalogoActividad.rutas.colaboradores, archivo: '05-02-actividad-04-colaboradores.html', render: () => <PaginaActividadColaboradores /> },
  { path: catalogoActividad.rutas.grupos, archivo: '06-02-actividad-05-grupos.html', render: () => <PaginaActividadGrupos /> },
  { path: catalogoActividad.rutas.modulos, archivo: '07-02-actividad-06-modulos.html', render: () => <PaginaActividadModulos /> },
  { path: catalogoActividad.rutas.sistema, archivo: '08-02-actividad-07-sistema.html', render: () => <PaginaActividadSistema /> },

  { path: catalogoMensajeria.rutas.todos, archivo: '09-04-mensajes-01-todos-web.html', render: () => <PaginaMensajesTodos /> },
  { path: catalogoMensajeria.rutas.no_leidos, archivo: '10-04-mensajes-02-no-leidos.html', render: () => <PaginaMensajesNoLeidos /> },
  { path: catalogoMensajeria.rutas.favoritos, archivo: '11-04-mensajes-03-favoritos.html', render: () => <PaginaMensajesFavoritos /> },
  { path: catalogoMensajeria.rutas.videollamadas, archivo: '12-04-mensajes-04-videollamadas.html', render: () => <PaginaMensajesVideollamadas /> },
  { path: catalogoMensajeria.rutas.videollamada_iniciar, archivo: '13-04-mensajes-04-videollamadas-iniciar.html', render: () => <PaginaMensajesVideollamadaIniciar /> },
  { path: catalogoMensajeria.rutas.videollamada_en_curso, archivo: '14-04-mensajes-04-videollamadas-iniciar-encurso.html', render: () => <PaginaMensajesVideollamadaEnCurso /> },

  { path: catalogoAmigos.rutas.todos, archivo: '15-05-amigos-01-todos-web.html', render: () => <PaginaAmigosTodos /> },
  { path: catalogoAmigos.rutas.solicitudes, archivo: '16-05-amigos-02-solicitudes-web.html', render: () => <PaginaAmigosSolicitudes /> },
  { path: catalogoAmigos.rutas.sugerencias, archivo: '17-05-amigos-03-web-sugerencias.html', render: () => <PaginaAmigosSugerencias /> },
  { path: catalogoAmigos.rutas.listas, archivo: '18-05-amigos-04-web-listas.html', render: () => <PaginaAmigosListas /> },

  { path: catalogoGrupos.rutas.mis_grupos, archivo: '19-06-grupos-01-web-misgrupos.html', render: () => <PaginaGruposMisGrupos /> },
  { path: catalogoGrupos.rutas.descubrir, archivo: '20-06-grupos-02-web-descubrir.html', render: () => <PaginaGruposDescubrir /> },
  { path: catalogoGrupos.rutas.invitaciones, archivo: '21-06-grupos-03-web-invitaciones.html', render: () => <PaginaGruposInvitaciones /> },

  { path: catalogoMarketplace.rutas.principal, archivo: '22-07-marketplace-web-03.html', render: () => <PaginaMarketplace /> },

  { path: catalogoEventos.rutas.para_ti, archivo: '23-08-eventos-01-para-ti-web.html', render: () => <PaginaEventosParaTi /> },
  { path: catalogoEventos.rutas.proximos, archivo: '24-08-eventos-02-proximos-web.html', render: () => <PaginaEventosProximos /> },
  { path: catalogoEventos.rutas.populares, archivo: '25-08-eventos-03-populares-web.html', render: () => <PaginaEventosPopulares /> },
  { path: catalogoEventos.rutas.mis_eventos, archivo: '26-08-eventos-04-mis-eventos-web.html', render: () => <PaginaEventosMisEventos /> },
  { path: catalogoEventos.rutas.invitaciones, archivo: '27-08-eventos-05-invitaciones-web.html', render: () => <PaginaEventosInvitaciones /> },
  { path: catalogoEventos.rutas.calendario, archivo: '28-08-eventos-06-calendario-web.html', render: () => <PaginaEventosCalendario /> },

  { path: catalogoColaboradores.rutas.listado, archivo: '29-10-colaboradores-todos.html', render: () => <PaginaColaboradores /> },
  { path: catalogoColaboradores.rutas.perfil, archivo: '41-15-colaboradores-perfil.html', render: () => <PaginaColaboradorPerfil /> },
  { path: catalogoColaboradores.rutas.invitar, archivo: '30-10-colaboradores-popub-invitar-colaborador-01-informacion.html', render: () => <PaginaInvitarColaboradorInformacion /> },
  { path: catalogoColaboradores.rutas.invitar_rol_permisos, archivo: '31-10-colaboradores-popub-invitar-colaborador-02-asignar-rol-y-permisos.html', render: () => <PaginaInvitarColaboradorRolPermisos /> },
  { path: catalogoColaboradores.rutas.invitar_vigencia, archivo: '32-10-colaboradores-popub-invitar-colaborador-03-vigencia.html', render: () => <PaginaInvitarColaboradorVigencia /> },
  { path: catalogoColaboradores.rutas.invitar_resumen, archivo: '33-10-colaboradores-popub-invitar-colaborador-04-resumen.html', render: () => <PaginaInvitarColaboradorResumen /> },

  { path: catalogoDashboard.rutas.principal, archivo: '34-11-dashboard.html', render: () => <PaginaDashboard /> },

  { path: catalogoEstadisticas.rutas.todos_modulos, archivo: '35-12-estadisticas-01-todos-modulos.html', render: () => <PaginaEstadisticasTodosModulos /> },
  { path: catalogoEstadisticas.rutas.ventas, archivo: '36-12-estadisticas-02-ventas.html', render: () => <PaginaEstadisticasModulo modulo="ventas" /> },
  { path: catalogoEstadisticas.rutas.contabilidad, archivo: '37-12-estadisticas-03-contabilidad.html', render: () => <PaginaEstadisticasModulo modulo="contabilidad" /> },
  { path: catalogoEstadisticas.rutas.planillas, archivo: '38-12-estadisticas-04-planillas.html', render: () => <PaginaEstadisticasModulo modulo="planillas" /> },

  { path: catalogoReportes.rutas.principal, archivo: '39-13-reportes.html', render: () => <PaginaReportes /> },
  { path: catalogoIndicadores.rutas.clave, archivo: '40-14-indicadores-clave.html', render: () => <PaginaIndicadoresClave /> },
]

const POR_PATH = new Map(RUTAS.map((r) => [r.path, r]))

export const ARCHIVO_A_RUTA: Readonly<Record<string, string>> = Object.fromEntries(RUTAS.map((r) => [r.archivo, r.path]))

export function resolverRuta(pathname: string): RutaApp | undefined {
  return POR_PATH.get(pathname)
}
