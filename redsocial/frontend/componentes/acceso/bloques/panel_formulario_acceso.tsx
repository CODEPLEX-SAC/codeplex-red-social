import { BloqueAccesoAlternativo } from './bloque_acceso_alternativo'
import { FormularioCrearCuenta } from './formulario_crear_cuenta'
import { FormularioInicioSesion } from './formulario_inicio_sesion'
import { SelectorModoAcceso } from './selector_modo_acceso'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PanelFormularioAccesoProps } from '@/tipos/acceso/contrato_acceso'

const modos = catalogoAcceso.modos

export function PanelFormularioAcceso({ modo, onCambiarModo, onAcceder }: PanelFormularioAccesoProps) {
  const pestanaActiva = modos.find((opcion) => opcion.clave === modo)

  return (
    <div className="flex w-105 flex-none flex-col gap-4 overflow-y-auto border-r border-borde px-9 py-9 max-800:w-full max-800:border-r-0 max-560:px-5 max-560:py-6">
      <p className="m-0 text-titulo-banner font-extrabold tracking-12 text-texto">{textosRedSocial.MARCA}</p>
      <SelectorModoAcceso modo={modo} onCambiar={onCambiarModo} />
      <div role="tabpanel" id={catalogoAcceso.ids.panel} aria-labelledby={pestanaActiva?.id} className="flex flex-col gap-4">
        {modo === 'iniciar_sesion' && (
          <>
            <BloqueAccesoAlternativo />
            <FormularioInicioSesion onAcceder={onAcceder} credencialesIniciales={catalogoAcceso.demostracion} />
          </>
        )}
        {modo === 'crear_cuenta' && <FormularioCrearCuenta onVolverAIniciarSesion={() => onCambiarModo('iniciar_sesion')} />}
      </div>
    </div>
  )
}
