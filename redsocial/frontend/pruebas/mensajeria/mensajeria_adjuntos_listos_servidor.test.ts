import { describe, expect, it } from 'vitest'
import { adjuntoDeGrabacion, prepararAdjuntos } from '@/componentes/mensajeria'

describe('Adjuntos listos para entregar al servidor', () => {
  it('un archivo elegido conserva su tipo real y su peso numérico, además del peso legible', () => {
    URL.createObjectURL = () => 'blob:x'
    const archivo = new File([new Uint8Array(2048)], 'datos.xlsx', { type: 'application/vnd.ms-excel' })
    const { adjuntos } = prepararAdjuntos([archivo])
    expect(adjuntos[0]).toMatchObject({ nombre: 'datos.xlsx', mime: 'application/vnd.ms-excel', bytes: 2048, peso: '2.0 KB', formato: 'excel', extension: 'xlsx' })
  })

  it('una nota de voz conserva el tipo real que informó el navegador, sus bytes, su duración y su onda', () => {
    const adjunto = adjuntoDeGrabacion({ url: 'blob:v', duracion: 14, picos: [0.2, 0.9], bytes: 90000, tipo: 'audio/mp4' })
    expect(adjunto).toMatchObject({ tipo: 'audio', mime: 'audio/mp4', bytes: 90000, duracion: 14, picos: [0.2, 0.9], peso: '87.9 KB' })
  })
})
