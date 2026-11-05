import { useRef, useState } from 'react'
import type { CambiosTarjetaPago, CodigoErrorPago, ControlTarjetasPago, EstadoCargaPago, RepositorioTarjetasPago, TarjetaPago, TarjetaPorGuardar } from '@/tipos/compartido/contrato_flujo_pago'

export function usarTarjetasPago(repositorio: RepositorioTarjetasPago): ControlTarjetasPago {
  const [inicial] = useState(repositorio.leerEstadoInicial)
  const [tarjetas, setTarjetas] = useState<TarjetaPago[]>(inicial.tarjetas)
  const [estado, setEstado] = useState<EstadoCargaPago>(inicial.estado)
  const [ocupado, setOcupado] = useState(false)
  const [error, setError] = useState<CodigoErrorPago | null>(null)
  const enCurso = useRef(false)

  function recargar() {
    setEstado('cargando')
    repositorio.listar().then(
      (lista) => {
        setTarjetas(lista)
        setEstado('listo')
      },
      () => setEstado('error'),
    )
  }

  async function ejecutar<R>(operacion: () => Promise<TarjetaPago[]>, resultado: (lista: TarjetaPago[]) => R) {
    if (enCurso.current) return null
    enCurso.current = true
    setOcupado(true)
    setError(null)
    try {
      const lista = await operacion()
      setTarjetas(lista)
      return resultado(lista)
    } catch (fallo) {
      setError(repositorio.codigoDeFallo(fallo))
      return null
    } finally {
      enCurso.current = false
      setOcupado(false)
    }
  }

  return {
    tarjetas,
    estado,
    ocupado,
    error,
    recargar,
    registrar: (datos: TarjetaPorGuardar, predeterminada: boolean) =>
      ejecutar(() => repositorio.registrar(datos, predeterminada), (lista) => lista.find((t) => t.marca === datos.marca && t.ultimos4 === datos.ultimos4 && t.vencimiento === datos.vencimiento) ?? null),
    actualizar: (id: string, cambios: CambiosTarjetaPago) => ejecutar(() => repositorio.actualizar(id, cambios), (lista) => lista.find((t) => t.id === id) ?? null),
    eliminar: async (id: string) => (await ejecutar(() => repositorio.eliminar(id), () => true)) === true,
    limpiarError: () => setError(null),
  }
}
