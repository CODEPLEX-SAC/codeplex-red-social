import { describe, expect, it } from 'vitest'
import { abandonarGrupoConversacion, accionesDeConversacion, actividadDe, alternarConversacionFavorita, alternarSilencioConversacion, totalMensajesSinLeer, conversacionesConActividad, identificadoresDe, marcarConversacionLeida, marcarConversacionNoLeida, quitarConversacion, tipoDeConversacion } from '@/componentes/mensajeria'
import { ESTADO_INICIAL_MENSAJERIA as INICIAL } from '../../servicios/mensajeria/mensajes'
import type { ConversacionConEtiqueta, EstadoMensajeria } from '@/tipos/mensajeria/contrato_mensajes'

const AHORA = new Date(2026, 9, 29, 12, 0, 0)
const INDIVIDUAL = 'conversacion-001'
const GRUPO = 'conversacion-003'
const filas = (estado: EstadoMensajeria = INICIAL, historias: Record<string, number> = { 'maria-fernandez': 2 }) => conversacionesConActividad(estado.conversaciones, estado, AHORA, historias)
const fila = (id: string, estado: EstadoMensajeria = INICIAL): ConversacionConEtiqueta => filas(estado).find((c) => c.id === id) as ConversacionConEtiqueta
const ids = (id: string, estado?: EstadoMensajeria) => accionesDeConversacion(fila(id, estado)).map((a) => a.actionId)

describe('Identificadores y tipo de la conversación', () => {
  it('una individual lleva participantId y ningun groupId; un grupo lleva groupId y ningun participantId', () => {
    expect(tipoDeConversacion(fila(INDIVIDUAL))).toBe('individual')
    expect(fila(INDIVIDUAL).identificadores).toEqual({ conversationId: INDIVIDUAL, participantId: 'maria-fernandez', groupId: null })
    expect(tipoDeConversacion(fila(GRUPO))).toBe('grupal')
    expect(fila(GRUPO).identificadores).toEqual({ conversationId: GRUPO, participantId: null, groupId: 'grupo-equipo-de-proyectos' })
    expect(identificadoresDe(INICIAL.conversaciones[0]).conversationId).toBe(INDIVIDUAL)
  })
})

describe('Acciones disponibles por conversación', () => {
  it('la individual ofrece leído/no leído, silenciar, ver perfil y eliminar chat, y no abandonar grupo', () => {
    expect(ids(INDIVIDUAL)).toEqual(['marcar_leido', 'quitar_favorito', 'silenciar', 'ver_perfil', 'eliminar_chat'])
  })

  it('el grupo ofrece abandonar grupo y no ver perfil', () => {
    const acciones = ids(GRUPO)
    expect(acciones).toContain('abandonar_grupo')
    expect(acciones).toContain('eliminar_chat')
    expect(acciones).not.toContain('ver_perfil')
  })

  it('nunca ofrece archivar ni fijar', () => {
    for (const conversacion of filas()) expect(JSON.stringify(accionesDeConversacion(conversacion))).not.toMatch(/archivar|fijar/i)
  })

  it('las acciones destructivas piden confirmación y las demás no', () => {
    const porId = Object.fromEntries(accionesDeConversacion(fila(GRUPO)).map((a) => [a.actionId, a]))
    expect(porId.abandonar_grupo).toMatchObject({ peligro: true, confirmacion: true })
    expect(porId.eliminar_chat).toMatchObject({ peligro: true, confirmacion: true })
    expect(porId.silenciar).toMatchObject({ peligro: false, confirmacion: false })
  })

  it('ver perfil apunta a la ruta del perfil del participante', () => {
    expect(accionesDeConversacion(fila(INDIVIDUAL)).find((a) => a.actionId === 'ver_perfil')?.ruta).toContain('maria-fernandez')
  })

  it('el texto de leído y de silencio alterna según el estado', () => {
    const marcada = marcarConversacionNoLeida(marcarConversacionLeida(INICIAL, INDIVIDUAL), INDIVIDUAL)
    expect(ids(INDIVIDUAL, marcada)[0]).toBe('marcar_leido')
    const leida = marcarConversacionLeida(INICIAL, INDIVIDUAL)
    expect(ids(INDIVIDUAL, leida)[0]).toBe('marcar_no_leido')
    expect(ids(INDIVIDUAL, alternarSilencioConversacion(INICIAL, INDIVIDUAL))[2]).toBe('activar_notificaciones')
    expect(ids(INDIVIDUAL, alternarConversacionFavorita(INICIAL, INDIVIDUAL))[1]).toBe('marcar_favorito')
  })
})

describe('Transiciones de estado de las acciones', () => {
  it('marcar como no leído no cambia el contador real y marcar como leído lo deja en cero', () => {
    const leida = marcarConversacionLeida(INICIAL, INDIVIDUAL)
    expect(leida.conversaciones.find((c) => c.id === INDIVIDUAL)?.noLeidos).toBe(0)
    const marcada = marcarConversacionNoLeida(leida, INDIVIDUAL)
    const conversacion = marcada.conversaciones.find((c) => c.id === INDIVIDUAL)
    expect(conversacion?.noLeidos).toBe(0)
    expect(conversacion?.marcadaNoLeida).toBe(true)
    expect(marcarConversacionLeida(marcada, INDIVIDUAL).conversaciones.find((c) => c.id === INDIVIDUAL)?.marcadaNoLeida).toBeFalsy()
  })

  it('marcar como no leído una conversación que ya tiene mensajes sin leer no cambia nada', () => {
    expect(marcarConversacionNoLeida(INICIAL, INDIVIDUAL)).toBe(INICIAL)
  })

  it('silenciar alterna el estado y no toca las demás conversaciones', () => {
    const silenciada = alternarSilencioConversacion(INICIAL, INDIVIDUAL)
    expect(fila(INDIVIDUAL, silenciada).estadoNotificaciones).toBe('silenciadas')
    const otras = (estado: EstadoMensajeria) => estado.conversaciones.filter((c) => c.id !== INDIVIDUAL).map((c) => c.silenciado)
    expect(otras(silenciada)).toEqual(otras(INICIAL))
    expect(fila(INDIVIDUAL, alternarSilencioConversacion(silenciada, INDIVIDUAL)).estadoNotificaciones).toBe('activas')
  })

  it('eliminar quita la conversación y su hilo', () => {
    const sin = quitarConversacion(INICIAL, INDIVIDUAL)
    expect(sin.conversaciones.some((c) => c.id === INDIVIDUAL)).toBe(false)
    expect(sin.hilos[INDIVIDUAL]).toBeUndefined()
    expect(sin.conversaciones).toHaveLength(INICIAL.conversaciones.length - 1)
    expect(quitarConversacion(INICIAL, 'no-existe')).toBe(INICIAL)
  })

  it('abandonar solo funciona en grupos', () => {
    expect(abandonarGrupoConversacion(INICIAL, INDIVIDUAL)).toBe(INICIAL)
    expect(abandonarGrupoConversacion(INICIAL, GRUPO).conversaciones.some((c) => c.id === GRUPO)).toBe(false)
  })
})

describe('Total de mensajes sin leer', () => {
  it('suma los mensajes reales y cuenta una vez cada chat marcado como no leído', () => {
    expect(totalMensajesSinLeer(INICIAL.conversaciones)).toBe(INICIAL.conversaciones.reduce((suma, c) => suma + c.noLeidos, 0))
    expect(totalMensajesSinLeer(marcarConversacionNoLeida(marcarConversacionLeida(INICIAL, INDIVIDUAL), INDIVIDUAL).conversaciones)).toBe(totalMensajesSinLeer(INICIAL.conversaciones) - 2 + 1)
  })
})

describe('Última actividad y vista previa de la fila', () => {
  const conversacion = INICIAL.conversaciones[0]

  it('una historia más reciente que el último mensaje muestra «subió N historias» con el conteo real', () => {
    const actividad = actividadDe(conversacion, INICIAL, { 'maria-fernandez': 2 })
    expect(actividad.origen).toBe('historia')
    expect(actividad.vistaPrevia).toBe('María Fernández subió 2 historias')
    expect(actividadDe(conversacion, INICIAL, { 'maria-fernandez': 1 }).vistaPrevia).toBe('María Fernández subió 1 historia')
  })

  it('sin conteo en los datos no inventa una cantidad', () => {
    const actividad = actividadDe(conversacion, INICIAL, {})
    expect(actividad.origen).toBe('historia')
    expect(actividad.vistaPrevia).not.toMatch(/\d/)
  })

  it('un mensaje más reciente que la historia prevalece', () => {
    const posterior: EstadoMensajeria = {
      ...INICIAL,
      hilos: { ...INICIAL.hilos, [INDIVIDUAL]: [...INICIAL.hilos[INDIVIDUAL], { id: 'mensaje-001-99', autorId: 'maria-fernandez', creadoEn: '2025-08-12T11:00:00', contenido: 'Nuevo' }] },
    }
    const actividad = actividadDe(conversacion, posterior, { 'maria-fernandez': 2 })
    expect(actividad.origen).toBe('mensaje')
    expect(actividad.vistaPrevia).toBe(conversacion.extracto)
    expect(actividad.fecha).toBe('2025-08-12T11:00:00')
  })

  it('un grupo nunca muestra actividad de historias de una persona', () => {
    const grupo = INICIAL.conversaciones.find((c) => c.id === GRUPO)
    expect(actividadDe({ ...(grupo as NonNullable<typeof grupo>), actividadHistoria: { publicadaEn: '2030-01-01T00:00:00' } }, INICIAL, {}).origen).toBe('mensaje')
  })

  it('la fecha completa y exacta se conserva en los datos de la fila', () => {
    const resultado = fila(INDIVIDUAL)
    expect(resultado.fechaActividad).toBe('2025-08-12T10:05:00')
    expect(resultado.etiquetaCompleta).toContain('12 de agosto de 2025')
    expect(resultado.etiquetaTiempo).toBe('12/08/2025')
  })
})
