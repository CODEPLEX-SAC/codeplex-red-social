import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { DialogoCompartirPublicacion } from '@/componentes/inicio/bloques/dialogo_compartir_publicacion'
import { ProveedorDestinosCompartir } from '@/componentes/inicio/bloques/proveedor_destinos_compartir'
import { PaginaGruposDetalle } from '@/paginas/grupos/pagina_grupos_detalle'
import { GRUPOS_ADMIN, IMAGEN_CREAR_GRUPO, PUERTO_GRUPOS, destinosDeGrupos, rutaDeGrupo } from '../../rutas/grupos/rutas_grupos'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoPerfil from '../../catalogos/capacidades/redsocial/perfil.json'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'

vi.setConfig({ testTimeout: 40000 })

const detalle = catalogoGrupos.detalle
const compartir = catalogoInicio.publicacion.compartir
const MIEMBRO = 'programacion-go'
const AMIGOS_PRUEBA = [{ id: 'ana', nombre: 'Ana Prueba', imagen: String() }]

function abrir(id: string) {
  window.history.pushState({}, '', rutaDeGrupo(id))
  return render(<PaginaGruposDetalle />)
}

function dialogoCompartir(alCompartir = vi.fn(), simple = false) {
  render(
    <ProveedorDestinosCompartir grupos={destinosDeGrupos()} amigos={AMIGOS_PRUEBA} almacenDeGrupo={PUERTO_GRUPOS.publicaciones}>
      <DialogoCompartirPublicacion simple={simple} nombre="Autor Original" texto="Texto original" onCompartir={alCompartir} onCerrar={vi.fn()} />
    </ProveedorDestinosCompartir>,
  )
  return within(screen.getByRole('dialog'))
}

describe('Grupos: portada por defecto y vista de miembro', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it('un grupo creado usa crear-grupo.png como imagen y portada por defecto', () => {
    const creado = PUERTO_GRUPOS.crear({ nombre: 'Grupo Con Portada', descripcion: String() })
    expect(creado.imagen).toBe(IMAGEN_CREAR_GRUPO)
    expect(PUERTO_GRUPOS.detalle(creado.id)?.portada).toBe(IMAGEN_CREAR_GRUPO)
  })

  it('como miembro: pestana Informacion, Eres miembro con su menu, avatares de miembros y multimedia reciente; sin guia de configuracion', () => {
    abrir(MIEMBRO)
    expect(screen.getAllByRole('tab').map((pestana) => pestana.textContent)).toEqual(detalle.pestanas_miembro.map((pestana) => pestana.etiqueta))
    expect(screen.getByRole('group', { name: detalle.miembros_avatares })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: detalle.recientes.titulo })).toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: /Archivo multimedia/ })).toHaveLength(4)
    expect(screen.queryByText(detalle.configuracion.titulo)).toBeNull()
    expect(screen.queryByRole('button', { name: detalle.editar_portada })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: new RegExp(detalle.membresia.etiqueta) }))
    ;['novedades', 'dejar_seguir', 'abandonar'].forEach((clave) => {
      expect(screen.getByRole('menuitem', { name: detalle.membresia.elementos.find((elemento) => elemento.clave === clave)?.etiqueta })).toBeInTheDocument()
    })
    fireEvent.click(screen.getByRole('menuitem', { name: 'Dejar de seguir el grupo' }))
    expect(screen.getByText(detalle.membresia.sin_seguir)).toBeInTheDocument()
    expect(PUERTO_GRUPOS.estado(MIEMBRO).siguiendo).toBe(false)
    fireEvent.click(screen.getByRole('tab', { name: 'Información' }))
    expect(screen.getAllByRole('heading', { level: 2, name: detalle.informacion.titulo })).toHaveLength(2)
  })

  it('al pulsar un archivo multimedia reciente se abre el visor con las imagenes grandes y se navega entre ellas', () => {
    abrir(MIEMBRO)
    fireEvent.click(screen.getAllByRole('button', { name: /Archivo multimedia 1/ })[0])
    const visor = within(screen.getByRole('dialog'))
    expect(visor.getByText(catalogoPerfil.visor.posicion.replace(':actual', '1').replace(':total', '4'))).toBeInTheDocument()
    fireEvent.click(visor.getByRole('button', { name: catalogoPerfil.visor.siguiente }))
    expect(visor.getByText(catalogoPerfil.visor.posicion.replace(':actual', '2').replace(':total', '4'))).toBeInTheDocument()
    fireEvent.click(visor.getByRole('button', { name: catalogoPerfil.visor.cerrar }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('Compartir del grupo abre el dialogo simple de compartir, sin la seccion Compartir en', () => {
    abrir(MIEMBRO)
    fireEvent.click(screen.getAllByRole('button', { name: detalle.compartir })[0])
    const dialogo = within(screen.getByRole('dialog', { name: detalle.compartir_grupo.titulo }))
    expect(dialogo.getByRole('button', { name: compartir.confirmar })).toBeInTheDocument()
    expect(dialogo.queryByText(compartir.compartir_en)).toBeNull()
    fireEvent.click(dialogo.getByRole('button', { name: compartir.confirmar }))
    expect(screen.getByText(compartir.exito_historia)).toBeInTheDocument()
  })
})

describe('Inicio: dialogo de compartir con destinos', () => {
  it('ofrece Historia, Copiar enlace, Grupo y Perfil de un amigo', () => {
    const dialogo = dialogoCompartir()
    compartir.destinos.forEach((destino) => expect(dialogo.getByRole('button', { name: destino.etiqueta })).toBeInTheDocument())
    expect(dialogo.getByRole('button', { name: compartir.confirmar })).toBeInTheDocument()
  })

  it('Copiar enlace copia la direccion y lo confirma', async () => {
    const escribir = vi.fn(async () => undefined)
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: escribir } })
    const dialogo = dialogoCompartir()
    await act(async () => fireEvent.click(dialogo.getByRole('button', { name: 'Copiar enlace' })))
    expect(escribir).toHaveBeenCalledTimes(1)
    expect(screen.getByText(compartir.enlace_copiado)).toBeInTheDocument()
  })

  it('Historia comparte con el comentario escrito', () => {
    const alCompartir = vi.fn()
    const dialogo = dialogoCompartir(alCompartir)
    fireEvent.change(dialogo.getByLabelText(compartir.etiqueta_campo), { target: { value: 'Mira esto' } })
    fireEvent.click(dialogo.getByRole('button', { name: compartir.confirmar }))
    expect(alCompartir).toHaveBeenCalledWith('Mira esto')
    expect(screen.getByText(compartir.exito_mensaje)).toBeInTheDocument()
  })

  it('Grupo: elige el grupo, redacta (con etiqueta y sin imagenes) y publica en el grupo', () => {
    const dialogo = dialogoCompartir()
    const destino = destinosDeGrupos()[0]
    fireEvent.click(dialogo.getByRole('button', { name: 'Grupo' }))
    expect(dialogo.getByText(compartir.grupos.lista)).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: new RegExp(destino.nombre) }))
    expect(dialogo.getByRole('heading', { level: 2, name: compartir.redactar.titulo })).toBeInTheDocument()
    expect(dialogo.queryByText(/etiqueta de IA/i)).toBeNull()
    expect(dialogo.queryByRole('button', { name: /foto|imagen/i })).toBeNull()
    fireEvent.change(dialogo.getByLabelText(compartir.redactar.etiqueta_campo), { target: { value: 'Para este grupo' } })
    fireEvent.click(dialogo.getByRole('button', { name: compartir.redactar.etiquetar }))
    fireEvent.click(dialogo.getByRole('button', { name: 'Ana Prueba' }))
    fireEvent.click(dialogo.getByRole('button', { name: compartir.redactar.publicar }))
    expect(screen.getByText(compartir.exito_grupo.replace(':destino', destino.nombre))).toBeInTheDocument()
    const feed = PUERTO_GRUPOS.publicaciones(destino.id).leer().feed
    expect(feed[0].clase).toBe('compartida')
  })

  it('Perfil de un amigo: elige a la persona y comparte sin afirmar que se notifico', () => {
    const dialogo = dialogoCompartir()
    fireEvent.click(dialogo.getByRole('button', { name: 'Perfil de un amigo' }))
    fireEvent.click(dialogo.getByRole('button', { name: /Ana Prueba/ }))
    expect(dialogo.getByLabelText(compartir.redactar.etiqueta_campo)).toHaveAttribute('placeholder', compartir.redactar.marcador_amigo.replace(':nombre', 'Ana'))
    fireEvent.click(dialogo.getByRole('button', { name: compartir.redactar.compartir }))
    expect(screen.getByText(compartir.exito_amigo.replace(':destino', 'Ana Prueba'))).toBeInTheDocument()
  })
})

describe('Grupos: cantidad de miembros', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it('los grupos que administras ya creados tienen 20 miembros y un grupo nuevo tiene 1', () => {
    const originales = new Set(GRUPOS_ADMIN.map((grupo) => grupo.nombre))
    for (const grupo of PUERTO_GRUPOS.gruposQueAdministras().filter((candidato) => originales.has(candidato.nombre))) {
      const detalleGrupo = PUERTO_GRUPOS.detalle(grupo.id)
      expect(detalleGrupo?.totalMiembros).toBe(20)
      expect(detalleGrupo?.miembrosLista).toHaveLength(20)
    }
    const nuevo = PUERTO_GRUPOS.crear({ nombre: 'Grupo Recien Creado', descripcion: String() })
    expect(PUERTO_GRUPOS.detalle(nuevo.id)?.totalMiembros).toBe(1)
    expect(PUERTO_GRUPOS.detalle(nuevo.id)?.miembrosLista).toHaveLength(1)
  })

  it('los grupos a los que me uni tienen al menos 30 miembros sin repetidos, incluidos los que me uno desde Sugerencias', () => {
    PUERTO_GRUPOS.unirse(PUERTO_GRUPOS.sugeridos().mas[0].nombre)
    for (const grupo of PUERTO_GRUPOS.tusGrupos()) {
      const detalleGrupo = PUERTO_GRUPOS.detalle(grupo.id)
      expect(detalleGrupo?.totalMiembros).toBeGreaterThanOrEqual(30)
      expect(detalleGrupo?.miembrosLista.length).toBeGreaterThanOrEqual(30)
      expect(new Set(detalleGrupo?.miembrosLista.map((miembro) => miembro.nombre)).size).toBe(detalleGrupo?.miembrosLista.length)
    }
  })

  it('en un grupo grande la lista se limita y se muestra el total con separador de miles', () => {
    abrir('marketing-digital-latam')
    expect(screen.getByText(new RegExp(`Grupo · ${'9.500'} miembros`))).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: 'Miembros' }))
    expect(screen.getByRole('heading', { level: 2, name: detalle.miembros.titulo.replace(':n', '9.500') })).toBeInTheDocument()
    expect(screen.getByText(detalle.miembros.mostrando.replace(':n', '30').replace(':total', '9.500'))).toBeInTheDocument()
    expect(screen.getAllByRole('group', { name: detalle.miembros_avatares })[0].querySelectorAll('img').length).toBeLessThanOrEqual(detalle.avatares_maximo)
  })
})
