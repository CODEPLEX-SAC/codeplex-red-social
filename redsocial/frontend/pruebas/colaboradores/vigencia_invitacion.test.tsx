import { fireEvent, render, screen, within } from '@testing-library/react'
import dayjs from 'dayjs'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { duracionVigencia } from '@/componentes/colaboradores/bloques/logica_vigencia_invitacion'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

const textos = catalogoColaboradores.campos_vigencia
const pasos = catalogoColaboradores.pasos_invitar

function abrirPasoTres() {
  render(<PaginaColaboradores />)
  fireEvent.click(screen.getByRole('button', { name: catalogoColaboradores.botones.invitar_colaborador }))
  const dialogo = within(screen.getByRole('dialog', { name: catalogoColaboradores.titulos.invitar }))
  fireEvent.change(dialogo.getByRole('textbox', { name: catalogoColaboradores.campos_informacion.nombres }), { target: { value: 'Rosa' } })
  fireEvent.click(dialogo.getByRole('button', { name: textosRedSocial.SIGUIENTE }))
  fireEvent.click(dialogo.getByRole('button', { name: textosRedSocial.SIGUIENTE }))
  return dialogo
}

function botonesCalendario(dialogo: ReturnType<typeof abrirPasoTres>) {
  return dialogo.getAllByRole('button', { name: /fecha|date/i })
}

describe('Invitar colaborador: fechas de vigencia con el selector de fecha compartido', { timeout: 30000 }, () => {
  it('calcula la duración con unidades y plurales del catálogo', () => {
    const inicio = dayjs('2026-08-13')
    expect(duracionVigencia(inicio, dayjs('2027-08-13'))).toEqual({ unidad: 'anio', cantidad: 1 })
    expect(duracionVigencia(inicio, dayjs('2028-08-13'))).toEqual({ unidad: 'anio', cantidad: 2 })
    expect(duracionVigencia(inicio, dayjs('2026-11-13'))).toEqual({ unidad: 'mes', cantidad: 3 })
    expect(duracionVigencia(inicio, dayjs('2026-08-20'))).toEqual({ unidad: 'dia', cantidad: 7 })
    expect(duracionVigencia(inicio, dayjs('2026-08-01'))).toEqual({ unidad: 'invalida', cantidad: 0 })
    expect(duracionVigencia(inicio, null)).toEqual({ unidad: 'incompleta', cantidad: 0 })
  })

  it('muestra los dos selectores de fecha de la librería con el valor inicial y su duración', () => {
    const dialogo = abrirPasoTres()
    expect(dialogo.getByRole('heading', { name: pasos.vigencia.titulo })).toBeInTheDocument()
    expect(botonesCalendario(dialogo)).toHaveLength(2)
    expect(dialogo.getByText(`${textos.duracion.prefijo} ${textos.duracion.anio_uno}`)).toBeInTheDocument()
  })

  it('el icono del campo abre el calendario y elegir un día cambia la fecha y la duración', () => {
    const dialogo = abrirPasoTres()
    fireEvent.click(botonesCalendario(dialogo)[0])
    fireEvent.click(screen.getByRole('gridcell', { name: '20' }))
    expect(dialogo.getByText(`${textos.duracion.prefijo} ${textos.duracion.mes_otros.replace(':n', '11')}`)).toBeInTheDocument()
  })

  it('las fechas elegidas se conservan al volver y se reflejan en el resumen', () => {
    const dialogo = abrirPasoTres()
    fireEvent.click(botonesCalendario(dialogo)[0])
    fireEvent.click(screen.getByRole('gridcell', { name: '20' }))
    fireEvent.click(dialogo.getByRole('button', { name: textosRedSocial.SIGUIENTE, hidden: true }))
    expect(dialogo.getAllByText('20 de agosto de 2026').length).toBeGreaterThan(0)
    expect(dialogo.getAllByText(`20/08/2026 ${catalogoColaboradores.celda_vigencia.conector_hasta} 13/08/2027`).length).toBeGreaterThan(0)
    fireEvent.click(dialogo.getByRole('button', { name: catalogoColaboradores.campos_rol_permisos.anterior }))
    expect(dialogo.getByText(`${textos.duracion.prefijo} ${textos.duracion.mes_otros.replace(':n', '11')}`)).toBeInTheDocument()
  })
})
