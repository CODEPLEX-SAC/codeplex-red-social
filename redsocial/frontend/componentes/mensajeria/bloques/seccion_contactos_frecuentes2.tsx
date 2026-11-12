import { useState } from 'react'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { clasesBoton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Boton } from '../../compartido/interfaz/boton'
import { TextoTruncable } from '../../compartido/interfaz/texto_truncable'
import { rutaDeVideollamadaA } from './logica_videollamadas'

export function SeccionContactosFrecuentes2({
  carrusel,
  CONTACTOS_FRECUENTES,
}: {
  carrusel: { pistaRef: React.RefObject<HTMLDivElement | null>; }
  CONTACTOS_FRECUENTES: { nombre: string; esGrupo?: boolean | undefined; miembros?: string | undefined; }[]
}) {
  const [todos, setTodos] = useState(false)

  return (
    <section className="min-w-0 rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion text-texto">{catalogoMensajeria.secciones.contactos_frecuentes}</h2>
        <Boton type="button" variant="enlace" size="enlace_accion" aria-expanded={todos} onClick={() => setTodos((actual) => !actual)}>
          {todos ? catalogoMensajeria.botones.ver_menos_contactos : catalogoMensajeria.botones.ver_todos}
        </Boton>
      </div>
      <div ref={carrusel.pistaRef} className={todos ? 'flex flex-wrap gap-3' : 'flex gap-3 overflow-x-auto scroll-smooth scrollbar-oculto'}>
        {CONTACTOS_FRECUENTES.map((c) => (
          <article key={c.nombre} className="flex w-37.5 min-w-0 flex-none flex-col items-center gap-1.5 rounded-xl border border-borde bg-white px-2 py-3.5 text-center hover:shadow-t9">
            <div className="relative inline-block">
              {c.esGrupo ? (
                <AvatarUsuario tamano="lg" icono="grupo" insignia={4} colorInsignia="primario" />
              ) : (
                <AvatarUsuario tamano="lg" imagen={usuarioImg} estado="conectado" />
              )}
            </div>
            <TextoTruncable texto={c.nombre} className="w-full text-nombre-fila leading-compacto text-texto" />
            <span className="inline-flex items-center gap-1 text-auxiliar text-texto-suave">
              {c.esGrupo ? c.miembros : catalogoMensajeria.filtros.en_linea}
            </span>
            <a href={rutaDeVideollamadaA(c.nombre)} className={clasesBoton({ variant: 'contorno', size: 'mini', className: 'mt-auto' })}>
              <Icono name="video" className="h-3 w-3" /> {catalogoMensajeria.botones.videollamar}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
