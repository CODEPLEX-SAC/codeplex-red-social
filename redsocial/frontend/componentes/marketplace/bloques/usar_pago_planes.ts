import { useState } from 'react'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { fechaPrimerCobro, marcaTarjeta, sumarPrecios, SUPER_VIP_HABILITADO } from './logica_pago_planes'
import { elegirTarjetaInicial, predeterminadaVencida, tarjetaVencida } from './logica_metodos_pago'
import { datosParaGuardar } from './validacion_tarjeta'
import { usarFormularioTarjeta } from './usar_formulario_tarjeta'
import type { HistorialPago, ItemCarrito, PerfilFacturacion, TarjetaGuardada } from '@/tipos/marketplace/modelo_carrito'
import type { BilleteraDigital, ConfiguracionPago, DatosFacturacion, MetodoPagoElegido, MetodosPago, ResumenActivacion } from '@/tipos/marketplace/modelo_pago'

const VACIO = catalogoCompartido.controles.texto_vacio

function facturacionDe(pago: ConfiguracionPago, perfil?: PerfilFacturacion): DatosFacturacion {
  return {
    documento: perfil?.documento ?? VACIO,
    razon: perfil?.razon ?? VACIO,
    pais: perfil?.pais ?? pago.paises[0].id,
    direccion: perfil?.direccion ?? VACIO,
    correo: perfil?.correo ?? VACIO,
    celular: perfil?.celular ?? VACIO,
    whatsapp: false,
    sms: false,
  }
}

export function usarPagoPlanes(pago: ConfiguracionPago, items: ItemCarrito[], historial: HistorialPago, aplicacionesConVip: string[], metodos: MetodosPago, mejora = false) {
  const formulario = usarFormularioTarjeta()
  const [idElegido, setIdElegido] = useState<string | null>(null)
  const [nuevaElegida, setNuevaElegida] = useState(false)
  const [guardarTarjeta, setGuardarTarjeta] = useState(true)
  const [metodo, setMetodo] = useState<MetodoPagoElegido>('tarjeta')
  const [procesando, setProcesando] = useState(false)
  const [facturacion, setFacturacion] = useState<DatosFacturacion>(() => facturacionDe(pago, historial.perfiles[0]))
  const [perfilId, setPerfilId] = useState<string | null>(historial.perfiles[0]?.id ?? null)
  const [ventana, setVentana] = useState<'metodo' | 'perfiles' | null>(null)
  const [vip, setVip] = useState(false)
  const [terminos, setTerminos] = useState(false)
  const [billetera, setBilletera] = useState<BilleteraDigital>('yape')
  const [resumen, setResumen] = useState<ResumenActivacion | null>(null)

  const fechaCobro = fechaPrimerCobro()
  const elegibles = SUPER_VIP_HABILITADO && !mejora ? items.filter((i) => !aplicacionesConVip.includes(i.aplicacion)).length : 0
  const vipTotal = pago.vip.precio * elegibles
  const vipActivo = vip && elegibles > 0
  const total = sumarPrecios(items.map((i) => i.precio)) + (vipActivo ? vipTotal : 0)
  const hoy = vipActivo ? vipTotal : 0
  const prefijo = pago.paises.find((p) => p.id === facturacion.pais)?.prefijo ?? pago.paises[0].prefijo
  const predeterminada = elegirTarjetaInicial(metodos.tarjetas)
  const elegida = metodos.tarjetas.find((t) => t.id === idElegido)
  const tarjetaGuardada = nuevaElegida ? null : elegida && !tarjetaVencida(elegida.vencimiento) ? elegida : predeterminada
  const perfilGuardado = historial.perfiles.find((p) => p.id === perfilId) ?? null

  function usarTarjeta(guardada: TarjetaGuardada) {
    setIdElegido(guardada.id)
    setNuevaElegida(false)
    setVentana(null)
  }

  function nuevaTarjeta() {
    setIdElegido(null)
    setNuevaElegida(true)
    formulario.limpiar()
    setVentana(null)
  }

  function usarPerfil(guardado: PerfilFacturacion) {
    setPerfilId(guardado.id)
    setFacturacion((previa) => ({ ...facturacionDe(pago, guardado), whatsapp: previa.whatsapp, sms: previa.sms }))
    setVentana(null)
  }

  function nuevoPerfil() {
    setPerfilId(null)
    setFacturacion(facturacionDe(pago))
    setVentana(null)
  }

  async function activar() {
    if (procesando) return
    const conTarjeta = metodo === 'tarjeta'
    if (conTarjeta && !tarjetaGuardada && !formulario.validar()) return
    setProcesando(true)
    const datosNueva = datosParaGuardar(formulario.tarjeta)
    if (conTarjeta && !tarjetaGuardada && guardarTarjeta) {
      const registrada = await metodos.registrar(datosNueva, metodos.tarjetas.length === 0)
      if (!registrada) {
        setProcesando(false)
        return
      }
    }
    const marca = conTarjeta ? (tarjetaGuardada?.marca ?? datosNueva.marca) : marcaTarjeta(VACIO)
    const ultimos4 = conTarjeta ? (tarjetaGuardada?.ultimos4 ?? datosNueva.ultimos4) : VACIO
    const perfilNuevo = !perfilGuardado && (facturacion.documento || facturacion.razon) ? { id: `f-${Date.now()}`, documento: facturacion.documento, razon: facturacion.razon, pais: facturacion.pais, direccion: facturacion.direccion, correo: facturacion.correo, celular: facturacion.celular } : undefined
    setResumen({ fechaCobro, total, marca, ultimos4, vip: vipActivo, mejora, perfilNuevo })
    setProcesando(false)
  }

  return {
    formulario,
    tarjeta: formulario.tarjeta,
    tarjetaGuardada,
    metodos,
    metodo,
    guardarTarjeta,
    procesando,
    predeterminadaVencida: predeterminadaVencida(metodos.tarjetas),
    facturacion,
    perfilGuardado,
    ventana,
    vip: vipActivo,
    elegibles,
    vipTotal,
    hoy,
    terminos,
    billetera,
    resumen,
    mejora,
    fechaCobro,
    total,
    prefijo,
    cambiarNumero: formulario.cambiarNumero,
    cambiarVencimiento: formulario.cambiarVencimiento,
    cambiarCvv: formulario.cambiarCvv,
    cambiarPropietario: formulario.cambiarPropietario,
    cambiarFacturacion: <C extends keyof DatosFacturacion>(campo: C, valor: DatosFacturacion[C]) => setFacturacion((previa) => ({ ...previa, [campo]: valor })),
    abrirVentana: setVentana,
    cerrarVentana: () => setVentana(null),
    usarTarjeta,
    nuevaTarjeta,
    usarPerfil,
    nuevoPerfil,
    alternarVip: setVip,
    alternarTerminos: setTerminos,
    alternarGuardarTarjeta: setGuardarTarjeta,
    elegirMetodo: setMetodo,
    elegirBilletera: setBilletera,
    activar,
  }
}
