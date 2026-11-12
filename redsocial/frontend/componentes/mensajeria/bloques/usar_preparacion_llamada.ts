import { useEffect, useState } from 'react'
import { cargarInventario, estadoTrasAbrirCamara, SELECCION_VACIA, SIN_PROBAR } from './logica_preparacion_llamada'
import type { ConfiguracionLlamada, InventarioDispositivos, MotivoFallo, PuertoDispositivos, ResultadoPrueba, SeleccionDispositivos, TipoDispositivo } from '@/tipos/mensajeria/contrato_integracion_llamada'

const INVENTARIO_INICIAL: InventarioDispositivos = { acceso: 'sin_consultar', dispositivos: [] }
const CONFIGURACION_INICIAL: ConfiguracionLlamada = { fondo: true, iluminacion: true, ruido: true }

export function usarPreparacionLlamada(puerto: PuertoDispositivos) {
  const [micActivo, setMicActivo] = useState(true)
  const [flujo, setFlujo] = useState<MediaStream | null>(null)
  const [errorCamara, setErrorCamara] = useState<MotivoFallo | null>(null)
  const [inventario, setInventario] = useState(INVENTARIO_INICIAL)
  const [seleccion, setSeleccion] = useState<SeleccionDispositivos>(SELECCION_VACIA)
  const [salidaNoSoportada, setSalidaNoSoportada] = useState(false)
  const [resultados, setResultados] = useState(SIN_PROBAR)
  const [probando, setProbando] = useState(false)
  const [configuracion, setConfiguracion] = useState(CONFIGURACION_INICIAL)

  async function actualizar() {
    setInventario(await puerto.listar())
  }

  useEffect(() => cargarInventario(puerto, setInventario), [puerto])

  async function abrirCamara(id: string | null): Promise<boolean> {
    const resultado = await puerto.abrirCamara(id)
    const siguiente = estadoTrasAbrirCamara(resultado, flujo)
    setErrorCamara(siguiente.error)
    setFlujo(siguiente.flujo)
    return resultado.exito
  }

  async function alternarCamara() {
    if (flujo !== null) return cerrarCamara()
    if (await abrirCamara(seleccion.camara || null)) await actualizar()
  }

  function cerrarCamara() {
    puerto.detenerCamara()
    setFlujo(null)
  }

  async function elegirCamara(id: string) {
    const disponible = flujo === null || (await abrirCamara(id))
    if (disponible) setSeleccion((actual) => ({ ...actual, camara: id }))
  }

  async function elegirAltavoz(id: string) {
    const resultado = await puerto.seleccionarSalida(id)
    setSalidaNoSoportada(!resultado.exito)
    setSeleccion((actual) => ({ ...actual, altavoz: resultado.exito ? id : actual.altavoz }))
  }

  async function elegirMicrofono(id: string) {
    setSeleccion((actual) => ({ ...actual, microfono: id }))
  }

  async function elegir(tipo: TipoDispositivo, id: string) {
    const eleccion = { camara: elegirCamara, altavoz: elegirAltavoz, microfono: elegirMicrofono }[tipo]
    return eleccion(id)
  }

  async function probarCamara(): Promise<ResultadoPrueba> {
    if (flujo !== null) return 'correcto'
    const resultado = await puerto.abrirCamara(seleccion.camara || null)
    if (resultado.exito) puerto.detenerCamara()
    return resultado.exito ? 'correcto' : 'fallo'
  }

  async function probar() {
    setProbando(true)
    const camara = await probarCamara()
    const salida = await puerto.probarSalida()
    setResultados({ camara, microfono: 'pendiente_integracion', altavoz: salida.exito ? 'correcto' : 'fallo' })
    setProbando(false)
    await actualizar()
  }

  return {
    micActivo,
    camaraActiva: flujo !== null,
    flujo,
    errorCamara,
    inventario,
    seleccion,
    salidaNoSoportada,
    resultados,
    probando,
    configuracion,
    alternarMicrofono: () => setMicActivo((actual) => !actual),
    alternarCamara,
    actualizar,
    elegir,
    probar,
    cambiarConfiguracion: (clave: keyof ConfiguracionLlamada, valor: boolean) => setConfiguracion((actual) => ({ ...actual, [clave]: valor })),
  }
}
