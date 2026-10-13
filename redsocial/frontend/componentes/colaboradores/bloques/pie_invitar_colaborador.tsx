import { useEffect, useRef } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PieInvitarColaboradorProps } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const ETAPAS = catalogoColaboradores.stepper_invitar
const ULTIMO_PASO = ETAPAS.length

export function PieInvitarColaborador({ paso, alCancelar, alAnterior, alSiguiente, alEnviar }: PieInvitarColaboradorProps) {
  const esUltimo = paso === ULTIMO_PASO
  const contenedor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const botones = contenedor.current?.getElementsByTagName('button')
    if (document.activeElement === document.body) botones?.[botones.length - 1]?.focus()
  }, [paso])

  return (
    <div ref={contenedor} className="flex flex-none items-center justify-between gap-3 border-t border-borde px-6 py-4 max-600:grid max-600:grid-cols-2 max-600:gap-2 max-480:px-3">
      <Boton type="button" variant="secundario" size="md" onClick={alCancelar} className="max-600:w-full">
        {textosRedSocial.CANCELAR}
      </Boton>
      <div className="flex gap-3 max-600:contents">
        {paso === 1 ? null : (
          <Boton type="button" variant="secundario" size="md" onClick={alAnterior} className="max-600:w-full">
            {catalogoColaboradores.campos_rol_permisos.anterior}
          </Boton>
        )}
        {esUltimo ? (
          <Boton type="button" variant="primario" size="md" onClick={alEnviar} className="max-600:order-first max-600:col-span-2">
            <Icono name="enviar" className="w-4 h-4" />
            {catalogoColaboradores.campos_resumen.enviar_invitacion}
          </Boton>
        ) : (
          <Boton type="button" variant="primario" size="md" onClick={alSiguiente} className="max-600:order-first max-600:col-span-2">
            {textosRedSocial.SIGUIENTE}
          </Boton>
        )}
      </div>
    </div>
  )
}
