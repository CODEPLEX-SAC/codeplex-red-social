import { describe, expect, it } from 'vitest'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const multilinea = catalogoCompartido.controles.campo_texto_multilinea.sx['& .MuiInputBase-root']

describe('Campo de redacción: espaciado del icono inicial', () => {
  it('el campo multilínea separa el icono del borde izquierdo con el token de espaciado compartido', () => {
    expect(multilinea.paddingLeft).toBe('var(--spacing-sm)')
    expect(catalogoCompartido.controles.campo_texto_multilinea.sx['& .MuiInputBase-root'].padding).toBe(0)
  })
})
