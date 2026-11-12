import { useEffect, useState } from 'react'
import { alternarEn, alternarValor, arrancarReloj, microfonoDe, panelInicial, programarFinReaccion } from './logica_estado_sala'
import { paginaDe, segundosDe, totalPaginasDe, formatearDuracion } from './logica_sala_llamada'
import { usarPresentacionSala } from './usar_presentacion_sala'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { AccionGestion, ResultadoOperacion } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { PanelSala, ParametrosSalaLlamada } from '@/tipos/mensajeria/contrato_sala_llamada'

const configuracion = catalogoMensajeria.videollamada
const SIN_PERMISO: ResultadoOperacion = { exito: false, motivo: 'sin_permiso' }

export function usarSalaLlamada({ generar, cantidadInicial, duracionInicial, puerto, simulable, microfonoInicial, camaraInicial }: ParametrosSalaLlamada) {
  const [cantidad, setCantidad] = useState(cantidadInicial)
  const [micActivo, setMicActivo] = useState(microfonoInicial)
  const [camaraActiva, setCamaraActiva] = useState(camaraInicial)
  const [panel, setPanel] = useState<PanelSala | null>(() => panelInicial(cantidadInicial))
  const [pagina, setPagina] = useState(0)
  const [segundos, setSegundos] = useState(segundosDe(duracionInicial))
  const [reaccion, setReaccion] = useState<IconName | null>(null)
  const [fijado, setFijado] = useState<string | null>(null)
  const [manos, setManos] = useState<string[]>([])
  const [silenciados, setSilenciados] = useState<string[]>([])
  const [retirados, setRetirados] = useState<string[]>([])
  const [informando, setInformando] = useState(false)
  const [aviso, setAviso] = useState<string | null>(null)
  const [saliendo, setSaliendo] = useState(false)

  useEffect(() => arrancarReloj(setSegundos), [])
  useEffect(() => programarFinReaccion(reaccion, () => setReaccion(null)), [reaccion])

  const conMano = new Set(manos)
  const sinAudio = new Set(silenciados)
  const fuera = new Set(retirados)
  const todos = generar(cantidad)
    .filter((participante) => !fuera.has(participante.id))
    .map((participante) => ({ ...participante, micActivo: microfonoDe(participante, micActivo, sinAudio), camaraActiva: participante.local ? camaraActiva : participante.camaraActiva, manoLevantada: conMano.has(participante.id) }))
  const local = todos.find((participante) => participante.local)
  const esOrganizador = local?.organizador === true
  const fijadoActivo = todos.find((participante) => participante.id === fijado)?.id ?? null
  const totalPaginas = totalPaginasDe(todos.length, configuracion.tamano_pagina)
  const paginaActual = Math.min(pagina, totalPaginas - 1)

  const { presentacion, errorPresentacion, iniciarPresentacion, detenerPresentacion, descartarError } = usarPresentacionSala({ puerto, simulable, local, setPanel })

  async function gestionar(accion: AccionGestion, id: string): Promise<ResultadoOperacion> {
    if (!esOrganizador) return SIN_PERMISO
    const operaciones = { silenciar: puerto.silenciarParticipante, quitar: puerto.quitarParticipante }
    const marcar = { silenciar: setSilenciados, quitar: setRetirados }
    const resultado = await operaciones[accion](id)
    if (resultado.exito) marcar[accion]((actual) => actual.concat(id))
    return resultado
  }

  async function finalizarParaTodos(): Promise<ResultadoOperacion> {
    return esOrganizador ? puerto.finalizarParaTodos() : SIN_PERMISO
  }

  function alternarMano() {
    if (local !== undefined) setManos((actual) => alternarEn(actual, local.id))
  }

  return {
    todos,
    visibles: paginaDe(todos, paginaActual, configuracion.tamano_pagina),
    pagina: paginaActual,
    totalPaginas,
    cantidad,
    micActivo,
    camaraActiva,
    panel,
    presentacion,
    errorPresentacion,
    reaccion,
    esOrganizador,
    fijado: fijadoActivo,
    manoLevantada: local?.manoLevantada === true,
    manosLevantadas: todos.filter((participante) => participante.manoLevantada).length,
    informando,
    aviso,
    saliendo,
    duracion: formatearDuracion(segundos),
    cambiarCantidad: (valor: number) => {
      setCantidad(valor)
      setPagina(0)
    },
    cambiarPagina: setPagina,
    alternarMicrofono: () => setMicActivo((actual) => !actual),
    alternarCamara: () => setCamaraActiva((actual) => !actual),
    alternarPanel: (nombre: PanelSala) => setPanel((actual) => alternarValor(actual, nombre)),
    cerrarPanel: () => setPanel(null),
    iniciarPresentacion,
    detenerPresentacion,
    descartarError,
    reaccionar: setReaccion,
    alternarFijacion: (id: string) => setFijado((actual) => alternarValor(actual, id)),
    alternarMano,
    gestionar,
    finalizarParaTodos,
    abrirSalida: () => setSaliendo(true),
    cerrarSalida: () => setSaliendo(false),
    mostrarAviso: setAviso,
    descartarAviso: () => setAviso(null),
    abrirInforme: () => setInformando(true),
    cerrarInforme: () => setInformando(false),
    informarProblema: (descripcion: string) => puerto.informarProblema(descripcion),
  }
}
