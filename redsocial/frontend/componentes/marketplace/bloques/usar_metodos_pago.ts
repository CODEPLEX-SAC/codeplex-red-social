import { useRef, useState } from 'react'
import type { TarjetaGuardada } from '@/tipos/marketplace/modelo_carrito'
import type { DatosMetodoGuardado, EstadoMetodosPago, MetodosPago, OperacionMetodosPago, RepositorioMetodosPago } from '@/tipos/marketplace/modelo_pago'

export function usarMetodosPago(repositorio: RepositorioMetodosPago): MetodosPago {
  const [inicial] = useState(repositorio.leerEstadoInicial)
  const [tarjetas, setTarjetas] = useState<TarjetaGuardada[]>(inicial.tarjetas)
  const [estado, setEstado] = useState<EstadoMetodosPago>(inicial.estado)
  const [ocupado, setOcupado] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  async function ejecutar<R>(operacion: OperacionMetodosPago, resultado: (lista: TarjetaGuardada[]) => R, vacio: R) {
    if (enCurso.current) return vacio
    enCurso.current = true
    setOcupado(true)
    setError(null)
    try {
      const lista = await operacion()
      setTarjetas(lista)
      return resultado(lista)
    } catch (fallo) {
      setError(repositorio.codigoDeFallo(fallo))
      return vacio
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
    registrar: (datos: DatosMetodoGuardado, predeterminada: boolean) =>
      ejecutar(() => repositorio.registrar(datos, predeterminada), (lista) => lista.find((t) => t.marca === datos.marca && t.ultimos4 === datos.ultimos4 && t.vencimiento === datos.vencimiento) ?? null, null),
    limpiarError: () => setError(null),
  }
}
