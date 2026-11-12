import { act, fireEvent, render, screen, within } from '@testing-library/react'
import dayjs from 'dayjs'
import { PaginaMensajesVideollamadaEnCurso } from '@/paginas/mensajeria/pagina_mensajes_videollamada_en_curso'
import { PaginaMensajesVideollamadas } from '@/paginas/mensajeria/pagina_mensajes_videollamadas'
import { borradorInicial, datosDeBorrador, validarBorrador } from '@/componentes/mensajeria/bloques/logica_programar_reunion'
import { minutosDeDuracion, textoDeDuracion } from '@/componentes/mensajeria/bloques/logica_duracion_reunion'
import { SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import { contactosInvitables } from '../../rutas/mensajeria/fotografias_participantes'
import { crearEnlaceReunion, programarReunion, reunionesCreadas } from '../../servicios/mensajeria/almacen_reuniones'
import { resolverReunionEnSala } from '../../servicios/mensajeria/videollamadas'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'

vi.setConfig({ testTimeout: 30000 })

const programar = catalogoMensajeria.videollamada.programar
const textos = programar.textos

const ORIGEN = window.location.origin

describe('Logica de programar reunion', () => {
  it('calcula y redacta la duracion', () => {
    expect(textoDeDuracion(60)).toBe(textos.duracion.hora)
    expect(textoDeDuracion(120)).toBe(textos.duracion.horas.replace(':n', '2'))
    expect(textoDeDuracion(90)).toBe(textos.duracion.horas_minutos.replace(':h', '1').replace(':m', '30'))
    expect(textoDeDuracion(45)).toBe(textos.duracion.minutos.replace(':n', '45'))
    expect(textoDeDuracion(0)).toBe(textos.duracion.sin_datos)
    const base = borradorInicial()
    expect(minutosDeDuracion(base.inicio, base.fin)).toBe(programar.minutos_duracion_inicial)
  })

  it('valida nombre, orden de horas y fecha futura', () => {
    const base = { ...borradorInicial(), nombre: 'Reunion' }
    expect(validarBorrador(base)).toEqual({})
    expect(validarBorrador({ ...base, nombre: '  ' }).nombre).toBe(textos.errores.nombre)
    expect(validarBorrador({ ...base, fin: base.inicio }).fin).toBe(textos.errores.orden)
    expect(validarBorrador({ ...base, fecha: null }).fecha).toBe(textos.errores.fecha)
    expect(validarBorrador({ ...base, fecha: dayjs().subtract(2, 'day') }).fecha).toBe(textos.errores.pasado)
    expect(datosDeBorrador(base).inicio).toMatch(/^\d{2}:\d{2}$/)
  })
})

describe('Almacen de reuniones y enlace', () => {
  it('genera un enlace que usa la ruta de la sala y el identificador de la reunion, y la sala la resuelve', () => {
    const reunion = programarReunion({ nombre: 'Prueba de enlace', descripcion: String(), fecha: '2026-12-01', zona: programar.zona_inicial, inicio: '09:00', fin: '10:30', invitados: ['Carmen López'], permitirCompartir: true, solicitarAdmision: true }, ORIGEN)
    expect(reunion.enlace).toBe(crearEnlaceReunion(reunion.id, ORIGEN))
    expect(new URL(reunion.enlace).searchParams.get(catalogoMensajeria.parametros_ruta.reunion)).toBe(reunion.id)
    expect(reunion.hora).toBe('09:00 AM - 10:30 AM')
    expect(reunion.totalParticipantes).toBe(2)
    expect(reunionesCreadas()[0].id).toBe(reunion.id)
    const sala = resolverReunionEnSala(reunion.id)
    expect(sala?.titulo).toBe('Prueba de enlace')
    expect(sala?.participantes.map((participante) => participante.nombre)).toContain('Carmen López')
  })
})

const abrirVentana = () => {
  render(<PaginaMensajesVideollamadas />)
  fireEvent.click(screen.getByRole('button', { name: catalogoMensajeria.botones.programar_reunion }))
  return within(screen.getByRole('dialog', { name: catalogoMensajeria.botones.programar_reunion }))
}

describe('Ventana Programar reunion', () => {
  it('el boton abre una ventana en la misma pagina con los invitados iniciales y los controles de la libreria', () => {
    const ventana = abrirVentana()
    expect(screen.queryByRole('link', { name: catalogoMensajeria.botones.programar_reunion })).toBeNull()
    expect(ventana.getByRole('heading', { level: 2, name: textos.titulo })).toBeInTheDocument()
    const lista = within(ventana.getByRole('list', { name: textos.invitar.lista }))
    expect(lista.getAllByRole('listitem')).toHaveLength(programar.invitados_iniciales.length)
    expect(ventana.getByText(textos.invitar.invitados.replace(':n', String(programar.invitados_iniciales.length)))).toBeInTheDocument()
    expect(ventana.getAllByLabelText(textos.fecha_horario.fecha).length).toBeGreaterThan(0)
    expect(ventana.getAllByLabelText(textos.fecha_horario.inicio).length).toBeGreaterThan(0)
    expect(ventana.getAllByLabelText(textos.fecha_horario.fin).length).toBeGreaterThan(0)
    expect(ventana.getByRole('combobox', { name: textos.fecha_horario.zona })).toBeInTheDocument()
    expect(ventana.getAllByRole('checkbox')).toHaveLength(2)
    expect(ventana.getByText(textos.fecha_horario.duracion)).toBeInTheDocument()
  })

  it('cancelar y la X cierran la ventana', () => {
    const ventana = abrirVentana()
    fireEvent.click(ventana.getByRole('button', { name: textos.acciones.cancelar }))
    expect(screen.queryByRole('dialog', { name: catalogoMensajeria.botones.programar_reunion })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: catalogoMensajeria.botones.programar_reunion }))
    fireEvent.click(screen.getByRole('button', { name: catalogoMensajeria.botones.cerrar }))
    expect(screen.queryByRole('dialog', { name: catalogoMensajeria.botones.programar_reunion })).toBeNull()
  })

  it('sin nombre no programa la reunion y muestra el error', () => {
    const antes = reunionesCreadas().length
    const ventana = abrirVentana()
    fireEvent.click(ventana.getByRole('button', { name: textos.acciones.programar }))
    expect(ventana.getByText(textos.errores.nombre)).toBeInTheDocument()
    expect(reunionesCreadas()).toHaveLength(antes)
  })

  it('el buscador encuentra colaboradores, los invita y permite quitarlos; si no existe ofrece invitarlo', () => {
    const ventana = abrirVentana()
    const buscador = ventana.getByRole('searchbox', { name: textos.invitar.etiqueta_busqueda })
    const candidato = contactosInvitables([SESION_ACTUAL.usuario]).find((contacto) => !programar.invitados_iniciales.includes(contacto.nombre))?.nombre ?? String()
    fireEvent.change(buscador, { target: { value: candidato.slice(0, 4) } })
    fireEvent.click(ventana.getByRole('button', { name: textos.invitar.invitar_a.replace(':nombre', candidato) }))
    const lista = () => within(ventana.getByRole('list', { name: textos.invitar.lista }))
    expect(lista().getByText(candidato)).toBeInTheDocument()
    fireEvent.click(lista().getByRole('button', { name: textos.invitar.quitar.replace(':nombre', candidato) }))
    expect(lista().queryByText(candidato)).toBeNull()
    fireEvent.change(buscador, { target: { value: 'Zzyzx Inexistente' } })
    expect(ventana.getByText(textos.invitar.sin_resultados)).toBeInTheDocument()
    fireEvent.click(ventana.getByRole('button', { name: textos.invitar.invitar_texto.replace(':nombre', 'Zzyzx Inexistente') }))
    expect(lista().getByText('Zzyzx Inexistente')).toBeInTheDocument()
  })

  it('al programar muestra la confirmacion con el enlace, permite copiarlo y la reunion aparece en la lista', async () => {
    const escribir = vi.fn(async () => undefined)
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: escribir } })
    const ventana = abrirVentana()
    fireEvent.change(ventana.getByRole('textbox', { name: textos.informacion.nombre }), { target: { value: 'Reunion de seguimiento' } })
    fireEvent.click(ventana.getByRole('button', { name: textos.acciones.programar }))
    const confirmacion = within(screen.getByRole('region', { name: textos.confirmacion.titulo }))
    const enlace = (confirmacion.getByRole('textbox', { name: textos.confirmacion.etiqueta_enlace }) as HTMLInputElement).value
    expect(new URL(enlace).pathname).toBe(catalogoMensajeria.rutas.videollamada_en_curso)
    await act(async () => fireEvent.click(confirmacion.getByRole('button', { name: textos.confirmacion.copiar })))
    expect(escribir).toHaveBeenCalledWith(enlace)
    expect(confirmacion.getByText(textos.confirmacion.copiado)).toBeInTheDocument()
    expect(confirmacion.getByRole('link', { name: textos.confirmacion.unirme })).toHaveAttribute('href', `${catalogoMensajeria.rutas.videollamada_en_curso}?${catalogoMensajeria.parametros_ruta.reunion}=${new URL(enlace).searchParams.get(catalogoMensajeria.parametros_ruta.reunion)}`)
    fireEvent.click(confirmacion.getByRole('button', { name: textos.confirmacion.volver }))
    expect(screen.queryByRole('dialog', { name: catalogoMensajeria.botones.programar_reunion })).toBeNull()
    expect(screen.getAllByText('Reunion de seguimiento').length).toBeGreaterThan(0)
  })

  it('el enlace generado permite entrar a la reunion programada', () => {
    const reunion = reunionesCreadas()[0]
    window.history.pushState({}, '', `${catalogoMensajeria.rutas.videollamada_en_curso}?${catalogoMensajeria.parametros_ruta.reunion}=${reunion.id}`)
    render(<PaginaMensajesVideollamadaEnCurso />)
    expect(screen.getByText(reunion.titulo)).toBeInTheDocument()
    window.history.pushState({}, '', '/')
  })
})

describe('Panel de videollamadas', () => {
  it('incluye Programar reunion y Crear reunion para mas tarde junto a Iniciar videollamada', () => {
    render(<PaginaMensajesVideollamadas />)
    expect(screen.getByRole('button', { name: catalogoMensajeria.botones.programar_reunion })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: catalogoMensajeria.videollamada.textos.mas_tarde.boton })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: catalogoMensajeria.botones.iniciar_videollamada })).toBeInTheDocument()
  })
})
