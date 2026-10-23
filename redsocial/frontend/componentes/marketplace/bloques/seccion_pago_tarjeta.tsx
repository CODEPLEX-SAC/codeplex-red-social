import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Icono } from '../../compartido/icono'
import { IndicadorCarga } from '../../compartido/interfaz/indicador_carga'
import { FormularioTarjeta } from './formulario_tarjeta'
import { InformacionPago } from './informacion_pago'
import { monto } from './logica_pago_planes'
import { TituloPanelPago } from './titulo_panel_pago'
import type { usarPagoPlanes } from './usar_pago_planes'

const textos = catalogoMarketplace.pago
const guardados = textos.guardados
const metodoGuardado = textos.metodo_guardado

function EstadoMetodos({ estado }: { estado: ReturnType<typeof usarPagoPlanes> }) {
  const metodos = estado.metodos
  if (metodos.estado === 'cargando') return <IndicadorCarga etiqueta={metodoGuardado.cargando} />
  if (metodos.estado === 'error') {
    return (
      <div role="alert" className={metodoGuardado.clases.aviso_estado}>
        <span>{metodoGuardado.error_lectura}</span>
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={metodos.recargar}>{metodoGuardado.reintentar}</Boton>
      </div>
    )
  }
  if (metodos.error) return <div role="alert" className={metodoGuardado.clases.aviso_estado}>{metodoGuardado.error_escritura}</div>
  return null
}

function TarjetaNueva({ estado }: { estado: ReturnType<typeof usarPagoPlanes> }) {
  const hayGuardadas = estado.metodos.tarjetas.length > 0
  const aviso = estado.predeterminadaVencida ? metodoGuardado.predeterminada_vencida : hayGuardadas ? metodoGuardado.elegir_valida : null
  return (
    <>
      {aviso && <div role="status" className={metodoGuardado.clases.aviso_estado}>{aviso}</div>}
      <FormularioTarjeta formulario={estado.formulario} />
      <Casilla seleccionado={estado.guardarTarjeta} alCambiar={(_, marcado) => estado.alternarGuardarTarjeta(marcado)} etiqueta={metodoGuardado.guardar_futuras} />
      {hayGuardadas && <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => estado.abrirVentana('metodo')}>{guardados.usar_guardada}</Boton>}
    </>
  )
}

export function SeccionPagoTarjeta({ estado }: { estado: ReturnType<typeof usarPagoPlanes> }) {
  const guardada = estado.tarjetaGuardada
  const cargando = estado.metodos.estado === 'cargando'
  return (
    <div className={textos.clases.panel}>
      {!guardada && <TituloPanelPago titulo={textos.paso1.titulo} detalle={textos.paso1.detalle} />}
      <div className={metodoGuardado.clases.contenido}>
        <EstadoMetodos estado={estado} />
        {guardada ? (
          <InformacionPago tarjeta={guardada} deshabilitado={estado.procesando} alEditar={() => estado.abrirVentana('metodo')} />
        ) : (
          !cargando && <TarjetaNueva estado={estado} />
        )}
      </div>
      {!estado.mejora && (
        <div className={textos.clases.aviso_neutro}>
          <Icono name="candado" className="mt-0.5 h-4 w-4 flex-none" />
          <span>{textos.aviso_renovacion.replace(':fecha', estado.fechaCobro).replace(':total', monto(estado.total))}</span>
        </div>
      )}
      <p className={metodoGuardado.clases.texto_suave}>{metodoGuardado.aviso_demo}</p>
    </div>
  )
}
