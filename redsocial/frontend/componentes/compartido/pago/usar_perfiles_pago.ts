import { useRef, useState } from 'react'
import type { CodigoErrorPago, ControlPerfilesPago, DatosPerfilPago, EstadoCargaPago, PerfilPago, RepositorioPerfilesPago } from '@/tipos/compartido/contrato_flujo_pago'

export function usarPerfilesPago(repositorio: RepositorioPerfilesPago): ControlPerfilesPago {
  const [inicial] = useState(repositorio.leerEstadoInicial)
  const [perfiles, setPerfiles] = useState<PerfilPago[]>(inicial.perfiles)
  const [estado, setEstado] = useState<EstadoCargaPago>(inicial.estado)
  const [ocupado, setOcupado] = useState(false)
  const [error, setError] = useState<CodigoErrorPago | null>(null)
  const enCurso = useRef(false)

  function recargar() {
    setEstado('cargando')
    repositorio.listar().then(
      (lista) => {
        setPerfiles(lista)
        setEstado('listo')
      },
      () => setEstado('error'),
    )
  }

  async function ejecutar(operacion: () => Promise<PerfilPago[]>, resultado: (lista: PerfilPago[]) => PerfilPago | null) {
    if (enCurso.current) return null
    enCurso.current = true
    setOcupado(true)
    setError(null)
    try {
      const lista = await operacion()
      setPerfiles(lista)
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
    perfiles,
    estado,
    ocupado,
    error,
    recargar,
    registrar: (datos: DatosPerfilPago) => {
      const previos = new Set(perfiles.map((perfil) => perfil.id))
      return ejecutar(() => repositorio.registrar(datos), (lista) => lista.find((perfil) => !previos.has(perfil.id)) ?? null)
    },
    actualizar: (id: string, datos: DatosPerfilPago) => ejecutar(() => repositorio.actualizar(id, datos), (lista) => lista.find((perfil) => perfil.id === id) ?? null),
    limpiarError: () => setError(null),
  }
}
