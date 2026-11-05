import type { CodeplexCasillaProps } from '@codeplex-sac/formularios'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Casilla } from '../../compartido/interfaz/casilla'
import { TextoColor } from '../../compartido/interfaz/texto_color'
import { columnasDisponibles, estadoDelRecurso } from './logica_permisos_invitacion'
import type { ClavePermiso, ConfiguracionPermisos, RecursoPermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'
import type { IconName } from '@/tipos/compartido/contrato_icono'

const clases = catalogoColaboradores.clases.invitar_permisos
const textos = catalogoColaboradores.campos_rol_permisos
const seleccion = catalogoColaboradores.seleccion_jerarquica
const COLORES: Record<string, string> = catalogoColaboradores.colores_casilla_permiso
const ICONO_ESPECIFICO = 'permiso-especifico' as IconName
const COLOR_ESPECIFICO = 'azul'
const SEPARADOR_ID = catalogoColaboradores.ids_permisos.separador
const ICONOS_RECURSOS = catalogoColaboradores.iconos_recursos as Record<string, string>

function idRecurso(prefijo: string, recurso: string) {
  return [prefijo, recurso].join(SEPARADOR_ID)
}

interface FilaPermisoProps {
  icono: IconName
  color: string
  etiqueta: string
  colorCasilla?: CodeplexCasillaProps['color']
  nombreAccesible: string
  activo: boolean
  alCambiar: (activo: boolean) => void
  soloLectura: boolean
}

function FilaPermiso({ icono, color, etiqueta, colorCasilla, nombreAccesible, activo, alCambiar, soloLectura }: FilaPermisoProps) {
  return (
    <li className={clases.permiso_fila}>
      <span className={clases.permiso_info}>
        <TextoColor as="span" variante={color}>
          <Icono name={icono} className={clases.permiso_glifo} />
        </TextoColor>
        <span className={clases.permiso_texto}>{etiqueta}</span>
      </span>
      <Casilla color={colorCasilla} deshabilitado={soloLectura} seleccionado={activo} alCambiar={(_evento, marcado) => alCambiar(marcado)} inputProps={{ 'aria-label': nombreAccesible }} />
    </li>
  )
}

interface SeccionRecursoProps {
  prefijoId: string
  recurso: RecursoPermiso
  configuracion: ConfiguracionPermisos
  abierto: boolean
  soloLectura: boolean
  alAlternarApertura: () => void
  alSeleccionar: (activo: boolean) => void
  alAlternar: (clave: ClavePermiso, activo: boolean) => void
  alAlternarEspecifico: (id: string, activo: boolean) => void
  alAgregar: () => void
}

function SeccionRecurso({ prefijoId, recurso, configuracion, abierto, soloLectura, alAlternarApertura, alSeleccionar, alAlternar, alAlternarEspecifico, alAgregar }: SeccionRecursoProps) {
  const estado = estadoDelRecurso(recurso, configuracion)
  const id = idRecurso(prefijoId, recurso.nombre)
  const idCabecera = `${seleccion.prefijo_cabecera}${id}`
  const idContenido = `${seleccion.prefijo_contenido}${id}`

  return (
    <section className={abierto ? clases.recurso_abierto : clases.recurso}>
      <div className={clases.recurso_cabecera}>
        <BotonIcono icono={abierto ? 'flecha-abajo' : 'flecha-derecha'} variant="discreto" size="md" tabIndex={-1} aria-hidden="true" aria-label={seleccion.expandir_recurso.replace(':recurso', recurso.nombre)} onClick={alAlternarApertura} />
        <Icono name={(ICONOS_RECURSOS[recurso.nombre] ?? ICONOS_RECURSOS.predeterminado) as IconName} className={clases.recurso_icono} />
        <button type="button" id={idCabecera} aria-expanded={abierto} aria-controls={idContenido} onClick={alAlternarApertura} className={clases.recurso_toggle}>
          <span className={clases.recurso_titulo}>{recurso.nombre}</span>
          <span className={clases.recurso_descripcion}>{recurso.descripcion}</span>
        </button>
        <Casilla
          seleccionado={estado === 'todos'}
          indeterminado={estado === 'parcial'}
          deshabilitado={soloLectura}
          alCambiar={(_evento, marcado) => alSeleccionar(marcado)}
          inputProps={{ 'aria-label': seleccion.seleccionar_recurso.replace(':recurso', recurso.nombre), 'aria-checked': estado === 'parcial' ? 'mixed' : undefined }}
        />
      </div>
      {abierto && (
        <div id={idContenido} role="region" aria-labelledby={idCabecera} className={clases.recurso_cuerpo}>
          <ul className={clases.permisos_lista}>
            {columnasDisponibles(recurso).map((columna) => (
              <FilaPermiso
                key={columna.clave}
                icono={columna.icono}
                color={columna.color}
                etiqueta={columna.etiqueta_fila}
                colorCasilla={COLORES[columna.clave] as CodeplexCasillaProps['color']}
                nombreAccesible={textos.casilla_etiqueta.replace(':permiso', columna.etiqueta_fila).replace(':recurso', recurso.nombre)}
                activo={(configuracion.operaciones[recurso.nombre] ?? []).includes(columna.clave)}
                alCambiar={(activo) => alAlternar(columna.clave, activo)}
                soloLectura={soloLectura}
              />
            ))}
            {(configuracion.especificos[recurso.nombre] ?? []).map((permiso) => (
              <FilaPermiso
                key={permiso.id}
                icono={ICONO_ESPECIFICO}
                color={COLOR_ESPECIFICO}
                etiqueta={permiso.etiqueta}
                nombreAccesible={textos.casilla_etiqueta.replace(':permiso', permiso.etiqueta).replace(':recurso', recurso.nombre)}
                activo={permiso.activo}
                alCambiar={(activo) => alAlternarEspecifico(permiso.id, activo)}
                soloLectura={soloLectura}
              />
            ))}
          </ul>
          {!soloLectura && (
          <div className={clases.permiso_agregar}>
            <Boton type="button" variant="enlace" size="enlace_accion" onClick={alAgregar} aria-label={textos.agregar_permiso_recurso.replace(':recurso', recurso.nombre)}>
              <Icono name="mas" className={clases.permiso_glifo} /> {textos.agregar_permiso}
            </Boton>
          </div>
          )}
        </div>
      )}
    </section>
  )
}

export interface ListaRecursosPermisosProps {
  prefijoId: string
  recursos: RecursoPermiso[]
  configuracion: ConfiguracionPermisos
  expandidos: string[]
  soloLectura: boolean
  alCambiarExpandidos: (nombres: string[]) => void
  alSeleccionarRecurso: (recurso: string, activo: boolean) => void
  alAlternar: (recurso: string, clave: ClavePermiso, activo: boolean) => void
  alAlternarEspecifico: (recurso: string, id: string, activo: boolean) => void
  alAgregar: (recurso: string) => void
}

export function ListaRecursosPermisos({ prefijoId, recursos, configuracion, expandidos, soloLectura, alCambiarExpandidos, alSeleccionarRecurso, alAlternar, alAlternarEspecifico, alAgregar }: ListaRecursosPermisosProps) {
  function alternarApertura(nombre: string) {
    alCambiarExpandidos(expandidos.includes(nombre) ? expandidos.filter((abierto) => abierto !== nombre) : [...expandidos, nombre])
  }

  return (
    <div className={clases.recursos}>
      {recursos.map((recurso) => (
        <SeccionRecurso
          key={recurso.nombre}
          prefijoId={prefijoId}
          recurso={recurso}
          configuracion={configuracion}
          abierto={expandidos.includes(recurso.nombre)}
          soloLectura={soloLectura}
          alAlternarApertura={() => alternarApertura(recurso.nombre)}
          alSeleccionar={(activo) => alSeleccionarRecurso(recurso.nombre, activo)}
          alAlternar={(clave, activo) => alAlternar(recurso.nombre, clave, activo)}
          alAlternarEspecifico={(id, activo) => alAlternarEspecifico(recurso.nombre, id, activo)}
          alAgregar={() => alAgregar(recurso.nombre)}
        />
      ))}
    </div>
  )
}
