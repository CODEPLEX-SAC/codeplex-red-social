import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { Boton } from '../../componentes/compartido/interfaz/boton'
import { CampoBusqueda } from '../../componentes/compartido/interfaz/campo_busqueda'
import { EncabezadoAmigos } from '../../componentes/amigos/bloques/encabezado_amigos'
import { PestanasAmigos } from '../../componentes/amigos/bloques/pestanas_amigos'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import { SuperficieColor } from '../../componentes/compartido/interfaz/superficie_color'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import {
  RESUMEN_AMIGOS as RESUMEN,
  AMIGOS,
  SOLICITUDES_AMIGOS as SOLICITUDES,
  PERSONAS_CONOCER_TODOS as PERSONAS_CONOCER,
  TUS_LISTAS_TODOS as TUS_LISTAS,
} from '../../datos/amigos/todos'

const AVATAR = 'h-8 w-8 flex-none rounded-full bg-primario-suave'

export function PaginaAmigosTodos() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className="rounded-xl border border-borde bg-white p-[18px_20px]">
            <EncabezadoAmigos textoBoton={catalogoAmigos.botones.agregar_amigos} />
            <PestanasAmigos activa="15-05-amigos-01-todos-web.html" />

            <div className="my-4.5 flex gap-3 max-[800px]:flex-col">
              <CampoBusqueda
                placeholder={catalogoAmigos.placeholders.buscar_amigos}
                aria-label={catalogoAmigos.placeholders.buscar_amigos}
                className="min-w-0 flex-1 max-[800px]:w-full max-[800px]:flex-none"
              />
              <button type="button" className="flex h-[34px] min-w-[190px] flex-none items-center justify-between gap-2 whitespace-nowrap rounded-[7px] border border-borde bg-white px-3 text-xs text-texto-suave max-[800px]:w-full">
                {catalogoAmigos.botones.todos_los_amigos}
                <Icono name="flecha-abajo" className="h-3.25 w-3.25" />
              </button>
            </div>

            <div className="mb-5 grid grid-cols-4 gap-3 max-[900px]:grid-cols-2">
              {RESUMEN.map((r) => (
                <article key={r.etiqueta} className="flex items-center gap-2.5 rounded-[10px] border border-borde bg-white p-3.5">
                  <span className={'grid h-[34px] w-[34px] flex-none place-items-center rounded-[9px] ' + (r.peligro ? 'bg-[#fdeceb] text-peligro' : 'bg-primario-suave text-primario')}>
                    <Icono name={r.icono} className="h-[17px] w-[17px]" />
                  </span>
                  <div>
                    <span className="block text-[10px] text-texto-suave">{r.etiqueta}</span>
                    <strong className="mt-0.5 block text-lg text-texto">{r.valor}</strong>
                  </div>
                </article>
              ))}
            </div>

            <h2 className="mb-3.5 text-[15px] font-bold text-texto">{catalogoAmigos.secciones.tus_amigos}</h2>
            <div>
              {AMIGOS.map((a) => (
                <article key={a.nombre} className="flex items-center gap-3.5 border-b border-borde py-3.5 last:border-b-0">
                  <AvatarImagen src={usuarioImg} className="h-12 w-12 flex-none rounded-full bg-primario-suave" />
                  <div className="w-[170px] min-w-0 flex-none max-[900px]:w-[130px]">
                    <strong className="block truncate text-[13px] text-texto">{a.nombre}</strong>
                    <span className={'mt-0.75 flex items-center gap-1.25 text-[10px] before:h-1.5 before:w-1.5 before:flex-none before:rounded-full ' + (a.enLinea ? 'text-exito before:bg-exito' : 'text-texto-suave before:bg-[#c7c4d6]')}>
                      {a.estado}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 items-center gap-2.5 max-[900px]:hidden">
                    <span className="whitespace-nowrap text-[11px] text-texto-suave">{a.comunes}</span>
                    <div className="flex items-center">
                      {[0, 1, 2, 3].map((i) => (
                        <AvatarImagen
                          key={i}
                          src={usuarioImg}
                          className={'h-[22px] w-[22px] rounded-full border-2 border-white bg-primario-suave ' + (i > 0 ? '-ml-2' : '')}
                        />
                      ))}
                      <span className="-ml-2 grid h-[22px] w-[22px] place-items-center rounded-full border-2 border-white bg-[#efedf7] text-[8px] font-bold text-texto-suave">{a.masAvatares}</span>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-2">
                    <Boton variant="secundario" size="mini">{catalogoAmigos.botones.mensaje}</Boton>
                    <button type="button" aria-label={textosRedSocial.MAS_OPCIONES} className="grid h-8 w-8 place-items-center rounded-[7px] border-0 bg-transparent text-[#6d6a7c] hover:bg-[#f2f1f6]">
                      <Icono name="puntos" className="h-[18px] w-[18px]" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <a href="#" className="flex items-center justify-center gap-1.5 border-t border-borde p-3.5 text-xs text-texto-suave no-underline hover:bg-[#faf9fc]">
              {catalogoAmigos.botones.ver_mas_amigos} <Icono name="flecha-abajo" className="h-3.25 w-3.25" />
            </a>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[13px] text-texto">{catalogoAmigos.secciones.solicitudes_amistad_lateral}</h2>
                <a href="#" className="text-[11px] text-primario no-underline">{textosRedSocial.VER_TODAS}</a>
              </div>
              {SOLICITUDES.map((s) => (
                <article key={s.nombre} className="border-b border-borde py-3.5 last:border-b-0">
                  <div className="mb-2.5 flex gap-2.5">
                    <AvatarImagen src={usuarioImg} className="h-12 w-12 flex-none rounded-full bg-primario-suave" />
                    <div>
                      <strong className="block text-xs text-texto">{s.nombre}</strong>
                      <p className="m-0 mt-0.5 text-[10px] leading-[1.4] text-texto-suave">{s.descripcion}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <Boton variant="primario" size="mini" className="flex-1">{catalogoAmigos.botones.aceptar}</Boton>
                    <Boton variant="secundario" size="mini" className="flex-1">{catalogoAmigos.botones.eliminar}</Boton>
                  </div>
                </article>
              ))}
            </section>

            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[13px] text-texto">{catalogoAmigos.secciones.personas_conocer}</h2>
                <a href="#" className="text-[11px] text-primario no-underline">{textosRedSocial.VER_TODAS}</a>
              </div>
              {PERSONAS_CONOCER.map((p) => (
                <article key={p.nombre} className="flex items-center gap-2 border-b border-[#f0eef5] py-2 last:border-b-0">
                  <AvatarImagen src={usuarioImg} className={AVATAR} />
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-[11px] text-texto">{p.nombre}</strong>
                    <span className="block truncate text-[10px] text-texto-suave">{p.comunes}</span>
                  </div>
                  <Boton variant="secundario" size="mini">{catalogoAmigos.botones.agregar}</Boton>
                </article>
              ))}
            </section>

            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[13px] text-texto">{catalogoAmigos.secciones.tus_listas}</h2>
                <a href="#" className="text-[11px] text-primario no-underline">{textosRedSocial.VER_TODAS}</a>
              </div>
              {TUS_LISTAS.map((l) => (
                <a key={l.nombre} href="#" className="flex items-center gap-2.5 border-b border-borde py-2.5 text-inherit no-underline last:border-b-0">
                  <SuperficieColor as="span" variante={l.color} className="grid h-9 w-9 flex-none place-items-center rounded-[9px]">
                    <Icono name={l.icono} className="h-[17px] w-[17px] text-white" />
                  </SuperficieColor>
                  <div className="min-w-0 flex-1">
                    <strong className="block text-xs text-texto">{l.nombre}</strong>
                    <span className="mt-0.5 block text-[10px] text-texto-suave">{l.cantidad}</span>
                  </div>
                  <Icono name="flecha-derecha" className="h-3.25 w-3.25 flex-none text-[#b3b0c2]" />
                </a>
              ))}
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
