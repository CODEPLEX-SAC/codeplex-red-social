import { Icono, Insignia, EstructuraApp, EstructuraTresColumnas, ColumnaPublicidad, ContactosPanel, BloqueAnuncio, AvatarUsuario, imagenUsuarioPredeterminada, CLASE_ENLACE_ACCION } from '../../componentes/compartido'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import type { IconName } from '../../tipos/compartido/contrato_icono'
import { CONTACTOS_SUGERIDOS } from '../../rutas/compartido/rutas_compartido'
import { COLABORADORES, DETALLE_COLABORADOR_EJEMPLO, HISTORIAL_ACTIVIDAD_COLABORADOR_EJEMPLO } from '../../rutas/colaboradores/rutas_colaboradores'

const APLICACIONES_ASIGNADAS = COLABORADORES.find((colaborador) => colaborador.nombre === DETALLE_COLABORADOR_EJEMPLO.nombre)?.aplicaciones ?? []
const MAXIMO_ICONOS = catalogoColaboradores.celda_aplicaciones.max_iconos_perfil
const OCULTAS = Math.max(0, APLICACIONES_ASIGNADAS.length - MAXIMO_ICONOS)
const clases = catalogoColaboradores.clases.detalle
const chips = catalogoColaboradores.clases.tabla_aplicaciones
const coloresAplicacion: Record<string, string> = catalogoColaboradores.clases.aplicacion_color

const INFORMACION_GENERAL: { icono: IconName; etiqueta: string; valor: string }[] = [
  { icono: 'calendario', etiqueta: catalogoColaboradores.perfil.informacion_general.vigencia, valor: DETALLE_COLABORADOR_EJEMPLO.vigencia },
  { icono: 'enviar', etiqueta: catalogoColaboradores.perfil.informacion_general.fecha_invitacion, valor: DETALLE_COLABORADOR_EJEMPLO.fechaInvitacion },
  { icono: 'reloj', etiqueta: catalogoColaboradores.perfil.informacion_general.ultimo_acceso, valor: DETALLE_COLABORADOR_EJEMPLO.ultimoAcceso },
]

export function PaginaColaboradorPerfil() {
  return (
    <EstructuraApp paginaActiva="colaboradores">
      <EstructuraTresColumnas
        principal={
          <section>
            <a href={catalogoColaboradores.rutas.listado} className={clases.pagina_enlace_volver}>
              <Icono name="flecha-izquierda" className={clases.pagina_enlace_glifo} /> {catalogoColaboradores.botones.volver_a_colaboradores}
            </a>

            <div className={clases.pagina_tarjeta}>
              <div className={clases.perfil_cabecera}>
                <div className={clases.perfil_identidad}>
                  <AvatarUsuario tamano="xl" imagen={imagenUsuarioPredeterminada} />
                  <div className={clases.perfil_textos}>
                    <h1 className={clases.perfil_nombre}>{DETALLE_COLABORADOR_EJEMPLO.nombre}</h1>
                    <span className={clases.perfil_rol}>{DETALLE_COLABORADOR_EJEMPLO.rol}</span>
                    <span className={clases.perfil_contacto}>{DETALLE_COLABORADOR_EJEMPLO.correo}</span>
                    <span className={clases.perfil_contacto}>{DETALLE_COLABORADOR_EJEMPLO.telefono}</span>
                  </div>
                </div>
                <Insignia variant="status" className={clases.perfil_estado} punto="bg-verde-categoria">
                  {DETALLE_COLABORADOR_EJEMPLO.estado}
                </Insignia>
              </div>

              <section className={clases.pagina_seccion}>
                <h2 className={clases.pagina_titulo_seccion}>{catalogoColaboradores.secciones.informacion_general}</h2>
                <ul className={clases.lista_datos}>
                  {INFORMACION_GENERAL.map((item) => (
                    <li key={item.etiqueta} className={clases.dato}>
                      <Icono name={item.icono} className={clases.dato_icono} />
                      <div>
                        <span className={clases.dato_etiqueta}>{item.etiqueta}</span>
                        <strong className={clases.dato_valor}>{item.valor}</strong>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={clases.pagina_seccion}>
                <h2 className={clases.pagina_titulo_seccion}>{catalogoColaboradores.secciones.rol_y_permisos}</h2>
                <ul className={clases.lista_datos}>
                  <li className={clases.dato}>
                    <Icono name="colaborador" className={clases.dato_icono} />
                    <div>
                      <span className={clases.dato_etiqueta}>{catalogoColaboradores.secciones.rol_perfil_etiqueta}</span>
                      <strong className={clases.dato_valor}>{DETALLE_COLABORADOR_EJEMPLO.rol}</strong>
                    </div>
                  </li>
                  <li className={clases.dato}>
                    <Icono name="archivo-hoja" className={clases.dato_icono} />
                    <div>
                      <span className={clases.dato_etiqueta}>{catalogoColaboradores.secciones.descripcion}</span>
                      <strong className={clases.dato_valor}>{DETALLE_COLABORADOR_EJEMPLO.descripcionRol}</strong>
                    </div>
                  </li>
                </ul>
              </section>

              <section className={clases.pagina_seccion}>
                <h2 className={clases.pagina_titulo_seccion}>{`${catalogoColaboradores.secciones.aplicaciones_asignadas} (${APLICACIONES_ASIGNADAS.length})`}</h2>
                <div className={clases.pagina_aplicaciones}>
                  {APLICACIONES_ASIGNADAS.slice(0, MAXIMO_ICONOS).map((app) => (
                    <span key={app.nombre} title={app.nombre} className={`${chips.icono_caja} ${coloresAplicacion[app.nombre]}`}><Icono name={app.icono} className={chips.glifo} /></span>
                  ))}
                  {OCULTAS > 0 && <span className={chips.mas}>+{OCULTAS}</span>}
                </div>
              </section>

              <section>
                <div className={clases.cabecera_seccion}>
                  <h2 className={clases.titulo_seccion_pagina_en_cabecera}>{catalogoColaboradores.secciones.historial_actividad}</h2>
                  <a href={catalogoActividad.rutas.colaboradores} className={CLASE_ENLACE_ACCION}>{catalogoColaboradores.botones.ver_todo}</a>
                </div>
                <ul className={clases.lista_datos}>
                  {HISTORIAL_ACTIVIDAD_COLABORADOR_EJEMPLO.map((item) => (
                    <li key={item.texto} className={clases.pagina_historial_item}>
                      <span className={clases.pagina_historial_texto}>{item.texto}</span>
                      <time className={clases.historial_hora}>{item.hora}</time>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className={clases.pagina_lateral}>
            <ContactosPanel contactos={CONTACTOS_SUGERIDOS} />
            <BloqueAnuncio />
          </aside>
        }
      />
    </EstructuraApp>
  )
}
