import { AlertaEstado } from '../interfaz/alerta_estado'
import { Boton } from '../interfaz/boton'
import { Casilla } from '../interfaz/casilla'
import { Icono } from '../icono'
import { IndicadorCarga } from '../interfaz/indicador_carga'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { FormularioTarjetaPagoCampos } from './formulario_tarjeta_pago'
import { ResumenTarjetaPago } from './resumen_tarjeta_pago'
import { TituloPanelPago } from './titulo_panel_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { usarFlujoPago } from './usar_flujo_pago'
import type { ControlTarjetasPago } from '@/tipos/compartido/contrato_flujo_pago'

const clases = catalogoCompartido.flujo_pago.clases

function EstadoTarjetas({ tarjetas }: { tarjetas: ControlTarjetasPago }) {
  const textos = usarTextosPago().metodo_guardado
  if (tarjetas.estado === 'cargando') return <IndicadorCarga etiqueta={textos.cargando} />
  if (tarjetas.estado === 'error') {
    return (
      <AlertaEstado className={clases.aviso_estado}>
        <span>{textos.error_lectura}</span>
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={tarjetas.recargar}>{textos.reintentar}</Boton>
      </AlertaEstado>
    )
  }
  if (tarjetas.error) return <AlertaEstado className={clases.aviso_estado}>{textos.error_escritura}</AlertaEstado>
  return null
}

function avisoDeTarjetaNueva(predeterminadaVencida: boolean, hayGuardadas: boolean, textos: { predeterminada_vencida: string; elegir_valida: string }) {
  if (predeterminadaVencida) return textos.predeterminada_vencida
  return hayGuardadas ? textos.elegir_valida : null
}

function TarjetaNueva({ estado, tarjetas }: { estado: ReturnType<typeof usarFlujoPago>; tarjetas: ControlTarjetasPago }) {
  const textos = usarTextosPago()
  const hayGuardadas = tarjetas.tarjetas.length > 0
  const aviso = avisoDeTarjetaNueva(estado.predeterminadaVencida, hayGuardadas, textos.metodo_guardado)
  return (
    <>
      {aviso && <AlertaEstado tipo="estado" className={clases.aviso_estado}>{aviso}</AlertaEstado>}
      <FormularioTarjetaPagoCampos formulario={estado.formulario} />
      <Casilla seleccionado={estado.guardarTarjeta} alCambiar={(_, marcado) => estado.alternarGuardarTarjeta(marcado)} etiqueta={textos.metodo_guardado.guardar_futuras} />
      {hayGuardadas && <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => estado.abrirVentana('tarjetas')}>{textos.guardados.usar_guardada}</Boton>}
    </>
  )
}

export function SeccionTarjetaPago({ estado, tarjetas, avisoRenovacion, demostracion }: { estado: ReturnType<typeof usarFlujoPago>; tarjetas: ControlTarjetasPago; avisoRenovacion?: string | null; demostracion?: string }) {
  const textos = usarTextosPago()
  const guardada = estado.tarjetaGuardada
  const cargando = tarjetas.estado === 'cargando'
  const tarjetaNueva = !cargando && <TarjetaNueva estado={estado} tarjetas={tarjetas} />
  const tarjetaGuardada = guardada && <ResumenTarjetaPago tarjeta={guardada} deshabilitado={estado.procesando} alEditar={() => estado.abrirVentana('tarjetas')} />

  return (
    <div className={clases.panel}>
      {!guardada && <TituloPanelPago titulo={textos.paso1.titulo} detalle={textos.paso1.detalle} />}
      <div className={clases.contenido}>
        <EstadoTarjetas tarjetas={tarjetas} />
        {guardada ? tarjetaGuardada : tarjetaNueva}
      </div>
      {avisoRenovacion && (
        <div className={clases.aviso_neutro}>
          <Icono name="candado" className={clases.aviso_icono} />
          <span>{avisoRenovacion}</span>
        </div>
      )}
      {demostracion && <p className={clases.texto_suave}>{demostracion}</p>}
    </div>
  )
}
