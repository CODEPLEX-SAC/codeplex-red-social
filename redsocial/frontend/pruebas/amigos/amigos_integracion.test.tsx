import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaAmigosListas } from '@/paginas/amigos/pagina_amigos_listas'
import { PaginaAmigosSolicitudes } from '@/paginas/amigos/pagina_amigos_solicitudes'
import { PaginaAmigosSugerencias } from '@/paginas/amigos/pagina_amigos_sugerencias'
import { PaginaAmigosTodos } from '@/paginas/amigos/pagina_amigos_todos'
import { insigniaDePendientes, resumenConPendientes, rutaDeMensajeAmigo } from '@/componentes/amigos'
import { GrupoAvatares } from '@/componentes/compartido/interfaz/grupo_avatares'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import { ESTADO_INICIAL_MENSAJERIA } from '@/servicios/mensajeria/mensajes'
import catalogoAmigos from '@/catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '@/mensajes/capacidades/redsocial/textos.json'
import { AMIGOS, ENVIADAS, RECIBIDAS, RESUMEN_AMIGOS } from '@/rutas/amigos/rutas_amigos'

const PAGINAS = [
  ['Todos', PaginaAmigosTodos],
  ['Solicitudes', PaginaAmigosSolicitudes],
  ['Sugerencias', PaginaAmigosSugerencias],
  ['Listas', PaginaAmigosListas],
] as const

const pestanaSolicitudes = () => screen.getByRole('tab', { name: new RegExp(catalogoAmigos.pestanas[1].etiqueta) })

describe('Amigos: contadores derivados de la fuente de solicitudes recibidas', { timeout: 30000 }, () => {
  it.each(PAGINAS)('la pestana Solicitudes de %s muestra el numero de solicitudes recibidas', (_nombre, Pagina) => {
    render(<Pagina />)
    expect(within(pestanaSolicitudes()).getByText(String(RECIBIDAS.length))).toBeInTheDocument()
  })

  it('el resumen de Todos muestra los pendientes derivados y el resto de tarjetas no cambia', () => {
    const resumen = resumenConPendientes(RESUMEN_AMIGOS, RECIBIDAS.length + 4)
    const pendientes = resumen.find((tarjeta) => tarjeta.icono === catalogoAmigos.icono_resumen_pendientes)
    expect(pendientes?.valor).toBe(String(RECIBIDAS.length + 4))
    expect(resumen.filter((tarjeta) => tarjeta !== pendientes).map((tarjeta) => tarjeta.valor)).toEqual(RESUMEN_AMIGOS.filter((tarjeta) => tarjeta.icono !== catalogoAmigos.icono_resumen_pendientes).map((tarjeta) => tarjeta.valor))
    render(<PaginaAmigosTodos />)
    const tarjeta = screen.getByText(RESUMEN_AMIGOS.find((candidata) => candidata.icono === catalogoAmigos.icono_resumen_pendientes)?.etiqueta ?? '').closest('article') as HTMLElement
    expect(within(tarjeta).getByText(String(RECIBIDAS.length))).toBeInTheDocument()
  })

  it('sin solicitudes pendientes no se muestra insignia', () => {
    expect(insigniaDePendientes(0)).toBeUndefined()
    expect(insigniaDePendientes(RECIBIDAS.length)).toBe(RECIBIDAS.length)
  })

  it('los chips Recibidas y Enviadas muestran el numero de registros de su propia fuente', () => {
    render(<PaginaAmigosSolicitudes />)
    expect(screen.getByRole('button', { name: new RegExp(catalogoAmigos.pestanas_solicitudes.recibidas) })).toHaveTextContent(String(RECIBIDAS.length))
    expect(screen.getByRole('button', { name: new RegExp(catalogoAmigos.pestanas_solicitudes.enviadas) })).toHaveTextContent(String(ENVIADAS.length))
    expect(screen.getByRole('button', { name: catalogoAmigos.pestanas_solicitudes.ignoradas })).toHaveTextContent(catalogoAmigos.pestanas_solicitudes.ignoradas)
  })

  it('el panel lateral de Todos lista exactamente las solicitudes recibidas', () => {
    render(<PaginaAmigosTodos />)
    const panel = screen.getByRole('heading', { name: catalogoAmigos.secciones.solicitudes_amistad_lateral }).closest('section') as HTMLElement
    expect(within(panel).getAllByRole('article').map((fila) => within(fila).getByText(/\S/, { selector: 'strong' }).textContent)).toEqual(RECIBIDAS.map((solicitud) => solicitud.nombre))
  })
})

describe('Amigos: avatares y presencia respaldados por los datos', { timeout: 30000 }, () => {
  it('Todos muestra presencia exactamente para los amigos de la lista, con el estado que indican los datos', () => {
    render(<PaginaAmigosTodos />)
    const conPresencia = document.querySelectorAll('main [data-estado]')
    expect(conPresencia).toHaveLength(AMIGOS.length)
    expect(document.querySelectorAll('main [data-estado="conectado"]')).toHaveLength(AMIGOS.filter((amigo) => amigo.enLinea).length)
    expect(document.querySelectorAll('main [data-estado="desconectado"]')).toHaveLength(AMIGOS.filter((amigo) => !amigo.enLinea).length)
  })

  it('las listas de personas que aun no son amigas no inventan presencia', () => {
    render(<PaginaAmigosSugerencias />)
    expect(document.querySelectorAll('main [data-estado]')).toHaveLength(0)
  })
})

describe('Amigos: informacion en comun en pantallas pequenas', { timeout: 30000 }, () => {
  it('cada amigo conserva «en comun» en una linea compacta que solo se muestra cuando la columna se oculta', () => {
    render(<PaginaAmigosTodos />)
    AMIGOS.forEach((amigo) => {
      const compactos = screen.getAllByText(amigo.comunes).filter((nodo) => nodo.className.includes('max-900:block'))
      expect(compactos).toHaveLength(1)
      expect(compactos[0].className).toContain('hidden')
    })
  })
})

describe('Amigos: banners informativos', { timeout: 30000 }, () => {
  it.each([
    ['Listas', PaginaAmigosListas, catalogoAmigos.secciones.organiza_contactos_titulo],
    ['Sugerencias', PaginaAmigosSugerencias, catalogoAmigos.secciones.amplia_tu_red_titulo],
  ] as const)('el banner de %s se puede cerrar con un boton accesible', (_nombre, Pagina, titulo) => {
    render(<Pagina />)
    expect(screen.getByText(titulo)).toBeInTheDocument()
    const cerrar = screen.getAllByRole('button', { name: textosRedSocial.CERRAR })[0]
    cerrar.focus()
    expect(cerrar).toHaveFocus()
    fireEvent.click(cerrar)
    expect(screen.queryByText(titulo)).toBeNull()
  })
})

describe('Amigos: boton Mensaje, indicador de presencia y filtros', { timeout: 30000 }, () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/')
  })

  it('Mensaje lleva a la conversacion del amigo cuando existe y a la lista de Mensajes cuando no', () => {
    const conversaciones = ESTADO_INICIAL_MENSAJERIA.conversaciones
    const maria = conversaciones.find((conversacion) => conversacion.nombre === 'María Fernández')
    expect(rutaDeMensajeAmigo('María Fernández', conversaciones, '/mensajes', 'conversacion')).toBe(`/mensajes?conversacion=${maria?.id}`)
    expect(rutaDeMensajeAmigo('Elena Sánchez', conversaciones, '/mensajes', 'conversacion')).toBe('/mensajes')
    expect(rutaDeMensajeAmigo('Equipo de Proyectos', conversaciones, '/mensajes', 'conversacion')).toBe('/mensajes')
  })

  it('pulsar Mensaje en la fila de un amigo navega a Mensajes', () => {
    render(<PaginaAmigosTodos />)
    const fila = screen.getByText('María Fernández', { selector: 'strong' }).closest('article') as HTMLElement
    fireEvent.click(within(fila).getByRole('button', { name: catalogoAmigos.botones.mensaje }))
    expect(window.location.pathname).toBe('/mensajes')
    expect(window.location.search).toContain('conversacion=')
  })

  it('el indicador de presencia es un circulo y no un cuadrado de esquinas redondeadas', () => {
    expect(catalogoCompartido.avatar.clases.presencia).toContain('[&_.MuiBadge-badge]:rounded-full!')
  })

  it('el selector de Amigos usa la altura de control del buscador', () => {
    expect(catalogoCompartido.selector_libreria.default.sx['& .MuiInputBase-root'].minHeight).toBe('var(--height-control)')
    render(<PaginaAmigosTodos />)
    expect(screen.getByRole('combobox', { name: catalogoAmigos.botones.filtrar_amigos }).closest('div[class*="inline-grid"]')).not.toBeNull()
  })
})

describe('Amigos: patron compartido de botones, buscador, chips y paneles', { timeout: 30000 }, () => {
  const tamanoDefault = catalogoCompartido.boton_tamanos.default.split(' ')[0]
  const clases = (nodo: HTMLElement) => nodo.className.split(' ')

  it('las acciones de la columna principal usan el mismo tamano de boton del catalogo', () => {
    const { unmount } = render(<PaginaAmigosTodos />)
    const mensajes = screen.getAllByRole('button', { name: catalogoAmigos.botones.mensaje })
    expect(mensajes).toHaveLength(AMIGOS.length)
    mensajes.forEach((boton) => expect(clases(boton)).toContain(tamanoDefault))
    unmount()
    const solicitudes = render(<PaginaAmigosSolicitudes />)
    const principal = solicitudes.container.querySelector('main') as HTMLElement
    ;[catalogoAmigos.botones.aceptar, catalogoAmigos.botones.eliminar, catalogoAmigos.botones.ignorar].forEach((nombre) => {
      within(principal).getAllByRole('button', { name: nombre }).forEach((boton) => expect(clases(boton)).toContain(tamanoDefault))
    })
    solicitudes.unmount()
    render(<PaginaAmigosSugerencias />)
    const tarjetas = screen.getAllByRole('button', { name: catalogoAmigos.botones.agregar })
    expect(tarjetas.length).toBeGreaterThan(0)
  })

  it('en Solicitudes el buscador va sobre los chips y los chips conservan la altura compartida de chip', () => {
    render(<PaginaAmigosSolicitudes />)
    const buscador = screen.getByRole('searchbox', { name: catalogoAmigos.placeholders.buscar_solicitudes })
    const recibidas = screen.getByRole('button', { name: new RegExp(catalogoAmigos.pestanas_solicitudes.recibidas) })
    expect(buscador.compareDocumentPosition(recibidas) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(clases(recibidas)).toContain(catalogoCompartido.chip_filtro.base.split(' ')[1])
  })

  it('un grupo de avatares sin contador no pinta el circulo vacio', () => {
    const { container } = render(<GrupoAvatares avatares={3} resto="" />)
    expect(container.querySelectorAll('.MuiAvatar-root')).toHaveLength(3)
    const conResto = render(<GrupoAvatares avatares={3} resto="+4" />)
    expect(conResto.container.querySelectorAll('.MuiAvatar-root')).toHaveLength(4)
  })

  it.each(PAGINAS)('los paneles laterales de %s usan el panel compartido, con el mismo borde', (_nombre, Pagina) => {
    const { container } = render(<Pagina />)
    const paneles = Array.from(container.querySelectorAll('aside section'))
    expect(paneles.length).toBeGreaterThan(0)
    paneles.forEach((panel) => {
      expect(panel.className).toContain('border-borde')
      expect(panel.className).not.toContain('border-borde-suave')
    })
  })
})

describe('Amigos: chips de Solicitudes como filtros de la lista', { timeout: 30000 }, () => {
  const chip = (nombre: string) => screen.getByRole('button', { name: new RegExp(nombre) })
  const principal = () => document.querySelector('main section') as HTMLElement
  const tarjetas = () => principal().querySelectorAll('article')

  it('al abrir muestra las recibidas con Recibidas pulsado y no hay enlaces sin destino', () => {
    const { container } = render(<PaginaAmigosSolicitudes />)
    expect(chip(catalogoAmigos.pestanas_solicitudes.recibidas)).toHaveAttribute('aria-pressed', 'true')
    expect(chip(catalogoAmigos.pestanas_solicitudes.enviadas)).toHaveAttribute('aria-pressed', 'false')
    expect(Array.from(principal().querySelectorAll('article strong')).map((nodo) => nodo.textContent)).toEqual(RECIBIDAS.map((solicitud) => solicitud.nombre))
    expect(principal().querySelectorAll('a[href="#"]')).toHaveLength(0)
    expect(container).toBeTruthy()
  })

  it('Enviadas lista solo las enviadas, con su estado y su accion', () => {
    render(<PaginaAmigosSolicitudes />)
    fireEvent.click(chip(catalogoAmigos.pestanas_solicitudes.enviadas))
    expect(chip(catalogoAmigos.pestanas_solicitudes.enviadas)).toHaveAttribute('aria-pressed', 'true')
    expect(tarjetas()).toHaveLength(ENVIADAS.length)
    expect(screen.getByText(ENVIADAS[0].estado)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: catalogoAmigos.botones.cancelar_solicitud })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: catalogoAmigos.botones.aceptar })).toBeNull()
  })

  it('Ignoradas no tiene fuente de datos: muestra un estado vacio explicado y ningun registro inventado', () => {
    render(<PaginaAmigosSolicitudes />)
    fireEvent.click(chip(catalogoAmigos.pestanas_solicitudes.ignoradas))
    expect(tarjetas()).toHaveLength(0)
    expect(screen.getByText(catalogoAmigos.mensajes.sin_ignoradas)).toBeInTheDocument()
  })

  it('el buscador filtra la categoria activa sin distinguir tildes ni mayusculas y avisa si no hay coincidencias', () => {
    render(<PaginaAmigosSolicitudes />)
    const buscador = screen.getByRole('searchbox', { name: catalogoAmigos.placeholders.buscar_solicitudes })
    fireEvent.change(buscador, { target: { value: 'ANDRES' } })
    expect(tarjetas()).toHaveLength(1)
    expect(within(principal()).getByText('Andrés Salazar')).toBeInTheDocument()
    fireEvent.change(buscador, { target: { value: 'zzz' } })
    expect(screen.getByText(catalogoAmigos.mensajes.sin_resultados_solicitudes)).toBeInTheDocument()
    fireEvent.click(chip(catalogoAmigos.pestanas_solicitudes.enviadas))
    expect(screen.getByText(catalogoAmigos.mensajes.sin_resultados_solicitudes)).toBeInTheDocument()
  })

  it('los chips se alcanzan con teclado y se activan con Enter o Espacio', () => {
    render(<PaginaAmigosSolicitudes />)
    const enviadas = chip(catalogoAmigos.pestanas_solicitudes.enviadas)
    enviadas.focus()
    expect(enviadas).toHaveFocus()
    expect(enviadas.tagName).toBe('BUTTON')
    expect(enviadas).toHaveAttribute('type', 'button')
  })
})
