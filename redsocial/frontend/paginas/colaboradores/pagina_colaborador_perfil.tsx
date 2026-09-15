import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { ContactosPanel } from '../../componentes/compartido/bloques/contactos_panel'
import { BloqueAnuncio } from '../../componentes/compartido/bloques/bloque_anuncio'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import type { IconName } from '../../tipos/compartido/icono'
import { CONTACTOS_SUGERIDOS } from '../../datos/compartido/panel_lateral'
import { DETALLE_COLABORADOR_EJEMPLO, HISTORIAL_ACTIVIDAD_COLABORADOR_EJEMPLO } from '../../datos/colaboradores/colaboradores'

const APP_CALENDARIO = 'bg-[#6c3ce0]'
const APP_MENSAJES = 'bg-azul-categoria'
const APP_MARKETPLACE = 'bg-naranja-categoria'
const APP_ESTADISTICAS = 'bg-[#06b6d4]'

const INFORMACION_GENERAL: { icono: IconName; etiqueta: string; valor: string }[] = [
  { icono: 'calendario', etiqueta: 'Vigencia', valor: DETALLE_COLABORADOR_EJEMPLO.vigencia },
  { icono: 'enviar', etiqueta: 'Fecha de invitación', valor: DETALLE_COLABORADOR_EJEMPLO.fechaInvitacion },
  { icono: 'reloj', etiqueta: 'Último acceso', valor: DETALLE_COLABORADOR_EJEMPLO.ultimoAcceso },
]

export function PaginaColaboradorPerfil() {
  return (
    <EstructuraApp paginaActiva="colaboradores">
      <EstructuraTresColumnas
        principal={
          <section>
            <a
              href="29-10-colaboradores-todos.html"
              className="mb-4 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-primario no-underline hover:underline"
            >
              <Icono name="flecha-izquierda" className="w-4 h-4" /> {catalogoColaboradores.botones.volver_a_colaboradores}
            </a>

            <div className="rounded-xl border border-gris-borde bg-white p-5">
              <div className="mb-4 flex flex-col gap-2.5 border-b border-[#f3f4f6] pb-4">
                <div className="flex items-start gap-3">
                  <span className="h-14 w-14 flex-none rounded-full bg-gris-borde" />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <h1 className="m-0 text-lg font-bold text-gris-oscuro-texto">{DETALLE_COLABORADOR_EJEMPLO.nombre}</h1>
                    <span className="text-[0.85rem] font-semibold text-primario">{DETALLE_COLABORADOR_EJEMPLO.rol}</span>
                    <span className="text-[0.8rem] text-gris-texto-secundario">{DETALLE_COLABORADOR_EJEMPLO.correo}</span>
                    <span className="text-[0.8rem] text-gris-texto-secundario">{DETALLE_COLABORADOR_EJEMPLO.telefono}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-[5px] text-[0.8rem] font-medium text-[#16a34a]">
                  <span className="h-[7px] w-[7px] rounded-full bg-[#22c55e]" /> {DETALLE_COLABORADOR_EJEMPLO.estado}
                </span>
              </div>

              <section className="mb-4">
                <h4 className="m-0 mb-2.5 text-[0.85rem] font-bold text-gris-oscuro-texto">{catalogoColaboradores.secciones.informacion_general}</h4>
                <ul className="m-0 grid list-none gap-3 p-0">
                  {INFORMACION_GENERAL.map((item) => (
                    <li key={item.etiqueta} className="flex items-start gap-2.5">
                      <Icono name={item.icono} className="mt-0.5 w-4 h-4 flex-none text-[#9ca3af]" />
                      <div>
                        <span className="block text-xs text-gris-texto-secundario">{item.etiqueta}</span>
                        <strong className="mt-px block text-[0.82rem] font-semibold text-gris-oscuro-texto">{item.valor}</strong>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-4">
                <h4 className="m-0 mb-2.5 text-[0.85rem] font-bold text-gris-oscuro-texto">{catalogoColaboradores.secciones.rol_y_permisos}</h4>
                <ul className="m-0 grid list-none gap-3 p-0">
                  <li className="flex items-start gap-2.5">
                    <Icono name="colaborador" className="mt-0.5 w-4 h-4 flex-none text-[#9ca3af]" />
                    <div>
                      <span className="block text-xs text-gris-texto-secundario">{catalogoColaboradores.secciones.rol_perfil_etiqueta}</span>
                      <strong className="mt-px block text-[0.82rem] font-semibold text-gris-oscuro-texto">{DETALLE_COLABORADOR_EJEMPLO.rol}</strong>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Icono name="archivo-hoja" className="mt-0.5 w-4 h-4 flex-none text-[#9ca3af]" />
                    <div>
                      <span className="block text-xs text-gris-texto-secundario">{catalogoColaboradores.secciones.descripcion}</span>
                      <strong className="mt-px block text-[0.82rem] font-semibold text-gris-oscuro-texto">{DETALLE_COLABORADOR_EJEMPLO.descripcionRol}</strong>
                    </div>
                  </li>
                </ul>
              </section>

              <section className="mb-4">
                <h4 className="m-0 mb-2.5 text-[0.85rem] font-bold text-gris-oscuro-texto">{catalogoColaboradores.secciones.aplicaciones_asignadas}</h4>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-md ${APP_CALENDARIO}`}><Icono name="calendario" className="w-[14px] h-[14px] text-white" /></span>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-md ${APP_MENSAJES}`}><Icono name="mensaje" className="w-[14px] h-[14px] text-white" /></span>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-md ${APP_MARKETPLACE}`}><Icono name="marketplace" className="w-[14px] h-[14px] text-white" /></span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#8b5cf6]"><Icono name="reportes-barra" className="w-[14px] h-[14px] text-white" /></span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#ec4899]"><Icono name="video" className="w-[14px] h-[14px] text-white" /></span>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-md ${APP_ESTADISTICAS}`}><Icono name="estadisticas" className="w-[14px] h-[14px] text-white" /></span>
                  <span className="text-[0.78rem] font-semibold text-primario">+1</span>
                </div>
              </section>

              <section>
                <div className="mb-2.5 flex items-center justify-between">
                  <h4 className="m-0 text-[0.85rem] font-bold text-gris-oscuro-texto">{catalogoColaboradores.secciones.historial_actividad}</h4>
                  <a href="05-02-actividad-04-colaboradores.html" className="text-[0.78rem] font-semibold text-primario no-underline">{catalogoColaboradores.botones.ver_todo}</a>
                </div>
                <ul className="m-0 grid list-none gap-3 p-0">
                  {HISTORIAL_ACTIVIDAD_COLABORADOR_EJEMPLO.map((item) => (
                    <li key={item.texto} className="relative pl-4 text-[0.8rem] before:absolute before:left-0 before:top-[5px] before:h-[7px] before:w-[7px] before:rounded-full before:bg-[#22c55e] before:content-['']">
                      <span className="block font-semibold text-gris-oscuro-texto">{item.texto}</span>
                      <time className="mt-px block text-xs text-gris-texto-terciario">{item.hora}</time>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <ContactosPanel contactos={CONTACTOS_SUGERIDOS} />
            <BloqueAnuncio />
          </aside>
        }
      />
    </EstructuraApp>
  )
}
