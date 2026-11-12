import { AlertaEstado } from '../../compartido/interfaz/alerta_estado'
import { useState } from 'react'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import { Casilla } from '../../compartido/interfaz/casilla'
import { ListaRecursosPermisos } from './lista_recursos_permisos'
import { estadoDelModulo } from './logica_permisos_invitacion'
import { ModalAgregarPermiso } from './modal_agregar_permiso'
import type { PanelEdicionPermisosProps } from '@/tipos/colaboradores/contrato_panel_edicion_permisos'

const clases = catalogoColaboradores.clases.invitar_permisos
const seleccion = catalogoColaboradores.seleccion_jerarquica

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
      {errorPermisos && <AlertaEstado className={clases.error_seccion}>{errorPermisos}</AlertaEstado>}
      <ListaRecursosPermisos
        key={claveLista}
        prefijoId={prefijoId}
        recursos={recursos}
        configuracion={configuracion}
        expandidos={expandidos}
        soloLectura={soloLectura}
        alCambiarExpandidos={alCambiarExpandidos}
        manejadores={{ alSeleccionarRecurso, alAlternar, alAlternarEspecifico, alAgregar: setAgregando }}
      />
      {agregando && <ModalAgregarPermiso recurso={agregando} alAgregar={(etiqueta) => alAgregar(agregando, etiqueta)} alCerrar={() => setAgregando(null)} />}
    </>
  )
}
