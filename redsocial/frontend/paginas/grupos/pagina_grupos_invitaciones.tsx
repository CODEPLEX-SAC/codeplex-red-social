import { Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import { SeccionInvitaciones } from '../../componentes/grupos'
import { FilaActividadGrupo } from '../../componentes/actividad'
import { PENDIENTES, ACEPTADAS, RESUMEN_INVITACIONES as RESUMEN, ACTIVIDAD_INVITACIONES as ACTIVIDAD, CONTEO_PESTANAS_INVITACIONES_GRUPO as CONTEO, CLASES_ICONO_INV, CLASES_RESUMEN } from '../../rutas/grupos/rutas_grupos'

export function PaginaGruposInvitaciones() {
  return (
    <EstructuraApp paginaActiva="grupos">
      <EstructuraTresColumnas
        principal={
          <SeccionInvitaciones
            CONTEO={CONTEO}
            PENDIENTES={PENDIENTES}
            CLASES_ICONO_INV={CLASES_ICONO_INV}
            ACEPTADAS={ACEPTADAS}
          />
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="rounded-xl border border-t-eeeeee bg-white p-4">
              <h3 className="m-0 mb-3.5 text-titulo-seccion font-bold text-texto">{catalogoGrupos.secciones.resumen_invitaciones}</h3>
              <div className="mb-4 grid gap-3">
                {RESUMEN.map((r) => (
                  <div key={r.etiqueta} className="flex items-center gap-2.5">
                    <span className={`grid h-7.5 w-7.5 flex-none place-items-center rounded-full ${CLASES_RESUMEN[r.color]}`}>
                      <Icono name={r.icono} className="h-3.75 w-3.75" />
                    </span>
                    <span className="flex-1 text-auxiliar text-texto">{r.etiqueta}</span>
                    <strong className="text-campo-formulario text-texto">{r.valor}</strong>
                  </div>
                ))}
              </div>
              <a href="#" className="block rounded-lg border border-borde bg-white py-2.25 text-center text-enlace-accion font-semibold text-primario no-underline hover:bg-t-f7f6fa">{catalogoGrupos.leyendas.ver_todas_invitaciones}</a>
            </section>

            <section className="rounded-xl border border-t-eeeeee bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoGrupos.secciones.actividad_reciente}</h3>
                <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{catalogoGrupos.leyendas.ver_toda}</a>
              </div>
              {ACTIVIDAD.map((a) => (
                <FilaActividadGrupo key={a.nombre + a.grupo} nombre={a.nombre} accion={a.accion} grupo={a.grupo} tiempo={a.tiempo} icono={a.icono} colorIcono={a.color} />
              ))}
            </section>

            <section className="rounded-xl border border-t-eeeeee bg-white p-4.5">
              <span className="mb-2.5 grid h-8 w-8 place-items-center rounded-lg bg-t-dcfce7 text-positivo-kpi">
                <Icono name="amigos" className="h-4 w-4" />
              </span>
              <strong className="mb-1 block text-subtitulo text-texto">{catalogoGrupos.ayuda.titulo}</strong>
              <p className="m-0 mb-3 text-cuerpo leading-1.45 text-texto-suave">{catalogoGrupos.ayuda.texto}</p>
              <a href="#" className="flex items-center justify-center gap-1.5 rounded-lg border border-borde bg-white py-2 text-boton font-semibold text-texto no-underline hover:bg-t-f7f6fa">
                <Icono name="ajustes-sistema" className="h-3.5 w-3.5" /> {catalogoGrupos.botones.ir_a_configuracion}
              </a>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
