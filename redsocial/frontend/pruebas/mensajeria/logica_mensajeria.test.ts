import { describe, expect, it } from 'vitest'
import { accionesDeMensaje, alternarConversacionFavorita, alternarMensajeFijado, eliminarMensajePropio, posicionEnGrupo, presenciaDe, reenviarMensaje, conversacionesFavoritas, conversacionesNoLeidas, editarMensajePropio, enviarMensajePropio, conversacionesConEtiqueta, etiquetaDeConversacion, etiquetaDeDia, extractoDe, formatearFecha, formatearHora, marcarConversacionLeida, proximaMedianoche, proximoCambioReloj, proximoVencimientoEdicion, puedeEditarMensaje } from '@/componentes/mensajeria'
import { ESTADO_INICIAL_MENSAJERIA as INICIAL } from '../../servicios/mensajeria/mensajes'
import { CONTACTOS_LINEA_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'
import { PERFILES_USUARIO } from '../../servicios/perfil/perfiles'
import type { EstadoMensajeria } from '@/tipos/mensajeria/contrato_mensajes'
import { ahoraMensajeria, restaurarRelojMensajeria, sustituirRelojMensajeria } from '../../servicios/mensajeria/reloj'

const PEDRO = 'usuario-pedro-lozano'
const LUIS = INICIAL.conversaciones[1]
const EQUIPO = INICIAL.conversaciones[2]
const T0 = new Date(2026, 9, 26, 15, 5, 0)

function etiquetaDe(estado: EstadoMensajeria, id: string, ahora: Date) {
  return conversacionesConEtiqueta(estado.conversaciones, estado, ahora).find((conversacion) => conversacion.id === id)?.etiquetaTiempo
}

function minutosDespues(minutos: number, segundos = 0) {
  return new Date(T0.getTime() + minutos * 60000 + segundos * 1000)
}

describe('Datos de demostracion de Mensajeria', () => {
  it('cada conversacion tiene un identificador unico que no depende del nombre ni coincide con un perfil', () => {
    const ids = INICIAL.conversaciones.map((conversacion) => conversacion.id)
    expect(INICIAL.conversaciones).toHaveLength(9)
    expect(new Set(ids).size).toBe(9)
    ids.forEach((id) => expect(id).toMatch(/^conversacion-\d{3}$/))
    INICIAL.conversaciones.forEach((conversacion) => expect(conversacion.id.toLowerCase()).not.toContain(conversacion.nombre.toLowerCase()))
    const idsPerfil = PERFILES_USUARIO.map((perfil) => perfil.id)
    ids.forEach((id) => expect(idsPerfil).not.toContain(id))
  })

  it('las nueve conversaciones tienen un hilo propio y distinto, con mensajes de ids unicos', () => {
    const contenidos = INICIAL.conversaciones.map((conversacion) => (INICIAL.hilos[conversacion.id] ?? []).map((mensaje) => mensaje.contenido).join('|'))
    expect(new Set(contenidos).size).toBe(9)
    INICIAL.conversaciones.forEach((conversacion) => {
      const hilo = INICIAL.hilos[conversacion.id] ?? []
      expect(hilo.length).toBeGreaterThan(0)
      expect(new Set(hilo.map((mensaje) => mensaje.id)).size).toBe(hilo.length)
    })
  })

  it('cada mensaje tiene un autor que es el usuario propio o un participante de su conversacion; los grupos usan participantes ficticios', () => {
    const idsConocidos = INICIAL.participantes.map((participante) => participante.id)
    INICIAL.conversaciones.forEach((conversacion) => {
      ;(INICIAL.hilos[conversacion.id] ?? []).forEach((mensaje) => {
        expect(idsConocidos).toContain(mensaje.autorId)
        expect([PEDRO, ...conversacion.participantes]).toContain(mensaje.autorId)
      })
      if (conversacion.esGrupo) conversacion.participantes.forEach((id) => expect(id).toMatch(/^participante-\d{3}$/))
    })
  })

  it('el extracto de cada fila coincide con el ultimo mensaje de su hilo', () => {
    INICIAL.conversaciones.forEach((conversacion) => {
      const hilo = INICIAL.hilos[conversacion.id] ?? []
      const ultimo = hilo[hilo.length - 1]
      expect(conversacion.extracto.endsWith(ultimo.contenido ?? '')).toBe(true)
    })
  })
})

describe('Reloj sustituible', () => {
  it('permite fijar y restaurar la fuente de tiempo', () => {
    sustituirRelojMensajeria(() => T0)
    expect(ahoraMensajeria()).toBe(T0)
    restaurarRelojMensajeria()
    expect(ahoraMensajeria()).not.toBe(T0)
  })

  it('la hora se formatea con el patron de los mensajes precargados', () => {
    expect(formatearHora(new Date(2026, 0, 1, 0, 7))).toBe('12:07 AM')
    expect(formatearHora(new Date(2026, 0, 1, 12, 0))).toBe('12:00 PM')
    expect(formatearHora(T0)).toBe('03:05 PM')
  })
})

describe('Envio de mensajes propios', () => {
  it('anade el mensaje al final del hilo correcto sin tocar los demas', () => {
    const siguiente = enviarMensajePropio(INICIAL, LUIS.id, '  Gracias, Luis  ', PEDRO, T0)
    const hilo = siguiente.hilos[LUIS.id]
    const ultimo = hilo[hilo.length - 1]
    expect(hilo).toHaveLength(INICIAL.hilos[LUIS.id].length + 1)
    expect(ultimo).toMatchObject({ autorId: PEDRO, contenido: 'Gracias, Luis', hora: '03:05 PM' })
    INICIAL.conversaciones.filter((conversacion) => conversacion.id !== LUIS.id).forEach((conversacion) => expect(siguiente.hilos[conversacion.id]).toBe(INICIAL.hilos[conversacion.id]))
    expect(ultimo).not.toHaveProperty('confirmado')
  })

  it('actualiza extracto y hora de la fila sin reordenar ni cambiar los no leidos', () => {
    const siguiente = enviarMensajePropio(INICIAL, EQUIPO.id, 'Listo', PEDRO, T0)
    const fila = siguiente.conversaciones[2]
    expect(fila.extracto).toBe('Tú: Listo')
    expect(etiquetaDe(siguiente, EQUIPO.id, T0)).toBe('03:05 PM')
    expect(fila.noLeidos).toBe(EQUIPO.noLeidos)
    expect(siguiente.conversaciones.map((conversacion) => conversacion.id)).toEqual(INICIAL.conversaciones.map((conversacion) => conversacion.id))
  })

  it('rechaza el texto vacio o con solo espacios devolviendo el mismo estado', () => {
    expect(enviarMensajePropio(INICIAL, LUIS.id, '', PEDRO, T0)).toBe(INICIAL)
    expect(enviarMensajePropio(INICIAL, LUIS.id, '   ', PEDRO, T0)).toBe(INICIAL)
  })

  it('el mensaje enviado no guarda la fecha como texto y se mantiene como una fecha derivable', () => {
    const primero = enviarMensajePropio(INICIAL, LUIS.id, 'Uno', PEDRO, T0)
    const ultimo = primero.hilos[LUIS.id][primero.hilos[LUIS.id].length - 1]
    expect(ultimo).not.toHaveProperty('fecha')
    expect(new Date(ultimo.creadoEn).getTime()).toBe(T0.getTime())
  })
})

describe('Edicion durante 15 minutos', () => {
  const enviado = enviarMensajePropio(INICIAL, LUIS.id, 'Texto original', PEDRO, T0)
  const hilo = enviado.hilos[LUIS.id]
  const propio = hilo[hilo.length - 1]
  const ajeno = hilo[0].autorId === PEDRO ? hilo[1] : hilo[0]

  it('es editable antes de 15 minutos y deja de serlo al cumplirse', () => {
    expect(puedeEditarMensaje(propio, PEDRO, T0)).toBe(true)
    expect(puedeEditarMensaje(propio, PEDRO, minutosDespues(14, 59))).toBe(true)
    expect(puedeEditarMensaje(propio, PEDRO, minutosDespues(15))).toBe(false)
    expect(puedeEditarMensaje(propio, PEDRO, minutosDespues(16))).toBe(false)
  })

  it('los mensajes ajenos nunca se pueden editar', () => {
    expect(puedeEditarMensaje(ajeno, PEDRO, new Date(ajeno.creadoEn))).toBe(false)
  })

  it('al guardar cambia el contenido y actualiza el extracto solo si es el ultimo mensaje', () => {
    const editado = editarMensajePropio(enviado, LUIS.id, propio.id, 'Texto corregido', PEDRO, minutosDespues(5))
    const hiloEditado = editado.hilos[LUIS.id]
    expect(hiloEditado[hiloEditado.length - 1].contenido).toBe('Texto corregido')
    expect(editado.conversaciones[1].extracto).toBe('Tú: Texto corregido')
    expect(etiquetaDe(editado, LUIS.id, T0)).toBe(etiquetaDe(enviado, LUIS.id, T0))
    const intermedio = enviarMensajePropio(enviado, LUIS.id, 'Otro', PEDRO, minutosDespues(1))
    const reeditado = editarMensajePropio(intermedio, LUIS.id, propio.id, 'Cambio antiguo', PEDRO, minutosDespues(2))
    expect(reeditado.conversaciones[1].extracto).toBe('Tú: Otro')
  })

  it('no edita fuera de plazo, ajenos ni con texto vacio', () => {
    expect(editarMensajePropio(enviado, LUIS.id, propio.id, 'Tarde', PEDRO, minutosDespues(15))).toBe(enviado)
    expect(editarMensajePropio(enviado, LUIS.id, ajeno.id, 'Ajeno', PEDRO, T0)).toBe(enviado)
    expect(editarMensajePropio(enviado, LUIS.id, propio.id, '   ', PEDRO, minutosDespues(1))).toBe(enviado)
  })
})

describe('Lectura y favoritos independientes', () => {
  it('marcar como leida pone a cero los no leidos sin alterar el favorito', () => {
    expect(LUIS.noLeidos).toBeGreaterThan(0)
    expect(LUIS.favorita).toBe(true)
    const leida = marcarConversacionLeida(INICIAL, LUIS.id)
    expect(leida.conversaciones[1]).toMatchObject({ noLeidos: 0, favorita: true })
    expect(marcarConversacionLeida(leida, LUIS.id)).toBe(leida)
  })

  it('alternar favorito no cambia los no leidos y cada lista se deriva del mismo estado', () => {
    const sinFavorito = alternarConversacionFavorita(INICIAL, LUIS.id)
    expect(sinFavorito.conversaciones[1]).toMatchObject({ noLeidos: LUIS.noLeidos, favorita: false })
    expect(conversacionesFavoritas(sinFavorito).map((c) => c.id)).not.toContain(LUIS.id)
    expect(conversacionesNoLeidas(sinFavorito).map((c) => c.id)).toContain(LUIS.id)
  })
})

describe('Coherencia de los datos iniciales', () => {
  it('el extracto y la hora de cada fila salen del ultimo mensaje: «Tú: » solo si es propio y el autor solo en grupos', () => {
    INICIAL.conversaciones.filter((conversacion) => !conversacion.actividadHistoria).forEach((conversacion) => {
      const hilo = INICIAL.hilos[conversacion.id] ?? []
      const ultimo = hilo[hilo.length - 1]
      expect(conversacion.extracto).toBe(extractoDe(INICIAL, conversacion, ultimo, PEDRO))
      expect(conversacion.extracto.startsWith('Tú: ')).toBe(ultimo.autorId === PEDRO)
      expect(etiquetaDe(INICIAL, conversacion.id, new Date(ultimo.creadoEn))).toBe(ultimo.hora)
    })
  })

  it('los contactos en linea del panel lateral son exactamente las conversaciones en linea', () => {
    const enLinea = INICIAL.conversaciones.filter((conversacion) => conversacion.enLinea).map((conversacion) => conversacion.nombre)
    expect(CONTACTOS_LINEA_MENSAJERIA.map((contacto) => contacto.nombre).sort()).toEqual([...enLinea].sort())
    expect(enLinea).toHaveLength(5)
  })

  it('los datos iniciales no contienen indicadores de lectura ni entrega', () => {
    Object.values(INICIAL.hilos).flat().forEach((mensaje) => expect(mensaje).not.toHaveProperty('confirmado'))
  })

  it('los datos iniciales no traen separadores como texto', () => {
    Object.values(INICIAL.hilos).flat().forEach((mensaje) => expect(mensaje).not.toHaveProperty('fecha'))
  })

  it('proximoVencimientoEdicion devuelve el instante exacto del primer vencimiento o nulo', () => {
    const enviado = enviarMensajePropio(INICIAL, LUIS.id, 'Uno', PEDRO, T0)
    const hilo = enviado.hilos[LUIS.id]
    expect(proximoVencimientoEdicion(hilo, PEDRO, T0)).toBe(T0.getTime() + 15 * 60000)
    expect(proximoVencimientoEdicion(hilo, PEDRO, minutosDespues(15))).toBeNull()
    expect(proximoVencimientoEdicion(INICIAL.hilos[LUIS.id], PEDRO, T0)).toBeNull()
  })
})

describe('Separador de dia derivado de la fecha del mensaje', () => {
  const ahora = new Date(2026, 9, 26, 15, 5)

  it('muestra el dia de la semana y la fecha sin año si es del año actual', () => {
    expect(formatearFecha(new Date(2026, 9, 26, 8, 0), ahora)).toBe('Lunes, 26 de octubre')
    expect(formatearFecha(new Date(2026, 0, 1, 0, 0), ahora)).toBe('Jueves, 1 de enero')
    expect(formatearFecha(new Date(2026, 11, 31, 23, 59), ahora)).toBe('Jueves, 31 de diciembre')
  })

  it('incluye el año si es distinto del actual', () => {
    expect(formatearFecha(new Date(2025, 7, 12, 9, 12), ahora)).toBe('Martes, 12 de agosto de 2025')
    expect(formatearFecha(new Date(2025, 11, 31, 23, 59), new Date(2026, 0, 1, 0, 1))).toBe('Miércoles, 31 de diciembre de 2025')
    expect(formatearFecha(new Date(2027, 0, 1, 0, 0), ahora)).toBe('Viernes, 1 de enero de 2027')
  })

  it('el cambio de día, de mes y de año genera separador y dentro del mismo día no', () => {
    const mensaje = (creadoEn: string) => ({ id: 'm', autorId: PEDRO, creadoEn })
    const base = mensaje('2026-10-26T23:58:00')
    expect(etiquetaDeDia(base, undefined, ahora)).toBe('Lunes, 26 de octubre')
    expect(etiquetaDeDia(mensaje('2026-10-26T23:59:00'), base, ahora)).toBeUndefined()
    expect(etiquetaDeDia(mensaje('2026-10-27T00:01:00'), base, ahora)).toBe('Martes, 27 de octubre')
    expect(etiquetaDeDia(mensaje('2026-11-01T09:00:00'), base, ahora)).toBe('Domingo, 1 de noviembre')
    expect(etiquetaDeDia(mensaje('2027-01-01T09:00:00'), mensaje('2026-12-31T23:59:00'), ahora)).toBe('Viernes, 1 de enero de 2027')
  })

  it('la etiqueta de un mensaje no cambia al pasar la medianoche mientras sea el mismo año', () => {
    const mensaje = { id: 'm', autorId: PEDRO, creadoEn: new Date(2026, 9, 26, 23, 50).toISOString() }
    const antes = etiquetaDeDia(mensaje, undefined, new Date(2026, 9, 26, 23, 59))
    const despues = etiquetaDeDia(mensaje, undefined, new Date(2026, 9, 27, 0, 1))
    expect(despues).toBe(antes)
  })

  it('los separadores precargados coinciden con los que se mostraban antes', () => {
    const antes2025 = new Date(2025, 8, 1)
    const porHilo = INICIAL.conversaciones.map((conversacion) => {
      const hilo = INICIAL.hilos[conversacion.id] ?? []
      return hilo.map((mensaje, i) => etiquetaDeDia(mensaje, hilo[i - 1], antes2025)).filter(Boolean)
    })
    expect(porHilo).toEqual([
      ['Lunes, 11 de agosto', 'Martes, 12 de agosto'],
      ['Martes, 12 de agosto'],
      ['Lunes, 11 de agosto'],
      ['Lunes, 11 de agosto'],
      ['Domingo, 10 de agosto'],
      ['Domingo, 10 de agosto'],
      ['Sábado, 9 de agosto'],
      ['Sábado, 9 de agosto'],
      ['Viernes, 8 de agosto'],
    ])
  })
})

describe('Acciones, agrupacion, reenvio, fijado y eliminacion (logica pura)', () => {
  const hiloLuis = INICIAL.hilos[LUIS.id]
  const propioAntiguo = hiloLuis.find((mensaje) => mensaje.autorId === PEDRO)!
  const ajeno = hiloLuis.find((mensaje) => mensaje.autorId !== PEDRO)!

  it('los permisos dependen de quien envio el mensaje y del plazo de edicion', () => {
    expect(accionesDeMensaje(propioAntiguo, PEDRO, T0)).toEqual({ responder: true, editar: false, reenviar: true, fijar: true, eliminar: true })
    expect(accionesDeMensaje(ajeno, PEDRO, new Date(ajeno.creadoEn))).toEqual({ responder: true, editar: false, reenviar: true, fijar: true, eliminar: false })
    const enviado = enviarMensajePropio(INICIAL, LUIS.id, 'Nuevo', PEDRO, T0).hilos[LUIS.id].at(-1)!
    expect(accionesDeMensaje(enviado, PEDRO, minutosDespues(14, 59)).editar).toBe(true)
    expect(accionesDeMensaje(enviado, PEDRO, minutosDespues(15)).editar).toBe(false)
  })

  it('la posicion en el grupo depende del remitente consecutivo y del dia', () => {
    const m = (autorId: string, creadoEn: string) => ({ id: 'x', autorId, creadoEn })
    const mensajes = [m('a', '2026-10-26T10:00:00'), m('a', '2026-10-26T10:01:00'), m('a', '2026-10-26T10:02:00'), m('b', '2026-10-26T10:03:00'), m('b', '2026-10-27T10:04:00')]
    expect([0, 1, 2, 3, 4].map((i) => posicionEnGrupo(mensajes, i))).toEqual(['primera', 'media', 'ultima', 'sola', 'sola'])
  })

  it('reenviar copia el mensaje al hilo de destino, actualiza su fila y no toca el origen ni los no leidos', () => {
    const siguiente = reenviarMensaje(INICIAL, LUIS.id, ajeno.id, 'conversacion-004', PEDRO, T0)
    const destino = siguiente.hilos['conversacion-004']
    expect(destino.at(-1)).toMatchObject({ autorId: PEDRO, contenido: ajeno.contenido, reenviado: true, hora: '03:05 PM' })
    expect(siguiente.conversaciones[3]).toMatchObject({ extracto: `Tú: ${ajeno.contenido}`, noLeidos: INICIAL.conversaciones[3].noLeidos })
    expect(etiquetaDe(siguiente, 'conversacion-004', T0)).toBe('03:05 PM')
    expect(siguiente.hilos[LUIS.id]).toBe(INICIAL.hilos[LUIS.id])
  })

  it('reenviar un adjunto conserva el adjunto y no reenvia a la misma conversacion ni un mensaje inexistente', () => {
    const conAdjunto = INICIAL.hilos['conversacion-001'].find((mensaje) => mensaje.adjunto)!
    const siguiente = reenviarMensaje(INICIAL, 'conversacion-001', conAdjunto.id, 'conversacion-004', PEDRO, T0)
    expect(siguiente.hilos['conversacion-004'].at(-1)).toMatchObject({ adjunto: conAdjunto.adjunto, reenviado: true })
    expect(reenviarMensaje(INICIAL, LUIS.id, ajeno.id, LUIS.id, PEDRO, T0)).toBe(INICIAL)
    expect(reenviarMensaje(INICIAL, LUIS.id, 'mensaje-inexistente', 'conversacion-004', PEDRO, T0)).toBe(INICIAL)
  })

  it('fijar alterna el mensaje fijado, sustituye al anterior y rechaza mensajes que no pertenecen al hilo', () => {
    const fijado = alternarMensajeFijado(INICIAL, LUIS.id, ajeno.id)
    expect(fijado.conversaciones[1].mensajeFijadoId).toBe(ajeno.id)
    expect(alternarMensajeFijado(fijado, LUIS.id, ajeno.id).conversaciones[1]).not.toHaveProperty('mensajeFijadoId')
    expect(alternarMensajeFijado(fijado, LUIS.id, propioAntiguo.id).conversaciones[1].mensajeFijadoId).toBe(propioAntiguo.id)
    expect(alternarMensajeFijado(INICIAL, LUIS.id, 'mensaje-inexistente')).toBe(INICIAL)
  })

  it('eliminar solo afecta a mensajes propios, retira el fijado y recalcula extracto y hora si era el ultimo', () => {
    expect(eliminarMensajePropio(INICIAL, LUIS.id, ajeno.id, PEDRO)).toBe(INICIAL)
    const enviado = enviarMensajePropio(INICIAL, LUIS.id, 'Temporal', PEDRO, T0)
    const id = enviado.hilos[LUIS.id].at(-1)!.id
    const fijado = alternarMensajeFijado(enviado, LUIS.id, id)
    const eliminado = eliminarMensajePropio(fijado, LUIS.id, id, PEDRO)
    const ultimo = eliminado.hilos[LUIS.id].at(-1)!
    expect(eliminado.conversaciones[1]).not.toHaveProperty('mensajeFijadoId')
    expect(eliminado.conversaciones[1].extracto).toBe(extractoDe(INICIAL, INICIAL.conversaciones[1], ultimo, PEDRO))
    expect(etiquetaDe(eliminado, LUIS.id, new Date(ultimo.creadoEn))).toBe(ultimo.hora)
    const intermedio = eliminarMensajePropio(INICIAL, LUIS.id, propioAntiguo.id, PEDRO)
    expect(intermedio.conversaciones[1]).toMatchObject({ extracto: LUIS.extracto })
    expect(etiquetaDe(intermedio, LUIS.id, T0)).toBe(etiquetaDe(INICIAL, LUIS.id, T0))
  })

  it('al vaciar un hilo la fila indica que no hay mensajes y los ids nuevos no repiten ids eliminados', () => {
    const unico = { ...INICIAL, hilos: { ...INICIAL.hilos, [LUIS.id]: [propioAntiguo] } }
    const vacio = eliminarMensajePropio(unico, LUIS.id, propioAntiguo.id, PEDRO)
    expect(vacio.hilos[LUIS.id]).toEqual([])
    expect(vacio.conversaciones[1]).toMatchObject({ extracto: 'Sin mensajes' })
    expect(etiquetaDe(vacio, LUIS.id, T0)).toBe('')
    const sinIntermedio = eliminarMensajePropio(INICIAL, LUIS.id, propioAntiguo.id, PEDRO)
    const nuevo = enviarMensajePropio(sinIntermedio, LUIS.id, 'Otro', PEDRO, T0).hilos[LUIS.id].at(-1)!
    expect(sinIntermedio.hilos[LUIS.id].map((mensaje) => mensaje.id)).not.toContain(nuevo.id)
  })

  it('la presencia sale de las conversaciones individuales en linea y es indefinida si no se conoce', () => {
    expect(presenciaDe(INICIAL.conversaciones, 'maria-fernandez')).toBe('conectado')
    expect(presenciaDe(INICIAL.conversaciones, 'participante-002')).toBeUndefined()
    expect(presenciaDe(INICIAL.conversaciones, 'javier-torres')).toBeUndefined()
  })
})

describe('Etiqueta de tiempo de la lista de conversaciones', () => {
  const AHORA = new Date(2026, 9, 26, 15, 5, 0)
  const etiqueta = (creado: Date, ahora = AHORA) => etiquetaDeConversacion(creado.toISOString(), ahora)

  it('hoy muestra la hora del ultimo mensaje', () => {
    expect(etiqueta(new Date(2026, 9, 26, 9, 12))).toBe('09:12 AM')
    expect(etiqueta(new Date(2026, 9, 26, 0, 0))).toBe('12:00 AM')
    expect(etiqueta(new Date(2026, 9, 26, 23, 59))).toBe('11:59 PM')
  })

  it('ayer muestra «Ayer» aunque haya pasado menos de 24 horas o casi 48', () => {
    expect(etiqueta(new Date(2026, 9, 25, 23, 59))).toBe('Ayer')
    expect(etiqueta(new Date(2026, 9, 25, 0, 1))).toBe('Ayer')
  })

  it('cada dia de la semana anterior muestra el nombre del dia, de Ayer hasta seis dias atras', () => {
    expect(etiqueta(new Date(2026, 9, 25, 10, 0))).toBe('Ayer')
    expect(etiqueta(new Date(2026, 9, 24, 10, 0))).toBe('Sábado')
    expect(etiqueta(new Date(2026, 9, 23, 10, 0))).toBe('Viernes')
    expect(etiqueta(new Date(2026, 9, 22, 10, 0))).toBe('Jueves')
    expect(etiqueta(new Date(2026, 9, 21, 10, 0))).toBe('Miércoles')
    expect(etiqueta(new Date(2026, 9, 20, 10, 0))).toBe('Martes')
    expect(etiqueta(new Date(2026, 9, 25, 10, 0), new Date(2026, 9, 29, 10, 0))).toBe('Domingo')
    expect(etiqueta(new Date(2026, 9, 26, 10, 0), new Date(2026, 9, 30, 10, 0))).toBe('Lunes')
  })

  it('exactamente siete dias atras ya es fecha numerica DD/MM/AAAA y no repite el nombre del dia', () => {
    expect(etiqueta(new Date(2026, 9, 19, 10, 0))).toBe('19/10/2026')
    expect(etiqueta(new Date(2026, 0, 3, 10, 0))).toBe('03/01/2026')
  })

  it('el limite de siete dias se cuenta por dias de calendario, no por horas transcurridas', () => {
    expect(etiqueta(new Date(2026, 9, 20, 0, 1), new Date(2026, 9, 26, 23, 59))).toBe('Martes')
    expect(etiqueta(new Date(2026, 9, 19, 23, 59), new Date(2026, 9, 26, 0, 1))).toBe('19/10/2026')
  })

  it('el cambio de mes cuenta dias de calendario', () => {
    const inicioDeMes = new Date(2026, 10, 1, 8, 0)
    expect(etiqueta(new Date(2026, 9, 31, 22, 0), inicioDeMes)).toBe('Ayer')
    expect(etiqueta(new Date(2026, 9, 30, 22, 0), inicioDeMes)).toBe('Viernes')
    expect(etiqueta(new Date(2026, 9, 26, 22, 0), inicioDeMes)).toBe('Lunes')
    expect(etiqueta(new Date(2026, 9, 25, 22, 0), inicioDeMes)).toBe('25/10/2026')
  })

  it('el cambio de año cuenta dias de calendario y la fecha antigua lleva el año', () => {
    const anioNuevo = new Date(2027, 0, 1, 8, 0)
    expect(etiqueta(new Date(2026, 11, 31, 23, 0), anioNuevo)).toBe('Ayer')
    expect(etiqueta(new Date(2026, 11, 30, 23, 0), anioNuevo)).toBe('Miércoles')
    expect(etiqueta(new Date(2026, 11, 20, 10, 0), anioNuevo)).toBe('20/12/2026')
    expect(etiqueta(new Date(2025, 7, 12, 9, 12), AHORA)).toBe('12/08/2025')
  })

  it('una fecha futura muestra su fecha numerica y una invalida o ausente queda vacia', () => {
    expect(etiqueta(new Date(2026, 9, 27, 9, 0))).toBe('27/10/2026')
    expect(etiquetaDeConversacion('no-es-una-fecha', AHORA)).toBe('')
    expect(etiquetaDeConversacion(null, AHORA)).toBe('')
    expect(etiquetaDeConversacion('', AHORA)).toBe('')
  })

  it('cada fila se deriva de la ultima actividad de su conversacion, sin reordenar, y vacia si no hay mensajes', () => {
    const vacio: EstadoMensajeria = { ...INICIAL, hilos: { ...INICIAL.hilos, [LUIS.id]: [] } }
    const filas = conversacionesConEtiqueta(vacio.conversaciones, vacio, AHORA)
    expect(filas.map((fila) => fila.id)).toEqual(INICIAL.conversaciones.map((conversacion) => conversacion.id))
    expect(filas[1].etiquetaTiempo).toBe('')
    expect(filas[0].etiquetaTiempo).toBe('12/08/2025')
    const dia = new Date(2025, 7, 13, 10, 0)
    expect(conversacionesConEtiqueta(INICIAL.conversaciones, INICIAL, dia).map((fila) => fila.etiquetaTiempo)).toEqual(['Ayer', 'Ayer', 'Lunes', 'Lunes', 'Domingo', 'Domingo', 'Sábado', 'Sábado', 'Viernes'])
  })

  it('el siguiente cambio de fecha es la proxima medianoche local, tambien al cambiar de mes y de año', () => {
    expect(proximaMedianoche(AHORA)).toBe(new Date(2026, 9, 27).getTime())
    expect(proximaMedianoche(new Date(2026, 9, 31, 23, 59))).toBe(new Date(2026, 10, 1).getTime())
    expect(proximaMedianoche(new Date(2026, 11, 31, 12, 0))).toBe(new Date(2027, 0, 1).getTime())
  })

  it('el proximo cambio del reloj es el menor entre el vencimiento de edicion y la medianoche', () => {
    const propio = { id: 'mensaje-002-9', autorId: PEDRO, creadoEn: AHORA.toISOString(), contenido: 'Hola' }
    expect(proximoCambioReloj([], PEDRO, AHORA)).toBe(new Date(2026, 9, 27).getTime())
    expect(proximoCambioReloj([propio], PEDRO, AHORA)).toBe(AHORA.getTime() + 15 * 60000)
    const tarde = new Date(2026, 9, 26, 23, 55)
    expect(proximoCambioReloj([{ ...propio, creadoEn: tarde.toISOString() }], PEDRO, tarde)).toBe(new Date(2026, 9, 27).getTime())
  })
})
