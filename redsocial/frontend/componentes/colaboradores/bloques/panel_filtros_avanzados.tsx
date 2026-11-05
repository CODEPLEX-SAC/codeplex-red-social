import { CodeplexProveedorFechas } from '@codeplex-sac/selectores-fecha'
import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Selector } from '../../compartido/interfaz/selector'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BloqueFiltrosVigenciaFechas } from './bloque_filtros_vigencia_fechas'
import { BloqueFiltrosEstadoCuenta } from './bloque_filtros_estado_cuenta'
import { usarFiltrosAvanzados } from './usar_filtros_avanzados'
import { crearFiltrosAvanzadosColaboradores } from './logica_filtros_avanzados_colaboradores'
import type { BasicosFiltrosColaboradores, FiltrosAvanzadosColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const textos = catalogoColaboradores.panel_filtros_avanzados
const clases = catalogoColaboradores.clases.filtros
const selectores = catalogoColaboradores.selectores

function detenerPropagacion(evento: { stopPropagation: () => void }) {
  evento.stopPropagation()
}

export function PanelFiltrosAvanzados({ aplicados, basicos, onAplicar, onCerrar }: { aplicados: FiltrosAvanzadosColaboradores; basicos?: BasicosFiltrosColaboradores; onAplicar: (valores: FiltrosAvanzadosColaboradores) => void; onCerrar: () => void }) {
  const [rol, setRol] = useState(basicos?.rol ?? selectores.rol_perfil.opciones[0])
  const [aplicacion, setAplicacion] = useState(basicos?.aplicacion ?? selectores.aplicaciones.opciones[0])
  const {
    valores,
    asignar,
    limpiar,
    cambiarUltimoAcceso,
    cambiarAccesoVigente,
    cambiarAccesoVencido,
    cambiarAplicaciones,
    cambiarCuentaCreada,
    cambiarCuentaInvitada,
    cambiarMetodoInvitacion,
  } = usarFiltrosAvanzados(aplicados)

  function aplicar() {
    onAplicar(valores)
    basicos?.alAplicar(rol, aplicacion)
    onCerrar()
  }

  function limpiarTodo() {
    limpiar()
    setRol(selectores.rol_perfil.opciones[0])
    setAplicacion(selectores.aplicaciones.opciones[0])
    onAplicar(crearFiltrosAvanzadosColaboradores())
    basicos?.alAplicar(selectores.rol_perfil.opciones[0], selectores.aplicaciones.opciones[0])
  }

  return (
    <div
      role="dialog"
      aria-label={textos.titulo}
      onClick={detenerPropagacion}
      className={clases.panel}
    >
      <div className={clases.asa_movil}>
        <div className={clases.asa_barra} />
      </div>

      <div className={clases.cabecera}>
        <div className={clases.cabecera_fila}>
          <h3 className={clases.titulo}>{textos.titulo}</h3>
          <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={onCerrar} variant="discreto" size="sm" />
        </div>
      </div>

      <CodeplexProveedorFechas idioma={textos.idioma}>
        <div className={clases.cuerpo}>
          {basicos && (
            <div className={clases.basicos}>
              <Selector variant="colaboradores" label={selectores.rol_perfil.etiqueta} value={rol} onChange={(evento) => setRol(String(evento.target.value))}>
                {selectores.rol_perfil.opciones.map((o) => <option key={o}>{o}</option>)}
              </Selector>
              <Selector variant="colaboradores" label={selectores.aplicaciones.etiqueta} value={aplicacion} onChange={(evento) => setAplicacion(String(evento.target.value))}>
                {selectores.aplicaciones.opciones.map((o) => <option key={o}>{o}</option>)}
              </Selector>
            </div>
          )}
          <div className={clases.rejilla}>
            <BloqueFiltrosVigenciaFechas
              fechaInicio={valores.fechaInicio}
              fechaFin={valores.fechaFin}
              invitacionDesde={valores.invitacionDesde}
              invitacionHasta={valores.invitacionHasta}
              asignarFechaInicio={asignar.fechaInicio}
              asignarFechaFin={asignar.fechaFin}
              asignarInvitacionDesde={asignar.invitacionDesde}
              asignarInvitacionHasta={asignar.invitacionHasta}
            />
            <BloqueFiltrosEstadoCuenta
              valores={{
                ultimoAcceso: valores.ultimoAcceso,
                accesoVigente: valores.accesoVigente,
                accesoVencido: valores.accesoVencido,
                aplicaciones: valores.aplicaciones,
                cuentaCreada: valores.cuentaCreada,
                cuentaInvitada: valores.cuentaInvitada,
                metodoInvitacion: valores.metodoInvitacion,
              }}
              asignadores={{
                ultimoAcceso: cambiarUltimoAcceso,
                accesoVigente: cambiarAccesoVigente,
                accesoVencido: cambiarAccesoVencido,
                aplicaciones: cambiarAplicaciones,
                cuentaCreada: cambiarCuentaCreada,
                cuentaInvitada: cambiarCuentaInvitada,
                metodoInvitacion: cambiarMetodoInvitacion,
              }}
            />
          </div>
        </div>
      </CodeplexProveedorFechas>

      <div className={clases.pie}>
        <Boton type="button" variant="secundario" size="md" onClick={limpiarTodo}>{textos.limpiar}</Boton>
        <Boton type="button" variant="primario" size="md" onClick={aplicar}>{textos.aplicar}</Boton>
      </div>
    </div>
  )
}
