import demostracion from './metodos_pago_demostracion.json'
import type { TarjetaGuardada } from '@/tipos/marketplace/modelo_carrito'
import type { CodigoErrorMetodosPago, DatosMetodoGuardado, EstadoInicialMetodosPago } from '@/tipos/marketplace/modelo_pago'

export class ErrorMetodosPago extends Error {
  readonly codigo: CodigoErrorMetodosPago

  constructor(codigo: CodigoErrorMetodosPago) {
    super(codigo)
    this.codigo = codigo
  }
}

const TARJETAS_DEMOSTRACION: TarjetaGuardada[] = demostracion.tarjetas

let guardadas: TarjetaGuardada[] = TARJETAS_DEMOSTRACION.map(sanear)
let secuencia = 0

function sanear(tarjeta: TarjetaGuardada): TarjetaGuardada {
  return { id: tarjeta.id, marca: tarjeta.marca, ultimos4: tarjeta.ultimos4, vencimiento: tarjeta.vencimiento, titular: tarjeta.titular, predeterminada: tarjeta.predeterminada === true }
}

function modificar(cambio: (actual: TarjetaGuardada[]) => TarjetaGuardada[]) {
  return Promise.resolve().then(() => {
    guardadas = cambio(leerMetodosPago()).map(sanear)
    return leerMetodosPago()
  })
}

function esLaMisma(tarjeta: TarjetaGuardada, datos: DatosMetodoGuardado) {
  return tarjeta.marca === datos.marca && tarjeta.ultimos4 === datos.ultimos4 && tarjeta.vencimiento === datos.vencimiento
}

export function leerMetodosPago(): TarjetaGuardada[] {
  return guardadas.map(sanear)
}

export function reiniciarMetodosPagoDemostracion(lista: TarjetaGuardada[] = TARJETAS_DEMOSTRACION) {
  guardadas = lista.map(sanear)
}

export function leerEstadoInicial(): EstadoInicialMetodosPago {
  try {
    return { tarjetas: leerMetodosPago(), estado: 'listo' }
  } catch {
    return { tarjetas: [], estado: 'error' }
  }
}

export function codigoDeFallo(fallo: unknown): CodigoErrorMetodosPago {
  return fallo instanceof ErrorMetodosPago ? fallo.codigo : 'escritura'
}

export function listarMetodosPago() {
  return Promise.resolve().then(leerMetodosPago)
}

export function registrarMetodoPago(datos: DatosMetodoGuardado, predeterminada: boolean) {
  return modificar((actual) => {
    const otras = actual.filter((tarjeta) => !esLaMisma(tarjeta, datos))
    const principal = predeterminada || otras.length === 0
    secuencia += 1
    const nueva: TarjetaGuardada = { id: `t-demostracion-${secuencia}`, marca: datos.marca, ultimos4: datos.ultimos4, vencimiento: datos.vencimiento, titular: datos.titular, predeterminada: principal }
    return [nueva, ...otras.map((tarjeta) => (principal ? { ...tarjeta, predeterminada: false } : tarjeta))]
  })
}
