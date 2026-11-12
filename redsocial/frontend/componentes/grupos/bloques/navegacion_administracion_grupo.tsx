import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { OpcionNavegacionAdministracion } from './opcion_navegacion_administracion'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { NavegacionAdministracionGrupoProps } from '@/tipos/grupos/contrato_administracion_grupo'

const textos = catalogoGrupos.administracion
const clases = catalogoGrupos.clases.administracion

export function NavegacionAdministracionGrupo({ grupo, activa, cerradas, alElegir, alAlternarCategoria }: NavegacionAdministracionGrupoProps) {
  const colapsadas = new Set(cerradas)

  return (
    <nav aria-label={textos.navegacion} className={clases.panel}>
      <div className={clases.identidad}>
        <img src={grupo.imagen} alt={textos.logo.replace(':nombre', grupo.nombre)} className={clases.logo} />
        <div className={clases.identidad_textos}>
          <strong className={clases.nombre}>{grupo.nombre}</strong>
          <span className={clases.miembros_identidad}>{textos.miembros_grupo.replace(':n', grupo.totalTexto)}</span>
        </div>
      </div>
      <h2 className={clases.titulo}>{textos.titulo}</h2>
      <div className={clases.principal}>
        {textos.principal.map((opcion) => (
          <OpcionNavegacionAdministracion key={opcion.clave} opcion={opcion} activa={activa === opcion.clave} alElegir={alElegir} />
        ))}
      </div>
      {textos.categorias.map((categoria) => (
        <div key={categoria.clave} className={clases.categoria}>
          <Boton type="button" size="default" aria-expanded={!colapsadas.has(categoria.clave)} className={clases.categoria_cabecera} onClick={() => alAlternarCategoria(categoria.clave)}>
            <span className={clases.categoria_titulo}>{categoria.titulo}</span>
            <Icono name={colapsadas.has(categoria.clave) ? 'flecha-abajo' : 'flecha-arriba'} className="h-4 w-4" />
          </Boton>
          {!colapsadas.has(categoria.clave) &&
            categoria.opciones.map((opcion) => <OpcionNavegacionAdministracion key={opcion.clave} opcion={opcion} activa={activa === opcion.clave} alElegir={alElegir} />)}
        </div>
      ))}
    </nav>
  )
}
