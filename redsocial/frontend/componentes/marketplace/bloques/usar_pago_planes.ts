import { useState } from 'react'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { fechaPrimerCobro, formatearTarjeta, formatearVencimiento, marcaTarjeta, sumarPrecios } from './logica_pago_planes'
import type { HistorialPago, ItemCarrito, PerfilFacturacion, TarjetaGuardada } from '@/tipos/marketplace/modelo_carrito'
import type { ConfiguracionPago, DatosFacturacion, DatosTarjeta, ResumenActivacion } from '@/tipos/marketplace/modelo_pago'

const VACIO = catalogoCompartido.controles.texto_vacio
const tarjetaInicial: DatosTarjeta = { numero: VACIO, vencimiento: VACIO, cvv: VACIO, propietario: VACIO }

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

export function usarPagoPlanes(pago: ConfiguracionPago, items: ItemCarrito[], historial: HistorialPago, aplicacionesConVip: string[]) {
  const [tarjeta, setTarjeta] = useState(tarjetaInicial)
  const [tarjetaId, setTarjetaId] = useState<string | null>(historial.tarjetas[0]?.id ?? null)
  const [facturacion, setFacturacion] = useState<DatosFacturacion>(() => facturacionDe(pago, historial.perfiles[0]))
  const [perfilId, setPerfilId] = useState<string | null>(historial.perfiles[0]?.id ?? null)
  const [ventana, setVentana] = useState<'tarjetas' | 'perfiles' | null>(null)
  const [vip, setVip] = useState(false)
  const [terminos, setTerminos] = useState(false)
  const [resumen, setResumen] = useState<ResumenActivacion | null>(null)

  const fechaCobro = fechaPrimerCobro()
  const elegibles = items.filter((i) => !aplicacionesConVip.includes(i.aplicacion)).length
  const vipTotal = pago.vip.precio * elegibles
  const vipActivo = vip && elegibles > 0
  const total = sumarPrecios(items.map((i) => i.precio)) + (vipActivo ? vipTotal : 0)
  const hoy = vipActivo ? vipTotal : 0
  const prefijo = pago.paises.find((p) => p.id === facturacion.pais)?.prefijo ?? pago.paises[0].prefijo
  const tarjetaGuardada = historial.tarjetas.find((t) => t.id === tarjetaId) ?? null
  const perfilGuardado = historial.perfiles.find((p) => p.id === perfilId) ?? null

  function usarTarjeta(guardada: TarjetaGuardada) {
    setTarjetaId(guardada.id)
    setTarjeta((previa) => ({ ...previa, cvv: VACIO }))
    setVentana(null)
  }

  function nuevaTarjeta() {
    setTarjetaId(null)
    setTarjeta(tarjetaInicial)
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

  function activar() {
    const digitos = tarjeta.numero.replace(/\s/g, VACIO)
    const marca = tarjetaGuardada?.marca ?? marcaTarjeta(tarjeta.numero)
    const ultimos4 = tarjetaGuardada?.ultimos4 ?? (digitos.length >= 4 ? digitos.slice(-4) : VACIO)
    const tarjetaNueva = !tarjetaGuardada && ultimos4 ? { id: `t-${Date.now()}`, marca, ultimos4, vencimiento: tarjeta.vencimiento, propietario: tarjeta.propietario } : undefined
    const perfilNuevo = !perfilGuardado && (facturacion.documento || facturacion.razon) ? { id: `f-${Date.now()}`, documento: facturacion.documento, razon: facturacion.razon, pais: facturacion.pais, direccion: facturacion.direccion, correo: facturacion.correo, celular: facturacion.celular } : undefined
    setResumen({ fechaCobro, total, marca, ultimos4, vip: vipActivo, tarjetaNueva, perfilNuevo })
  }

  return {
    tarjeta,
    tarjetaGuardada,
    facturacion,
    perfilGuardado,
    ventana,
    vip: vipActivo,
    elegibles,
    vipTotal,
    hoy,
    terminos,
    resumen,
    fechaCobro,
    total,
    prefijo,
    cambiarNumero: (valor: string) => setTarjeta((previa) => ({ ...previa, numero: formatearTarjeta(valor) })),
    cambiarVencimiento: (valor: string) => setTarjeta((previa) => ({ ...previa, vencimiento: formatearVencimiento(valor) })),
    cambiarCvv: (valor: string) => setTarjeta((previa) => ({ ...previa, cvv: valor.replace(/\D/g, VACIO).slice(0, 4) })),
    cambiarPropietario: (valor: string) => setTarjeta((previa) => ({ ...previa, propietario: valor })),
    cambiarFacturacion: <C extends keyof DatosFacturacion>(campo: C, valor: DatosFacturacion[C]) => setFacturacion((previa) => ({ ...previa, [campo]: valor })),
    abrirVentana: setVentana,
    cerrarVentana: () => setVentana(null),
    usarTarjeta,
    nuevaTarjeta,
    usarPerfil,
    nuevoPerfil,
    alternarVip: setVip,
    alternarTerminos: setTerminos,
    activar,
  }
}
