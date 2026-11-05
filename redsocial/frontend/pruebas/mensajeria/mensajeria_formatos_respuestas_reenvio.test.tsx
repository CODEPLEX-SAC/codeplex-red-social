import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { ACEPTA_DOCUMENTOS, ACEPTA_IMAGENES, clasificarArchivo, errorDeArchivo, formatoDeAdjunto, prepararAdjuntos } from '@/componentes/mensajeria'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'

const textos = catalogoMensajeria.conversacion
const lista = () => document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement
const panel = () => document.querySelector('[data-zona="panel-conversacion"]') as HTMLElement
const abrir = (nombre: string) => fireEvent.click(within(lista()).getByRole('button', { name: new RegExp(`^${nombre}`) }))
const ultimo = (id: string) => ALMACEN_MENSAJERIA.leer().hilos[id]?.at(-1)
const archivo = (nombre: string, tipo: string, tamano = 10) => new File([new Uint8Array(tamano)], nombre, { type: tipo })
const elegir = (selector: string, ...archivos: File[]) => fireEvent.change(panel().querySelector(selector) as HTMLInputElement, { target: { files: archivos } })
const opciones = (indice: number) => within(panel()).getAllByRole('button', { name: textos.opciones_mensaje })[indice]

beforeEach(() => {
  URL.createObjectURL = () => 'blob:demo'
})

describe('Clasificación centralizada de formatos', () => {
  it('distingue imagen, PDF, Word, Excel y otros permitidos por extensión o MIME', () => {
    expect(clasificarArchivo(archivo('a.png', 'image/png'))).toMatchObject({ tipo: 'imagen' })
    expect(clasificarArchivo(archivo('a.pdf', 'application/pdf'))).toMatchObject({ tipo: 'documento', formato: 'pdf', extension: 'pdf' })
    expect(clasificarArchivo(archivo('a.docx', ''))).toMatchObject({ formato: 'word', extension: 'docx' })
    expect(clasificarArchivo(archivo('a', 'application/msword'))).toMatchObject({ formato: 'word' })
    expect(clasificarArchivo(archivo('a.XLSX', ''))).toMatchObject({ formato: 'excel', extension: 'xlsx' })
    expect(clasificarArchivo(archivo('a.zip', 'application/zip'))).toMatchObject({ formato: 'otro' })
    expect(clasificarArchivo(archivo('a.exe', 'application/x-msdownload')).formato).toBeUndefined()
  })

  it('los atributos accept salen de la misma lista y un adjunto antiguo se clasifica por su nombre', () => {
    expect(ACEPTA_DOCUMENTOS).toContain('.pdf')
    expect(ACEPTA_DOCUMENTOS).toContain('.xlsx')
    expect(ACEPTA_IMAGENES).toBe(textos.adjuntos.tipos_imagen.join(','))
    expect(formatoDeAdjunto({ nombre: 'reporte.pdf' })).toBe('pdf')
    expect(formatoDeAdjunto({ nombre: 'sin_extension' })).toBe('otro')
  })

  it('rechaza formatos no permitidos y respeta el tamaño máximo solo si está configurado', () => {
    expect(errorDeArchivo(archivo('virus.exe', 'application/x-msdownload'))).toContain('virus.exe')
    expect(errorDeArchivo(archivo('dibujo.svg', 'image/svg+xml'))).not.toBeNull()
    expect(errorDeArchivo(archivo('enorme.pdf', 'application/pdf', 50_000_000))).toBeNull()
    const { adjuntos, errores } = prepararAdjuntos([archivo('ok.pdf', 'application/pdf'), archivo('mal.exe', 'application/x-msdownload')])
    expect(adjuntos).toHaveLength(1)
    expect(errores).toHaveLength(1)
  })
})

describe('Adjuntos dentro del chat', () => {
  it('cada formato se presenta con su tarjeta, extensión y tamaño, sin convertirlo en foto', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    elegir('[data-entrada-documentos]', archivo('informe_trimestral_con_un_nombre_muy_largo_para_truncar.docx', ''))
    elegir('[data-entrada-documentos]', archivo('ventas.xlsx', ''))
    elegir('[data-entrada-documentos]', archivo('manual.pdf', 'application/pdf'))
    const tarjetas = Array.from(panel().querySelectorAll('[data-formato]'))
    expect(tarjetas.slice(-3).map((tarjeta) => tarjeta.getAttribute('data-formato'))).toEqual(['word', 'excel', 'pdf'])
    expect(panel().querySelector('[data-formato] img, img[alt$=".docx"], img[alt$=".xlsx"]')).toBeNull()
    const largo = within(panel()).getByText('informe_trimestral_con_un_nombre_muy_largo_para_truncar.docx')
    expect(largo.className).toContain('line-clamp-2')
    expect(largo.className).toContain('wrap-anywhere')
    expect(largo.closest('[data-formato]')?.className).toContain('max-w-80')
    expect(largo.closest('[data-formato]')?.className).toContain('text-left')
    expect(largo.closest('[data-formato]')?.className).not.toMatch(/justify-between/)
    expect(within(tarjetas[tarjetas.length - 2] as HTMLElement).getByText('xlsx')).toBeInTheDocument()
  })

  it('un formato no permitido muestra un aviso y no agrega mensaje; cancelar la selección no hace nada', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const antes = ALMACEN_MENSAJERIA.leer().hilos['conversacion-002'].length
    elegir('[data-entrada-documentos]', archivo('virus.exe', 'application/x-msdownload'))
    expect(within(panel()).getByRole('alert')).toHaveTextContent('virus.exe')
    elegir('[data-entrada-documentos]')
    expect(ALMACEN_MENSAJERIA.leer().hilos['conversacion-002']).toHaveLength(antes)
  })

  it('al hacer clic en el documento se descarga directamente: es un enlace con descarga y sin menú', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    elegir('[data-entrada-documentos]', archivo('manual.pdf', 'application/pdf'))
    elegir('[data-entrada-documentos]', archivo('datos.zip', 'application/zip'))
    const enlace = within(panel()).getByRole('link', { name: textos.adjuntos.etiquetas.descargar_archivo.replace(':nombre', 'manual.pdf') })
    expect(enlace).toHaveAttribute('href', 'blob:demo')
    expect(enlace).toHaveAttribute('download', 'manual.pdf')
    expect(within(enlace).queryByRole('button')).toBeNull()
    expect(within(panel()).getByRole('link', { name: textos.adjuntos.etiquetas.descargar_archivo.replace(':nombre', 'datos.zip') })).toHaveAttribute('download', 'datos.zip')
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('un documento de demostración sin archivo no es un enlace ni promete descarga', () => {
    render(<PaginaMensajesTodos />)
    abrir('María Fernández')
    const tarjeta = panel().querySelector('[data-formato="pdf"]') as HTMLElement
    expect(tarjeta.tagName).toBe('DIV')
    expect(tarjeta).toHaveAttribute('title', textos.adjuntos.etiquetas.sin_archivo)
  })
})

describe('Responder a un mensaje', () => {
  it('el menú ofrece Responder, el banner nombra al autor real y la respuesta guarda la referencia', () => {
    render(<PaginaMensajesTodos />)
    abrir('María Fernández')
    const original = ALMACEN_MENSAJERIA.leer().hilos['conversacion-001'].find((mensaje) => mensaje.autorId === 'maria-fernandez') as NonNullable<ReturnType<typeof ultimo>>
    const indice = Array.from(panel().querySelectorAll('[data-mensaje]')).findIndex((nodo) => nodo.getAttribute('data-mensaje') === original.id)
    fireEvent.click(opciones(indice))
    fireEvent.click(screen.getByRole('menuitem', { name: textos.acciones.responder }))
    const banner = panel().querySelector('[class*="border-t-2"]') as HTMLElement
    expect(banner).toHaveTextContent('Respondiendo a María Fernández')
    expect(banner).not.toHaveTextContent('|')
    expect(banner).toHaveTextContent(original.contenido as string)
    const campo = within(panel()).getByRole('textbox', { name: textos.mensaje })
    fireEvent.change(campo, { target: { value: 'De acuerdo' } })
    fireEvent.click(within(panel()).getByRole('button', { name: /^Enviar$/ }))
    expect(ultimo('conversacion-001')?.respuestaA).toEqual({ mensajeId: original.id, autorId: 'maria-fernandez' })
    expect(panel().querySelector('[class*="border-l-4"]')).toHaveTextContent('María Fernández')
    expect(panel().querySelector('[class*="border-t-2"]')).toBeNull()
  })

  it('cancelar la respuesta quita el banner y el siguiente mensaje no lleva referencia', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    fireEvent.click(opciones(0))
    fireEvent.click(screen.getByRole('menuitem', { name: textos.acciones.responder }))
    fireEvent.click(within(panel()).getByRole('button', { name: textos.respuesta.cancelar }))
    expect(panel().querySelector('[class*="border-t-2"]')).toBeNull()
    fireEvent.change(within(panel()).getByRole('textbox', { name: textos.mensaje }), { target: { value: 'Hola' } })
    fireEvent.click(within(panel()).getByRole('button', { name: /^Enviar$/ }))
    expect(ultimo('conversacion-002')?.respuestaA).toBeUndefined()
  })

  it('un adjunto enviado mientras se responde conserva la referencia', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    fireEvent.click(opciones(0))
    fireEvent.click(screen.getByRole('menuitem', { name: textos.acciones.responder }))
    elegir('[data-entrada-archivos]', archivo('foto.png', 'image/png'))
    expect(ultimo('conversacion-002')?.respuestaA?.mensajeId).toBeDefined()
    expect(ultimo('conversacion-002')?.adjunto?.tipo).toBe('imagen')
  })
})

describe('Modal de reenvío', () => {
  const abrirModal = () => {
    fireEvent.click(opciones(0))
    fireEvent.click(screen.getByRole('menuitem', { name: new RegExp(`^${textos.acciones.reenviar}`) }))
    return within(screen.getByRole('dialog'))
  }
  const enviarA = (dialogo: ReturnType<typeof abrirModal>, nombre: string) => dialogo.getByRole('button', { name: textos.reenviar_modal.enviar_a.replace(':nombre', nombre) })

  it('muestra título, buscador, Recientes y Grupos, y cada fila envía por separado con su botón', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const dialogo = abrirModal()
    expect(screen.getByRole('dialog')).toHaveTextContent(textos.reenviar_modal.titulo)
    expect(dialogo.getByRole('heading', { name: textos.reenviar_modal.recientes })).toBeInTheDocument()
    expect(dialogo.getByRole('heading', { name: textos.reenviar_modal.grupos })).toBeInTheDocument()
    for (const nombre of ['María Fernández', 'Diego Mendoza', 'Javier Torres', 'Equipo de Proyectos', 'Grupo Contabilidad', 'Infraestructura TI']) expect(enviarA(dialogo, nombre)).toBeEnabled()
    expect(dialogo.queryByRole('button', { name: new RegExp('Luis Rodríguez') })).toBeNull()
    fireEvent.click(enviarA(dialogo, 'Carmen López'))
    expect(ultimo('conversacion-004')?.reenviado).toBe(true)
    expect(ultimo('conversacion-003')).not.toMatchObject({ reenviado: true })
    expect(enviarA(dialogo, 'Carmen López')).toBeDisabled()
    expect(enviarA(dialogo, 'Carmen López')).toHaveTextContent(textos.reenviar_modal.enviado)
    fireEvent.click(enviarA(dialogo, 'Equipo de Proyectos'))
    expect(ultimo('conversacion-003')?.reenviado).toBe(true)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: textos.reenviar_modal.cerrar }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('el buscador filtra por nombre y avisa si no hay resultados', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const dialogo = abrirModal()
    fireEvent.change(dialogo.getByRole('searchbox'), { target: { value: 'carm' } })
    expect(dialogo.queryByRole('button', { name: /Diego/ })).toBeNull()
    expect(enviarA(dialogo, 'Carmen López')).toBeInTheDocument()
    fireEvent.change(dialogo.getByRole('searchbox'), { target: { value: 'zzz' } })
    expect(dialogo.getByText(textos.reenviar_modal.sin_resultados)).toBeInTheDocument()
  })

  it('reenviar una imagen conserva tipo y referencia y el mensaje queda marcado como reenviado', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    elegir('[data-entrada-archivos]', archivo('foto.png', 'image/png'))
    fireEvent.click(opciones(within(panel()).getAllByRole('button', { name: textos.opciones_mensaje }).length - 1))
    fireEvent.click(screen.getByRole('menuitem', { name: new RegExp(`^${textos.acciones.reenviar}`) }))
    fireEvent.click(enviarA(within(screen.getByRole('dialog')), 'Carmen López'))
    expect(ultimo('conversacion-004')).toMatchObject({ reenviado: true, adjunto: { tipo: 'imagen', url: 'blob:demo' } })
  })
})
