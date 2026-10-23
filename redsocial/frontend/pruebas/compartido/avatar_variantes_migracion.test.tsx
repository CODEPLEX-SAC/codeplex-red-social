import { render, screen } from '@testing-library/react'
import { AvatarUsuario } from '@/componentes/compartido/interfaz/avatar_usuario'
import { Insignia } from '@/componentes/compartido/interfaz/insignia'
import { IndicadorCarga } from '@/componentes/compartido/interfaz/indicador_carga'
import { BarraSuperior } from '@/componentes/compartido/navegacion/barra_superior'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import { leerFuentesFrontend } from './leer_fuentes'
import { PanelUsuarioTopbar } from '@/componentes/compartido/navegacion/panel_usuario_topbar'
import { SeccionContactosFrecuentes2 } from '@/componentes/mensajeria/bloques/seccion_contactos_frecuentes2'

const avatar = catalogoCompartido.avatar

describe('Avatares de personas migrados a la librería oficial', () => {
  const IMAGENES_GENERICAS = [
    'componentes/empresas/bloques/',
    'componentes/eventos/bloques/',
    'componentes/inicio/bloques/vista_previa_medios_publicacion.tsx',
    'componentes/inicio/bloques/medios_comentario.tsx',
    'formularios/eventos/seccion_imagen_evento.tsx',
    'paginas/inicio/pagina_inicio.tsx',
    'paginas/mensajeria/pagina_mensajes_videollamada_en_curso.tsx',
    'componentes/compartido/interfaz/avatar_imagen.tsx',
  ]

  it('AvatarUsuario y GrupoAvatares se apoyan en los componentes oficiales de @codeplex-sac/ui', async () => {
    const fuentes = await leerFuentesFrontend()
    const usuario = fuentes.find((f) => f.ruta.endsWith('/interfaz/avatar_usuario.tsx'))?.texto ?? ''
    const grupo = fuentes.find((f) => f.ruta.endsWith('/interfaz/grupo_avatares.tsx'))?.texto ?? ''
    expect(usuario).toContain("from '@codeplex-sac/ui'")
    expect(usuario).toContain('CodeplexAvatarUsuario')
    expect(grupo).toContain('CodeplexGrupoAvatares')
  })

  it('solo las imágenes genéricas y las excepciones documentadas siguen usando AvatarImagen', async () => {
    const intrusos = (await leerFuentesFrontend())
      .filter((f) => f.ruta.endsWith('.tsx') && f.texto.includes('<AvatarImagen'))
      .map((f) => f.ruta.slice(1))
      .filter((ruta) => !IMAGENES_GENERICAS.some((permitida) => ruta.startsWith(permitida)))
    expect(intrusos).toEqual([])
  })

  it('el panel del usuario de la barra superior usa el avatar compartido con presencia', () => {
    const { container } = render(<PanelUsuarioTopbar usuario={{ usuario: 'Pedro', empresa: 'Acme', rol: 'Admin' } as never} onCerrar={() => undefined} onCerrarSesion={() => undefined} />)
    expect(container.querySelector('[data-estado="conectado"] .MuiAvatar-root')).not.toBeNull()
  })

  it('Mensajes › contactos frecuentes: los contactos individuales llevan presencia y los grupos no', () => {
    const contactos = [{ nombre: 'Ana' }, { nombre: 'Equipo', esGrupo: true, miembros: '4' }]
    const { container } = render(<SeccionContactosFrecuentes2 carrusel={{ pistaRef: { current: null } }} CONTACTOS_FRECUENTES={contactos} />)
    expect(container.querySelectorAll('[data-estado="conectado"]')).toHaveLength(1)
  })
})

describe('Variantes oficiales del avatar, insignias y carga', () => {
  it('el tamaño de historias usa el tamaño numérico oficial de 104 px', () => {
    const { container } = render(<AvatarUsuario tamano="historia" imagen="/h.jpg" etiqueta="historia" />)
    expect(container.querySelector('.MuiAvatar-root')).toHaveStyle({ width: '104px', height: '104px' })
  })

  it('el nombre genera iniciales y color con avatarCadena', () => {
    render(<AvatarUsuario nombre="Ana García" etiqueta="persona" />)
    expect(screen.getByRole('img', { name: 'persona' })).toHaveTextContent('AG')
  })

  it('un icono sustituye a las iniciales y el tono sólido usa el color primario', () => {
    const { container } = render(<AvatarUsuario icono="grupo" tono="solido" etiqueta="grupo" />)
    expect(container.querySelector('.MuiAvatar-root')?.children.length).toBeGreaterThan(0)
    expect(screen.getByRole('img', { name: 'grupo' })).toHaveStyle({ backgroundColor: avatar.tonos.solido.bgcolor })
  })

  it('la insignia oficial del avatar admite número, texto y color semántico', () => {
    const { container } = render(<AvatarUsuario imagen="/f.jpg" insignia={4} colorInsignia="exito" />)
    expect(container.querySelector('.MuiBadge-badge')).toHaveTextContent('4')
    expect(screen.getByText('4').className).toContain(avatar.colores_insignia.exito.split(' ')[0])
  })

  it('con insignia y presencia a la vez prevalece la insignia', () => {
    const { container } = render(<AvatarUsuario imagen="/f.jpg" insignia="+" estado="conectado" />)
    expect(container.querySelector('[data-estado]')).toBeNull()
    expect(container.querySelector('.MuiBadge-badge')).toHaveTextContent('+')
  })

  it('la insignia superpuesta oficial muestra el contenido sobre sus hijos con el color del catálogo', () => {
    const { container } = render(<Insignia variant="superpuesta" contenido={3} color="error"><span>icono</span></Insignia>)
    expect(container.querySelector('.MuiBadge-badge')).toHaveTextContent('3')
    expect(container.firstElementChild?.className).toContain(catalogoCompartido.insignia_superpuesta.colores.error.split(' ')[0])
  })

  it('la campana de la barra superior usa la insignia oficial con el contador de avisos', () => {
    const { container } = render(<BarraSuperior />)
    expect(container.querySelector('.MuiBadge-badge')).not.toBeNull()
  })

  it('el indicador de carga compartido usa el componente oficial y admite etiqueta', () => {
    render(<IndicadorCarga etiqueta="Cargando datos" />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByText('Cargando datos')).toBeInTheDocument()
  })

  it('no quedan spinners dibujados con CSS ni fotografías de personas con img redondeada', async () => {
    const fuentes = await leerFuentesFrontend()
    const spinners = fuentes.filter((f) => f.ruta.endsWith('.tsx') && f.texto.includes('animate-spin')).map((f) => f.ruta)
    const imagenes = fuentes.filter((f) => f.ruta.endsWith('.tsx') && /<img[^>]*rounded-full/.test(f.texto)).map((f) => f.ruta)
    expect(spinners).toEqual([])
    expect(imagenes).toEqual([])
  })
})
