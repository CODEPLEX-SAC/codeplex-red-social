import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaEmpresas } from '@/paginas/empresas/pagina_empresas'
import { leerCssGlobal } from '../compartido/leer_css'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import { EstadoEmpresa } from '../../componentes/empresas/bloques/estado_empresa'
import { EMPRESAS } from '../../servicios/empresas/empresas'

const CSS = await leerCssGlobal()
const textosDetalle = catalogoEmpresas.detalle_empresa
const textosHistorial = catalogoEmpresas.historial_empresa
const textosUsuarios = catalogoEmpresas.usuarios_empresa
const nombre = EMPRESAS[0].nombre

function color(token: string) {
  const coincidencia = CSS.match(new RegExp(`--color-${token}:\\s*(#[0-9a-fA-F]{6})`))
  if (!coincidencia) throw new Error(`token sin definir: ${token}`)
  return coincidencia[1]
}

function mezclar(hex: string, alfa: number, fondo = '#ffffff') {
  const canal = (valor: string, i: number) => parseInt(valor.slice(1 + i * 2, 3 + i * 2), 16)
  return [0, 1, 2].map((i) => Math.round(canal(hex, i) * alfa + canal(fondo, i) * (1 - alfa)))
}

function luminancia(rgb: number[]) {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contraste(a: number[], b: number[]) {
  const [mayor, menor] = [luminancia(a), luminancia(b)].sort((x, y) => y - x)
  return (mayor + 0.05) / (menor + 0.05)
}

const aRgb = (hex: string) => mezclar(hex, 1)

function parTextoFondo(clase: string) {
  const texto = clase.match(/\btext-([a-z-]+)\b/)?.[1] as string
  const fondo = clase.match(/\bbg-([a-z-]+)(?:\/(\d+))?\b/)
  const rgbFondo = fondo ? (fondo[2] ? mezclar(color(fondo[1]), Number(fondo[2]) / 100) : aRgb(color(fondo[1]))) : [255, 255, 255]
  return { texto: aRgb(color(texto)), fondo: rgbFondo }
}

function abrirDetalle() {
  fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', nombre) }))
  return within(screen.getByRole('dialog', { name: textosDetalle.titulo }))
}

describe('Normalizacion tipografica de Empresas', { timeout: 30000 }, () => {
  it('el mensaje vacio del listado usa el nivel subtitulo y no el de cuerpo', () => {
    render(<PaginaEmpresas />)
    fireEvent.change(screen.getByRole('searchbox', { name: catalogoEmpresas.campos.buscar_empresa }), { target: { value: 'sin coincidencias posibles' } })
    const mensaje = screen.getByText(catalogoEmpresas.mensajes.sin_empresas)
    expect(mensaje).toHaveClass('text-subtitulo')
    expect(mensaje).not.toHaveClass('text-cuerpo')
  })

  it('los mensajes vacios de Usuarios e Historial usan el nivel subtitulo', () => {
    render(<PaginaEmpresas />)
    const dialogo = abrirDetalle()
    fireEvent.click(dialogo.getByRole('tab', { name: textosDetalle.pestanas.usuarios }))
    fireEvent.change(dialogo.getByRole('searchbox', { name: textosUsuarios.etiquetas.busqueda }), { target: { value: 'sin coincidencias' } })
    expect(dialogo.getByText(textosUsuarios.sin_resultados)).toHaveClass('text-subtitulo')

    fireEvent.click(dialogo.getByRole('tab', { name: textosDetalle.pestanas.historial }))
    fireEvent.change(dialogo.getByRole('searchbox', { name: textosHistorial.etiquetas.busqueda }), { target: { value: 'sin coincidencias' } })
    expect(dialogo.getByText(textosHistorial.sin_resultados)).toHaveClass('text-subtitulo')
  })

  it('Historial rotula Desde y Hasta con la etiqueta externa del sistema (12 px / 500), no con una etiqueta flotante', () => {
    render(<PaginaEmpresas />)
    const dialogo = abrirDetalle()
    fireEvent.click(dialogo.getByRole('tab', { name: textosDetalle.pestanas.historial }))
    for (const texto of [textosHistorial.etiquetas.desde, textosHistorial.etiquetas.hasta]) {
      const etiqueta = dialogo.getByText(texto, { selector: 'span' })
      expect(etiqueta).toHaveClass('text-etiqueta')
    }
    expect(dialogo.queryByText(textosHistorial.etiquetas.desde, { selector: 'label' })).toBeNull()
  })

  it('el nombre de usuario se muestra con el mismo peso en Usuarios y en Historial', () => {
    render(<PaginaEmpresas />)
    const dialogo = abrirDetalle()
    fireEvent.click(dialogo.getByRole('tab', { name: textosDetalle.pestanas.usuarios }))
    const enUsuarios = dialogo.getAllByRole('row')[1].querySelector('strong') as HTMLElement
    fireEvent.click(dialogo.getByRole('tab', { name: textosDetalle.pestanas.historial }))
    const enHistorial = dialogo.getAllByRole('row')[1].querySelectorAll('td')[1].querySelector('span.whitespace-nowrap') as HTMLElement
    expect(enUsuarios).toHaveClass('text-nombre-fila')
    expect(enHistorial).toHaveClass('text-nombre-fila')
  })

  it('la subseccion Fecha de registro del panel queda por debajo del titulo del panel', () => {
    render(<PaginaEmpresas />)
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.filtros_avanzados }))
    const panel = within(screen.getByRole('dialog', { name: catalogoEmpresas.filtros_avanzados.titulo }))
    const titulo = panel.getByRole('heading', { name: catalogoEmpresas.filtros_avanzados.titulo })
    const subseccion = panel.getByRole('heading', { name: catalogoEmpresas.filtros_avanzados.fecha_registro })
    expect(titulo).toHaveClass('text-titulo-banner')
    expect(subseccion).toHaveClass('text-titulo-subseccion')
    expect(subseccion).not.toHaveClass('text-nombre-entidad')
  })

  it('las migas de pan llevan al sistema el tamano auxiliar que declara su contenedor', () => {
    render(<PaginaEmpresas />)
    expect(screen.getByRole('navigation', { name: catalogoEmpresas.migas.etiqueta })).toHaveClass('text-auxiliar')
    const reglas = Array.from(document.querySelectorAll('style')).map((estilo) => estilo.textContent).join('\n')
    expect(reglas).toMatch(/\.MuiTypography-root[^{]*\{[^}]*font-size:\s*var\(--text-auxiliar\)/)
  })

  it('el estado de la empresa se muestra con un unico componente semantico en listado y Detalle', () => {
    const { rerender } = render(<EstadoEmpresa estado="activa" />)
    expect(screen.getByText(catalogoEmpresas.estados.activa)).toHaveClass('text-exito-texto', 'text-subtitulo')
    rerender(<EstadoEmpresa estado="inactiva" />)
    expect(screen.getByText(catalogoEmpresas.estados.inactiva)).toHaveClass('text-peligro-texto', 'text-subtitulo')
  })
})

describe('Accesibilidad AA de estados, planes y roles de Empresas', () => {
  const casos: Array<[string, string]> = [
    ['estado activa (texto)', catalogoEmpresas.clases.estado.activa.texto],
    ['estado activa (badge)', catalogoEmpresas.clases.estado.activa.insignia],
    ['estado inactiva (texto)', catalogoEmpresas.clases.estado.inactiva.texto],
    ['estado inactiva (badge)', catalogoEmpresas.clases.estado.inactiva.insignia],
    ['plan avanzado', catalogoEmpresas.clases.plan.avanzado],
    ['plan intermedio', catalogoEmpresas.clases.plan.intermedio],
    ['plan basico', catalogoEmpresas.clases.plan.basico],
    ['rol administrador', textosUsuarios.clases.rol.administrador],
    ['rol contador', textosUsuarios.clases.rol.contador],
    ['rol supervisor', textosUsuarios.clases.rol.supervisor],
    ['rol usuario', textosUsuarios.clases.rol.usuario],
    ['estado de usuario activo', textosUsuarios.clases.estado.activo.texto],
    ['estado de usuario inactivo', textosUsuarios.clases.estado.inactivo.texto],
    ['historial: tipo usuario', textosHistorial.clases.tipo.usuario],
    ['historial: tipo empresa', textosHistorial.clases.tipo.empresa],
    ['historial: tipo plan', textosHistorial.clases.tipo.plan],
  ]

  it.each(casos)('%s alcanza al menos 4,5:1 (WCAG AA)', (_, clase) => {
    const { texto, fondo } = parTextoFondo(clase)
    expect(contraste(texto, fondo)).toBeGreaterThanOrEqual(4.5)
  })
})
