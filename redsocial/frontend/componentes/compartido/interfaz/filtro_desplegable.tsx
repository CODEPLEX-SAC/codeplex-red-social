import { Boton } from './boton'
import { BotonIcono } from './boton_icono'
import { FondoPanelFlotante } from './fondo_panel_flotante'
import { Icono } from '../icono'
import type { FiltroDesplegableProps } from '@/tipos/compartido/contrato_filtro_desplegable'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.filtro_desplegable

export function FiltroDesplegable({ id, abierto, alCambiarAbierto, icono, etiqueta, activo, quitar, children }: FiltroDesplegableProps) {
  const conQuitar = quitar !== undefined

  return (
    <div className={clases.contenedor}>
      <Boton
        type="button"
        onClick={(evento) => {
          evento.stopPropagation()
          alCambiarAbierto(!abierto)
        }}
        variant="filtro"
        size="filtro"
        activo={activo ?? abierto}
        aria-expanded={abierto}
        aria-controls={abierto ? id : undefined}
        className={conQuitar ? clases.disparador_con_quitar : undefined}
      >
        <Icono name={icono} className={clases.clase_icono} /> {etiqueta}
        {!conQuitar && <Icono name={abierto ? clases.icono_abierto : clases.icono_cerrado} className={clases.clase_icono} />}
      </Boton>
      {quitar && <BotonIcono icono="cerrar" type="button" aria-label={quitar.etiqueta} onClick={quitar.alQuitar} variant="discreto" size="sm" className={clases.quitar} />}
      {abierto && (
        <>
          <FondoPanelFlotante onCerrar={() => alCambiarAbierto(false)} />
          {children}
        </>
      )}
    </div>
  )
}
