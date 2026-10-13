import { useState } from 'react'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import type { ConfiguracionPlanes, MensajeAsistente, SeleccionPlan } from '@/tipos/marketplace/modelo_planes'

const formatoHora = catalogoMarketplace.planes.asistente.formato_hora

function horaActual() {
  return new Date().toLocaleTimeString(formatoHora.locale, { hour: formatoHora.opciones.hour, minute: formatoHora.opciones.minute } as Intl.DateTimeFormatOptions)
}

export function usarSelectorPlanes(configuracion: ConfiguracionPlanes, alConfirmar: (seleccion: SeleccionPlan) => void, alCerrar: () => void) {
  const [tipoId, setTipoId] = useState(configuracion.tipos[0].id)
  const [periodo, setPeriodo] = useState<SeleccionPlan['periodo']>('mensual')
  const [planId, setPlanId] = useState<string | null>(null)
  const [asistenteAbierto, setAsistenteAbierto] = useState(false)
  const [visorAbierto, setVisorAbierto] = useState(false)
  const [paquetesAbiertos, setPaquetesAbiertos] = useState(false)
  const [caracteristica, setCaracteristica] = useState<string | null>(null)
  const [mensajes, setMensajes] = useState<MensajeAsistente[]>(() => [{ propio: false, texto: configuracion.asistente.saludo, hora: horaActual() }])

  const tipo = configuracion.tipos.find((t) => t.id === tipoId) ?? configuracion.tipos[0]
  const plan = tipo.planes.find((p) => p.id === planId) ?? null
  const detalle = caracteristica ? (configuracion.detalles[caracteristica] ?? null) : null

  function cambiarTipo(id: string) {
    setTipoId(id)
    setPlanId(null)
  }

  function alternarPeriodo(anual: boolean) {
    setPeriodo(anual ? 'anual' : 'mensual')
  }

  function preguntar(texto: string) {
    const pregunta = texto.trim()
    if (!pregunta) return
    const respuesta = configuracion.asistente.respuestas[pregunta] ?? catalogoMarketplace.planes.asistente.por_defecto
    const hora = horaActual()
    setMensajes((previos) => [...previos, { propio: true, texto: pregunta, hora }, { propio: false, texto: respuesta, hora }])
  }

  function confirmar() {
    if (!plan) return
    alConfirmar({ aplicacion: configuracion.id, tipo: tipo.id, plan: plan.id, periodo })
  }

  function cerrarPlanes() {
    if (detalle) {
      setCaracteristica(null)
      return
    }
    if (!visorAbierto && !paquetesAbiertos) alCerrar()
  }

  return {
    tipo,
    periodo,
    plan,
    detalle,
    asistenteAbierto,
    visorAbierto,
    paquetesAbiertos,
    mensajes,
    cambiarTipo,
    alternarPeriodo,
    seleccionarPlan: setPlanId,
    abrirCaracteristica: setCaracteristica,
    cerrarCaracteristica: () => setCaracteristica(null),
    alternarAsistente: () => setAsistenteAbierto((abierto) => !abierto),
    abrirPaquetes: () => setPaquetesAbiertos(true),
    cerrarPaquetes: () => setPaquetesAbiertos(false),
    abrirVisor: () => setVisorAbierto(true),
    cerrarVisor: () => setVisorAbierto(false),
    preguntar,
    confirmar,
    cerrarPlanes,
  }
}
