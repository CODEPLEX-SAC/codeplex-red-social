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
import { AMIGOS, ENVIADAS, MIS_LISTAS, RECIBIDAS, RESUMEN_AMIGOS, SUGERENCIAS } from '@/rutas/amigos/rutas_amigos'

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
    expect(within(tarjeta).getByText(RESUMEN_AMIGOS.find((candidata) => candidata.icono === catalogoAmigos.icono_resumen_pendientes)?.valor ?? '')).toBeInTheDocument()
  })

  it('sin solicitudes pendientes no se muestra insignia', () => {
    expect(insigniaDePendientes(0)).toBeUndefined()
    expect(insigniaDePendientes(RECIBIDAS.length)).toBe(RECIBIDAS.length)
  })

  it('los chips Recibidas y Enviadas muestran el numero de registros de su propia fuente', () => {
    render(<PaginaAmigosSolicitudes />)
    expect(screen.getByRole('button', { name: new RegExp(catalogoAmigos.pestanas_solicitudes.recibidas) })).toHaveTextContent(String(RECIBIDAS.length))
    expect(screen.getByRole('button', { name: new RegExp(catalogoAmigos.pestanas_solicitudes.enviadas) })).toHaveTextContent(String(ENVIADAS.length))
    expect(screen.queryByRole('button', { name: /Ignoradas/ })).toBeNull()
  })

  it('el panel lateral de Todos lista las primeras solicitudes recibidas', () => {
    render(<PaginaAmigosTodos />)
    const panel = screen.getByRole('heading', { name: catalogoAmigos.secciones.solicitudes_amistad_lateral }).closest('section') as HTMLElement
    expect(within(panel).getAllByRole('article').map((fila) => within(fila).getByText(/\S/, { selector: 'strong a' }).textContent)).toEqual(RECIBIDAS.slice(0, catalogoAmigos.limite_solicitudes_visibles).map((solicitud) => solicitud.nombre))
  })
})

const expandirAmigos = () => {
  const boton = screen.queryByRole('button', { name: catalogoAmigos.botones.ver_mas_amigos })
  if (boton) fireEvent.click(boton)
}

describe('Amigos: avatares y presencia respaldados por los datos', { timeout: 30000 }, () => {
  it('Todos muestra presencia exactamente para los amigos de la lista, con el estado que indican los datos', () => {
    render(<PaginaAmigosTodos />)
    expandirAmigos()
    const conPresencia = document.querySelectorAll('main [data-estado]')
    expect(conPresencia).toHaveLength(AMIGOS.length)
    expect(document.querySelectorAll('main [data-estado="conectado"]')).toHaveLength(AMIGOS.filter((amigo) => amigo.enLinea).length)
    expect(document.querySelectorAll('main [data-estado="desconectado"]')).toHaveLength(AMIGOS.filter((amigo) => !amigo.enLinea).length)
  })

  it('Sugerencias muestra presencia solo para las personas que los datos marcan en linea', () => {
    render(<PaginaAmigosSugerencias />)
    expect(document.querySelectorAll('main [data-estado="desconectado"]')).toHaveLength(0)
    expect(document.querySelectorAll('main [data-estado="conectado"]').length).toBeGreaterThan(0)
  })
})

describe('Amigos: informacion en comun en pantallas pequenas', { timeout: 30000 }, () => {
  it('cada amigo conserva «en comun» en una linea compacta que solo se muestra cuando la columna se oculta', () => {
    render(<PaginaAmigosTodos />)
    expandirAmigos()
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
    const fila = screen.getByText('María Fernández', { selector: 'strong a' }).closest('article') as HTMLElement
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
    expandirAmigos()
    const mensajes = screen.getAllByRole('button', { name: catalogoAmigos.botones.mensaje })
    expect(mensajes).toHaveLength(AMIGOS.length)
    mensajes.forEach((boton) => expect(clases(boton)).toContain(tamanoDefault))
    unmount()
    const solicitudes = render(<PaginaAmigosSolicitudes />)
    const principal = solicitudes.container.querySelector('main') as HTMLElement
    ;[catalogoAmigos.botones.aceptar, catalogoAmigos.botones.eliminar].forEach((nombre) => {
      within(principal).getAllByRole('button', { name: nombre }).forEach((boton) => expect(clases(boton)).toContain(tamanoDefault))
    })
    solicitudes.unmount()
    render(<PaginaAmigosSugerencias />)
    const tarjetas = screen.getAllByRole('button', { name: catalogoAmigos.botones.anadir_amigo })
    expect(tarjetas.length).toBeGreaterThan(0)
  })

  it('Solicitudes no tiene buscador y los chips conservan la altura compartida de chip', () => {
    render(<PaginaAmigosSolicitudes />)
    expect(screen.queryByPlaceholderText('Buscar por nombre...')).toBeNull()
    const recibidas = screen.getByRole('button', { name: new RegExp(catalogoAmigos.pestanas_solicitudes.recibidas) })
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
    expect(Array.from(principal().querySelectorAll('article strong')).map((nodo) => nodo.textContent)).toEqual(RECIBIDAS.slice(0, catalogoAmigos.limite_solicitudes_visibles).map((solicitud) => solicitud.nombre))
    expect(principal().querySelectorAll('a[href="#"]')).toHaveLength(0)
    expect(container).toBeTruthy()
  })

  it('Enviadas lista solo las enviadas, solo con cancelar solicitud y sin pie', () => {
    render(<PaginaAmigosSolicitudes />)
    fireEvent.click(chip(catalogoAmigos.pestanas_solicitudes.enviadas))
    expect(chip(catalogoAmigos.pestanas_solicitudes.enviadas)).toHaveAttribute('aria-pressed', 'true')
    expect(tarjetas()).toHaveLength(ENVIADAS.length)
    expect(screen.queryByText(ENVIADAS[0].estado)).toBeNull()
    expect(screen.queryByRole('button', { name: catalogoAmigos.botones.ver_mas_solicitudes_recibidas })).toBeNull()
    expect(screen.getAllByRole('button', { name: catalogoAmigos.botones.cancelar_solicitud })).toHaveLength(ENVIADAS.length)
    expect(screen.queryByRole('button', { name: catalogoAmigos.botones.aceptar })).toBeNull()
  })

  it('Recibidas tiene 3 y Enviadas 2; sin ver mas porque no hay mas que mostrar', () => {
    render(<PaginaAmigosSolicitudes />)
    expect(RECIBIDAS).toHaveLength(3)
    expect(ENVIADAS).toHaveLength(2)
    expect(tarjetas()).toHaveLength(3)
    expect(screen.queryByRole('button', { name: catalogoAmigos.botones.ver_mas_solicitudes_recibidas })).toBeNull()
    expect(screen.queryByRole('button', { name: /Ignorar/ })).toBeNull()
  })

  it('en Sugerencias anadir amigo deja solo cancelar solicitud y cancelar restaura Agregar amigo y Suprimir', () => {
    render(<PaginaAmigosSugerencias />)
    const tarjeta = screen.getAllByRole('article')[0]
    fireEvent.click(within(tarjeta).getByRole('button', { name: catalogoAmigos.botones.anadir_amigo }))
    expect(within(tarjeta).getByRole('button', { name: catalogoAmigos.botones.cancelar_solicitud })).toBeInTheDocument()
    expect(within(tarjeta).queryByRole('button', { name: catalogoAmigos.botones.anadir_amigo })).toBeNull()
    expect(within(tarjeta).queryByRole('button', { name: catalogoAmigos.botones.suprimir })).toBeNull()
    fireEvent.click(within(tarjeta).getByRole('button', { name: catalogoAmigos.botones.cancelar_solicitud }))
    expect(within(tarjeta).getByRole('button', { name: catalogoAmigos.botones.anadir_amigo })).toBeInTheDocument()
    expect(within(tarjeta).queryByText(/Ver perfil/)).toBeNull()
    expect(within(tarjeta).getByRole('button', { name: catalogoAmigos.botones.suprimir })).toBeInTheDocument()
  })

  it('en Sugerencias suprimir quita la tarjeta', () => {
    render(<PaginaAmigosSugerencias />)
    const antes = screen.getAllByRole('article').length
    fireEvent.click(within(screen.getAllByRole('article')[0]).getByRole('button', { name: catalogoAmigos.botones.suprimir }))
    expect(screen.getAllByRole('article')).toHaveLength(antes - 1)
  })

  it('el encabezado de Amigos ya no tiene el boton de tres puntos', () => {
    render(<PaginaAmigosSolicitudes />)
    expect(screen.queryByRole('button', { name: textosRedSocial.MAS_OPCIONES })).toBeNull()
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

describe('Amigos: solicitudes aceptadas, sugerencias ampliables y enlaces al perfil', { timeout: 30000 }, () => {
  it('aceptar una solicitud muestra Solicitud aceptada y ya no ofrece cancelar', () => {
    render(<PaginaAmigosSolicitudes />)
    const tarjeta = screen.getAllByRole('article')[0]
    fireEvent.click(within(tarjeta).getByRole('button', { name: catalogoAmigos.botones.aceptar }))
    expect(within(tarjeta).getByText(catalogoAmigos.mensajes.solicitud_aceptada_corta)).toBeInTheDocument()
    expect(within(tarjeta).queryAllByRole('button')).toHaveLength(0)
  })

  it('el avatar y el nombre de cada persona llevan a su perfil', () => {
    render(<PaginaAmigosSolicitudes />)
    const enlaces = within(screen.getAllByRole('article')[0]).getAllByRole('link')
    expect(enlaces).toHaveLength(2)
    enlaces.forEach((enlace) => expect(enlace.getAttribute('href')).toContain('valeria-quispe'))
  })

  it('Sugerencias tiene 15 personas con 8 visibles: ver mas y ver menos las despliegan y recogen', () => {
    render(<PaginaAmigosSugerencias />)
    expect(SUGERENCIAS).toHaveLength(15)
    const visibles = () => (document.querySelector('main section') as HTMLElement).querySelectorAll('article').length
    expect(visibles()).toBe(catalogoAmigos.limite_sugerencias_visibles)
    fireEvent.click(screen.getByRole('button', { name: catalogoAmigos.botones.ver_mas_sugerencias }))
    expect(visibles()).toBe(SUGERENCIAS.length)
    fireEvent.click(screen.getByRole('button', { name: catalogoAmigos.botones.ver_menos_sugerencias }))
    expect(visibles()).toBe(catalogoAmigos.limite_sugerencias_visibles)
  })

  it('Sugerencias ya no tiene Actualizar sugerencias ni Agregar amigos y el boton de agregar no lleva icono', () => {
    render(<PaginaAmigosSugerencias />)
    expect(screen.queryByRole('button', { name: /Actualizar sugerencias/ })).toBeNull()
    expect(screen.queryByRole('button', { name: /^Agregar amigos$/ })).toBeNull()
    expect(screen.getAllByRole('button', { name: catalogoAmigos.botones.anadir_amigo })[0].querySelector('svg')).toBeNull()
  })
})

describe('Amigos: totales y ver mas amigos', { timeout: 30000 }, () => {
  it('Pedro Lozano tiene 25 amigos, 24 en comun, 15 pendientes y 2 bloqueados', () => {
    expect(AMIGOS).toHaveLength(25)
    expect(RESUMEN_AMIGOS.map((tarjeta) => tarjeta.valor)).toEqual(['25', '24', '15', '2'])
  })

  it('ver mas amigos muestra los 25 y ver menos vuelve a recoger la lista', () => {
    render(<PaginaAmigosTodos />)
    const filas = () => screen.getAllByRole('button', { name: catalogoAmigos.botones.mensaje }).length
    expect(filas()).toBe(catalogoAmigos.limite_amigos_visibles)
    fireEvent.click(screen.getByRole('button', { name: catalogoAmigos.botones.ver_mas_amigos }))
    expect(filas()).toBe(25)
    fireEvent.click(screen.getByRole('button', { name: catalogoAmigos.botones.ver_menos_amigos }))
    expect(filas()).toBe(catalogoAmigos.limite_amigos_visibles)
    expect(screen.queryByRole('button', { name: textosRedSocial.MAS_OPCIONES })).toBeNull()
  })
})

describe('Amigos: listas', { timeout: 30000 }, () => {
  it('no hay tarjeta punteada ni iconos en las listas y cada lista ofrece editar y eliminar', () => {
    render(<PaginaAmigosListas />)
    expect(screen.queryByText('Crear nueva lista')).toBeNull()
    const tarjeta = screen.getAllByRole('article')[0]
    expect(tarjeta.querySelector('svg')).toBeNull()
    fireEvent.click(within(tarjeta).getByRole('button', { name: new RegExp(catalogoAmigos.listas.mas_opciones.replace(':nombre', '')) }))
    expect(screen.getByRole('menuitem', { name: catalogoAmigos.botones.editar_lista })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: catalogoAmigos.botones.eliminar_lista })).toBeInTheDocument()
  })

  it('crear lista: confirmar esta deshabilitado sin nombre y la lista nueva aparece', () => {
    render(<PaginaAmigosListas />)
    const antes = MIS_LISTAS.length
    fireEvent.click(screen.getAllByRole('button', { name: catalogoAmigos.botones.crear_listas })[0])
    const dialogo = screen.getByRole('dialog', { name: catalogoAmigos.listas.crear.titulo })
    const confirmar = within(dialogo).getByRole('button', { name: catalogoAmigos.listas.crear.confirmar })
    expect(confirmar).toBeDisabled()
    fireEvent.change(within(dialogo).getByLabelText(catalogoAmigos.listas.crear.marcador), { target: { value: 'Vecinos' } })
    expect(confirmar).not.toBeDisabled()
    fireEvent.click(confirmar)
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByText('Vecinos')).toBeInTheDocument()
    expect(screen.getAllByRole('article').filter((nodo) => nodo.querySelector('strong')).length).toBeGreaterThanOrEqual(antes + 1)
  })

  it('al abrir una lista se puede anadir y suprimir amigos y guardar', () => {
    render(<PaginaAmigosListas />)
    fireEvent.click(screen.getByRole('button', { name: catalogoAmigos.listas.abrir.replace(':nombre', 'Familia') }))
    const dialogo = screen.getByRole('dialog', { name: catalogoAmigos.listas.miembros.titulo })
    const marcar = (nombre: string) => within(dialogo).getByRole('checkbox', { name: catalogoAmigos.listas.miembros.marcar.replace(':nombre', nombre) })
    const ajeno = AMIGOS[0].nombre
    expect(marcar(ajeno)).not.toBeChecked()
    expect(within(dialogo).queryByText(catalogoAmigos.listas.miembros.ayuda)).toBeInTheDocument()
    fireEvent.click(marcar(ajeno))
    expect(marcar(ajeno)).toBeChecked()
    fireEvent.click(within(dialogo).getByRole('button', { name: catalogoAmigos.listas.miembros.guardar }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByText('7 amigos')).toBeInTheDocument()
  })

  it('eliminar lista pide confirmacion y la quita', () => {
    render(<PaginaAmigosListas />)
    const nombre = MIS_LISTAS[0].nombre
    fireEvent.click(screen.getByRole('button', { name: catalogoAmigos.listas.mas_opciones.replace(':nombre', nombre) }))
    fireEvent.click(screen.getByRole('menuitem', { name: catalogoAmigos.botones.eliminar_lista }))
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: catalogoAmigos.listas.eliminar.confirmar }))
    expect(screen.queryByRole('button', { name: catalogoAmigos.listas.abrir.replace(':nombre', nombre) })).toBeNull()
  })
})
