import { useState } from 'react'
import { irARuta } from '../../compartido/interfaz/menu'
import { aplicarMejora, crearCompras, crearComprasIniciales, crearItem, reemplazarOAgregar, RUTA_MARKETPLACE } from './logica_carrito_planes'
import { diasPrueba, fechaCorta } from './logica_pago_planes'
import { usarPerfilesPago } from '../../compartido/pago/usar_perfiles_pago'
import { usarTarjetasPago } from '../../compartido/pago/usar_tarjetas_pago'
import type { CompraRealizada, ItemCarrito, ServicioAdicional } from '@/tipos/marketplace/modelo_carrito'
import type { RepositorioPerfilesPago } from '@/tipos/compartido/contrato_flujo_pago'
import type { RepositorioMetodosPago, ResumenActivacion } from '@/tipos/marketplace/modelo_pago'
import type { ConfiguracionPlanes, SeleccionPlan } from '@/tipos/marketplace/modelo_planes'


export function usarCarritoMarketplace(aplicaciones: Record<string, ConfiguracionPlanes>, repositorio: RepositorioMetodosPago, repositorioPerfiles: RepositorioPerfilesPago, iniciales: SeleccionPlan[] = []) {
  const [planesAbiertos, setPlanesAbiertos] = useState<string | null>(null)
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [pagoAbierto, setPagoAbierto] = useState(false)
  const [mejora, setMejora] = useState<ItemCarrito | null>(null)
  const [comprasAbiertas, setComprasAbiertas] = useState(false)
  const [porDesinstalar, setPorDesinstalar] = useState<string | null>(null)
  const [items, setItems] = useState<ItemCarrito[]>([])
  const [compras, setCompras] = useState<CompraRealizada[]>(() => crearComprasIniciales(aplicaciones, iniciales, fechaCorta(), fechaCorta(1), diasPrueba()))
  const [servicios, setServicios] = useState<ServicioAdicional[]>([])
  const metodosPago = usarTarjetasPago(repositorio)
  const perfilesPago = usarPerfilesPago(repositorioPerfiles)

  function agregar(seleccion: SeleccionPlan) {
    const item = crearItem(aplicaciones[seleccion.aplicacion], seleccion)
    if (item) setItems((previos) => reemplazarOAgregar(previos, item))
    setPlanesAbiertos(null)
    setCarritoAbierto(true)
  }

  function contratarMejora(seleccion: SeleccionPlan) {
    const item = crearItem(aplicaciones[seleccion.aplicacion], seleccion)
    if (!item || !compras.some((c) => c.aplicacion === item.aplicacion)) return
    setMejora(item)
    setPagoAbierto(true)
  }

  function cancelarMejora() {
    setMejora(null)
    setPagoAbierto(false)
  }

  function finalizar(resumen: ResumenActivacion) {
    setPagoAbierto(false)
    if (mejora) {
      setCompras((previas) => aplicarMejora(previas, mejora))
      setMejora(null)
      return
    }
    const nuevas = crearCompras(items, fechaCorta(), fechaCorta(1), diasPrueba())
    setCompras((previas) => [...nuevas, ...previas.filter((c) => !nuevas.some((n) => n.aplicacion === c.aplicacion))])
    if (resumen.vip) nuevas.forEach((c) => contratarVip(c.aplicacion, c.nombre))
    setItems([])
  }

  function contratarVip(aplicacion: string, nombre: string) {
    setServicios((previos) => (previos.some((s) => s.aplicacion === aplicacion) ? previos : [{ aplicacion, nombre, fecha: fechaCorta() }, ...previos]))
  }

  function desinstalar() {
    setCompras((previas) => previas.filter((c) => c.aplicacion !== porDesinstalar))
    setServicios((previos) => previos.filter((s) => s.aplicacion !== porDesinstalar))
    setPorDesinstalar(null)
  }

  return {
    comprasAbiertas,
    desinstalacion: { pendiente: porDesinstalar, pedir: setPorDesinstalar, cancelar: () => setPorDesinstalar(null), confirmar: desinstalar },
    abrirCompras: () => setComprasAbiertas(true),
    alternarCompras: () => setComprasAbiertas((abiertas) => !abiertas),
    cerrarCompras: () => setComprasAbiertas(false),
    configuracionPlanes: planesAbiertos ? aplicaciones[planesAbiertos] : null,
    carritoAbierto,
    pagoAbierto,
    mejora,
    items,
    compras,
    servicios,
    contratarVip: (aplicacion: string) => contratarVip(aplicacion, compras.find((c) => c.aplicacion === aplicacion)?.nombre ?? aplicacion),
    metodosPago,
    perfilesPago,
    abrirPlanes: setPlanesAbiertos,
    cerrarPlanes: () => setPlanesAbiertos(null),
    abrirCarrito: () => setCarritoAbierto(true),
    cerrarCarrito: () => setCarritoAbierto(false),
    seguirComprando: () => {
      setCarritoAbierto(false)
      if (window.location.pathname !== RUTA_MARKETPLACE) irARuta(RUTA_MARKETPLACE)
    },
    quitar: (aplicacion: string) => setItems((previos) => previos.filter((i) => i.aplicacion !== aplicacion)),
    cambiarPlan: setPlanesAbiertos,
    proceder: () => {
      setCarritoAbierto(false)
      setPagoAbierto(true)
    },
    volverAlCarrito: () => {
      setPagoAbierto(false)
      setCarritoAbierto(true)
    },
    agregar,
    contratarMejora,
    cancelarMejora,
    finalizar,
  }
}
