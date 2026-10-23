import { render, screen, within } from '@testing-library/react'
import { AvatarUsuario } from '@/componentes/compartido/interfaz/avatar_usuario'
import { GrupoAvatares } from '@/componentes/compartido/interfaz/grupo_avatares'
import { ContactosEnLineaPanel } from '@/componentes/compartido/bloques/contactos_en_linea_panel'
import { ContactosPanel } from '@/componentes/compartido/bloques/contactos_panel'
import { PanelConversacion } from '@/componentes/mensajeria'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import { AvatarUsuarioEmpresa } from '@/componentes/empresas/bloques/avatar_usuario_empresa'
import { BloqueMensaje } from '@/componentes/amigos/bloques/bloque_mensaje'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import catalogoMensajeria from '@/catalogos/capacidades/redsocial/mensajeria.json'
import { CONVERSACION_ACTIVA } from '../../rutas/mensajeria/rutas_mensajeria'
import { AMIGOS as AMIGOS_TODOS } from '../../servicios/amigos/todos'

const avatar = catalogoCompartido.avatar
const TAMANOS = Object.keys(avatar.tamanos) as (keyof typeof avatar.tamanos)[]
const OFICIALES = TAMANOS.filter((tamano) => tamano !== 'historia')

function enlaces(conversacion = CONVERSACION_ACTIVA) {
  return render(<PanelConversacion conversacion={conversacion} onVolver={() => undefined} oculta={false} />)
}

describe('Avatar compartido: tamaños y contenido', () => {
  it('la configuración reproduce los tamaños de la versión oficial 24, 32, 40, 48, 64 y 80 px', () => {
    expect(OFICIALES.map((t) => avatar.tamanos[t].px)).toEqual([24, 32, 40, 48, 64, 80])
    expect(avatar.tamanos.historia.px).toBe(104)
  })

  it.each(TAMANOS)('el tamaño %s aplica el ancho y el alto del catálogo', (tamano) => {
    render(<AvatarUsuario tamano={tamano} iniciales="AB" etiqueta={`avatar ${tamano}`} />)
    const px = avatar.tamanos[tamano].px + 'px'
    expect(screen.getByRole('img', { name: `avatar ${tamano}` })).toHaveStyle({ width: px, height: px })
  })

  it('sin tamaño usa el predeterminado del catálogo', () => {
    render(<AvatarUsuario iniciales="AB" etiqueta="predeterminado" />)
    const px = avatar.tamanos[avatar.predeterminado.tamano as keyof typeof avatar.tamanos].px + 'px'
    expect(screen.getByRole('img', { name: 'predeterminado' })).toHaveStyle({ width: px })
  })

  it('con fotografía el nombre accesible es el texto alternativo y sin etiqueta es decorativo', () => {
    const { container } = render(
      <>
        <AvatarUsuario imagen="/foto.jpg" etiqueta="Foto de María" />
        <AvatarUsuario imagen="/otra.jpg" />
      </>,
    )
    expect(screen.getByRole('img', { name: 'Foto de María' })).toHaveAttribute('src', '/foto.jpg')
    expect(container.querySelectorAll('img[alt=""]')).toHaveLength(1)
  })

  it('con iniciales muestra el texto y expone la etiqueta como imagen accesible', () => {
    render(<AvatarUsuario iniciales="LR" etiqueta="Foto de Luis Rodríguez" />)
    expect(screen.getByRole('img', { name: 'Foto de Luis Rodríguez' })).toHaveTextContent('LR')
  })

  it('el avatar de una persona de Empresas conserva sus iniciales y su descripción', () => {
    render(<AvatarUsuarioEmpresa usuario={{ nombre: 'Carlos Mendoza Ríos', iniciales: 'CM' } as never} />)
    expect(screen.getByRole('img', { name: /Carlos Mendoza Ríos/ })).toHaveTextContent('CM')
  })
})

describe('Estados de presencia', () => {
  it.each(Object.keys(avatar.estados) as (keyof typeof avatar.estados)[])('el estado %s dibuja el punto oficial con el tamaño y el color del catálogo', (estado) => {
    const { container } = render(<AvatarUsuario imagen="/f.jpg" estado={estado} tamano="lg" />)
    const presencia = container.querySelector(`[data-estado="${estado}"]`) as HTMLElement
    expect(presencia).not.toBeNull()
    expect(presencia.querySelector('.MuiBadge-badge')).not.toBeNull()
    for (const clase of [avatar.tamanos.lg.punto, avatar.estados[estado].clase, avatar.clases.presencia].join(' ').split(' ')) expect(presencia.className).toContain(clase)
  })

  it('sin estado no hay indicador y el punto no cambia el tamaño del avatar', () => {
    const { container, rerender } = render(<AvatarUsuario imagen="/f.jpg" etiqueta="a" tamano="md" />)
    expect(container.querySelector('[data-estado]')).toBeNull()
    const sinPunto = container.querySelector('img')?.parentElement as HTMLElement
    rerender(<AvatarUsuario imagen="/f.jpg" etiqueta="a" tamano="md" estado="conectado" />)
    const conPunto = container.querySelector('img')?.parentElement as HTMLElement
    expect(conPunto).toHaveStyle({ width: '40px', height: '40px' })
    expect(sinPunto.className).toContain('MuiAvatar-root')
    expect(conPunto.className).toContain('MuiAvatar-root')
  })

  it('la etiqueta del punto es opcional: sin ella queda oculto a lectores y con ella se anuncia', () => {
    const { container, rerender } = render(<AvatarUsuario imagen="/f.jpg" estado="conectado" />)
    expect(container.querySelector(`.${avatar.clases.presencia_texto}`)).toBeNull()
    rerender(<AvatarUsuario imagen="/f.jpg" estado="conectado" etiquetaEstado={avatar.estados.conectado.etiqueta} />)
    expect(screen.getByText(avatar.estados.conectado.etiqueta).className).toBe(avatar.clases.presencia_texto)
  })

  it('Mensajes: la conversación con María Fernández usa el indicador compartido y conserva el texto «En línea»', () => {
    expect(CONVERSACION_ACTIVA.nombre).toBe('María Fernández')
    const { container } = enlaces()
    const cabecera = container.querySelector('header') as HTMLElement
    expect(cabecera.querySelector('[data-estado="conectado"]')).not.toBeNull()
    expect(within(cabecera).getByText(catalogoMensajeria.conversacion.en_linea)).toBeInTheDocument()
    expect(within(cabecera).getByText('María Fernández')).toBeInTheDocument()
    expect(cabecera.querySelectorAll('[data-estado]')).toHaveLength(1)
  })

  it('Mensajes: una conversación sin presencia no muestra ni indicador ni texto', () => {
    const { container } = enlaces({ ...CONVERSACION_ACTIVA, enLinea: false })
    const cabecera = container.querySelector('header') as HTMLElement
    expect(cabecera.querySelector('[data-estado]')).toBeNull()
    expect(within(cabecera).queryByText(catalogoMensajeria.conversacion.en_linea)).toBeNull()
  })

  it('Mensajes: la página abre con María Fernández en línea', () => {
    const { container } = render(<PaginaMensajesTodos />)
    const cabecera = container.querySelector('[data-zona="panel-conversacion"] header') as HTMLElement
    expect(cabecera.querySelector('[data-estado="conectado"]')).not.toBeNull()
    expect(within(cabecera).getByText(catalogoMensajeria.conversacion.en_linea)).toBeInTheDocument()
  })

  it('Amigos: cada amigo muestra conectado o desconectado según su dato', () => {
    const { container } = render(<BloqueMensaje AMIGOS={AMIGOS_TODOS} />)
    const conectados = AMIGOS_TODOS.filter((a) => a.enLinea).length
    expect(container.querySelectorAll('[data-estado="conectado"]')).toHaveLength(conectados)
    expect(container.querySelectorAll('[data-estado="desconectado"]')).toHaveLength(AMIGOS_TODOS.length - conectados)
  })

  it('Contactos en línea: todos llevan el indicador en el avatar; Contactos sin presencia no lo llevan', () => {
    const contactos = [{ nombre: 'Ana', colaborador: true }, { nombre: 'Luis' }] as never
    const { container, unmount } = render(<ContactosEnLineaPanel contactos={contactos} />)
    expect(container.querySelectorAll('[data-estado="conectado"]')).toHaveLength(2)
    unmount()
    const otros = render(<ContactosPanel contactos={[{ nombre: 'Ana', subtitulo: 'x' }] as never} />)
    expect(otros.container.querySelector('[data-estado]')).toBeNull()
  })
})

describe('Grupo de avatares', () => {
  const tarjetas = (c: HTMLElement) => Array.from(c.querySelectorAll('.MuiAvatar-root')) as HTMLElement[]

  it('usa el grupo oficial, dibuja la cantidad de avatares y el resto con el texto recibido', () => {
    const { container } = render(<GrupoAvatares avatares={4} resto="+8 más" />)
    expect(container.querySelector('.MuiAvatarGroup-root')).not.toBeNull()
    expect(tarjetas(container)).toHaveLength(5)
    expect(screen.getByText('+8 más')).toBeInTheDocument()
  })

  it('sin resto no dibuja el contador y con cero avatares solo queda el contador', () => {
    const { container, rerender } = render(<GrupoAvatares avatares={3} />)
    expect(tarjetas(container)).toHaveLength(3)
    expect(container.querySelector(`.${avatar.clases.resto_texto}`)).toBeNull()
    rerender(<GrupoAvatares avatares={0} resto="+5" />)
    expect(tarjetas(container)).toHaveLength(1)
    expect(screen.getByText('+5')).toBeInTheDocument()
  })

  it.each(TAMANOS)('el tamaño %s aplica su solape oficial al grupo', (tamano) => {
    const { container } = render(<GrupoAvatares avatares={3} tamano={tamano} resto="+2" />)
    const grupo = container.querySelector('.MuiAvatarGroup-root') as HTMLElement
    expect(grupo.style.getPropertyValue('--AvatarGroup-spacing')).toBe(`-${avatar.tamanos[tamano].solape}px`)
  })

  it.each(Object.entries(avatar.tonos))('el tono %s aplica sus colores al contador', (tono, estilo) => {
    render(<GrupoAvatares avatares={2} resto="+1" tono={tono as keyof typeof avatar.tonos} />)
    const chip = screen.getByText('+1').closest('.MuiAvatar-root') as HTMLElement
    expect(chip).toHaveStyle({ backgroundColor: estilo.bgcolor, color: estilo.color })
  })

  it('los tamaños xs y sm usan 24 y 32 px y el contador iguala la altura del avatar', () => {
    const { container, rerender } = render(<GrupoAvatares avatares={1} tamano="xs" resto="+1" />)
    expect(tarjetas(container).map((a) => a.style.height || getComputedStyle(a).height)).toEqual(['24px', '24px'])
    rerender(<GrupoAvatares avatares={1} tamano="sm" resto="+1" />)
    expect(tarjetas(container).map((a) => getComputedStyle(a).height)).toEqual(['32px', '32px'])
  })
})
