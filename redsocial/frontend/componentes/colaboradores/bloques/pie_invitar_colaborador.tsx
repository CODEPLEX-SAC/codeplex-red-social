import { useEffect, useRef } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PieInvitarColaboradorProps } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const ETAPAS = catalogoColaboradores.stepper_invitar
const ULTIMO_PASO = ETAPAS.length
const clases = catalogoColaboradores.clases.invitar_comun

export function PieInvitarColaborador({ paso, etiquetaSiguiente, alCancelar, alAnterior, alSiguiente, alEnviar }: PieInvitarColaboradorProps) {
  const esUltimo = paso === ULTIMO_PASO
  const contenedor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const botones = contenedor.current?.getElementsByTagName('button')
    if (document.activeElement === document.body) botones?.[botones.length - 1]?.focus()
  }, [paso])

  return (
    <div ref={contenedor} className={clases.pie}>
      <Boton type="button" variant="secundario" size="md" onClick={alCancelar} className={clases.pie_cancelar}>
        {textosRedSocial.CANCELAR}
      </Boton>
      <div className={clases.pie_acciones}>
        {paso === 1 ? null : (
          <Boton type="button" variant="secundario" size="md" onClick={alAnterior} className={clases.pie_secundario}>
            {catalogoColaboradores.campos_rol_permisos.anterior}
          </Boton>
        )}
        {esUltimo ? (
          <Boton type="button" variant="primario" size="md" onClick={alEnviar} className={clases.pie_primario}>
            <Icono name="enviar" className={clases.pie_glifo} />
            {catalogoColaboradores.campos_resumen.enviar_invitacion}
          </Boton>
        ) : (
          <Boton type="button" variant="primario" size="md" onClick={alSiguiente} className={clases.pie_primario}>
            {etiquetaSiguiente ?? textosRedSocial.SIGUIENTE}
          </Boton>
        )}
      </div>
    </div>
  )
}
