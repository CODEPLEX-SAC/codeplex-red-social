import { useState } from 'react'
import type { ReactNode } from 'react'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import { Casilla } from '../../compartido/interfaz/casilla'
import { ListaRecursosPermisos } from './lista_recursos_permisos'
import { estadoDelModulo } from './logica_permisos_invitacion'
import { ModalAgregarPermiso } from './modal_agregar_permiso'
import type { ClavePermiso, ConfiguracionPermisos, RecursoPermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const clases = catalogoColaboradores.clases.invitar_permisos
const seleccion = catalogoColaboradores.seleccion_jerarquica

export interface PanelEdicionPermisosProps {
  prefijoId: string
  claveLista: string
  titulo: string
  subtitulo: string
  acciones?: ReactNode
  recursos: RecursoPermiso[]
  configuracion: ConfiguracionPermisos
  expandidos: string[]
  soloLectura?: boolean
  errorPermisos?: string | null
  alCambiarExpandidos: (ids: string[]) => void
  alSeleccionarModulo: (activo: boolean) => void
  alSeleccionarRecurso: (recurso: string, activo: boolean) => void
  alAlternar: (recurso: string, clave: ClavePermiso, activo: boolean) => void
  alAlternarEspecifico: (recurso: string, id: string, activo: boolean) => void
  alAgregar: (recurso: string, etiqueta: string) => string | null
}

export function PanelEdicionPermisos({ prefijoId, claveLista, titulo, subtitulo, acciones, recursos, configuracion, expandidos, soloLectura = false, errorPermisos = null, alCambiarExpandidos, alSeleccionarModulo, alSeleccionarRecurso, alAlternar, alAlternarEspecifico, alAgregar }: PanelEdicionPermisosProps) {
  const [agregando, setAgregando] = useState<string | null>(null)
  const estado = estadoDelModulo(recursos, configuracion)

  return (
    <>
      <div className={clases.modulo_cabecera}>
        <div className={clases.modulo_cabecera_marca}>
          <Icono name="configuracion" className={clases.modulo_glifo_permisos} />
          <div className={clases.modulo_cabecera_texto}>
            <h3 className={clases.modulo_titulo_permisos}>{titulo}</h3>
            <p className={clases.modulo_subtitulo}>{subtitulo}</p>
          </div>
        </div>
        <div className={clases.modulo_cabecera_acciones}>
          {acciones}
          <Casilla
            etiqueta={seleccion.seleccionar_todos}
            seleccionado={estado === 'todos'}
            indeterminado={estado === 'parcial'}
            deshabilitado={soloLectura}
            alCambiar={(_evento, marcado) => alSeleccionarModulo(marcado)}
            inputProps={{ 'aria-checked': estado === 'parcial' ? 'mixed' : undefined }}
          />
        </div>
      </div>
      {errorPermisos && <p role="alert" className={clases.error_seccion}>{errorPermisos}</p>}
      <ListaRecursosPermisos
        key={claveLista}
        prefijoId={prefijoId}
        recursos={recursos}
        configuracion={configuracion}
        expandidos={expandidos}
        soloLectura={soloLectura}
        alCambiarExpandidos={alCambiarExpandidos}
        alSeleccionarRecurso={alSeleccionarRecurso}
        alAlternar={alAlternar}
        alAlternarEspecifico={alAlternarEspecifico}
        alAgregar={setAgregando}
      />
      {agregando && <ModalAgregarPermiso recurso={agregando} alAgregar={(etiqueta) => alAgregar(agregando, etiqueta)} alCerrar={() => setAgregando(null)} />}
    </>
  )
}
