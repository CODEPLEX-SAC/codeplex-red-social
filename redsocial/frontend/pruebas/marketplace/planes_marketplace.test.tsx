import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import catalogoMarketplace from '@/catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '@/mensajes/capacidades/redsocial/textos.json'
import { DESTACADOS, PLANES_APLICACIONES } from '@/rutas/marketplace/rutas_marketplace'
import { fechaCorta } from '@/componentes/marketplace/bloques/logica_pago_planes'

const textos = catalogoMarketplace.planes
const pago = catalogoMarketplace.pago
const carrito = catalogoMarketplace.carrito
const misCompras = catalogoMarketplace.mis_compras
const contaplex = PLANES_APLICACIONES['conta-plex']

function botonesVerPlanes() {
  return screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) }) as HTMLButtonElement[]
}

function abrirPlanes(montar = true) {
  if (montar) render(<PaginaMarketplace />)
  fireEvent.click(botonesVerPlanes()[0])
  return screen.getByRole('dialog', { name: textos.titulo })
}

function etiquetaMenu(accion: string) {
  return misCompras.menu.find((o) => o.accion === accion)?.etiqueta ?? ''
}

function abrirMenuCompra(seccion: HTMLElement) {
  fireEvent.click(within(seccion).getByRole('button', { name: textosRedSocial.MAS_OPCIONES }))
}

function botonMisCompras() {
  return screen.getByRole('button', { name: new RegExp(catalogoMarketplace.botones.mis_compras) })
}

function comprarPrimerPlan() {
  const pantalla = irAlPago(0)
  fireEvent.click(within(pantalla).getByRole('checkbox', { name: new RegExp(pago.paso4.acepto.slice(0, 20)) }))
  fireEvent.click(within(pantalla).getByRole('button', { name: pago.resumen.activar }))
  fireEvent.click(within(pantalla).getByRole('button', { name: pago.exito.volver }))
}

function irAlPago(indicePlan: number, montar = true) {
  const dialogo = abrirPlanes(montar)
  fireEvent.click(within(dialogo).getAllByRole('button', { name: textos.elegir })[indicePlan])
  fireEvent.click(within(dialogo).getByRole('button', { name: new RegExp(textos.continuar) }))
  fireEvent.click(within(screen.getByRole('dialog', { name: carrito.titulo })).getByRole('button', { name: new RegExp(carrito.proceder) }))
  return screen.getByRole('dialog', { name: pago.titulo })
}

describe('Datos de planes de ContaPlex', () => {
  it('conserva los siete planes independientes y los dos empresariales con identificadores unicos', () => {
    expect(contaplex.tipos.map((t) => t.planes.length)).toEqual([7, 2])
    expect(new Set(contaplex.tipos[0].planes.map((p) => p.id)).size).toBe(7)
  })

  it('el icono de cada aplicacion en el proceso de planes es el mismo de su tarjeta destacada', () => {
    DESTACADOS.forEach((d) => {
      expect(PLANES_APLICACIONES[d.planes as string].icono).toBe(d.icono)
    })
  })

  it('las seis aplicaciones destacadas enlazan con su configuracion de planes', () => {
    expect(DESTACADOS.map((d) => d.planes).sort()).toEqual(Object.keys(PLANES_APLICACIONES).sort())
    expect(DESTACADOS[0].nombre).toBe(contaplex.nombre)
  })

  it('cada caracteristica de cada aplicacion tiene su ventana informativa', () => {
    const sinDetalle = Object.values(PLANES_APLICACIONES).flatMap((app) =>
      app.tipos.flatMap((t) => t.planes.flatMap((p) => p.caracteristicas.map((c) => c.texto))).filter((texto) => !app.detalles[texto]),
    )
    expect(sinDetalle).toEqual([])
    expect(Object.keys(contaplex.detalles)).toHaveLength(36)
  })

  it('cada plan trae al menos una etiqueta y los precios mensual y anual', () => {
    const planes = Object.values(PLANES_APLICACIONES).flatMap((app) => app.tipos.flatMap((t) => t.planes))
    expect(planes.filter((p) => p.etiquetas.length === 0 || !p.precio.mensual || !p.precio.anual)).toEqual([])
  })
})

describe('Boton Ver planes de Marketplace', () => {
  it('queda habilitado en las seis aplicaciones', () => {
    render(<PaginaMarketplace />)
    expect(botonesVerPlanes().map((b) => b.disabled)).toEqual([false, false, false, false, false, false])
  })

  it.each(DESTACADOS.map((d, i) => [d.planes as string, PLANES_APLICACIONES[d.planes as string].nombre, PLANES_APLICACIONES[d.planes as string].tipos[0].planes.length, i] as const))('%s abre su selector con %s y %i planes', (_id, nombre, cantidad, indice) => {
    render(<PaginaMarketplace />)
    fireEvent.click(botonesVerPlanes()[indice])
    const dialogo = screen.getByRole('dialog', { name: textos.titulo })
    expect(within(dialogo).getByRole('heading', { level: 2, name: nombre })).toBeInTheDocument()
    expect(within(dialogo).getByRole('group', { name: textos.lista }).querySelectorAll('article')).toHaveLength(cantidad)
  })
})

describe('Paquetes adicionales de Facturacion Electronica', () => {
  it('se abren desde el plan, muestran sus tarifas y Escape cierra solo el panel', () => {
    render(<PaginaMarketplace />)
    fireEvent.click(botonesVerPlanes()[2])
    const paquetes = PLANES_APLICACIONES['facturacion-electronica'].paquetes
    fireEvent.click(screen.getAllByRole('button', { name: paquetes?.ver })[0])
    expect(screen.getByRole('dialog', { name: paquetes?.titulo })).toBeInTheDocument()
    expect(screen.getByText(paquetes?.base_datos.pago_unico.valor ?? '')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: paquetes?.titulo })).toBeNull()
    expect(screen.getByRole('dialog', { name: textos.titulo })).toBeInTheDocument()
  })

  it('las aplicaciones de una sola modalidad no muestran el control segmentado', () => {
    render(<PaginaMarketplace />)
    fireEvent.click(botonesVerPlanes()[3])
    expect(screen.queryByRole('group', { name: textos.modalidad })).toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: PLANES_APLICACIONES['gestionplex-restaurante'].nombre })).toBeInTheDocument()
  })
})

describe('Selector de planes de ContaPlex', () => {
  it('abre un modal sin barra de titulo con el cierre flotante y la fila de siete planes', () => {
    const dialogo = abrirPlanes()
    expect(within(dialogo).queryByRole('heading', { name: textos.titulo })).toBeNull()
    expect(within(dialogo).getByRole('heading', { level: 2, name: contaplex.nombre })).toBeInTheDocument()
    expect(within(dialogo).getByRole('group', { name: textos.lista }).querySelectorAll('article')).toHaveLength(7)
  })

  it('cambia entre las modalidades con el control segmentado', () => {
    const dialogo = abrirPlanes()
    fireEvent.click(within(dialogo).getByRole('button', { name: new RegExp(contaplex.tipos[1].nombre) }))
    expect(within(dialogo).getByRole('group', { name: textos.lista }).querySelectorAll('article')).toHaveLength(2)
    expect(within(dialogo).queryByText('Gold')).toBeNull()
  })

  it('muestra los precios anuales con el interruptor', () => {
    const dialogo = abrirPlanes()
    fireEvent.click(within(dialogo).getByRole('switch', { name: textos.periodo.anual }))
    expect(within(dialogo).getByText('2,000')).toBeInTheDocument()
  })

  it('exige elegir un plan y al continuar lo agrega al carrito', () => {
    const dialogo = abrirPlanes()
    expect(within(dialogo).queryByRole('button', { name: new RegExp(textos.continuar) })).toBeNull()
    fireEvent.click(within(dialogo).getAllByRole('button', { name: textos.elegir })[1])
    fireEvent.click(within(dialogo).getByRole('button', { name: new RegExp(textos.continuar) }))
    const carro = screen.getByRole('dialog', { name: carrito.titulo })
    expect(screen.queryByRole('dialog', { name: textos.titulo })).toBeNull()
    expect(within(carro).getByRole('heading', { level: 3, name: contaplex.nombre })).toBeInTheDocument()
    expect(within(carro).getAllByText(carrito.plan.replace(':plan', contaplex.tipos[0].planes[1].nombre)).length).toBeGreaterThan(0)
  })

  it('el carrito permite quitar la aplicacion y muestra el estado vacio', () => {
    const dialogo = abrirPlanes()
    fireEvent.click(within(dialogo).getAllByRole('button', { name: textos.elegir })[0])
    fireEvent.click(within(dialogo).getByRole('button', { name: new RegExp(textos.continuar) }))
    const carro = screen.getByRole('dialog', { name: carrito.titulo })
    fireEvent.click(within(carro).getByRole('button', { name: carrito.quitar.replace(':nombre', contaplex.nombre) }))
    expect(within(carro).getByText(carrito.vacio_titulo)).toBeInTheDocument()
  })

  it('cambiar plan desde el carrito vuelve al selector de la aplicacion', () => {
    const dialogo = abrirPlanes()
    fireEvent.click(within(dialogo).getAllByRole('button', { name: textos.elegir })[0])
    fireEvent.click(within(dialogo).getByRole('button', { name: new RegExp(textos.continuar) }))
    fireEvent.click(within(screen.getByRole('dialog', { name: carrito.titulo })).getByRole('button', { name: carrito.cambiar_plan }))
    expect(screen.getByRole('dialog', { name: textos.titulo })).toBeInTheDocument()
  })

  it('en la pantalla de pago solo se activa tras aceptar los terminos y el Super VIP suma al total', () => {
    const pantalla = irAlPago(1)
    const activar = within(pantalla).getByRole('button', { name: pago.resumen.activar })
    expect(activar).toBeDisabled()
    expect(within(pantalla).getAllByText('S/50').length).toBeGreaterThan(0)
    fireEvent.click(within(pantalla).getByRole('checkbox', { name: pago.vip.agregar }))
    expect(within(pantalla).getAllByText('S/550').length).toBeGreaterThan(0)
    fireEvent.click(within(pantalla).getByRole('checkbox', { name: new RegExp(pago.paso4.acepto.slice(0, 20)) }))
    expect(activar).toBeEnabled()
  })

  it('el Super VIP llega cerrado, se despliega con sus ocho beneficios y la casilla siempre esta disponible', () => {
    const pantalla = irAlPago(0)
    const alternar = within(pantalla).getByRole('button', { name: pago.vip.mostrar })
    expect(alternar).toHaveAttribute('aria-expanded', 'false')
    expect(within(pantalla).queryByText(pago.vip.actualizaciones)).toBeNull()
    expect(within(pantalla).getByRole('checkbox', { name: pago.vip.agregar })).toBeInTheDocument()
    fireEvent.click(alternar)
    const cerrar = within(pantalla).getByRole('button', { name: pago.vip.ocultar })
    expect(cerrar).toHaveAttribute('aria-expanded', 'true')
    expect(within(pantalla).getByText(pago.vip.actualizaciones)).toBeInTheDocument()
    expect(within(pantalla).getAllByText(/^0[1-8]$/)).toHaveLength(8)
    fireEvent.click(within(pantalla).getByRole('checkbox', { name: pago.vip.agregar }))
    fireEvent.click(cerrar)
    expect(within(pantalla).getByRole('checkbox', { name: pago.vip.agregar })).toBeChecked()
  })

  it('al activar muestra la confirmacion de demostracion y registra la compra en Mis compras recientes', () => {
    const pantalla = irAlPago(0)
    fireEvent.click(within(pantalla).getByRole('checkbox', { name: new RegExp(pago.paso4.acepto.slice(0, 20)) }))
    fireEvent.click(within(pantalla).getByRole('button', { name: pago.resumen.activar }))
    expect(within(pantalla).getByText(pago.exito.titulo)).toBeInTheDocument()
    fireEvent.click(within(pantalla).getByRole('button', { name: pago.exito.volver }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByText([textos.plan_seleccionado, contaplex.tipos[0].planes[0].nombre].join(': '))).toBeInTheDocument()
    expect(screen.getAllByText(carrito.adquirido.replace(':fecha', fechaCorta())).length).toBeGreaterThan(0)
  })

  it('la tarjeta usada queda guardada sin el numero completo y se ofrece en la siguiente compra', () => {
    const pantalla = irAlPago(0)
    fireEvent.change(within(pantalla).getByRole('textbox', { name: pago.campos.numero }), { target: { value: '4111111111111234' } })
    fireEvent.click(within(pantalla).getByRole('checkbox', { name: new RegExp(pago.paso4.acepto.slice(0, 20)) }))
    fireEvent.click(within(pantalla).getByRole('button', { name: pago.resumen.activar }))
    fireEvent.click(within(pantalla).getByRole('button', { name: pago.exito.volver }))
    const siguiente = irAlPago(0, false)
    expect(within(siguiente).getByText(pago.guardados.enmascarada.replace(':ultimos', '1234'))).toBeInTheDocument()
    expect(within(siguiente).queryByRole('textbox', { name: pago.campos.numero })).toBeNull()
  })

  it('Mis compras sustituye Destacados y Mas categorias por el listado y Ver catalogo los devuelve', () => {
    render(<PaginaMarketplace />)
    expect(screen.getByRole('heading', { name: catalogoMarketplace.secciones.destacados })).toBeInTheDocument()
    fireEvent.click(botonMisCompras())
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.queryByRole('heading', { name: catalogoMarketplace.secciones.destacados })).toBeNull()
    expect(screen.queryByRole('heading', { name: catalogoMarketplace.secciones.mas_categorias })).toBeNull()
    const seccion = screen.getByRole('region', { name: misCompras.titulo })
    expect(within(seccion).getByText(misCompras.vacio_titulo)).toBeInTheDocument()
    fireEvent.click(within(seccion).getByRole('button', { name: misCompras.ver_catalogo }))
    expect(screen.queryByRole('region', { name: misCompras.titulo })).toBeNull()
    expect(screen.getByRole('heading', { name: catalogoMarketplace.secciones.destacados })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: catalogoMarketplace.secciones.mas_categorias })).toBeInTheDocument()
  })

  it('tras comprar, Mis compras muestra la aplicacion con plan, fechas, aviso y contadores en las pestanas', () => {
    comprarPrimerPlan()
    fireEvent.click(botonMisCompras())
    const seccion = screen.getByRole('region', { name: misCompras.titulo })
    expect(within(seccion).getByRole('tab', { name: misCompras.pestanas[0].etiqueta.replace(':n', '1') })).toBeInTheDocument()
    expect(within(seccion).getByRole('tab', { name: misCompras.pestanas[1].etiqueta.replace(':n', '0') })).toBeInTheDocument()
    expect(within(seccion).getByText(contaplex.tipos[0].planes[0].nombre)).toBeInTheDocument()
    expect(within(seccion).getByText(contaplex.lema)).toBeInTheDocument()
    expect(within(seccion).getByText(misCompras.estados.prueba.etiqueta)).toBeInTheDocument()
    expect(within(seccion).queryByRole('button', { name: misCompras.abrir_aria.replace(':nombre', contaplex.nombre) })).toBeNull()
    expect(within(seccion).getByText(fechaCorta())).toBeInTheDocument()
    expect(within(seccion).getByText(fechaCorta(1))).toBeInTheDocument()
    expect(within(seccion).getByText(misCompras.aviso)).toBeInTheDocument()
    expect(within(seccion).getByRole('button', { name: misCompras.mejorar })).toBeInTheDocument()
    expect(within(seccion).getByRole('button', { name: misCompras.detalles })).toBeInTheDocument()
  })

  it('el menu de la aplicacion ofrece solo Super VIP, Abrir (sin ruta, deshabilitada) y Desinstalar con confirmacion honesta', () => {
    comprarPrimerPlan()
    fireEvent.click(botonMisCompras())
    const seccion = screen.getByRole('region', { name: misCompras.titulo })
    abrirMenuCompra(seccion)
    expect(screen.getAllByRole('menuitem').map((i) => i.textContent)).toEqual(misCompras.menu.map((o) => o.etiqueta))
    expect(screen.getByRole('menuitem', { name: etiquetaMenu('abrir') })).toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('desinstalar') }))
    const titulo = misCompras.confirmar_titulo.replace(':nombre', contaplex.nombre)
    fireEvent.click(within(screen.getByRole('dialog', { name: titulo })).getByRole('button', { name: misCompras.cancelar }))
    expect(within(seccion).getByText(contaplex.tipos[0].planes[0].nombre)).toBeInTheDocument()
    abrirMenuCompra(seccion)
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('desinstalar') }))
    fireEvent.click(within(screen.getByRole('dialog', { name: titulo })).getByRole('button', { name: misCompras.confirmar_si }))
    expect(within(seccion).getByText(misCompras.vacio_titulo)).toBeInTheDocument()
  })

  it('Contratar Super VIP desde el menu lo registra en Servicios adicionales y deja de ofrecerse', () => {
    comprarPrimerPlan()
    fireEvent.click(botonMisCompras())
    const seccion = screen.getByRole('region', { name: misCompras.titulo })
    abrirMenuCompra(seccion)
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('contratarVip') }))
    fireEvent.click(within(seccion).getByRole('tab', { name: misCompras.pestanas[1].etiqueta.replace(':n', '1') }))
    expect(within(seccion).getByText(misCompras.servicio.titulo)).toBeInTheDocument()
    expect(within(seccion).getByText(misCompras.servicio.para.replace(':nombre', contaplex.nombre))).toBeInTheDocument()
    fireEvent.click(within(seccion).getByRole('tab', { name: misCompras.pestanas[0].etiqueta.replace(':n', '1') }))
    abrirMenuCompra(seccion)
    expect(screen.queryByRole('menuitem', { name: etiquetaMenu('contratarVip') })).toBeNull()
  })

  it('Ver detalles muestra el estado y los datos, y Incluye es un desplegable cerrado que muestra todas las caracteristicas', () => {
    comprarPrimerPlan()
    fireEvent.click(botonMisCompras())
    fireEvent.click(within(screen.getByRole('region', { name: misCompras.titulo })).getByRole('button', { name: misCompras.detalles }))
    const dialogo = screen.getByRole('dialog', { name: misCompras.detalle.titulo })
    expect(within(dialogo).getByText(misCompras.estados.prueba.etiqueta)).toBeInTheDocument()
    expect(within(dialogo).getByText(fechaCorta(1))).toBeInTheDocument()
    const incluye = within(dialogo).getByRole('button', { name: misCompras.detalle.incluye })
    expect(incluye).toHaveAttribute('aria-expanded', 'false')
    const incluidas = contaplex.tipos[0].planes[0].caracteristicas.map((c) => c.texto)
    expect(within(dialogo).getByText(incluidas[0])).not.toBeVisible()
    fireEvent.click(incluye)
    expect(incluye).toHaveAttribute('aria-expanded', 'true')
    incluidas.forEach((texto) => expect(within(dialogo).getByText(texto)).toBeVisible())
  })

  it('desinstalar con Super VIP lo advierte, quita ambos y no promete borrar datos', () => {
    comprarPrimerPlan()
    fireEvent.click(botonMisCompras())
    const seccion = screen.getByRole('region', { name: misCompras.titulo })
    abrirMenuCompra(seccion)
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('contratarVip') }))
    abrirMenuCompra(seccion)
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('desinstalar') }))
    const confirmar = screen.getByRole('dialog', { name: misCompras.confirmar_titulo.replace(':nombre', contaplex.nombre) })
    expect(within(confirmar).getByText(new RegExp(misCompras.confirmar_vip))).toBeInTheDocument()
    expect(within(confirmar).queryByText(/datos/i)).toBeNull()
    fireEvent.click(within(confirmar).getByRole('button', { name: misCompras.confirmar_si }))
    expect(within(seccion).getByRole('tab', { name: misCompras.pestanas[1].etiqueta.replace(':n', '0') })).toBeInTheDocument()
  })

  it('Super VIP en el pago no hereda el mes gratis: hoy se cobra solo el servicio adicional', () => {
    const pantalla = irAlPago(0)
    expect(within(pantalla).getByText(pago.resumen.cobro_hoy_valor)).toBeInTheDocument()
    fireEvent.click(within(pantalla).getByRole('checkbox', { name: pago.vip.agregar }))
    expect(within(pantalla).queryByText(pago.resumen.cobro_hoy_valor)).toBeNull()
    expect(within(pantalla).getAllByText('S/500').length).toBeGreaterThan(1)
    expect(within(pantalla).getByText(pago.resumen.seguro_vip)).toBeInTheDocument()
  })

  it('si la aplicacion ya tiene Super VIP, el pago de un nuevo plan no lo vuelve a ofrecer', () => {
    comprarPrimerPlan()
    fireEvent.click(botonMisCompras())
    const seccion = screen.getByRole('region', { name: misCompras.titulo })
    abrirMenuCompra(seccion)
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('contratarVip') }))
    fireEvent.click(within(seccion).getByRole('button', { name: misCompras.mejorar }))
    const planes = screen.getByRole('dialog', { name: textos.titulo })
    fireEvent.click(within(planes).getAllByRole('button', { name: textos.elegir })[1])
    fireEvent.click(within(planes).getByRole('button', { name: new RegExp(textos.continuar) }))
    fireEvent.click(within(screen.getByRole('dialog', { name: carrito.titulo })).getByRole('button', { name: new RegExp(carrito.proceder) }))
    const pantalla = screen.getByRole('dialog', { name: pago.titulo })
    expect(within(pantalla).queryByRole('checkbox', { name: pago.vip.agregar })).toBeNull()
  })

  it('Mejorar plan abre el selector de esa aplicacion sin salir de Mis compras', () => {
    comprarPrimerPlan()
    fireEvent.click(botonMisCompras())
    fireEvent.click(within(screen.getByRole('region', { name: misCompras.titulo })).getByRole('button', { name: misCompras.mejorar }))
    expect(screen.getByRole('dialog', { name: textos.titulo })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: misCompras.titulo })).toBeInTheDocument()
  })

  it('abre la ventana informativa de una caracteristica y Escape cierra solo esa ventana', () => {
    const dialogo = abrirPlanes()
    const texto = 'Procesos contables esenciales'
    fireEvent.click(within(dialogo).getAllByRole('button', { name: texto })[0])
    const detalle = screen.getByRole('dialog', { name: contaplex.detalles[texto].titulo })
    expect(within(detalle).getByText(contaplex.detalles[texto].descripcion)).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: contaplex.detalles[texto].titulo })).toBeNull()
    expect(screen.getByRole('dialog', { name: textos.titulo })).toBeInTheDocument()
  })

  it('el asistente responde con la respuesta registrada y muestra la hora', () => {
    const dialogo = abrirPlanes()
    fireEvent.click(within(dialogo).getAllByRole('button', { name: textos.asistente.abrir })[0])
    const pregunta = contaplex.asistente.rapidas[1]
    fireEvent.click(within(dialogo).getByRole('button', { name: pregunta }))
    expect(within(dialogo).getByText(contaplex.asistente.respuestas[pregunta])).toBeInTheDocument()
    expect(within(dialogo).getAllByText(/^\d{2}:\d{2}/).length).toBeGreaterThan(1)
  })

  it('el catalogo PDF se abre en un segundo modal y Escape cierra solo el visor', () => {
    const dialogo = abrirPlanes()
    fireEvent.click(within(dialogo).getAllByRole('button', { name: textos.asistente.abrir })[0])
    fireEvent.click(within(dialogo).getByRole('button', { name: textos.asistente.catalogo_ver_etiqueta }))
    expect(screen.getAllByRole('dialog')).toHaveLength(2)
    expect(screen.getByTitle(textos.visor.marco)).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.getAllByRole('dialog')).toHaveLength(1)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
