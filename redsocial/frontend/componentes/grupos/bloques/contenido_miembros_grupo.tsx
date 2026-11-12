import { Boton } from '../../compartido/interfaz/boton'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { FilaMiembroGrupo } from './fila_miembro_grupo'
import { usarMiembrosGrupo } from './usar_miembros_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ContenidoMiembrosGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.detalle.miembros
const clases = catalogoGrupos.clases.detalle

export function ContenidoMiembrosGrupo({ grupo, alAccion }: ContenidoMiembrosGrupoProps) {
  const estado = usarMiembrosGrupo()
  const hayMas = grupo.totalMiembros > grupo.miembrosLista.length
  const miembros = grupo.miembrosLista.filter((miembro) => contieneTexto(miembro.nombre, estado.consulta))
  const administradores = grupo.miembrosLista.filter((miembro) => miembro.rol === 'administrador')

  return (
    <section className={clases.tarjeta}>
      <h2 className={clases.titulo_tarjeta}>{textos.titulo.replace(':n', grupo.totalTexto)}</h2>
      <p className={clases.ayuda}>{textos.ayuda}</p>
      {hayMas && <p className={clases.ayuda}>{textos.mostrando.replace(':n', String(grupo.miembrosLista.length)).replace(':total', grupo.totalTexto)}</p>}
      <CampoBusqueda placeholder={textos.buscar} aria-label={textos.buscar} value={estado.consulta} onChange={(evento) => estado.cambiarConsulta(evento.target.value)} />
      {miembros.length === 0 && <MensajeVacio texto={textos.sin_resultados} className={clases.vacio} />}
      {miembros.map((miembro) => (
        <FilaMiembroGrupo key={miembro.id} miembro={miembro} grupo={grupo} alAccion={alAccion} />
      ))}
      <div className={clases.miembros_seccion}>
        <h3 className={clases.titulo_tarjeta}>{textos.administradores.replace(':n', String(administradores.length))}</h3>
        {administradores.map((miembro) => (
          <FilaMiembroGrupo key={miembro.id} miembro={miembro} grupo={grupo} alAccion={alAccion} />
        ))}
      </div>
      <div className={clases.miembros_seccion}>
        <h3 className={clases.titulo_tarjeta}>{textos.voces}</h3>
        <div className={clases.voces}>
          <p className={clases.ayuda}>{textos.voces_texto}</p>
          {grupo.rol === 'administrador' && (
            <Boton type="button" variant="secundario" size="default" onClick={() => alAccion(textos.anadir)}>
              {textos.anadir}
            </Boton>
          )}
        </div>
      </div>
      <div className={clases.miembros_seccion}>
        <h3 className={clases.titulo_tarjeta}>{textos.nuevos}</h3>
        <p className={clases.ayuda}>{textos.nuevos_ayuda}</p>
        {grupo.miembrosLista.slice(0, textos.nuevos_maximo).map((miembro) => (
          <FilaMiembroGrupo key={miembro.id} miembro={miembro} grupo={grupo} alAccion={alAccion} />
        ))}
      </div>
    </section>
  )
}
