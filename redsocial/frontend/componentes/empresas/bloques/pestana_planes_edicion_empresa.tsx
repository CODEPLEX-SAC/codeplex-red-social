import { useState } from 'react'
import { usarMejoraPlan } from '../../compartido/carrito/contexto_mejora_plan'
import { usarSuscripciones } from '../../compartido/carrito/contexto_suscripciones'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { AvisosLimitePlan } from './avisos_limite_plan'
import { CabeceraPlanesAsignados } from './cabecera_planes_asignados'
import { aplicativosContratados, avisosDeLimite, capacidadDeFila } from './logica_mejora_plan'
import { ModalMejoraPlan } from './modal_mejora_plan'
import { TablaPlanesAsignados } from './tabla_planes_asignados'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { PestanaPlanesEdicionEmpresaProps } from '@/tipos/empresas/contrato_detalle_empresa'
import type { SeleccionPlan } from '@/tipos/marketplace/modelo_planes'

const textos = catalogoEmpresas.planes_asignados
const clases = textos.edicion.clases

export function PestanaPlanesEdicionEmpresa({ edicion: borrador, totalEmpresas }: PestanaPlanesEdicionEmpresaProps) {
  const suscripciones = usarSuscripciones()
  const mejora = usarMejoraPlan()
  const [mejorando, setMejorando] = useState<string | null>(null)
  const contratados = aplicativosContratados(suscripciones)
  const configuracion = (aplicacion: string) => mejora?.configuracion(aplicacion)
  const enMejora = contratados.find((contratado) => contratado.suscripcion.aplicacion === mejorando)
  const configuracionMejora = enMejora ? configuracion(enMejora.suscripcion.aplicacion) : undefined

  function contratar(seleccion: SeleccionPlan) {
    setMejorando(null)
    mejora?.contratar(seleccion)
  }

  return (
    <div role="tabpanel" aria-label={textos.titulo} className={textos.clases.contenedor}>
      <AvisosLimitePlan avisos={avisosDeLimite(totalEmpresas, suscripciones, configuracion, borrador.modulos)} />
      <section className={clases.panel}>
        <CabeceraPlanesAsignados />
        {contratados.length === 0 ? (
          <MensajeVacio titulo={textos.vacio_titulo} texto={textos.vacio_detalle} className="pb-6" />
        ) : (
          <TablaPlanesAsignados contratados={contratados} activos={borrador.modulos} totalEmpresas={totalEmpresas} configuracion={configuracion} alAlternar={borrador.alternarModulo} alMejorar={setMejorando} />
        )}
      </section>
      {enMejora && configuracionMejora && (
        <ModalMejoraPlan
          modulo={enMejora.modulo}
          suscripcion={enMejora.suscripcion}
          capacidad={capacidadDeFila(enMejora.suscripcion, totalEmpresas)}
          configuracion={configuracionMejora}
          alCerrar={() => setMejorando(null)}
          alContratar={contratar}
        />
      )}
    </div>
  )
}
