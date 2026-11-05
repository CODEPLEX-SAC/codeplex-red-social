import { useRef, useState } from 'react'
import { borradorInicial, conAjusteMedio, conContenidoElemento, conElemento, conEstiloTexto, conFondo, conMedio, conPosicionElemento, conTexto, conTextoAnadido, conTipo, hayContenidoHistoria, nuevoElemento, puedePublicarHistoria, sinElemento } from './logica_historia'
import { usarArchivoHistoria } from './usar_archivo_historia'
import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import type { FlujoHistoria } from '@/tipos/inicio/contrato_historia'
import type { BorradorHistoria, PasoCreacionHistoria, TipoHistoria } from '@/tipos/inicio/modelo_historia'

export function usarFlujoHistoria(onPublicar: (borrador: BorradorHistoria) => void, onCerrar: () => void): FlujoHistoria {
  const [paso, setPaso] = useState<PasoCreacionHistoria>('tipo')
  const [tipo, setTipo] = useState<TipoHistoria | null>(null)
  const [borrador, setBorrador] = useState<BorradorHistoria>(() => borradorInicial())
  const [confirmandoDescarte, setConfirmandoDescarte] = useState(false)
  const contador = useRef(0)
  const propias = useRef(new Set<string>())

  function siguienteId() {
    contador.current += 1
    return String(contador.current)
  }

  function liberarMedioActual(actual: MedioLocalPublicacion | null) {
    if (actual && propias.current.has(actual.url)) URL.revokeObjectURL(actual.url)
  }

  function liberarTodo() {
    liberarMedioActual(borrador.medio)
  }

  const archivo = usarArchivoHistoria((medio) => {
    elegirMedio(medio)
    setPaso('editor')
  })

  function elegirMedio(medio: MedioLocalPublicacion | null) {
    liberarMedioActual(borrador.medio)
    if (medio) propias.current.add(medio.url)
    setBorrador((actual) => conMedio(actual, medio))
  }

  function continuar() {
    if (!tipo) return
    if (tipo === 'media' && !borrador.medio) {
      archivo.abrirSelector()
      return
    }
    setBorrador((actual) => conTipo(actual, tipo))
    setPaso('editor')
  }

  function publicar() {
    propias.current.clear()
    onPublicar(borrador)
    onCerrar()
  }

  function pedirCerrar() {
    if (hayContenidoHistoria(borrador)) setConfirmandoDescarte(true)
    else onCerrar()
  }

  function confirmarDescarte() {
    liberarTodo()
    setConfirmandoDescarte(false)
    onCerrar()
  }

  return {
    paso,
    tipo,
    borrador,
    confirmandoDescarte,
    puedePublicar: puedePublicarHistoria(borrador),
    errorArchivo: archivo.errorArchivo,
    selector: archivo.selector,
    alElegirArchivo: archivo.alElegirArchivo,
    abrirSelector: archivo.abrirSelector,
    elegirTipo: setTipo,
    continuar,
    volverATipo: () => setPaso('tipo'),
    irAVistaPrevia: () => setPaso('vista_previa'),
    volverAEditar: () => setPaso('editor'),
    publicar,
    pedirCerrar,
    seguirEditando: () => setConfirmandoDescarte(false),
    confirmarDescarte,
    cambiarFondo: (id) => setBorrador((actual) => conFondo(actual, id)),
    cambiarTexto: (texto) => setBorrador((actual) => conTexto(actual, texto)),
    cambiarAjusteMedio: (nivel) => setBorrador((actual) => conAjusteMedio(actual, nivel)),
    cambiarEstilo: (id) => setBorrador((actual) => conEstiloTexto(actual, id)),
    agregarEmoji: (emoji) => setBorrador((actual) => conTextoAnadido(actual, emoji)),
    elegirMedio,
    agregarElemento: (contenido) => setBorrador((actual) => conElemento(actual, nuevoElemento(siguienteId(), contenido, actual.estiloTextoId))),
    quitarElemento: (id) => setBorrador((actual) => sinElemento(actual, id)),
    cambiarElemento: (id, contenido) => setBorrador((actual) => conContenidoElemento(actual, id, contenido)),
    moverElemento: (id, posicionId) => setBorrador((actual) => conPosicionElemento(actual, id, posicionId)),
  }
}
