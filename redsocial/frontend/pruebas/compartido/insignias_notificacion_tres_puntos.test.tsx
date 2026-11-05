import { render } from '@testing-library/react'
import { ListaConversaciones } from '@/componentes/mensajeria/bloques/lista_conversaciones'
import { elementosDeLaBarra } from '@/componentes/compartido/navegacion/elementos_barra_lateral'
import type { ConversacionConEtiqueta } from '@/tipos/mensajeria/contrato_mensajes'
import { leerFuentesFrontend } from './leer_fuentes'

function conversacion(id: string, noLeidos: number): ConversacionConEtiqueta {
  return {
    id,
    nombre: `Persona ${id}`,
    extracto: 'Vista previa',
    noLeidos,
    favorita: false,
    enLinea: false,
    participantes: [],
    etiquetaTiempo: '10:30',
    etiquetaCompleta: 'Lunes, 26 de octubre de 2026 10:30 AM',
    fechaActividad: '2026-10-26T10:30:00',
    vistaPrevia: 'Vista previa',
    origenActividad: 'mensaje',
    tipo: 'individual',
    identificadores: { conversationId: id, participantId: null, groupId: null },
    estadoNotificaciones: 'activas',
  }
}

const ACCIONES = { onMarcarLeido: () => undefined, onMarcarNoLeido: () => undefined, onAlternarSilencio: () => undefined, onAlternarFavorita: () => undefined, onEliminar: () => undefined, onAbandonar: () => undefined }

function listar(noLeidos: number[]) {
  const conversaciones = noLeidos.map((n, i) => conversacion(String(i), n))
  return render(<ListaConversaciones conversaciones={conversaciones} activa={null} onSeleccionar={() => undefined} oculta={false} contadorNoLeidos={0} acciones={ACCIONES} participantes={[]} onCrearGrupo={() => String()} />)
}

function contadorDe(fila: Element) {
  return Array.from(fila.querySelectorAll('[aria-hidden="true"] *')).find((e) => e.children.length === 0 && /^\d+\+?$/.test(e.textContent ?? '')) ?? null
}

function contadoresDeLaLista(contenedor: HTMLElement) {
  return Array.from(contenedor.querySelectorAll('[data-fila-conversacion]')).map(contadorDe)
}

describe('Insignias de notificación en los tres puntos de Red Social', () => {
  describe('lista de conversaciones', () => {
    it('muestra el contador de uno y de varios dígitos con la insignia oficial en la zona derecha, fuera del avatar', () => {
      const { container } = listar([2, 12, 128])
      const contadores = contadoresDeLaLista(container)
      expect(contadores.map((c) => c?.textContent)).toEqual(['2', '12', '99+'])
      for (const contador of contadores) expect(contador?.closest('.MuiAvatar-root, .MuiBadge-root')).toBeNull()
    })

    it('desde 100 muestra 99+ y conserva el valor real para tecnologías de asistencia', () => {
      const { container } = listar([99, 128])
      const [normal, abreviado] = contadoresDeLaLista(container)
      expect(normal?.textContent).toBe('99')
      expect(normal?.closest('[role="img"]')).toBeNull()
      expect(abreviado?.textContent).toBe('99+')
      expect(abreviado?.closest('[role="img"]')).toHaveAttribute('aria-label', '128')
      expect(container.querySelectorAll('[data-fila-conversacion]')[1]).toHaveTextContent('128 mensajes sin leer')
    })

    it('no dibuja contador cuando la conversación no tiene mensajes sin leer', () => {
      const { container } = listar([0, 3])
      const contadores = contadoresDeLaLista(container)
      expect(contadores[0]).toBeNull()
      expect(contadores[1]?.textContent).toBe('3')
    })

    it('la fila no dibuja el contador dentro del avatar y deja la hora y el contador en la misma zona derecha', () => {
      const { container } = listar([4])
      const fila = container.querySelector('[data-fila-conversacion]') as HTMLElement
      expect(fila.querySelector('.MuiAvatar-root')?.closest('.MuiBadge-root')?.querySelector('.MuiBadge-badge:not(.MuiBadge-invisible)') ?? null).toBeNull()
      const zonaDerecha = (fila.querySelector('time') as HTMLElement).closest('button')?.lastElementChild as HTMLElement
      expect(zonaDerecha).toContainElement(contadorDe(fila) as HTMLElement)
    })
  })

  describe('menú lateral', () => {
    it('compone la insignia superpuesta oficial sobre el icono y no usa la de la librería', () => {
      const elementos = elementosDeLaBarra('mensajes', { mensajes: 5 })
      expect(elementos.every((e) => e.insignia === undefined)).toBe(true)
      const mensajes = render(<>{elementos.find((e) => e.id === 'mensajes')?.icono}</>)
      expect(mensajes.container.querySelector('.MuiBadge-badge')).toHaveTextContent('5')
      const avisos = render(<>{elementos.find((e) => e.id === 'avisos')?.icono}</>)
      expect(avisos.container.querySelector('.MuiBadge-badge')).toHaveTextContent('3')
      expect(elementos.find((e) => e.id === 'mensajes')?.etiqueta).toBe('Mensajes')
    })

    it('no dibuja contador cuando el conteo es cero o no existe', () => {
      const elementos = elementosDeLaBarra('inicio', { mensajes: 0 })
      const { container } = render(<>{elementos.find((e) => e.id === 'mensajes')?.icono}</>)
      expect(container.querySelector('.MuiBadge-badge')).toBeNull()
      expect(elementosDeLaBarra('inicio').find((e) => e.id === 'inicio')?.etiqueta).toBe('Inicio')
    })

    it('el menú no incorpora marcado propio de contador', async () => {
      const fuentes = await leerFuentesFrontend()
      const menu = fuentes.filter((f) => /navegacion\/(barra_lateral|elementos_barra_lateral)\.tsx$/.test(f.ruta.replace(/\\/g, '/')))
      expect(menu).toHaveLength(2)
      for (const fuente of menu) {
        expect(fuente.texto).not.toMatch(/MuiBadge|CodeplexInsignia|CodeplexEstadoBadge|bg-primario/)
      }
    })
  })
})
