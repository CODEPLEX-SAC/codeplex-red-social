import { fireEvent, screen, within } from '@testing-library/react'
import { renderEmpresas, SUSCRIPCIONES } from './entorno_empresas'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import dayjs from 'dayjs'
import { datosDesdeEmpresa, edicionCompleta, empresaDesdeEdicion, opcionesDeUbigeo, reajustarUbigeo } from '../../componentes/empresas/bloques/logica_edicion_empresa'
import { crearFiltrosAvanzados, filtrarEmpresas, TODOS } from '../../componentes/empresas/bloques/logica_listado_empresas'
import { filtrarHistorial, TODOS_LOS_TIPOS } from '../../componentes/empresas/bloques/logica_historial_empresa'
import { EMPRESAS } from '../../servicios/empresas/empresas'
import { HISTORIAL_BASE_EMPRESA } from '../../servicios/empresas/historial_empresa'

const total = EMPRESAS.length
const resumen = (desde: number, hasta: number, cantidad: number) =>
  catalogoEmpresas.paginacion.resumen.replace('{desde}', String(desde)).replace('{hasta}', String(hasta)).replace('{total}', String(cantidad))

function filasDeDatos() {
  return screen.getAllByRole('row').slice(1)
}

const textosAvanzados = catalogoEmpresas.filtros_avanzados

function abrirFiltrosAvanzados() {
  fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.filtros_avanzados }))
  return within(screen.getByRole('dialog', { name: textosAvanzados.titulo }))
}

function elegir(etiqueta: string, opcion: string) {
  fireEvent.mouseDown(screen.getByRole('combobox', { name: etiqueta }))
  fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: opcion }))
}

describe('Pagina Empresas', { timeout: 30000 }, () => {
  it('muestra la cabecera, la ruta de navegacion y la primera pagina del listado', () => {
    renderEmpresas()

    expect(screen.getByRole('heading', { level: 1, name: catalogoEmpresas.titulos.listado })).toBeInTheDocument()
    expect(screen.getByText(catalogoEmpresas.subtitulos.listado)).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: catalogoEmpresas.migas.etiqueta })).toHaveTextContent(catalogoEmpresas.migas.espacio_trabajo)
    expect(screen.getByRole('button', { name: catalogoEmpresas.botones.nueva_empresa })).toBeInTheDocument()
    expect(filasDeDatos()).toHaveLength(10)
    expect(screen.getByText(resumen(1, 10, total))).toBeInTheDocument()
    expect(within(filasDeDatos()[0]).getByText(EMPRESAS[0].nombre)).toBeInTheDocument()
    expect(within(filasDeDatos()[0]).getByText(catalogoEmpresas.codigo_empresa.replace(':codigo', EMPRESAS[0].codigo))).toBeInTheDocument()
  })

  it('filtra por RUC, nombre o correo y restablece la pagina', () => {
    renderEmpresas()
    const buscador = screen.getByRole('searchbox', { name: catalogoEmpresas.campos.buscar_empresa })

    fireEvent.change(buscador, { target: { value: EMPRESAS[1].ruc } })
    expect(filasDeDatos()).toHaveLength(1)
    expect(screen.getByText(EMPRESAS[1].nombre)).toBeInTheDocument()
    expect(screen.getByText(resumen(1, 1, 1))).toBeInTheDocument()

    fireEvent.change(buscador, { target: { value: 'sin coincidencias posibles' } })
    expect(screen.getByText(catalogoEmpresas.mensajes.sin_empresas)).toBeInTheDocument()
    expect(screen.getByText(resumen(0, 0, 0))).toBeInTheDocument()
  })

  it('filtra por estado, plan y modulo desde la barra y por rubro desde Filtros avanzados', () => {
    renderEmpresas()

    expect(screen.queryByRole('combobox', { name: catalogoEmpresas.selectores.rubro.etiqueta })).toBeNull()
    expect(screen.getByRole('combobox', { name: catalogoEmpresas.selectores.plan.etiqueta })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: catalogoEmpresas.selectores.modulo.etiqueta })).toBeInTheDocument()

    elegir(catalogoEmpresas.selectores.estado.etiqueta, catalogoEmpresas.estados.inactiva)
    const inactivas = EMPRESAS.filter((empresa) => empresa.estado === 'inactiva')
    expect(filasDeDatos()).toHaveLength(inactivas.length)
    expect(screen.getByText(inactivas[0].nombre)).toBeInTheDocument()

    elegir(catalogoEmpresas.selectores.estado.etiqueta, catalogoEmpresas.selectores.estado.opciones[0])
    elegir(catalogoEmpresas.selectores.plan.etiqueta, SUSCRIPCIONES[1].planNombre)
    const conFacturacion = EMPRESAS.filter((empresa) => empresa.modulos.includes('facturacion'))
    expect(filasDeDatos()).toHaveLength(Math.min(10, conFacturacion.length))

    elegir(catalogoEmpresas.selectores.modulo.etiqueta, catalogoEmpresas.modulos[1].etiqueta)
    expect(filasDeDatos()).toHaveLength(Math.min(10, conFacturacion.length))

    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.limpiar }))
    expect(screen.getByText(resumen(1, Math.min(10, total), total))).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: catalogoEmpresas.selectores.plan.etiqueta })).toHaveTextContent(TODOS)

    const panel = abrirFiltrosAvanzados()
    elegir(catalogoEmpresas.selectores.rubro.etiqueta, 'Pyme')
    fireEvent.click(panel.getByRole('button', { name: textosAvanzados.aplicar }))
    expect(screen.queryByRole('dialog', { name: textosAvanzados.titulo })).toBeNull()
    expect(filasDeDatos()).toHaveLength(EMPRESAS.filter((empresa) => empresa.rubro === 'Pyme').length)

    fireEvent.click(abrirFiltrosAvanzados().getByRole('button', { name: textosAvanzados.limpiar }))
    expect(screen.getByText(resumen(1, Math.min(10, total), total))).toBeInTheDocument()
  })

  it('Limpiar de la barra restablece la busqueda, el estado, el plan y el modulo', () => {
    renderEmpresas()
    fireEvent.change(screen.getByRole('searchbox', { name: catalogoEmpresas.campos.buscar_empresa }), { target: { value: EMPRESAS[1].ruc } })
    elegir(catalogoEmpresas.selectores.plan.etiqueta, SUSCRIPCIONES[0].planNombre)
    expect(filasDeDatos()).toHaveLength(1)

    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.limpiar }))
    expect(screen.getByRole('searchbox', { name: catalogoEmpresas.campos.buscar_empresa })).toHaveValue('')
    expect(filasDeDatos()).toHaveLength(Math.min(10, total))
  })

  it('el panel de Filtros avanzados trae rubro, fecha de registro desde y hasta, limpiar y aplicar, sin el plan que ya esta en la barra', () => {
    renderEmpresas()
    const panel = abrirFiltrosAvanzados()

    expect(panel.getByRole('combobox', { name: catalogoEmpresas.selectores.rubro.etiqueta })).toBeInTheDocument()
    expect(panel.queryByRole('combobox', { name: catalogoEmpresas.selectores.plan.etiqueta })).toBeNull()
    expect(panel.getByText(textosAvanzados.fecha_registro)).toBeInTheDocument()
    expect(panel.getByText(textosAvanzados.desde)).toBeInTheDocument()
    expect(panel.getByText(textosAvanzados.hasta)).toBeInTheDocument()
    expect(panel.getByRole('button', { name: textosAvanzados.limpiar })).toBeInTheDocument()
    expect(panel.getByRole('button', { name: textosAvanzados.aplicar })).toBeInTheDocument()
  })

  it('filtra por fecha de registro entre desde y hasta', () => {
    const fechas = EMPRESAS.map((empresa) => {
      const [dia, mes, anio] = empresa.fechaRegistro.split('/')
      return dayjs(new Date(Number(anio), Number(mes) - 1, Number(dia)))
    })
    const corte = fechas[0]
    const desde = filtrarEmpresas(EMPRESAS, { ...crearFiltrosAvanzados(), busqueda: '', estado: catalogoEmpresas.selectores.estado.opciones[0], desde: corte })
    expect(desde.length).toBe(fechas.filter((fecha) => !fecha.isBefore(corte, 'day')).length)
    const hasta = filtrarEmpresas(EMPRESAS, { ...crearFiltrosAvanzados(), busqueda: '', estado: catalogoEmpresas.selectores.estado.opciones[0], hasta: corte })
    expect(hasta.length).toBe(fechas.filter((fecha) => !fecha.isAfter(corte, 'day')).length)
  })

  it('pagina el listado en bloques de diez al registrar una empresa mas', () => {
    renderEmpresas()
    expect(screen.queryByRole('combobox', { name: 'Empresas por página' })).toBeNull()

    const dialogo = abrirModal()
    completarFormulario(dialogo)
    fireEvent.click(dialogo.getByRole('button', { name: modalEmpresa.guardar }))
    expect(screen.getByText(resumen(1, 10, total + 1))).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }))
    expect(screen.getByText(resumen(11, 11, total + 1))).toBeInTheDocument()
    expect(filasDeDatos()).toHaveLength(1)
  })

  it('la tabla no ofrece casillas de seleccion', () => {
    renderEmpresas()
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
  })
})

const modalEmpresa = catalogoEmpresas.modal_empresa
const camposModal = modalEmpresa.campos

function abrirModal() {
  const boton = screen.getByRole('button', { name: catalogoEmpresas.botones.nueva_empresa })
  boton.focus()
  fireEvent.click(boton)
  return within(screen.getByRole('dialog', { name: modalEmpresa.titulo }))
}

function escribirCampo(dialogo: ReturnType<typeof abrirModal>, etiqueta: string, valor: string) {
  fireEvent.change(dialogo.getByRole('textbox', { name: new RegExp(etiqueta) }), { target: { value: valor } })
}

function completarFormulario(dialogo: ReturnType<typeof abrirModal>) {
  escribirCampo(dialogo, camposModal.ruc, '20555666777')
  escribirCampo(dialogo, camposModal.razon_social, 'Nueva Empresa de Prueba SAC')
  escribirCampo(dialogo, camposModal.direccion, 'Av. Javier Prado 1234')
  escribirCampo(dialogo, camposModal.telefono, '987654321')
  escribirCampo(dialogo, camposModal.email, 'contacto@nueva.pe')
}

describe('Modal Nueva empresa', { timeout: 30000 }, () => {
  it('abre con la cabecera propia, deshabilita Guardar y se cierra con la x, Cancelar y Escape devolviendo el foco', () => {
    renderEmpresas()
    const dialogo = abrirModal()

    expect(dialogo.getByText(modalEmpresa.subtitulo)).toBeInTheDocument()
    expect(dialogo.getByRole('button', { name: modalEmpresa.guardar })).toBeDisabled()
    expect(screen.getAllByRole('dialog')).toHaveLength(1)

    fireEvent.click(dialogo.getByRole('button', { name: 'Cerrar' }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByRole('button', { name: catalogoEmpresas.botones.nueva_empresa })).toHaveFocus()

    fireEvent.click(abrirModal().getByRole('button', { name: modalEmpresa.cancelar }))
    expect(screen.queryByRole('dialog')).toBeNull()

    abrirModal()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByRole('button', { name: catalogoEmpresas.botones.nueva_empresa })).toHaveFocus()
  })

  it('valida el RUC de 11 digitos', () => {
    renderEmpresas()
    const dialogo = abrirModal()

    escribirCampo(dialogo, camposModal.ruc, '123')
    fireEvent.click(dialogo.getByRole('button', { name: modalEmpresa.validar }))
    expect(dialogo.getByRole('alert')).toHaveTextContent(modalEmpresa.ruc_invalido)

    escribirCampo(dialogo, camposModal.ruc, '20555666777')
    expect(dialogo.queryByRole('alert')).toBeNull()
    fireEvent.click(dialogo.getByRole('button', { name: modalEmpresa.validar }))
    expect(dialogo.getByRole('status')).toHaveTextContent(modalEmpresa.ruc_valido)
  })

  it('guarda la empresa completando los datos obligatorios y la muestra primera en el listado', () => {
    renderEmpresas()
    const dialogo = abrirModal()
    completarFormulario(dialogo)

    const guardar = dialogo.getByRole('button', { name: modalEmpresa.guardar })
    expect(guardar).toBeEnabled()
    fireEvent.click(guardar)

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(within(filasDeDatos()[0]).getByText('Nueva Empresa de Prueba SAC')).toBeInTheDocument()
    expect(within(filasDeDatos()[0]).getByText('20555666777')).toBeInTheDocument()
    expect(screen.getByText(resumen(1, 10, total + 1))).toBeInTheDocument()
  })

  it('rechaza un logo que no es PNG o JPG', () => {
    renderEmpresas()
    const dialogo = abrirModal()
    const entrada = dialogo.getByLabelText(modalEmpresa.logo.cambiar, { selector: 'input' })

    fireEvent.change(entrada, { target: { files: [new File(['x'], 'logo.gif', { type: 'image/gif' })] } })
    expect(dialogo.getByRole('alert')).toHaveTextContent(modalEmpresa.logo.error_tipo)
  })
})

describe('Desactivar empresa', { timeout: 30000 }, () => {
  const textosDesactivar = catalogoEmpresas.modal_desactivar

  function pedirDesactivacion(nombre: string) {
    const boton = screen.getByRole('button', { name: catalogoEmpresas.botones.desactivar.replace(':nombre', nombre) })
    boton.focus()
    fireEvent.click(boton)
    return within(screen.getByRole('dialog', { name: textosDesactivar.titulo }))
  }

  it('muestra la confirmacion con el nombre de la empresa y Cancelar no cambia nada', () => {
    renderEmpresas()
    const dialogo = pedirDesactivacion(EMPRESAS[0].nombre)

    expect(dialogo.getByText(EMPRESAS[0].nombre, { exact: false })).toBeInTheDocument()
    expect(dialogo.getByText(textosDesactivar.detalle)).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: textosDesactivar.cancelar }))

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByRole('button', { name: catalogoEmpresas.botones.desactivar.replace(':nombre', EMPRESAS[0].nombre) })).toBeEnabled()
    expect(screen.getByRole('button', { name: catalogoEmpresas.botones.desactivar.replace(':nombre', EMPRESAS[0].nombre) })).toHaveFocus()
  })

  it('confirmar pasa la empresa a Inactiva y la opcion deja de ofrecerse en esa fila', () => {
    renderEmpresas()
    fireEvent.click(pedirDesactivacion(EMPRESAS[0].nombre).getByRole('button', { name: textosDesactivar.confirmar }))

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.queryByRole('button', { name: catalogoEmpresas.botones.desactivar.replace(':nombre', EMPRESAS[0].nombre) })).toBeNull()
    expect(screen.getByRole('button', { name: catalogoEmpresas.botones.activar.replace(':nombre', EMPRESAS[0].nombre) })).toBeEnabled()
  })

  it('en una empresa inactiva ofrece activar, pide confirmacion y la vuelve Activa', () => {
    renderEmpresas()
    const inactiva = EMPRESAS.find((empresa) => empresa.estado === 'inactiva')
    expect(inactiva).toBeDefined()
    const nombre = inactiva?.nombre ?? ''
    elegir(catalogoEmpresas.selectores.estado.etiqueta, catalogoEmpresas.estados.inactiva)
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.activar.replace(':nombre', nombre) }))
    const dialogo = within(screen.getByRole('dialog', { name: catalogoEmpresas.modal_activar.titulo }))

    fireEvent.click(dialogo.getByRole('button', { name: catalogoEmpresas.modal_activar.confirmar }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.queryByRole('button', { name: catalogoEmpresas.botones.activar.replace(':nombre', nombre) })).toBeNull()
  })

  it('se cierra con Escape y con la x', () => {
    renderEmpresas()
    pedirDesactivacion(EMPRESAS[1].nombre)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()

    fireEvent.click(pedirDesactivacion(EMPRESAS[1].nombre).getByRole('button', { name: 'Cerrar' }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})

describe('Detalle de empresa', { timeout: 30000 }, () => {
  const textosDetalle = catalogoEmpresas.detalle_empresa

  function abrirDetalle(nombre: string) {
    const boton = screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', nombre) })
    boton.focus()
    fireEvent.click(boton)
    return within(screen.getByRole('dialog', { name: textosDetalle.titulo }))
  }

  it('muestra las filas con el logo de la empresa', () => {
    const { container } = renderEmpresas()
    expect(container.querySelectorAll('tbody tr img')).toHaveLength(10)
  })

  it('Ver detalle abre la informacion general y completa de la empresa', () => {
    renderEmpresas()
    const dialogo = abrirDetalle(EMPRESAS[0].nombre)

    expect(dialogo.getByText(textosDetalle.subtitulo)).toBeInTheDocument()
    expect(dialogo.getByRole('heading', { level: 3, name: EMPRESAS[0].nombre })).toBeInTheDocument()
    expect(dialogo.getByRole('tab', { name: textosDetalle.pestanas.informacion })).toHaveAttribute('aria-selected', 'true')
    expect(dialogo.getByText(EMPRESAS[0].ruc)).toBeInTheDocument()
    expect(dialogo.getByText(EMPRESAS[0].direccion)).toBeInTheDocument()
    expect(dialogo.getByText(EMPRESAS[0].correo)).toBeInTheDocument()
    expect(dialogo.getByRole('link', { name: textosDetalle.abrir_web })).toHaveAttribute('href', EMPRESAS[0].web)
    expect(dialogo.getByRole('img', { name: textosDetalle.logo_alt.replace(':nombre', EMPRESAS[0].nombre) })).toBeInTheDocument()
  })

  it('cambia entre las pestanas del detalle', () => {
    renderEmpresas()
    const dialogo = abrirDetalle(EMPRESAS[0].nombre)

    fireEvent.click(dialogo.getByRole('tab', { name: textosDetalle.pestanas.historial }))
    expect(dialogo.getByText(catalogoEmpresas.historial_empresa.titulo)).toBeInTheDocument()

    fireEvent.click(dialogo.getByRole('tab', { name: textosDetalle.pestanas.usuarios }))
    expect(dialogo.getByRole('tab', { name: textosDetalle.pestanas.usuarios })).toHaveAttribute('aria-selected', 'true')
    expect(dialogo.queryByText(textosDetalle.pestanas.informacion, { selector: 'h4' })).toBeNull()
  })

  it('las acciones de la fila ofrecen ver detalle, editar y desactivar como iconos', () => {
    renderEmpresas()
    const nombre = EMPRESAS[0].nombre
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', nombre) }))
    expect(screen.getByRole('dialog', { name: textosDetalle.titulo })).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button', { name: textosDetalle.cerrar }).pop() as HTMLElement)

    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.editar.replace(':nombre', nombre) }))
    expect(screen.getByRole('dialog', { name: catalogoEmpresas.edicion_empresa.titulo })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.edicion_empresa.cancelar }))

    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.desactivar.replace(':nombre', nombre) }))
    expect(screen.getByRole('dialog', { name: catalogoEmpresas.modal_desactivar.titulo })).toBeInTheDocument()
  })

  it('se cierra con Cerrar y devuelve el foco al icono de ver detalle', () => {
    renderEmpresas()
    const dialogo = abrirDetalle(EMPRESAS[0].nombre)
    const cierres = dialogo.getAllByRole('button', { name: textosDetalle.cerrar })
    fireEvent.click(cierres[cierres.length - 1])

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', EMPRESAS[0].nombre) })).toHaveFocus()
  })
})

describe('Pestana Usuarios del detalle', { timeout: 30000 }, () => {
  const textosUsuarios = catalogoEmpresas.usuarios_empresa
  const resumenUsuarios = (mostrados: number, totalUsuarios: number) =>
    textosUsuarios.resumen.replace('{mostrados}', String(mostrados)).replace('{total}', String(totalUsuarios))

  function abrirUsuarios(nombre: string) {
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', nombre) }))
    fireEvent.click(within(screen.getByRole('dialog', { name: catalogoEmpresas.detalle_empresa.titulo })).getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.usuarios }))
    return within(screen.getByRole('dialog', { name: catalogoEmpresas.detalle_empresa.titulo }))
  }

  function filasUsuarios(dialogo: ReturnType<typeof abrirUsuarios>) {
    return dialogo.getAllByRole('row').slice(1)
  }

  it('muestra el listado de usuarios de la empresa con su avatar y la primera pagina', () => {
    renderEmpresas()
    const dialogo = abrirUsuarios(EMPRESAS[0].nombre)

    expect(dialogo.getByText(textosUsuarios.titulo)).toBeInTheDocument()
    expect(dialogo.queryByRole('button', { name: /Agregar usuario/ })).toBeNull()
    expect(dialogo.queryByRole('columnheader', { name: /Acciones/ })).toBeNull()
    expect(dialogo.queryByRole('button', { name: /Más opciones de/ })).toBeNull()
    expect(dialogo.queryByRole('button', { name: /Editar empresa/ })).toBeNull()
    expect(filasUsuarios(dialogo)).toHaveLength(textosUsuarios.tamano_pagina)
    expect(dialogo.getByText(resumenUsuarios(textosUsuarios.tamano_pagina, EMPRESAS[0].usuarios))).toBeInTheDocument()
    expect(dialogo.getByText('juan.perez@constructoranorte.com')).toBeInTheDocument()
    expect(dialogo.getAllByRole('img', { name: /Foto de/ })).toHaveLength(textosUsuarios.tamano_pagina)
  })

  it('busca por nombre, correo o rol y filtra por rol y por estado', () => {
    renderEmpresas()
    const dialogo = abrirUsuarios(EMPRESAS[0].nombre)

    fireEvent.change(dialogo.getByRole('searchbox', { name: textosUsuarios.etiquetas.busqueda }), { target: { value: 'maria' } })
    expect(filasUsuarios(dialogo)).toHaveLength(1)
    expect(dialogo.getByText(resumenUsuarios(1, 1))).toBeInTheDocument()

    fireEvent.change(dialogo.getByRole('searchbox', { name: textosUsuarios.etiquetas.busqueda }), { target: { value: 'sin coincidencias' } })
    expect(dialogo.getByText(textosUsuarios.sin_resultados)).toBeInTheDocument()

    fireEvent.change(dialogo.getByRole('searchbox', { name: textosUsuarios.etiquetas.busqueda }), { target: { value: '' } })
    fireEvent.mouseDown(dialogo.getByRole('combobox', { name: textosUsuarios.etiquetas.estado }))
    fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: textosUsuarios.estados.inactivo }))
    expect(filasUsuarios(dialogo)).toHaveLength(2)
    expect(dialogo.getByText('Diego Luna')).toBeInTheDocument()
    expect(dialogo.getByText('Luis Quispe')).toBeInTheDocument()
  })

  it('pagina los usuarios', () => {
    renderEmpresas()
    const dialogo = abrirUsuarios(EMPRESAS[0].nombre)

    fireEvent.click(dialogo.getByRole('button', { name: 'Go to page 2' }))
    expect(dialogo.getByText('Lucía Torres')).toBeInTheDocument()
    expect(dialogo.queryByText('Juan Pérez')).toBeNull()
  })

  it('una empresa sin usuarios muestra el mensaje de vacio', () => {
    renderEmpresas()
    const nueva = abrirModal()
    completarFormulario(nueva)
    fireEvent.click(nueva.getByRole('button', { name: modalEmpresa.guardar }))

    const dialogo = abrirUsuarios('Nueva Empresa de Prueba SAC')
    expect(dialogo.getByText(textosUsuarios.vacio)).toBeInTheDocument()
  })
})

describe('Pestana Historial del detalle', { timeout: 30000 }, () => {
  const textosHistorial = catalogoEmpresas.historial_empresa
  const resumenHistorial = (mostrados: number, totalRegistros: number) =>
    textosHistorial.resumen.replace('{mostrados}', String(mostrados)).replace('{total}', String(totalRegistros))

  function abrirHistorial(nombre: string) {
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', nombre) }))
    const dialogo = within(screen.getByRole('dialog', { name: catalogoEmpresas.detalle_empresa.titulo }))
    fireEvent.click(dialogo.getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.historial }))
    return dialogo
  }

  function filasHistorial(dialogo: ReturnType<typeof abrirHistorial>) {
    return dialogo.getAllByRole('row').slice(1)
  }

  it('muestra el historial con avatar de usuario, tipo y la primera pagina', () => {
    renderEmpresas()
    const dialogo = abrirHistorial(EMPRESAS[0].nombre)

    expect(dialogo.getByText(textosHistorial.subtitulo)).toBeInTheDocument()
    expect(filasHistorial(dialogo)).toHaveLength(textosHistorial.por_pagina)
    expect(dialogo.getByText(resumenHistorial(textosHistorial.por_pagina, EMPRESAS[0].usuarios * textosHistorial.registros_por_usuario))).toBeInTheDocument()
    expect(dialogo.getByText(HISTORIAL_BASE_EMPRESA[0].detalle)).toBeInTheDocument()
    expect(dialogo.getAllByRole('img', { name: /Foto de/ })).toHaveLength(textosHistorial.por_pagina)
    expect(dialogo.getAllByText(textosHistorial.tipos.plan).length).toBeGreaterThan(0)
  })

  it('busca por accion, usuario o detalle y filtra por tipo', () => {
    renderEmpresas()
    const dialogo = abrirHistorial(EMPRESAS[0].nombre)

    fireEvent.change(dialogo.getByRole('searchbox', { name: textosHistorial.etiquetas.busqueda }), { target: { value: 'sin coincidencias' } })
    expect(dialogo.getByText(textosHistorial.sin_resultados)).toBeInTheDocument()

    fireEvent.change(dialogo.getByRole('searchbox', { name: textosHistorial.etiquetas.busqueda }), { target: { value: '' } })
    fireEvent.mouseDown(dialogo.getByRole('combobox', { name: textosHistorial.etiquetas.tipo }))
    fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: textosHistorial.tipos.plan }))
    const planes = HISTORIAL_BASE_EMPRESA.slice(0, EMPRESAS[0].usuarios * textosHistorial.registros_por_usuario).filter((registro) => registro.tipo === 'plan')
    expect(dialogo.getByText(resumenHistorial(Math.min(planes.length, textosHistorial.por_pagina), planes.length))).toBeInTheDocument()
  })

  it('pagina el historial', () => {
    renderEmpresas()
    const dialogo = abrirHistorial(EMPRESAS[0].nombre)

    fireEvent.click(dialogo.getByRole('button', { name: 'Go to page 2' }))
    expect(dialogo.queryByText(HISTORIAL_BASE_EMPRESA[0].detalle)).toBeNull()
    expect(dialogo.getByText(HISTORIAL_BASE_EMPRESA[textosHistorial.por_pagina].detalle)).toBeInTheDocument()
  })

  it('una empresa sin usuarios no tiene actividad registrada', () => {
    renderEmpresas()
    const nueva = abrirModal()
    completarFormulario(nueva)
    fireEvent.click(nueva.getByRole('button', { name: modalEmpresa.guardar }))

    const dialogo = abrirHistorial('Nueva Empresa de Prueba SAC')
    expect(dialogo.getByText(textosHistorial.vacio)).toBeInTheDocument()
  })

  it('filtra por rango de fechas', () => {
    const base = HISTORIAL_BASE_EMPRESA.slice(0, 6)
    const criterios = { busqueda: '', desde: dayjs('2026-09-01'), hasta: dayjs('2026-09-12'), tipo: TODOS_LOS_TIPOS }
    const fechas = filtrarHistorial(base, criterios).map((registro) => registro.fecha)

    expect(fechas).toEqual(['12/09/2026', '10/09/2026', '05/09/2026', '01/09/2026'])
    expect(filtrarHistorial(base, { ...criterios, desde: null, hasta: dayjs('2026-08-31') }).map((registro) => registro.fecha)).toEqual(['28/08/2026'])
  })
})

describe('Editar empresa', { timeout: 30000 }, () => {
  const textosEdicion = catalogoEmpresas.edicion_empresa
  const camposDetalle = catalogoEmpresas.detalle_empresa.campos

  function abrirEdicion(nombre: string) {
    const lapiz = screen.getByRole('button', { name: catalogoEmpresas.botones.editar.replace(':nombre', nombre) })
    lapiz.focus()
    fireEvent.click(lapiz)
    return within(screen.getByRole('dialog', { name: textosEdicion.titulo }))
  }

  function escribirEdicion(dialogo: ReturnType<typeof abrirEdicion>, etiqueta: string, valor: string) {
    fireEvent.change(dialogo.getByRole('textbox', { name: etiqueta }), { target: { value: valor } })
  }

  it('el lapiz abre el formulario con los datos actuales de la empresa', () => {
    renderEmpresas()
    const dialogo = abrirEdicion(EMPRESAS[0].nombre)

    expect(dialogo.getByText(textosEdicion.subtitulo)).toBeInTheDocument()
    expect(dialogo.getByRole('textbox', { name: camposDetalle.razon_social })).toHaveValue(EMPRESAS[0].nombre)
    expect(dialogo.getByRole('textbox', { name: camposDetalle.ruc })).toHaveValue(EMPRESAS[0].ruc)
    expect(dialogo.getByRole('textbox', { name: camposDetalle.direccion })).toHaveValue(EMPRESAS[0].direccion)
    expect(dialogo.getByRole('textbox', { name: camposDetalle.email })).toHaveValue(EMPRESAS[0].correo)
    expect(dialogo.getByRole('textbox', { name: textosEdicion.etiquetas.fecha_registro })).toBeDisabled()
    expect(dialogo.getByRole('button', { name: textosEdicion.guardar })).toBeEnabled()
    expect(dialogo.getByRole('button', { name: textosEdicion.quitar_logo })).toBeDisabled()
  })

  it('Guardar cambios actualiza la fila de la tabla y cierra el formulario', () => {
    renderEmpresas()
    const dialogo = abrirEdicion(EMPRESAS[0].nombre)
    escribirEdicion(dialogo, camposDetalle.razon_social, 'Constructora Renovada SAC')
    fireEvent.click(dialogo.getByRole('button', { name: textosEdicion.guardar }))

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(within(filasDeDatos()[0]).getByText('Constructora Renovada SAC')).toBeInTheDocument()
    expect(within(filasDeDatos()[0]).queryByText(EMPRESAS[0].nombre)).toBeNull()
  })

  it('no permite guardar con un RUC incompleto ni con campos obligatorios vacios', () => {
    renderEmpresas()
    const dialogo = abrirEdicion(EMPRESAS[0].nombre)
    const guardar = dialogo.getByRole('button', { name: textosEdicion.guardar })

    escribirEdicion(dialogo, camposDetalle.ruc, '123')
    expect(guardar).toBeDisabled()
    escribirEdicion(dialogo, camposDetalle.ruc, EMPRESAS[0].ruc)
    expect(guardar).toBeEnabled()
    escribirEdicion(dialogo, camposDetalle.email, '')
    expect(guardar).toBeDisabled()
  })

  it('Cancelar y Escape cierran sin cambiar nada y devuelven el foco al lapiz', () => {
    renderEmpresas()
    const dialogo = abrirEdicion(EMPRESAS[0].nombre)
    escribirEdicion(dialogo, camposDetalle.razon_social, 'Nombre descartado')
    fireEvent.click(dialogo.getByRole('button', { name: textosEdicion.cancelar }))

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(within(filasDeDatos()[0]).getByText(EMPRESAS[0].nombre)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: catalogoEmpresas.botones.editar.replace(':nombre', EMPRESAS[0].nombre) })).toHaveFocus()

    abrirEdicion(EMPRESAS[0].nombre)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('conserva los datos al cambiar de pestana y Ver detalle sigue siendo de solo lectura', () => {
    renderEmpresas()
    const dialogo = abrirEdicion(EMPRESAS[0].nombre)
    escribirEdicion(dialogo, camposDetalle.razon_social, 'Editada en memoria SAC')
    fireEvent.click(dialogo.getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.usuarios }))
    expect(dialogo.getByText(catalogoEmpresas.usuarios_empresa.titulo)).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.informacion }))
    expect(dialogo.getByRole('textbox', { name: camposDetalle.razon_social })).toHaveValue('Editada en memoria SAC')
    fireEvent.click(dialogo.getByRole('button', { name: textosEdicion.cancelar }))

    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', EMPRESAS[1].nombre) }))
    const detalle = within(screen.getByRole('dialog', { name: catalogoEmpresas.detalle_empresa.titulo }))
    expect(detalle.queryByRole('textbox', { name: camposDetalle.razon_social })).toBeNull()
  })

  it('el ubigeo es en cascada: al cambiar el departamento se reajustan provincia y distrito', () => {
    const datos = datosDesdeEmpresa(EMPRESAS[0])
    expect(opcionesDeUbigeo(datos.departamento, datos.provincia).distritos).toContain(datos.distrito)

    const otro = reajustarUbigeo({ ...datos, departamento: 'Arequipa' })
    expect(otro.provincia).toBe('Arequipa')
    expect(otro.distrito).toBe('Cercado')
    expect(empresaDesdeEdicion(EMPRESAS[0], otro, null, EMPRESAS[0].modulos).ubigeo).toBe('Arequipa / Arequipa / Cercado')
    expect(edicionCompleta(otro)).toBe(true)
  })
})

describe('Usuarios dentro de Editar empresa', { timeout: 30000 }, () => {
  const textosUsuarios = catalogoEmpresas.usuarios_empresa

  function abrirUsuariosEnEdicion() {
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.editar.replace(':nombre', EMPRESAS[0].nombre) }))
    const dialogo = within(screen.getByRole('dialog', { name: catalogoEmpresas.edicion_empresa.titulo }))
    fireEvent.click(dialogo.getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.usuarios }))
    return dialogo
  }

  it('muestra el boton Agregar usuario y la columna Acciones con un menu por usuario', () => {
    renderEmpresas()
    const dialogo = abrirUsuariosEnEdicion()

    expect(dialogo.getByRole('button', { name: textosUsuarios.agregar })).toBeInTheDocument()
    expect(dialogo.getByRole('columnheader', { name: textosUsuarios.columna_acciones })).toBeInTheDocument()
    expect(dialogo.getAllByRole('button', { name: /Más opciones de/ })).toHaveLength(textosUsuarios.tamano_pagina)
  })

  it('el menu de acciones ofrece Editar y Desactivar usuario (el primero esta activo) y se cierra con Escape', () => {
    renderEmpresas()
    const dialogo = abrirUsuariosEnEdicion()
    const boton = dialogo.getAllByRole('button', { name: /Más opciones de/ })[0]
    boton.focus()
    fireEvent.click(boton)

    const opciones = within(screen.getByRole('menu')).getAllByRole('menuitem').map((item) => item.textContent)
    expect(opciones).toEqual(textosUsuarios.menu.filter((opcion) => opcion.estado !== 'inactivo').map((opcion) => opcion.etiqueta))
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('Desactivar usuario lo pasa a Inactivo y entonces el menu ofrece Activar usuario', () => {
    renderEmpresas()
    const dialogo = abrirUsuariosEnEdicion()
    const boton = dialogo.getAllByRole('button', { name: /Más opciones de/ })[0]
    boton.focus()
    fireEvent.click(boton)
    fireEvent.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Desactivar usuario' }))

    const fila = dialogo.getAllByRole('row')[1]
    expect(within(fila).getByText(textosUsuarios.estados.inactivo)).toBeInTheDocument()
    fireEvent.click(within(fila).getByRole('button', { name: /Más opciones de/ }))
    const opciones = within(screen.getByRole('menu')).getAllByRole('menuitem').map((item) => item.textContent)
    expect(opciones).toEqual(['Editar usuario', 'Activar usuario'])
    fireEvent.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Activar usuario' }))
    expect(within(dialogo.getAllByRole('row')[1]).getByText(textosUsuarios.estados.activo)).toBeInTheDocument()
  })

  it('Ver detalle sigue mostrando los usuarios sin boton Agregar ni columna Acciones', () => {
    renderEmpresas()
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', EMPRESAS[0].nombre) }))
    fireEvent.click(within(screen.getByRole('dialog', { name: catalogoEmpresas.detalle_empresa.titulo })).getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.usuarios }))
    const dialogo = within(screen.getByRole('dialog', { name: catalogoEmpresas.detalle_empresa.titulo }))

    expect(dialogo.queryByRole('button', { name: textosUsuarios.agregar })).toBeNull()
    expect(dialogo.queryByRole('columnheader', { name: textosUsuarios.columna_acciones })).toBeNull()
    expect(dialogo.queryByRole('button', { name: /Más opciones de/ })).toBeNull()
  })
})

describe('Editar usuario dentro de Editar empresa', { timeout: 30000 }, () => {
  const textosUsuarios = catalogoEmpresas.usuarios_empresa
  const edicionUsuario = textosUsuarios.edicion

  function abrirUsuariosEnEdicion() {
    const lapiz = screen.getByRole('button', { name: catalogoEmpresas.botones.editar.replace(':nombre', EMPRESAS[0].nombre) })
    lapiz.focus()
    fireEvent.click(lapiz)
    const dialogo = within(screen.getByRole('dialog', { name: catalogoEmpresas.edicion_empresa.titulo }))
    fireEvent.click(dialogo.getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.usuarios }))
    return dialogo
  }

  function pedirEdicion(dialogo: ReturnType<typeof abrirUsuariosEnEdicion>, indice: number) {
    fireEvent.click(dialogo.getAllByRole('button', { name: /Más opciones de/ })[indice])
    fireEvent.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: textosUsuarios.menu[0].etiqueta }))
  }

  it('Editar usuario convierte la fila en editable con sus datos actuales', () => {
    renderEmpresas()
    const dialogo = abrirUsuariosEnEdicion()
    pedirEdicion(dialogo, 0)

    expect(dialogo.getByRole('textbox', { name: edicionUsuario.nombre })).toHaveValue('Juan Pérez')
    expect(dialogo.getByRole('textbox', { name: edicionUsuario.correo })).toHaveValue('juan.perez@constructoranorte.com')
    expect(dialogo.getByRole('combobox', { name: edicionUsuario.rol })).toBeInTheDocument()
    expect(dialogo.getByRole('combobox', { name: edicionUsuario.estado })).toBeInTheDocument()
    expect(dialogo.getAllByRole('textbox', { name: edicionUsuario.nombre })).toHaveLength(1)
  })

  it('guardar la fila actualiza la tabla y cancelar descarta los cambios', () => {
    renderEmpresas()
    const dialogo = abrirUsuariosEnEdicion()

    pedirEdicion(dialogo, 0)
    fireEvent.change(dialogo.getByRole('textbox', { name: edicionUsuario.nombre }), { target: { value: 'Juan Editado' } })
    fireEvent.click(dialogo.getByRole('button', { name: edicionUsuario.cancelar }))
    expect(dialogo.queryByText('Juan Editado')).toBeNull()
    expect(dialogo.getByText('Juan Pérez')).toBeInTheDocument()

    pedirEdicion(dialogo, 0)
    fireEvent.change(dialogo.getByRole('textbox', { name: edicionUsuario.nombre }), { target: { value: 'Juan Editado' } })
    fireEvent.click(dialogo.getByRole('button', { name: edicionUsuario.guardar }))
    expect(dialogo.getByText('Juan Editado')).toBeInTheDocument()
    expect(dialogo.queryByRole('textbox', { name: edicionUsuario.nombre })).toBeNull()
  })

  it('no permite guardar con nombre vacio, correo invalido o correo repetido', () => {
    renderEmpresas()
    const dialogo = abrirUsuariosEnEdicion()
    pedirEdicion(dialogo, 0)
    const guardar = dialogo.getByRole('button', { name: edicionUsuario.guardar })

    fireEvent.change(dialogo.getByRole('textbox', { name: edicionUsuario.nombre }), { target: { value: '' } })
    expect(guardar).toBeDisabled()
    fireEvent.change(dialogo.getByRole('textbox', { name: edicionUsuario.nombre }), { target: { value: 'Juan' } })
    fireEvent.change(dialogo.getByRole('textbox', { name: edicionUsuario.correo }), { target: { value: 'sin-arroba' } })
    expect(guardar).toBeDisabled()
    fireEvent.change(dialogo.getByRole('textbox', { name: edicionUsuario.correo }), { target: { value: 'maria.lopez@constructoranorte.com' } })
    expect(guardar).toBeDisabled()
    fireEvent.change(dialogo.getByRole('textbox', { name: edicionUsuario.correo }), { target: { value: 'juan.nuevo@constructoranorte.com' } })
    expect(guardar).toBeEnabled()
  })

  it('Enter guarda solo la fila y no envia el formulario de la empresa', () => {
    renderEmpresas()
    const dialogo = abrirUsuariosEnEdicion()
    pedirEdicion(dialogo, 0)
    const campo = dialogo.getByRole('textbox', { name: edicionUsuario.nombre })
    fireEvent.change(campo, { target: { value: 'Con Enter' } })
    fireEvent.keyDown(campo, { key: edicionUsuario.tecla_guardar })

    expect(dialogo.getByText('Con Enter')).toBeInTheDocument()
    expect(screen.getByRole('dialog', { name: catalogoEmpresas.edicion_empresa.titulo })).toBeInTheDocument()
  })

  it('los cambios se conservan al cambiar de pestana, al guardar la empresa y al abrir el detalle', () => {
    renderEmpresas()
    const dialogo = abrirUsuariosEnEdicion()
    pedirEdicion(dialogo, 0)
    fireEvent.change(dialogo.getByRole('textbox', { name: edicionUsuario.nombre }), { target: { value: 'Persistido' } })
    fireEvent.click(dialogo.getByRole('button', { name: edicionUsuario.guardar }))

    fireEvent.click(dialogo.getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.informacion }))
    fireEvent.click(dialogo.getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.usuarios }))
    expect(dialogo.getByText('Persistido')).toBeInTheDocument()

    fireEvent.click(dialogo.getByRole('button', { name: catalogoEmpresas.edicion_empresa.guardar }))
    expect(screen.queryByRole('dialog')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', EMPRESAS[0].nombre) }))
    fireEvent.click(within(screen.getByRole('dialog', { name: catalogoEmpresas.detalle_empresa.titulo })).getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.usuarios }))
    expect(within(screen.getByRole('dialog', { name: catalogoEmpresas.detalle_empresa.titulo })).getByText('Persistido')).toBeInTheDocument()
  })
})

describe('Agregar usuario dentro de Editar empresa', { timeout: 30000 }, () => {
  const textosUsuarios = catalogoEmpresas.usuarios_empresa
  const textosAgregar = textosUsuarios.agregar_usuario
  const camposAgregar = textosAgregar.campos
  const textosEdicion = catalogoEmpresas.edicion_empresa

  function abrirUsuariosEnEdicion() {
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.editar.replace(':nombre', EMPRESAS[0].nombre) }))
    const dialogo = within(screen.getByRole('dialog', { name: textosEdicion.titulo }))
    fireEvent.click(dialogo.getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.usuarios }))
    return dialogo
  }

  function abrirFormulario() {
    const dialogo = abrirUsuariosEnEdicion()
    fireEvent.click(dialogo.getByRole('button', { name: textosUsuarios.agregar }))
    return dialogo
  }

  function completar(dialogo: ReturnType<typeof abrirUsuariosEnEdicion>, correo = 'nuevo.usuario@constructoranorte.com') {
    fireEvent.change(dialogo.getByRole('textbox', { name: new RegExp(camposAgregar.nombres) }), { target: { value: 'Nora' } })
    fireEvent.change(dialogo.getByRole('textbox', { name: new RegExp(camposAgregar.apellidos) }), { target: { value: 'Salas' } })
    fireEvent.change(dialogo.getByRole('textbox', { name: new RegExp(camposAgregar.correo) }), { target: { value: correo } })
    fireEvent.mouseDown(dialogo.getByRole('combobox', { name: camposAgregar.rol }))
    fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: textosUsuarios.roles.contador }))
  }

  it('muestra el formulario con sus campos y cambia el pie a Cancelar y Agregar usuario', () => {
    renderEmpresas()
    const dialogo = abrirFormulario()

    expect(dialogo.getByRole('button', { name: textosAgregar.volver })).toBeInTheDocument()
    expect(dialogo.getByText(textosAgregar.subtitulo)).toBeInTheDocument()
    expect(dialogo.getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.usuarios })).toHaveAttribute('aria-selected', 'true')
    expect(dialogo.getByRole('button', { name: textosAgregar.confirmar })).toBeDisabled()
    expect(dialogo.getByRole('button', { name: textosAgregar.cancelar })).toBeInTheDocument()
    expect(dialogo.queryByRole('button', { name: textosEdicion.guardar })).toBeNull()
    expect(dialogo.getByLabelText(textosAgregar.contador_notas)).toHaveTextContent('0/' + textosAgregar.notas_maximo)
  })

  it('agrega el usuario a la lista cuando los datos obligatorios estan completos', () => {
    renderEmpresas()
    const dialogo = abrirFormulario()
    completar(dialogo)
    fireEvent.click(dialogo.getByRole('button', { name: textosAgregar.confirmar }))

    expect(dialogo.queryByRole('button', { name: textosAgregar.volver })).toBeNull()
    expect(dialogo.getByText('Nora Salas')).toBeInTheDocument()
    expect(dialogo.getByText('nuevo.usuario@constructoranorte.com')).toBeInTheDocument()
    expect(dialogo.getByText(textosUsuarios.sin_acceso)).toBeInTheDocument()
    expect(dialogo.getByText(textosUsuarios.resumen.replace('{mostrados}', String(textosUsuarios.tamano_pagina)).replace('{total}', String(EMPRESAS[0].usuarios + 1)))).toBeInTheDocument()
    expect(dialogo.getByRole('button', { name: textosEdicion.guardar })).toBeInTheDocument()
  })

  it('el usuario nuevo muestra las iniciales de su primer nombre y primer apellido en lugar de la foto', () => {
    renderEmpresas()
    const dialogo = abrirFormulario()
    completar(dialogo)
    fireEvent.click(dialogo.getByRole('button', { name: textosAgregar.confirmar }))

    const avatar = dialogo.getByRole('img', { name: textosUsuarios.etiquetas.avatar.replace(':nombre', 'Nora Salas') })
    expect(avatar).toHaveTextContent('NS')
  })

  it('no permite agregar con un correo repetido o invalido', () => {
    renderEmpresas()
    const dialogo = abrirFormulario()
    completar(dialogo, 'maria.lopez@constructoranorte.com')
    expect(dialogo.getByRole('button', { name: textosAgregar.confirmar })).toBeDisabled()

    fireEvent.change(dialogo.getByRole('textbox', { name: new RegExp(camposAgregar.correo) }), { target: { value: 'sin-arroba' } })
    expect(dialogo.getByRole('button', { name: textosAgregar.confirmar })).toBeDisabled()
  })

  it('Cancelar y Volver a usuarios regresan a la lista sin agregar nada', () => {
    renderEmpresas()
    let dialogo = abrirFormulario()
    completar(dialogo)
    fireEvent.click(dialogo.getByRole('button', { name: textosAgregar.cancelar }))
    expect(dialogo.queryByText('Nora Salas')).toBeNull()
    expect(dialogo.getByText(textosUsuarios.titulo)).toBeInTheDocument()

    fireEvent.click(dialogo.getByRole('button', { name: textosUsuarios.agregar }))
    fireEvent.click(dialogo.getByRole('button', { name: textosAgregar.volver }))
    dialogo = within(screen.getByRole('dialog', { name: textosEdicion.titulo }))
    expect(dialogo.getByRole('button', { name: textosEdicion.guardar })).toBeInTheDocument()
  })

  it('cuenta las notas y al cambiar de pestana se abandona el formulario', () => {
    renderEmpresas()
    const dialogo = abrirFormulario()
    fireEvent.change(dialogo.getByRole('textbox', { name: camposAgregar.notas }), { target: { value: 'hola' } })
    expect(dialogo.getByLabelText(textosAgregar.contador_notas)).toHaveTextContent('4/' + textosAgregar.notas_maximo)

    fireEvent.click(dialogo.getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.informacion }))
    expect(dialogo.queryByRole('button', { name: textosAgregar.confirmar })).toBeNull()
    expect(dialogo.getByRole('button', { name: textosEdicion.guardar })).toBeInTheDocument()
  })

  it('al guardar la empresa se actualiza la cantidad de usuarios', () => {
    renderEmpresas()
    const dialogo = abrirFormulario()
    completar(dialogo)
    fireEvent.click(dialogo.getByRole('button', { name: textosAgregar.confirmar }))
    fireEvent.click(dialogo.getByRole('button', { name: textosEdicion.guardar }))

    expect(screen.queryByRole('dialog')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', EMPRESAS[0].nombre) }))
    const detalle = within(screen.getByRole('dialog', { name: catalogoEmpresas.detalle_empresa.titulo }))
    fireEvent.click(detalle.getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.usuarios }))
    expect(detalle.getByText(textosUsuarios.resumen.replace('{mostrados}', String(textosUsuarios.tamano_pagina)).replace('{total}', String(EMPRESAS[0].usuarios + 1)))).toBeInTheDocument()
  })
})
