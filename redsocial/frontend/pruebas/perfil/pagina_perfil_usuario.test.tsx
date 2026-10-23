import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaPerfilUsuario } from '@/paginas/perfil/pagina_perfil_usuario'
import { rutaPerfilUsuario } from '../../componentes/compartido/interfaz/ruta_perfil_usuario'
import { navegar } from '../../rutas/compartido/navegacion'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import catalogoPerfil from '../../catalogos/capacidades/redsocial/perfil.json'
import { PERFILES_USUARIO } from '../../rutas/perfil/rutas_perfil'
import { ALMACEN_PUBLICACIONES } from '../../rutas/inicio/rutas_inicio'
import { actualizarComentarios, marcarComentarioUtil, nuevoComentario } from '../../componentes/inicio'

const botones = catalogoPerfil.botones
const cabecera = catalogoPerfil.cabecera
const secciones = catalogoPerfil.secciones
const PROPIO = catalogoCompartido.sesion_actual

function perfilDe(id: string) {
  const perfil = PERFILES_USUARIO.find((candidato) => candidato.id === id)
  if (!perfil) throw new Error(id)
  return perfil
}

function abrirPerfil(id?: string) {
  act(() => navegar(id ? rutaPerfilUsuario(id) : catalogoPerfil.rutas.principal))
  return render(<PaginaPerfilUsuario />)
}

function pestana(nombre: string) {
  return screen.getByRole('tab', { name: new RegExp(nombre) })
}

afterEach(() => {
  act(() => navegar('/'))
})

describe('PaginaPerfilUsuario: perfil propio', () => {
  it('muestra el perfil de la sesion cuando no se indica usuario y no ofrece acciones de amistad', () => {
    abrirPerfil()
    expect(screen.getByRole('heading', { level: 1, name: PROPIO.usuario })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: botones.editar_perfil })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: botones.agregar_amigo })).toBeNull()
    expect(screen.queryByRole('link', { name: botones.enviar_mensaje })).toBeNull()
  })

  it('lista las publicaciones del perfil con menu de edicion solo en las propias', () => {
    abrirPerfil()
    const propio = perfilDe(PROPIO.id)
    const tarjeta = screen.getByText(propio.publicaciones[0].texto).closest('article') as HTMLElement
    expect(within(tarjeta).getByRole('button', { name: catalogoInicio.botones.mas_opciones })).toBeInTheDocument()
  })
})

describe('PaginaPerfilUsuario: perfil de otra persona', () => {
  it('muestra los datos, la relacion de amistad y los amigos en comun', () => {
    abrirPerfil('maria-fernandez')
    const maria = perfilDe('maria-fernandez')
    expect(screen.getByRole('heading', { level: 1, name: maria.nombre })).toBeInTheDocument()
    expect(screen.getByText(botones.ya_son_amigos)).toBeInTheDocument()
    const estadisticas = within(screen.getByRole('list', { name: cabecera.estadisticas }))
    expect(estadisticas.getByText(cabecera.en_comun_plural)).toBeInTheDocument()
    expect(estadisticas.getByText(String(maria.publicaciones.length))).toBeInTheDocument()
    expect(screen.getByRole('link', { name: botones.enviar_mensaje })).toHaveAttribute('href', catalogoMensajeria.rutas.todos)
  })

  it('permite enviar y cancelar la solicitud de amistad a quien no es amigo', () => {
    abrirPerfil('elena-sanchez')
    const agregar = screen.getByRole('button', { name: botones.agregar_amigo })
    expect(agregar).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(agregar)
    const enviada = screen.getByRole('button', { name: botones.solicitud_enviada })
    expect(enviada).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(enviada)
    expect(screen.getByRole('button', { name: botones.agregar_amigo })).toBeInTheDocument()
  })

  it('muestra el estado vacio cuando el perfil no tiene publicaciones', () => {
    abrirPerfil('diego-mendoza')
    expect(screen.getByText(catalogoPerfil.mensajes.sin_publicaciones)).toBeInTheDocument()
  })

  it('reacciona y comenta una publicacion del perfil ajeno', () => {
    abrirPerfil('luis-rodriguez')
    const luis = perfilDe('luis-rodriguez')
    const tarjeta = within(screen.getByText(luis.publicaciones[0].texto).closest('article') as HTMLElement)
    expect(tarjeta.queryByRole('button', { name: catalogoInicio.botones.mas_opciones })).toBeNull()
    fireEvent.click(tarjeta.getByRole('button', { name: new RegExp(catalogoInicio.botones.me_gusta) }))
    expect(tarjeta.getByText(`${Object.values(luis.publicaciones[0].reaccionesPorTipo).reduce((suma, cantidad) => suma + cantidad, 0) + 1} ${catalogoInicio.contadores.reaccion_plural}`)).toBeInTheDocument()
  })
})

describe('PaginaPerfilUsuario: pestanas', () => {
  it('cambia a Resumen y muestra acerca de, datos y habilidades', () => {
    abrirPerfil('maria-fernandez')
    const maria = perfilDe('maria-fernandez')
    fireEvent.click(pestana(catalogoPerfil.pestanas[1].etiqueta))
    const resumen = within(screen.getByRole('tabpanel'))
    expect(resumen.getByRole('heading', { name: secciones.presentacion.titulo })).toBeInTheDocument()
    expect(resumen.getByText(maria.acerca)).toBeInTheDocument()
    expect(resumen.getByText(maria.ciudad)).toBeInTheDocument()
    maria.habilidades.forEach((habilidad) => expect(resumen.getByText(habilidad)).toBeInTheDocument())
    expect(resumen.queryByRole('button', { name: new RegExp(secciones.editar_seccion.replace(':seccion', '')) })).toBeNull()
  })

  it('lista los amigos con enlace a su perfil y los filtra sin distinguir tildes', () => {
    abrirPerfil('maria-fernandez')
    fireEvent.click(pestana(catalogoPerfil.pestanas.find((p) => p.clave === 'amigos')?.etiqueta ?? ''))
    const lista = within(screen.getByRole('list', { name: catalogoPerfil.amigos.etiqueta_lista }))
    expect(lista.getAllByRole('listitem')).toHaveLength(perfilDe('maria-fernandez').amigos.length)
    const luis = lista.getByRole('link', { name: new RegExp(perfilDe('luis-rodriguez').nombre) })
    expect(luis).toHaveAttribute('href', rutaPerfilUsuario('luis-rodriguez'))

    fireEvent.change(screen.getByLabelText(catalogoPerfil.campos.buscar_amigos), { target: { value: 'rodriguez' } })
    const filtrada = within(screen.getByRole('list', { name: catalogoPerfil.amigos.etiqueta_lista }))
    expect(filtrada.getAllByRole('listitem')).toHaveLength(1)

    fireEvent.change(screen.getByLabelText(catalogoPerfil.campos.buscar_amigos), { target: { value: 'zzz' } })
    expect(screen.getByText(catalogoPerfil.mensajes.sin_resultados_amigos)).toBeInTheDocument()
  })
})

describe('PaginaPerfilUsuario: perfil inexistente', () => {
  it('muestra el mensaje y un enlace para volver a inicio', () => {
    abrirPerfil('no-existe')
    expect(screen.getByText(catalogoPerfil.mensajes.perfil_no_encontrado_titulo)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: botones.volver_a_inicio })).toHaveAttribute('href', catalogoInicio.rutas.principal)
  })
})

describe('Enlace al perfil', () => {
  it('compone la ruta con el parametro del catalogo y codifica el identificador', () => {
    expect(rutaPerfilUsuario('maria-fernandez')).toBe(`${catalogoPerfil.rutas.principal}?${catalogoPerfil.parametros_ruta.usuario}=maria-fernandez`)
    expect(rutaPerfilUsuario('a b')).toContain('a%20b')
  })
})

describe('PaginaPerfilUsuario: experiencia, documentos y metricas', () => {
  const etiqueta = (clave: string) => catalogoPerfil.pestanas.find((candidata) => candidata.clave === clave)?.etiqueta ?? ''

  it('el perfil ofrece las seis pestanas recuperadas', () => {
    abrirPerfil()
    expect(screen.getAllByRole('tab')).toHaveLength(catalogoPerfil.pestanas.length)
    for (const clave of ['experiencia', 'documentos', 'metricas']) expect(pestana(etiqueta(clave))).toBeInTheDocument()
  })

  it('Experiencia muestra el cargo, la empresa y los estudios del perfil seleccionado', () => {
    abrirPerfil('maria-fernandez')
    const maria = perfilDe('maria-fernandez')
    fireEvent.click(pestana(etiqueta('experiencia')))
    const contenido = within(screen.getByRole('tabpanel'))
    expect(contenido.getByText(maria.titular)).toBeInTheDocument()
    expect(contenido.getByText(maria.empresa)).toBeInTheDocument()
    expect(contenido.getByText(maria.estudios)).toBeInTheDocument()
  })

  it('Documentos muestra su estado vacio mientras no existan documentos', () => {
    abrirPerfil('maria-fernandez')
    fireEvent.click(pestana(etiqueta('documentos')))
    expect(screen.getByText(catalogoPerfil.documentos.vacio_ajeno)).toBeInTheDocument()
  })

  it('Metricas distingue el perfil propio (resumen de actividad) del ajeno (comportamiento y profesionales)', () => {
    const propio = abrirPerfil()
    fireEvent.click(pestana(etiqueta('metricas')))
    expect(screen.getByRole('heading', { name: catalogoPerfil.metricas.resumen_actividad })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: catalogoPerfil.metricas.comportamiento })).toBeNull()
    propio.unmount()

    abrirPerfil('luis-rodriguez')
    fireEvent.click(pestana(etiqueta('metricas')))
    expect(screen.getByRole('heading', { name: catalogoPerfil.metricas.comportamiento })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: catalogoPerfil.metricas.profesionales })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: catalogoPerfil.metricas.resumen_actividad })).toBeNull()
  })
})

const redSocial = catalogoPerfil.red_social
const ENLACE_LINKEDIN = ['https:', '', 'linkedin.com', 'in', 'pedro'].join('/')

describe('PaginaPerfilUsuario: Red Social y edicion del perfil', () => {
  const etiqueta = (clave: string) => catalogoPerfil.pestanas.find((candidata) => candidata.clave === clave)?.etiqueta ?? ''

  it('solo ofrece las pestanas Red Social, Resumen, Experiencia, Documentos, Metricas y Amigos', () => {
    abrirPerfil()
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(6)
    ;['Red Social', 'Resumen', 'Experiencia', 'Documentos', 'Métricas', 'Amigos'].forEach((nombre, indice) => expect(tabs[indice]).toHaveTextContent(nombre))
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Red Social')
  })

  it('Red Social muestra datos personales, fotos, amigos y la actividad reciente con el compositor en el perfil propio', () => {
    abrirPerfil()
    const propio = perfilDe(PROPIO.id)
    expect(screen.getByRole('heading', { name: redSocial.datos_personales })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: redSocial.fotos })).toBeInTheDocument()
    expect(screen.getByText(redSocial.sin_fotos)).toBeInTheDocument()
    expect(screen.getByText(`${propio.amigos.length} ${propio.amigos.length === 1 ? redSocial.amigo_singular : redSocial.amigo_plural}`)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: catalogoInicio.placeholders.que_estas_pensando.replace(':nombre', propio.nombres) })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: redSocial.mis_preguntas }))
    expect(screen.getByText(redSocial.preguntas.vacio_propio)).toBeInTheDocument()
  })

  it('en un perfil ajeno no se ofrece el compositor y Ver todos abre la pestana Amigos', () => {
    abrirPerfil('maria-fernandez')
    expect(screen.queryByRole('button', { name: new RegExp(catalogoInicio.placeholders.que_estas_pensando.split(',')[0]) })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: redSocial.ver_todos }))
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(etiqueta('amigos'))
  })

  it('Editar perfil cambia el nombre en la red social y la categoria, tambien en las publicaciones', () => {
    abrirPerfil()
    fireEvent.click(screen.getByRole('button', { name: botones.editar_perfil }))
    const dialogo = within(screen.getByRole('dialog', { name: catalogoPerfil.editar.titulo }))
    const nombre = dialogo.getByLabelText(new RegExp(`^${catalogoPerfil.editar.nombres}`))
    expect(dialogo.getByText(catalogoPerfil.editar.ayuda_nombre)).toBeInTheDocument()
    fireEvent.change(nombre, { target: { value: '' } })
    expect(dialogo.getByRole('button', { name: catalogoPerfil.editar.guardar })).toBeDisabled()
    fireEvent.change(nombre, { target: { value: 'Pedro' } })
    fireEvent.change(dialogo.getByLabelText(new RegExp(catalogoPerfil.editar.apellidos)), { target: { value: 'Alias' } })
    fireEvent.change(dialogo.getByLabelText(new RegExp(catalogoPerfil.editar.titular)), { target: { value: 'Arquitecto' } })
    fireEvent.click(dialogo.getByRole('button', { name: catalogoPerfil.editar.guardar }))

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByRole('heading', { level: 1, name: 'Pedro Alias' })).toBeInTheDocument()
    expect(screen.getByText('Arquitecto')).toBeInTheDocument()
    expect(screen.getAllByText('Pedro Alias').length).toBeGreaterThan(1)
  })
})

describe('PaginaPerfilUsuario: edicion completa del perfil propio', () => {
  const sec = catalogoPerfil.secciones
  const exp = catalogoPerfil.experiencia
  const docs = catalogoPerfil.documentos
  const etiqueta = (clave: string) => catalogoPerfil.pestanas.find((candidata) => candidata.clave === clave)?.etiqueta ?? ''
  const editar = (titulo: string) => sec.editar_seccion.replace(':seccion', titulo)

  it('Editar perfil guarda nombre, apellido, categoria y los botones de correo, LinkedIn y sitio web', () => {
    abrirPerfil()
    const redes = within(screen.getByRole('list', { name: catalogoPerfil.redes.etiqueta }))
    for (const boton of catalogoPerfil.redes.botones) expect(redes.getByRole('button', { name: catalogoPerfil.redes.agregar.replace(':red', boton.titulo) })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: botones.editar_perfil }))
    const dialogo = within(screen.getByRole('dialog', { name: catalogoPerfil.editar.titulo }))
    fireEvent.change(dialogo.getByLabelText(new RegExp(`^${catalogoPerfil.editar.nombres}`)), { target: { value: 'Pedro' } })
    fireEvent.change(dialogo.getByLabelText(new RegExp(catalogoPerfil.editar.apellidos)), { target: { value: 'Lozano Rios' } })
    fireEvent.change(dialogo.getByLabelText(new RegExp(catalogoPerfil.editar.linkedin)), { target: { value: ENLACE_LINKEDIN } })
    fireEvent.change(dialogo.getByLabelText(new RegExp(catalogoPerfil.editar.correo)), { target: { value: 'pedro@ejemplo.com' } })
    fireEvent.click(dialogo.getByRole('button', { name: catalogoPerfil.editar.guardar }))

    expect(screen.getByRole('heading', { level: 1, name: 'Pedro Lozano Rios' })).toBeInTheDocument()
    const enlaces = within(screen.getByRole('list', { name: catalogoPerfil.redes.etiqueta }))
    expect(enlaces.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', ENLACE_LINKEDIN)
    expect(enlaces.getByRole('link', { name: 'Correo' })).toHaveAttribute('href', 'mailto:pedro@ejemplo.com')
    expect(enlaces.getByRole('button', { name: catalogoPerfil.redes.agregar.replace(':red', 'Sitio web') })).toBeInTheDocument()
  })

  it('Resumen: edita la presentacion, los datos personales y las habilidades', () => {
    abrirPerfil()
    fireEvent.click(pestana(etiqueta('resumen')))
    fireEvent.click(screen.getByRole('button', { name: editar(sec.presentacion.titulo) }))
    fireEvent.change(screen.getByLabelText(new RegExp(sec.presentacion.campos[0].etiqueta)), { target: { value: 'Ingeniero civil con foco en puentes' } })
    fireEvent.click(screen.getByRole('button', { name: sec.guardar }))
    expect(screen.getByText('Ingeniero civil con foco en puentes')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: editar(sec.datos_personales.titulo) }))
    fireEvent.change(screen.getByLabelText(new RegExp(sec.datos_personales.campos[0].etiqueta)), { target: { value: 'Cusco' } })
    fireEvent.change(screen.getByLabelText(new RegExp(sec.datos_personales.campos[2].etiqueta)), { target: { value: '01/02/1990' } })
    fireEvent.click(screen.getByRole('button', { name: sec.guardar }))
    expect(screen.getByText('Cusco')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: sec.datos_personales.ver_mas }))
    expect(screen.getByText('01/02/1990')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: editar(sec.habilidades.titulo) }))
    fireEvent.change(screen.getByLabelText(sec.habilidades.etiqueta_campo), { target: { value: 'Excel' } })
    fireEvent.click(screen.getByRole('button', { name: sec.habilidades.agregar_boton }))
    fireEvent.click(screen.getByRole('button', { name: sec.guardar }))
    expect(screen.getByText('Excel')).toBeInTheDocument()
  })

  it('Resumen: los detalles fijados controlan lo que muestra la cabecera', () => {
    abrirPerfil()
    const propio = perfilDe(PROPIO.id)
    expect(screen.getAllByText(propio.estudios).length).toBeGreaterThan(0)
    fireEvent.click(pestana(etiqueta('resumen')))
    fireEvent.click(screen.getByRole('button', { name: editar(sec.detalles_fijados.titulo) }))
    fireEvent.click(screen.getByRole('checkbox', { name: sec.detalles_fijados.opciones[2].etiqueta }))
    fireEvent.click(screen.getByRole('button', { name: sec.guardar }))
    expect(within(screen.getByRole('heading', { level: 1 }).closest('article') as HTMLElement).queryByText(propio.estudios)).toBeNull()
  })

  it('Experiencia: agrega y elimina una experiencia laboral y una formacion', () => {
    abrirPerfil()
    fireEvent.click(pestana(etiqueta('experiencia')))
    fireEvent.click(screen.getByRole('button', { name: exp.laboral.agregar }))
    fireEvent.change(screen.getByLabelText(new RegExp(exp.laboral.campos[0].etiqueta)), { target: { value: 'Constructora ACME' } })
    fireEvent.change(screen.getByLabelText(new RegExp(exp.laboral.campos[1].etiqueta)), { target: { value: 'Residente de obra' } })
    fireEvent.click(screen.getByRole('button', { name: sec.guardar }))
    expect(screen.getByText('Residente de obra')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: `${exp.eliminar_item} Residente de obra` }))
    expect(screen.queryByText('Residente de obra')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: exp.formacion.agregar }))
    fireEvent.change(screen.getByLabelText(new RegExp(exp.formacion.campos[1].etiqueta)), { target: { value: 'Universidad de Piura' } })
    fireEvent.click(screen.getByRole('button', { name: sec.guardar }))
    expect(screen.getByText('Universidad de Piura')).toBeInTheDocument()
  })

  it('Documentos: sube un archivo, lo muestra y permite eliminarlo', () => {
    URL.createObjectURL = vi.fn(() => 'blob:documento-1')
    URL.revokeObjectURL = vi.fn()
    abrirPerfil()
    fireEvent.click(pestana(etiqueta('documentos')))
    expect(screen.getByRole('button', { name: docs.subir_cv })).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText(docs.etiqueta_archivo), { target: { files: [new File(['x'], 'cv_pedro.pdf', { type: 'application/pdf' })] } })

    expect(screen.getByRole('link', { name: docs.abrir.replace(':nombre', 'cv_pedro.pdf') })).toHaveAttribute('href', 'blob:documento-1')
    fireEvent.click(screen.getByRole('button', { name: docs.eliminar.replace(':nombre', 'cv_pedro.pdf') }))
    expect(screen.queryByText('cv_pedro.pdf')).toBeNull()
  })

  it('Foto de perfil: elegir una foto la muestra en la cabecera y en Fotos', () => {
    URL.createObjectURL = vi.fn(() => 'blob:foto-perfil')
    abrirPerfil()
    fireEvent.click(screen.getByRole('button', { name: catalogoPerfil.foto.cambiar_aria.replace(':nombre', PROPIO.usuario) }))
    expect(screen.getByRole('menuitem', { name: catalogoPerfil.foto.menu[1].etiqueta })).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    fireEvent.change(screen.getByLabelText(catalogoPerfil.foto.etiqueta_entrada), { target: { files: [new File(['x'], 'foto.png', { type: 'image/png' })] } })

    expect(screen.queryByText(catalogoPerfil.red_social.sin_fotos)).toBeNull()
    expect(document.querySelector('img[src="blob:foto-perfil"]')).not.toBeNull()
  })

  it('Metricas propias: muestra preguntas y resueltas', () => {
    abrirPerfil()
    fireEvent.click(pestana(etiqueta('metricas')))
    expect(screen.getByText(catalogoPerfil.metricas.preguntas)).toBeInTheDocument()
    expect(screen.getByText(catalogoPerfil.metricas.resueltas)).toBeInTheDocument()
  })

  it('Preguntas: la persona que pregunta marca una respuesta como util y aparece en Mis preguntas', () => {
    abrirPerfil()
    fireEvent.click(screen.getByRole('button', { name: catalogoInicio.placeholders.que_estas_pensando.replace(':nombre', 'Pedro') }))
    const dialogo = within(screen.getByRole('dialog'))
    fireEvent.click(dialogo.getByRole('button', { name: catalogoInicio.modal_crear_publicacion.tipos[2].etiqueta }))
    fireEvent.change(dialogo.getByRole('textbox', { name: catalogoInicio.modal_crear_publicacion.etiqueta_editor }), { target: { value: 'Como calculo el IGV' } })
    fireEvent.click(dialogo.getByRole('button', { name: catalogoInicio.modal_crear_publicacion.publicar }))

    const id = ALMACEN_PUBLICACIONES.leer().feed.find((elemento) => elemento.clase === 'texto' && elemento.texto === 'Como calculo el IGV')?.id ?? ''
    const externo = nuevoComentario('externo-1', { id: 'maria-fernandez', usuario: 'María Fernández' }, 'Aplica el 18 %', 'Ahora')
    act(() => ALMACEN_PUBLICACIONES.modificar((estado) => actualizarComentarios(estado, id, [], (lista) => [...lista, externo])))

    const tarjeta = within(screen.getByText('Como calculo el IGV').closest('article') as HTMLElement)
    expect(tarjeta.getByText(catalogoInicio.pregunta_estado.sin_resolver.etiqueta)).toBeInTheDocument()
    act(() => ALMACEN_PUBLICACIONES.modificar((estado) => marcarComentarioUtil(estado, id, externo)))
    expect(tarjeta.getByText(catalogoInicio.pregunta_estado.resuelta.etiqueta)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: redSocial.mis_preguntas }))
    expect(screen.getByText(redSocial.preguntas.respuesta_util.replace(':autor', 'María Fernández'))).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: redSocial.preguntas.desmarcar }))
    expect(screen.queryByText(redSocial.preguntas.respuesta_util.replace(':autor', 'María Fernández'))).toBeNull()
  })
})
