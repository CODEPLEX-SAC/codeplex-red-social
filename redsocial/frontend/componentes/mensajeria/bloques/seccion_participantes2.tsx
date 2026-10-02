import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { Boton } from '../../compartido/interfaz/boton'

export function SeccionParticipantes2({
  PARTICIPANTES_INICIAR,
  CONTACTOS_INVITAR,
}: {
  PARTICIPANTES_INICIAR: { nombre: string; rol: string; }[]
  CONTACTOS_INVITAR: string[]
}) {
  return (
    <section className="rounded-xl border border-borde bg-white p-4">
      <div className="mb-2.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoMensajeria.botones.participantes} ({PARTICIPANTES_INICIAR.length})</h2>
        <Icono name="flecha-abajo" className="h-3.75 w-3.75 text-texto-suave" />
      </div>
      {PARTICIPANTES_INICIAR.map((p) => (
        <article key={p.nombre} className="flex items-center gap-2.5 py-2">
          <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
          <div className="min-w-0 flex-1">
            <strong className="block truncate text-nombre-entidad text-texto">{p.nombre}</strong>
            <span className="block text-etiqueta-estado text-exito">{p.rol}</span>
          </div>
          <Icono name="microfono" className="h-3.75 w-3.75 flex-none text-exito" />
        </article>
      ))}

      <h3 className="mb-2 mt-3.5 text-titulo-seccion font-bold text-texto">{catalogoMensajeria.secciones.invitar_mas_personas}</h3>
      <CampoBusqueda placeholder={catalogoMensajeria.placeholders.buscar_contactos_o_correo} className="mb-1.5 w-full" />

      <div className="flex flex-col">
        {CONTACTOS_INVITAR.map((nombre) => (
          <article key={nombre} className="flex items-center gap-2.5 py-2">
            <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
            <div className="min-w-0 flex-1">
              <strong className="block truncate text-nombre-entidad text-texto">{nombre}</strong>
              <span className="block text-auxiliar text-texto-suave">{catalogoMensajeria.leyendas.colaborador}</span>
            </div>
            <Boton type="button" variant="secundario" size="mini" className="flex-none">{catalogoMensajeria.botones.invitar}</Boton>
          </article>
        ))}
      </div>

      <Boton type="button" variant="secundario" size="default" className="mt-3 w-full">
        <Icono name="enlace" className="h-3.5 w-3.5" /> {catalogoMensajeria.botones.copiar_enlace_reunion}
      </Boton>
    </section>
  )
}
