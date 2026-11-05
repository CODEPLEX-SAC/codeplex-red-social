import { useRef, useState } from 'react'
import { elegirTarjetaInicial, marcaTarjeta, predeterminadaVencida, tarjetaVencida } from './logica_tarjeta_pago'
import { aceptacionesDe, enfocarControl, idControlAutorizacion, pendientesObligatorias } from './logica_autorizaciones_pago'
import { datosParaGuardar } from './validacion_tarjeta_pago'
import { usarFacturacionPago } from './usar_facturacion_pago'
import { usarFormularioTarjetaPago } from './usar_formulario_tarjeta_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { AceptacionesPago } from './logica_autorizaciones_pago'
import type { AvisoPago, BilleteraPago, ConfiguracionFlujoPago, ControlPerfilesPago, ControlTarjetasPago, FaseOperacionPago, FlujoPagoProps, MetodoPagoId, ResultadoOperacionPago, VarianteAvisoPago, VentanaFlujoPago } from '@/tipos/compartido/contrato_flujo_pago'

export function usarFlujoPago(
  configuracion: ConfiguracionFlujoPago,
  tarjetas: ControlTarjetasPago,
  perfiles: ControlPerfilesPago,
  alActivar: FlujoPagoProps['alActivar'],
) {
  const textos = usarTextosPago()
  const [aviso, setAviso] = useState<AvisoPago | null>(null)
  const notificar = (variante: VarianteAvisoPago, mensaje: string) => setAviso({ variante, mensaje })
  const formulario = usarFormularioTarjetaPago()
  const facturacion = usarFacturacionPago(configuracion, perfiles, notificar)
  const [metodo, setMetodo] = useState<MetodoPagoId>(configuracion.metodoInicial ?? configuracion.metodos[0])
  const [billeteraId, setBilleteraId] = useState(configuracion.billeteras[0]?.id ?? null)
  const [idElegido, setIdElegido] = useState<string | null>(null)
  const [nuevaElegida, setNuevaElegida] = useState(false)
  const [guardarTarjeta, setGuardarTarjeta] = useState(true)
  const [aceptaciones, setAceptaciones] = useState<AceptacionesPago>({})
  const [erroresAutorizacion, setErroresAutorizacion] = useState<Record<string, string>>({})
  const [fase, setFase] = useState<FaseOperacionPago>('inicial')
  const enCurso = useRef(false)
  const [ventana, setVentana] = useState<VentanaFlujoPago>(null)

  const predeterminada = elegirTarjetaInicial(tarjetas.tarjetas)
  const elegida = tarjetas.tarjetas.find((tarjeta) => tarjeta.id === idElegido)
  const tarjetaGuardada = nuevaElegida ? null : elegida && !tarjetaVencida(elegida.vencimiento) ? elegida : predeterminada
  const billetera: BilleteraPago | null = configuracion.billeteras.find((opcion) => opcion.id === billeteraId) ?? configuracion.billeteras[0] ?? null
  const procesando = fase === 'validando' || fase === 'procesando'
  const puedeActivar = !procesando && fase !== 'exito'

  function usarTarjeta(id: string) {
    setIdElegido(id)
    setNuevaElegida(false)
    setVentana(null)
  }

  function usarTarjetaNueva() {
    setIdElegido(null)
    setNuevaElegida(true)
    formulario.limpiar()
    setVentana(null)
  }

  function alternarAceptacion(id: string, marcado: boolean) {
    setAceptaciones((previas) => ({ ...previas, [id]: marcado }))
    if (marcado) setErroresAutorizacion((previos) => Object.fromEntries(Object.entries(previos).filter(([clave]) => clave !== id)))
  }

  function rechazarIntento(mensaje?: string, idControl?: string) {
    setFase('inicial')
    if (mensaje) notificar('advertencia', mensaje)
    if (idControl) enfocarControl(idControl)
  }

  function resultadoDeFallo(resultado: void | ResultadoOperacionPago) {
    return resultado && resultado.exito === false ? (resultado.mensaje ?? textos.errores_flujo.activar) : null
  }

  async function activar() {
    if (enCurso.current || !puedeActivar) return
    enCurso.current = true
    let mensajeFallo = textos.errores_flujo.activar
    setFase('validando')
    setAviso(null)
    try {
      const conTarjeta = metodo === 'tarjeta'
      const pendientes = pendientesObligatorias(configuracion.autorizaciones.elementos, aceptaciones)
      setErroresAutorizacion(Object.fromEntries(pendientes.map((elemento) => [elemento.id, textos.autorizacion.obligatoria_pendiente])))
      const tarjetaValida = !conTarjeta || tarjetaGuardada !== null || formulario.validar()
      if (pendientes.length > 0) return rechazarIntento(undefined, idControlAutorizacion(pendientes[0].id))
      if (facturacion.modo === 'edicion') return rechazarIntento(textos.avisos.edicion_pendiente)
      if (!tarjetaValida) return rechazarIntento(textos.avisos.datos_incompletos)
      setFase('procesando')
      const datosNueva = datosParaGuardar(formulario.tarjeta)
      if (conTarjeta && !tarjetaGuardada && guardarTarjeta) {
        const registrada = await tarjetas.registrar(datosNueva, tarjetas.tarjetas.length === 0)
        if (!registrada) return setFase('error')
      }
      const pendiente = facturacion.asegurar()
      const perfil = pendiente instanceof Promise ? await pendiente : pendiente
      const marca = conTarjeta ? (tarjetaGuardada?.marca ?? datosNueva.marca) : marcaTarjeta('')
      const ultimos4 = conTarjeta ? (tarjetaGuardada?.ultimos4 ?? datosNueva.ultimos4) : ''
      const simulado = configuracion.demostracion !== undefined
      const respuesta = alActivar({ metodo, marca, ultimos4, billetera: conTarjeta ? null : (billetera?.nombre ?? null), perfil, autorizaciones: aceptacionesDe(configuracion.autorizaciones.elementos, aceptaciones), simulado })
      const motivo = resultadoDeFallo(respuesta instanceof Promise ? await respuesta : respuesta)
      if (motivo) {
        mensajeFallo = motivo
        throw new Error(motivo)
      }
      setFase('exito')
      notificar('exito', simulado ? textos.avisos.operacion_demostracion : textos.avisos.operacion_exito)
    } catch {
      setFase('error')
      notificar('error', mensajeFallo)
    } finally {
      enCurso.current = false
    }
  }

  return {
    formulario,
    facturacion,
    metodo,
    billetera,
    tarjetaGuardada,
    guardarTarjeta,
    aceptaciones,
    erroresAutorizacion,
    fase,
    procesando,
    aviso,
    notificar,
    cerrarAviso: () => setAviso(null),
    ventana,
    puedeActivar,
    predeterminadaVencida: predeterminadaVencida(tarjetas.tarjetas),
    elegirMetodo: setMetodo,
    elegirBilletera: setBilleteraId,
    alternarGuardarTarjeta: setGuardarTarjeta,
    alternarAceptacion,
    abrirVentana: setVentana,
    cerrarVentana: () => setVentana(null),
    usarTarjeta,
    usarTarjetaNueva,
    activar,
  }
}
