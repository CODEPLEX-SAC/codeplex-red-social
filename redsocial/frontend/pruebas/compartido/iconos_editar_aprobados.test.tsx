import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '@/catalogos/capacidades/redsocial/inicio.json'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'

const ICONO_APROBADO = 'editar-oficial'

describe('Icono de la accion Editar (decisiones aprobadas IC-004, IC-082, IC-240 e IC-273)', () => {
  it('el alias aprobado resuelve al glifo oficial edit de la libreria', () => {
    expect(catalogoCompartido.iconos[ICONO_APROBADO as keyof typeof catalogoCompartido.iconos]).toBe(ICONO_APROBADO)
    expect(catalogoCompartido.iconos_libreria[ICONO_APROBADO as keyof typeof catalogoCompartido.iconos_libreria]).toBe('edit')
  })

  it('el menu de publicaciones de Inicio usa el icono aprobado', () => {
    expect(catalogoInicio.publicacion.menu.find((o) => o.clave === 'editar')?.icono).toBe(ICONO_APROBADO)
  })

  it('la columna Editar de permisos de Colaboradores usa el icono aprobado', () => {
    expect(catalogoColaboradores.columnas_permisos.find((c) => c.clave === 'editar')?.icono).toBe(ICONO_APROBADO)
  })
})
