import { detectarDesviacionesTipograficas } from './detectar_desviaciones_tipograficas'
import {
  detectarArtefactoEnArbol,
  detectarBotonNativoNoRegistrado,
  detectarColorNombradoNoAutorizado,
  detectarImportDeServicio,
  detectarModalPropio,
  detectarPanelDuplicado,
  detectarRutaLiteral,
  detectarTextoVisibleFueraDeCatalogo,
} from './detectores_calidad'

const RUTA_NUEVA = '/componentes/modulo_nuevo/bloques/pantalla_nueva.tsx'

describe('Autoprueba del Quality Gate: cada desviacion conocida se detecta', () => {
  it.each([
    ['text-[17px]', '<h2 className="text-[17px] text-texto">x</h2>'],
    ['font-bold', '<h2 className="text-titulo-seccion font-bold">x</h2>'],
    ['leading-[1.7]', '<p className="text-cuerpo leading-[1.7]">x</p>'],
    ['font-semibold con prefijo responsive', '<p className="max-600:font-semibold">x</p>'],
    ['fontSize en JS', "const estilo = { fontSize: 17 }"],
    ['familia local', '<p className="font-mono">x</p>'],
    ['rol con su peso repetido', '<h1 className="text-titulo-pagina font-pagina">x</h1>'],
  ])('tipografia: %s', (_nombre, codigo) => {
    expect(detectarDesviacionesTipograficas(RUTA_NUEVA, codigo).length).toBeGreaterThan(0)
  })

  it('tipografia: el codigo correcto no genera hallazgos', () => {
    expect(detectarDesviacionesTipograficas(RUTA_NUEVA, '<h1 className="text-titulo-pagina text-texto">x</h1>')).toEqual([])
  })

  it('color: un t-xxxxxx nuevo se detecta', () => {
    expect(detectarColorNombradoNoAutorizado(RUTA_NUEVA, '<div className="bg-t-123456" />')).toHaveLength(1)
  })

  it('color: un t-xxxxxx de texto se detecta aunque el color este registrado', () => {
    expect(detectarColorNombradoNoAutorizado(RUTA_NUEVA, '<p className="text-t-007aff">x</p>').length).toBeGreaterThan(0)
  })

  it('color: un t-xxxxxx registrado como identidad no se marca', () => {
    expect(detectarColorNombradoNoAutorizado(RUTA_NUEVA, '<div className="bg-t-007aff" />')).toEqual([])
  })

  it('boton: un <button> nativo no registrado se detecta', () => {
    expect(detectarBotonNativoNoRegistrado(RUTA_NUEVA, '<button type="button" className="rounded px-3">Enviar</button>')).toHaveLength(1)
  })

  it('boton: un archivo registrado no se marca hasta superar su cantidad', () => {
    const ruta = '/componentes/eventos/bloques/bloque_hoy.tsx'
    expect(detectarBotonNativoNoRegistrado(ruta, '<button></button><button></button><button></button>')).toEqual([])
    expect(detectarBotonNativoNoRegistrado(ruta, '<button></button><button></button><button></button><button></button>')).toHaveLength(1)
  })

  it('panel: reescribir el cascaron de PanelLateral se detecta, y el propio PanelLateral no se marca', () => {
    const cascaron = '<section className="rounded-xl border border-borde bg-white p-4"><div className="mb-3.5 flex items-center justify-between"><h2 className="m-0 text-titulo-banner text-texto">T</h2></div></section>'
    expect(detectarPanelDuplicado(RUTA_NUEVA, cascaron)).toHaveLength(1)
    expect(detectarPanelDuplicado('/componentes/compartido/bloques/panel_lateral.tsx', cascaron)).toEqual([])
  })

  it('catalogo: texto visible en JSX y atributos accesibles fuera del catalogo se detectan', () => {
    expect(detectarTextoVisibleFueraDeCatalogo(RUTA_NUEVA, '<p>Hola mundo</p>').length).toBeGreaterThan(0)
    expect(detectarTextoVisibleFueraDeCatalogo(RUTA_NUEVA, '<button aria-label="Cerrar ventana" />').length).toBeGreaterThan(0)
    expect(detectarTextoVisibleFueraDeCatalogo(RUTA_NUEVA, '<p>{textos.titulo}</p>')).toEqual([])
  })

  it('ruta: una ruta literal en href o to se detecta', () => {
    expect(detectarRutaLiteral(RUTA_NUEVA, '<a href="/amigos">Amigos</a>')).toHaveLength(1)
    expect(detectarRutaLiteral(RUTA_NUEVA, '<a href={textos.rutas.amigos}>x</a>')).toEqual([])
  })

  it('frontera: importar un servicio desde un componente se detecta', () => {
    expect(detectarImportDeServicio(RUTA_NUEVA, "import { cargar } from '../../../servicios/amigos/amigos'")).toHaveLength(1)
    expect(detectarImportDeServicio(RUTA_NUEVA, "import { Boton } from '../../compartido'")).toEqual([])
  })

  it('modal: un dialogo propio no registrado se detecta; el Modal compartido y los paneles registrados no', () => {
    expect(detectarModalPropio(RUTA_NUEVA, '<div role="dialog" aria-modal="true" className="fixed inset-0" />')).toHaveLength(1)
    expect(detectarModalPropio('/componentes/compartido/interfaz/modal.tsx', '<div role="dialog" aria-modal="true" />')).toEqual([])
    expect(detectarModalPropio('/componentes/empresas/bloques/panel_filtros_avanzados_empresas.tsx', '<div role="dialog" />')).toEqual([])
  })

  it.each(['/redsocial/node_modules/.vite/vitest/x/results.json', '/redsocial/frontend/.vite/deps/a.js', '/redsocial/dist/index.html'])('arbol entregable: %s se detecta como artefacto', (ruta) => {
    expect(detectarArtefactoEnArbol([ruta])).toHaveLength(1)
  })

  it('arbol entregable: los archivos fuente no se marcan', () => {
    expect(detectarArtefactoEnArbol(['/redsocial/frontend/componentes/compartido/index.ts', '/redsocial/manifiesto-capacidad.json'])).toEqual([])
  })
})
