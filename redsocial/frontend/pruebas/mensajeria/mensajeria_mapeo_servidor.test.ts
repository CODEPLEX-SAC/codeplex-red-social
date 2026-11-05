import { describe, expect, it } from 'vitest'
import { adjuntoDeServidor, adjuntoParaServidor, mensajeDeServidor } from '@/componentes/mensajeria'
import type { MensajeServidor } from '@/tipos/mensajeria/contrato_servidor_mensajeria'

const servidor: MensajeServidor = {
  id: 'm-1',
  conversacionId: 'c-1',
  autorId: 'usuario-1',
  creadoEn: '2026-10-30T10:05:00',
  adjunto: { id: 'a-1', nombre: 'nota.webm', mime: 'audio/webm', bytes: 90000, tipo: 'audio', duracion: 14, picos: [0.1, 0.8], enlace: 'enlace-firmado-a-1' },
  respuestaA: { mensajeId: 'm-0', autorId: 'usuario-2' },
  reenviadoDe: 'm-9',
}

describe('Mapeo entre el contrato del servidor y el modelo de la interfaz', () => {
  it('convierte un mensaje del servidor: enlace a url, bytes a peso legible, hora local y reenviado', () => {
    const mensaje = mensajeDeServidor(servidor)
    expect(mensaje).toMatchObject({ id: 'm-1', reenviado: true, hora: '10:05 AM', respuestaA: { mensajeId: 'm-0' } })
    expect(mensaje.adjunto).toMatchObject({ url: 'enlace-firmado-a-1', peso: '87.9 KB', bytes: 90000, mime: 'audio/webm', duracion: 14, picos: [0.1, 0.8] })
  })

  it('al enviar, el adjunto lleva el tipo real, los bytes y la onda, sin url local ni id', () => {
    const adjunto = adjuntoDeServidor(servidor.adjunto!)
    const carga = adjuntoParaServidor({ ...adjunto, url: 'blob:local' })
    expect(carga).toEqual({ nombre: 'nota.webm', mime: 'audio/webm', bytes: 90000, tipo: 'audio', formato: undefined, extension: undefined, duracion: 14, picos: [0.1, 0.8] })
    expect('url' in carga || 'enlace' in carga || 'id' in carga).toBe(false)
  })

  it('un adjunto antiguo sin tipo ni peso numérico se envía como documento de 0 bytes y sin mime inventado', () => {
    expect(adjuntoParaServidor({ nombre: 'viejo.pdf', peso: '2.4 MB' })).toMatchObject({ tipo: 'documento', bytes: 0, mime: '' })
  })
})
