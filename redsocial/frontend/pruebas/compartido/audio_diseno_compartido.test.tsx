import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { limiteAlcanzado, AudioGrabando, AudioVistaPrevia, OndaAudio, ReproductorAudio, barrasDeOnda, claseDeAltura, completarPicos, duracionLegible, picosPorDefecto, resumirNiveles, ventanaDeNiveles } from '@/componentes/compartido'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const audio = catalogoCompartido.audio
const etiquetas = { reproducir: 'Reproducir', pausar: 'Pausar', posicion: 'Posición', progreso: ':actual de :total' }

describe('Diseño compartido de audio: lógica', () => {
  it('formatea la duración como m:ss con el reloj del catálogo', () => {
    expect(duracionLegible(7)).toBe('0:07')
    expect(duracionLegible(125)).toBe('2:05')
    expect(duracionLegible(-3)).toBe('0:00')
  })

  it('resume niveles al número de barras conservando el máximo de cada tramo', () => {
    expect(resumirNiveles([0.1, 0.9, 0.2, 0.4], 2)).toEqual([0.9, 0.4])
    expect(resumirNiveles([0.5], 8)).toEqual([0.5])
    expect(resumirNiveles([])).toEqual([])
    expect(resumirNiveles(Array.from({ length: 200 }, (_, i) => i / 200))).toHaveLength(audio.barras)
  })

  it('los picos por defecto son estables por semilla y completar rellena con ceros', () => {
    expect(picosPorDefecto('a')).toEqual(picosPorDefecto('a'))
    expect(picosPorDefecto('a')).not.toEqual(picosPorDefecto('b'))
    expect(picosPorDefecto('a')).toHaveLength(audio.barras)
    expect(completarPicos([0.5]).slice(0, 2)).toEqual([0.5, 0])
    expect(claseDeAltura(0)).toBe(audio.alturas[0])
    expect(claseDeAltura(1)).toBe(audio.alturas[audio.alturas.length - 1])
  })
})

describe('Diseño compartido de audio: límite de duración', () => {
  it('sin límite configurado nunca se corta; con límite se corta al alcanzarlo', () => {
    expect(audio.grabacion.duracion_maxima_segundos).toBeNull()
    expect(limiteAlcanzado(9999, null)).toBe(false)
    expect(limiteAlcanzado(59, 60)).toBe(false)
    expect(limiteAlcanzado(60, 60)).toBe(true)
  })
})

describe('Diseño compartido de audio: grabación continua', () => {
  it('la ventana conserva los últimos niveles: la onda sigue actualizándose pasados los 3 segundos', () => {
    const niveles = Array.from({ length: 100 }, (_, indice) => indice / 100)
    const ventana = ventanaDeNiveles(niveles)
    expect(ventana).toHaveLength(audio.barras)
    expect(ventana[ventana.length - 1]).toBe(0.99)
    expect(barrasDeOnda(ventana, 1, false).some((barra) => barra.cursor)).toBe(false)
  })

  it('durante toda la grabación el punto rojo sigue visible con su animación y la onda no tiene cursor', () => {
    const niveles = Array.from({ length: 150 }, () => 0.5)
    const { container } = render(<AudioGrabando segundos={15} picos={niveles} etiquetas={{ grabando: 'Grabando', cancelar: 'Cancelar', detener: 'Detener', enviar: 'Enviar' }} onCancelar={vi.fn()} onDetener={vi.fn()} onEnviar={vi.fn()} />)
    expect(container.querySelector(`[class~="${audio.animacion.pulso}"]`)).not.toBeNull()
    expect(container.querySelector(`[class~="${audio.clases.cursor.peligro.split(' ')[0]}"]`)).toBeNull()
    expect(screen.getByRole('status', { name: 'Grabando' })).toHaveTextContent('0:15')
  })
})

describe('Diseño compartido de audio: componentes', () => {
  it('la onda dibuja todas las barras con el color del tono y un cursor solo en medio de la reproducción', () => {
    const { container, rerender } = render(<OndaAudio picos={[1, 1, 1, 1]} progreso={0.5} tono="peligro" />)
    expect(container.querySelectorAll(`[class~="${audio.clases.barra.split(' ').find((clase) => clase.startsWith('max-w'))}"]`)).toHaveLength(audio.barras)
    expect(container.querySelector(`[class~="${audio.clases.barra_hecha.peligro}"]`)).not.toBeNull()
    expect(container.querySelector(`[class~="${audio.clases.cursor.primario.split(' ')[0]}"]`)).not.toBeNull()
    rerender(<OndaAudio picos={[1]} progreso={0} tono="primario" />)
    expect(container.querySelector(`[class~="${audio.clases.cursor.primario.split(' ')[0]}"]`)).toBeNull()
  })

  it('grabando: cancelar, detener y enviar son controles distintos con temporizador', () => {
    const acciones = { onCancelar: vi.fn(), onDetener: vi.fn(), onEnviar: vi.fn() }
    render(<AudioGrabando segundos={7} picos={[0.5]} etiquetas={{ grabando: 'Grabando', cancelar: 'Cancelar', detener: 'Detener', enviar: 'Enviar' }} {...acciones} />)
    expect(screen.getByRole('status', { name: 'Grabando' })).toHaveTextContent('0:07')
    fireEvent.click(screen.getByRole('button', { name: 'Detener' }))
    expect(acciones.onDetener).toHaveBeenCalledTimes(1)
    expect(acciones.onEnviar).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(acciones.onCancelar).toHaveBeenCalledTimes(1)
    expect(acciones.onEnviar).toHaveBeenCalledTimes(1)
  })

  it('vista previa: reproductor, descartar y enviar; sin archivo la reproducción queda deshabilitada', () => {
    const onDescartar = vi.fn()
    const onEnviar = vi.fn()
    render(<AudioVistaPrevia semilla="x" duracion={7} etiquetas={{ ...etiquetas, descartar: 'Descartar', enviar: 'Enviar', grupo: 'Vista previa' }} onDescartar={onDescartar} onEnviar={onEnviar} />)
    expect(screen.getByRole('group', { name: 'Vista previa' })).toHaveTextContent('0:07')
    expect(screen.getByRole('button', { name: 'Reproducir' })).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: 'Descartar' }))
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(onDescartar).toHaveBeenCalledTimes(1)
    expect(onEnviar).toHaveBeenCalledTimes(1)
  })

  it('el reproductor enviado expone la posición como texto accesible y distingue propio de ajeno', () => {
    const { container, rerender } = render(<ReproductorAudio url="blob:x" duracion={14} semilla="x" propio etiquetas={etiquetas} />)
    expect(screen.getByRole('slider', { name: 'Posición' })).toHaveAttribute('aria-valuetext', '0:00 de 0:14')
    expect(container.firstElementChild?.className).toContain(audio.clases.reproductor_propio)
    rerender(<ReproductorAudio url="blob:x" duracion={14} semilla="x" propio={false} etiquetas={etiquetas} />)
    expect(container.firstElementChild?.className).toContain(audio.clases.reproductor_ajeno)
  })
})
