import { describe, expect, it } from 'vitest'
import { imagenDeRecurso } from '@/componentes/inicio/bloques/imagenes_historia'
import { ESTILOS_TEXTO_HISTORIA, FONDOS_HISTORIA, POSICIONES_HISTORIA } from '@/componentes/inicio'
import catalogoInicio from '@/catalogos/capacidades/redsocial/inicio.json'

const catalogoHistorias = catalogoInicio.historias

const TIPOS = ['solido', 'degradado', 'decorativo', 'imagen']

describe('Catalogo de Historias', () => {
  it('los identificadores de fondos, estilos y posiciones son unicos', () => {
    for (const lista of [FONDOS_HISTORIA, ESTILOS_TEXTO_HISTORIA, POSICIONES_HISTORIA]) {
      expect(new Set(lista.map((elemento) => elemento.id)).size).toBe(lista.length)
    }
  })

  it('cada fondo tiene un tipo valido y define clase y color de texto', () => {
    FONDOS_HISTORIA.forEach((fondo) => {
      expect(TIPOS).toContain(fondo.tipo)
      expect(fondo.clase.length).toBeGreaterThan(0)
      expect(fondo.texto.length).toBeGreaterThan(0)
    })
  })

  it('los fondos de imagen apuntan a recursos que existen', () => {
    FONDOS_HISTORIA.filter((fondo) => fondo.tipo === 'imagen').forEach((fondo) => {
      expect(fondo.recurso, fondo.id).toBeTruthy()
      expect(imagenDeRecurso(fondo.recurso as string), fondo.id).not.toBeNull()
    })
  })

  it('los valores iniciales del borrador existen en el catalogo', () => {
    expect(FONDOS_HISTORIA.map((fondo) => fondo.id)).toContain(catalogoHistorias.borrador.fondo_inicial)
    expect(ESTILOS_TEXTO_HISTORIA.map((estilo) => estilo.id)).toContain(catalogoHistorias.borrador.estilo_texto_inicial)
    expect(POSICIONES_HISTORIA.map((posicion) => posicion.id)).toContain(catalogoHistorias.borrador.posicion_inicial)
  })
})
