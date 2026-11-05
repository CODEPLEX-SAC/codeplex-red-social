import { describe, expect, it } from 'vitest'
import { NIVELES_AJUSTE_MEDIO, conAjusteMedio, LIMITE_TEXTO_HISTORIA, claseTextoAdaptada, contadorTexto, borradorInicial, conElemento, conEstiloTexto, conFondo, conMedio, conTexto, conTipo, nuevoElemento, puedePublicarHistoria, sinElemento, vistaDeBorrador } from '@/componentes/inicio'
import catalogoInicio from '@/catalogos/capacidades/redsocial/inicio.json'

const catalogoHistorias = catalogoInicio.historias

const medio = { id: 'm1', url: 'blob:historia', esVideo: false }
const elemento = { id: 'e1', contenido: 'Hola', estiloTextoId: 'titular', posicionId: 'inferior' }

describe('Borrador de historia', () => {
  it('nace como historia de texto con los valores iniciales del catalogo', () => {
    const borrador = borradorInicial()
    expect(borrador).toMatchObject({ tipo: 'texto', fondoId: catalogoHistorias.borrador.fondo_inicial, estiloTextoId: catalogoHistorias.borrador.estilo_texto_inicial, medio: null, elementos: [] })
  })

  it('guarda identificadores de variantes y descarta los desconocidos', () => {
    const borrador = conEstiloTexto(conFondo(borradorInicial(), 'decorativo-puntos'), 'susurro')
    expect(borrador.fondoId).toBe('decorativo-puntos')
    expect(borrador.estiloTextoId).toBe('susurro')
    expect(conFondo(borradorInicial(), 'no-existe').fondoId).toBe(catalogoHistorias.fondos[0].id)
  })

  it('solo se puede publicar con contenido segun el tipo', () => {
    expect(puedePublicarHistoria(borradorInicial())).toBe(false)
    expect(puedePublicarHistoria(conTexto(borradorInicial(), '  Hola '))).toBe(true)
    expect(puedePublicarHistoria(conElemento(borradorInicial(), elemento))).toBe(true)
    expect(puedePublicarHistoria(conTipo(borradorInicial(), 'media'))).toBe(false)
    expect(puedePublicarHistoria(conMedio(borradorInicial(), medio))).toBe(true)
  })

  it('un elemento nuevo usa el estilo y la posicion iniciales del catalogo', () => {
    expect(nuevoElemento('e2', 'Hola')).toEqual({ id: 'e2', contenido: 'Hola', estiloTextoId: catalogoHistorias.borrador.estilo_texto_inicial, posicionId: catalogoHistorias.borrador.posicion_inicial })
  })

  it('al volver a texto se descarta el medio y los elementos se pueden quitar', () => {
    expect(conTipo(conMedio(borradorInicial(), medio), 'texto').medio).toBeNull()
    expect(sinElemento(conElemento(borradorInicial(), elemento), 'e1').elementos).toEqual([])
  })

  it('la vista compartida resuelve fondo, estilo y elementos desde el catalogo', () => {
    const vista = vistaDeBorrador(conElemento(conTexto(conFondo(borradorInicial(), 'solido-azul'), 'Hola'), elemento))
    expect(vista.claseFondo).toBe('bg-azul-categoria')
    expect(vista.claseTexto).toContain('text-white')
    expect(vista.superponer).toBe(false)
    expect(vista.elementos[0].clases).toContain('bottom-8')
    expect(vistaDeBorrador(borradorInicial()).imagenFondo).toBeNull()
    expect(vistaDeBorrador(conMedio(borradorInicial(), medio)).medio).toEqual(medio)
  })

  it('el texto de una historia no pasa de 150 caracteres con espacios', () => {
    expect(LIMITE_TEXTO_HISTORIA).toBe(150)
    const largo = 'a '.repeat(100)
    expect(conTexto(borradorInicial(), largo).texto).toHaveLength(150)
    expect(conTexto(borradorInicial(), largo).texto).toBe(largo.slice(0, 150))
    expect(contadorTexto('Hola')).toBe('4/150')
  })

  it('reduce el tamano de letra cuando el texto es largo', () => {
    expect(claseTextoAdaptada('text-titulo-pagina text-center', 20)).toBe('text-titulo-pagina text-center')
    expect(claseTextoAdaptada('text-titulo-pagina text-center', 80)).toBe('text-titulo-seccion text-center')
    expect(claseTextoAdaptada('text-titulo-pagina text-center', 140)).toBe('text-titulo-banner text-center')
  })

  it('la foto se muestra entera por defecto y el ajuste de tamano se limita a los niveles configurados', () => {
    const base = conMedio(borradorInicial(), medio)
    expect(base.ajusteMedio).toBe(0)
    expect(vistaDeBorrador(base).claseAjusteMedio).toBe(NIVELES_AJUSTE_MEDIO[0].clase)
    expect(conAjusteMedio(base, 3).ajusteMedio).toBe(3)
    expect(vistaDeBorrador(conAjusteMedio(base, 3)).claseAjusteMedio).toBe(NIVELES_AJUSTE_MEDIO[3].clase)
    expect(conAjusteMedio(base, 99).ajusteMedio).toBe(NIVELES_AJUSTE_MEDIO.length - 1)
    expect(conAjusteMedio(base, -4).ajusteMedio).toBe(0)
    expect(conMedio(conAjusteMedio(base, 3), medio).ajusteMedio).toBe(0)
    expect(vistaDeBorrador(base).superponer).toBe(false)
  })
})
