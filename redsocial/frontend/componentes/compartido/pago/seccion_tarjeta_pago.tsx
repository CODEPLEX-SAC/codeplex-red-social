import { Boton } from '../interfaz/boton'
import { Casilla } from '../interfaz/casilla'
import { Icono } from '../icono'
import { IndicadorCarga } from '../interfaz/indicador_carga'
import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import { FormularioTarjetaPagoCampos } from './formulario_tarjeta_pago'
import { ResumenTarjetaPago } from './resumen_tarjeta_pago'
import { TituloPanelPago } from './titulo_panel_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { usarFlujoPago } from './usar_flujo_pago'
import type { ControlTarjetasPago } from '@/tipos/compartido/contrato_flujo_pago'

type Estado = ReturnType<typeof usarFlujoPago>

function EstadoTarjetas({ tarjetas }: { tarjetas: ControlTarjetasPago }) {
  const textos = usarTextosPago().metodo_guardado
  if (tarjetas.estado === 'cargando') return <IndicadorCarga etiqueta={textos.cargando} />
  if (tarjetas.estado === 'error') {
    return (
      <div role="alert" className={clases.aviso_estado}>
        <span>{textos.error_lectura}</span>
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={tarjetas.recargar}>{textos.reintentar}</Boton>
      </div>
    )
  }
  if (tarjetas.error) return <div role="alert" className={clases.aviso_estado}>{textos.error_escritura}</div>
  return null
}

function TarjetaNueva({ estado, tarjetas }: { estado: Estado; tarjetas: ControlTarjetasPago }) {
  const textos = usarTextosPago()
  const hayGuardadas = tarjetas.tarjetas.length > 0
  const aviso = estado.predeterminadaVencida ? textos.metodo_guardado.predeterminada_vencida : hayGuardadas ? textos.metodo_guardado.elegir_valida : null
  return (
    <>
      {aviso && <div role="status" className={clases.aviso_estado}>{aviso}</div>}
      <FormularioTarjetaPagoCampos formulario={estado.formulario} />
      <Casilla seleccionado={estado.guardarTarjeta} alCambiar={(_, marcado) => estado.alternarGuardarTarjeta(marcado)} etiqueta={textos.metodo_guardado.guardar_futuras} />
      {hayGuardadas && <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => estado.abrirVentana('tarjetas')}>{textos.guardados.usar_guardada}</Boton>}
    </>
  )
}

export function SeccionTarjetaPago({ estado, tarjetas, avisoRenovacion, demostracion }: { estado: Estado; tarjetas: ControlTarjetasPago; avisoRenovacion?: string | null; demostracion?: string }) {
  const textos = usarTextosPago()
  const guardada = estado.tarjetaGuardada
  const cargando = tarjetas.estado === 'cargando'
  return (
    <div className={clases.panel}>
      {!guardada && <TituloPanelPago titulo={textos.paso1.titulo} detalle={textos.paso1.detalle} />}
      <div className={clases.contenido}>
        <EstadoTarjetas tarjetas={tarjetas} />
        {guardada ? <ResumenTarjetaPago tarjeta={guardada} deshabilitado={estado.procesando} alEditar={() => estado.abrirVentana('tarjetas')} /> : !cargando && <TarjetaNueva estado={estado} tarjetas={tarjetas} />}
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
