import { fireEvent, render, screen, within } from '@testing-library/react'
import { BloqueMediosPublicacion } from '@/componentes/inicio/bloques/bloque_medios_publicacion'
import { VisorMedios } from '@/componentes/compartido/interfaz/visor_medios'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import catalogoPerfil from '../../catalogos/capacidades/redsocial/perfil.json'

const visor = catalogoPerfil.visor
const clasesVisor = catalogoPerfil.clases.visor

const medios = (cantidad: number) => Array.from({ length: cantidad }, (_, indice) => ({ id: `m${indice}`, url: `/imagen-${indice}.jpg`, esVideo: false }))

describe('Imagenes de publicaciones: proporciones originales', () => {
  it.each([1, 2, 3, 4, 5, 6])('con %i imagen(es) ninguna se recorta ni se estira', (cantidad) => {
    render(<BloqueMediosPublicacion medios={medios(cantidad)} />)
    const imagenes = screen.getAllByRole('img')
    expect(imagenes.length).toBe(Math.min(cantidad, catalogoInicio.medios.maximo_visibles))
    for (const imagen of imagenes) {
      expect(imagen.className).toContain('object-contain')
      expect(imagen.className).not.toContain('object-cover')
      expect(imagen.className).not.toContain('object-fill')
    }
  })

  it('con mas de cuatro imagenes se indica cuantas quedan por ver', () => {
    render(<BloqueMediosPublicacion medios={medios(7)} />)
    expect(screen.getByText(catalogoInicio.medios.mas.replace(':cantidad', '2'))).toBeInTheDocument()
  })
})

describe('Visor ampliado de imagenes', () => {
  function abrirVisor(cambiar = vi.fn(), cerrar = vi.fn()) {
    render(<VisorMedios items={medios(3)} indice={1} titulo="Visor" onCambiar={cambiar} onCerrar={cerrar} />)
    return within(screen.getByRole('dialog'))
  }

  it('muestra la imagen completa, centrada y con su proporcion', () => {
    const dialogo = abrirVisor()
    const imagen = dialogo.getByRole('img')
    expect(imagen.className).toContain('object-contain')
    expect(imagen.className).toContain('m-auto')
    expect(dialogo.getByText(visor.posicion.replace(':actual', '2').replace(':total', '3'))).toBeInTheDocument()
  })

  it('acercar y alejar cambian el nivel sin deformar y restablecer vuelve al ajuste completo', () => {
    const dialogo = abrirVisor()
    const imagen = dialogo.getByRole('img')
    fireEvent.click(dialogo.getByRole('button', { name: visor.acercar }))
    expect(imagen.className).toContain(clasesVisor.niveles[1])
    expect(imagen.className).toContain('object-contain')
    fireEvent.click(dialogo.getByRole('button', { name: visor.acercar }))
    expect(imagen.className).toContain(clasesVisor.niveles[2])
    fireEvent.click(dialogo.getByRole('button', { name: visor.alejar }))
    expect(imagen.className).toContain(clasesVisor.niveles[1])
    fireEvent.click(dialogo.getByRole('button', { name: visor.restablecer }))
    expect(imagen.className).toBe(clasesVisor.imagen)
    expect(dialogo.getByRole('button', { name: visor.alejar })).toBeDisabled()
  })

  it('el zoom se limita al ultimo nivel', () => {
    const dialogo = abrirVisor()
    for (let intento = 0; intento < clasesVisor.niveles.length + 2; intento += 1) {
      const acercar = dialogo.getByRole('button', { name: visor.acercar })
      if (!(acercar as HTMLButtonElement).disabled) fireEvent.click(acercar)
    }
    expect(dialogo.getByRole('button', { name: visor.acercar })).toBeDisabled()
  })

  it('navega entre imagenes y cierra', () => {
    const cambiar = vi.fn()
    const cerrar = vi.fn()
    const dialogo = abrirVisor(cambiar, cerrar)
    fireEvent.click(dialogo.getByRole('button', { name: visor.siguiente }))
    expect(cambiar).toHaveBeenCalledWith(2)
    fireEvent.click(dialogo.getByRole('button', { name: visor.anterior }))
    expect(cambiar).toHaveBeenCalledWith(0)
    fireEvent.click(dialogo.getAllByRole('button', { name: visor.cerrar })[0])
    expect(cerrar).toHaveBeenCalled()
  })
})
