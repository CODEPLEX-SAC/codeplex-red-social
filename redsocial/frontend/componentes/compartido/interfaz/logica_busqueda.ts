import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { CodigoErrorBusqueda, ErrorBusqueda, EstadoBusqueda, FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { Asentada, EntradaEstadoBusqueda, Llamada, ParametrosDiferido, ParametrosPendiente } from '@/tipos/compartido/contrato_estado_interno_busqueda'

const CODIGOS_ERROR: readonly string[] = catalogoCompartido.busqueda.codigos_error
const CODIGO_NO_DISPONIBLE: CodigoErrorBusqueda = 'no_disponible'

function esCodigoError(valor: unknown): valor is CodigoErrorBusqueda {
  return typeof valor === 'string' && CODIGOS_ERROR.includes(valor)
}

export function comoErrorBusqueda(causa: unknown): ErrorBusqueda {
  if (typeof causa === 'object' && causa !== null && 'codigo' in causa && esCodigoError(causa.codigo)) {
    return 'mensaje' in causa && typeof causa.mensaje === 'string' ? { codigo: causa.codigo, mensaje: causa.mensaje } : { codigo: causa.codigo }
  }
  return { codigo: CODIGO_NO_DISPONIBLE }
}

export function llamarFuente<T, F>(
  fuente: FuenteBusqueda<T, F>,
  consulta: string,
  limite: number | undefined,
  filtros: F | undefined,
): Llamada<T> {
  try {
    return { respuesta: filtros === undefined ? fuente(consulta, limite) : fuente(consulta, limite, filtros), error: null }
  } catch (causa) {
    return { respuesta: null, error: comoErrorBusqueda(causa) }
  }
}

export function estadoDe({ error, escribiendo, cargando, consulta, hayElementos }: EntradaEstadoBusqueda): EstadoBusqueda {
  const reglas: Array<[boolean, EstadoBusqueda]> = [
    [error !== null, 'error'],
    [escribiendo, 'escribiendo'],
    [cargando, 'cargando'],
    [consulta === String(), 'inicial'],
  ]
  const aplicable = reglas.find(([cumple]) => cumple)
  return aplicable?.[1] ?? (hayElementos ? 'con_resultados' : 'sin_coincidencias')
}

export function asentadaDe<T>(
  asentada: Asentada<T> | null,
  pendiente: Asentada<T>['origen'] | null,
) {
  if (asentada !== null && asentada.origen === pendiente) return asentada
  return null
}

export function programarDiferido<F>({ retardo, texto, filtros, setDiferido }: ParametrosDiferido<F>) {
  if (retardo === 0) return undefined
  const temporizador = window.setTimeout(() => setDiferido((previo) => (previo.texto === texto && previo.filtros === filtros ? previo : { texto, filtros })), retardo)
  const cancelar = () => window.clearTimeout(temporizador)
  return cancelar
}

export function esperarPendiente<T>({ pendiente, setAsentada }: ParametrosPendiente<T>) {
  if (pendiente === null) return undefined
  let vigente = true
  const asentar = (valor: Asentada<T>) => {
    if (vigente) setAsentada(valor)
  }

  pendiente.then(
    (resultado) => asentar({ origen: pendiente, resultado, error: null }),
    (causa: unknown) => asentar({ origen: pendiente, resultado: null, error: comoErrorBusqueda(causa) }),
  )
  const cancelar = () => {
    vigente = false
  }
  return cancelar
}
