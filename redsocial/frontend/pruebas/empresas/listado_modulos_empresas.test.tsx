import { fireEvent, screen, within } from '@testing-library/react'
import { renderEmpresas, SUSCRIPCIONES } from './entorno_empresas'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import { MODULOS_EMPRESA, ordenarEmpresas, siguienteOrden } from '../../componentes/empresas/bloques/logica_listado_empresas'
import { calcularResumenEmpresas, contarAltasDelUltimoMes } from '../../componentes/empresas/bloques/logica_resumen_empresas'
import { EMPRESAS } from '../../servicios/empresas/empresas'

const textosResumen = catalogoEmpresas.resumen
const estados = catalogoEmpresas.modulo_estado

function filasDeDatos() {
  return screen.getAllByRole('row').slice(1)
}

function tarjeta(etiqueta: string) {
  return within(screen.getByRole('region', { name: textosResumen.etiqueta })).getByText(etiqueta).closest('article') as HTMLElement
}

describe('Resumen de empresas', () => {
  it('calcula el total, las altas del ultimo mes y cada modulo a partir de los datos', () => {
    const resumen = calcularResumenEmpresas(EMPRESAS, SUSCRIPCIONES)

    expect(resumen.total).toBe(EMPRESAS.length)
    expect(resumen.nuevasMes).toBe(contarAltasDelUltimoMes(EMPRESAS))
    resumen.modulos.forEach((fila, indice) => {
      const esperadas = EMPRESAS.filter((empresa) => empresa.modulos.includes(MODULOS_EMPRESA[indice].clave)).length
      expect(fila.cantidad).toBe(esperadas)
      expect(fila.porcentaje).toBe(Math.round((esperadas / EMPRESAS.length) * 100))
    })
  })

  it('no divide entre cero cuando no hay empresas', () => {
    expect(calcularResumenEmpresas([], SUSCRIPCIONES).modulos.every((fila) => fila.porcentaje === 0)).toBe(true)
  })

  it('muestra las cinco tarjetas con el total, el detalle y una barra de progreso por modulo', () => {
    renderEmpresas()
    const resumen = calcularResumenEmpresas(EMPRESAS, SUSCRIPCIONES)

    const total = within(tarjeta(textosResumen.total))
    expect(total.getByText(String(resumen.total))).toBeInTheDocument()
    expect(total.getByText(textosResumen.nuevas_mes.replace('{cantidad}', String(resumen.nuevasMes)))).toBeInTheDocument()

    MODULOS_EMPRESA.forEach((modulo, indice) => {
      const fila = resumen.modulos[indice]
      const etiqueta = textosResumen.con_modulo.replace('{modulo}', modulo.etiqueta)
      const porcentaje = textosResumen.porcentaje.replace('{porcentaje}', String(fila.porcentaje))
      const contenido = within(tarjeta(etiqueta))
      expect(contenido.getByText(String(fila.cantidad))).toBeInTheDocument()
      expect(contenido.getByText(porcentaje)).toBeInTheDocument()
      const barra = contenido.getByRole('progressbar', { name: textosResumen.etiqueta_barra.replace('{etiqueta}', etiqueta).replace('{porcentaje}', porcentaje) })
      expect(barra).toHaveAttribute('value', String(fila.porcentaje))
      expect(barra).toHaveAttribute('max', String(textosResumen.porcentaje_maximo))
    })
  })

  it('el resumen cuenta todas las empresas aunque el listado este filtrado', () => {
    renderEmpresas()
    fireEvent.change(screen.getByRole('searchbox', { name: catalogoEmpresas.campos.buscar_empresa }), { target: { value: EMPRESAS[0].ruc } })

    expect(filasDeDatos()).toHaveLength(1)
    expect(within(tarjeta(textosResumen.total)).getByText(String(EMPRESAS.length))).toBeInTheDocument()
  })
})

describe('Tabla de empresas con modulos', () => {
  it('muestra empresa, RUC, rubro, un encabezado por modulo y acciones, sin plan, usuarios, estado ni fecha', () => {
    renderEmpresas()
    const encabezados = screen.getAllByRole('columnheader').map((celda) => celda.textContent ?? '')
    const esperados = [catalogoEmpresas.tabla.empresa, catalogoEmpresas.tabla.ruc, catalogoEmpresas.tabla.rubro, ...MODULOS_EMPRESA.map((modulo) => modulo.etiqueta), catalogoEmpresas.tabla.acciones]

    expect(encabezados).toHaveLength(esperados.length)
    esperados.forEach((texto, indice) => expect(encabezados[indice]).toContain(texto))
    const todos = encabezados.join('|')
    expect(encabezados.some((texto) => /^Plan(?!illas)/.test(texto))).toBe(false)
    ;['Usuarios', 'Estado', 'Fecha', 'Logo'].forEach((ausente) => expect(todos).not.toContain(ausente))
  })

  it('cada fila muestra el logo, el nombre, el codigo, el RUC y el rubro como etiqueta', () => {
    renderEmpresas()
    const fila = within(filasDeDatos()[0])

    expect(fila.getByText(EMPRESAS[0].nombre)).toBeInTheDocument()
    expect(fila.getByText(catalogoEmpresas.codigo_empresa.replace(':codigo', EMPRESAS[0].codigo))).toBeInTheDocument()
    expect(fila.getByText(EMPRESAS[0].ruc)).toBeInTheDocument()
    expect(fila.getByText(EMPRESAS[0].rubro)).toBeInTheDocument()
    expect(filasDeDatos()[0].querySelector('img')).not.toBeNull()
  })

  it('cada modulo muestra el interruptor con el plan contratado, encendido si esta activo en la empresa, o No asignado', () => {
    renderEmpresas()
    const celdas = within(filasDeDatos()[0]).getAllByRole('cell')

    MODULOS_EMPRESA.forEach((modulo, indice) => {
      const celda = within(celdas[3 + indice])
      const suscripcion = SUSCRIPCIONES.find((candidata) => candidata.aplicacion === modulo.producto)
      if (suscripcion) {
        const activo = EMPRESAS[0].modulos.includes(modulo.clave)
        const interruptor = celda.getByRole('switch', { name: (activo ? estados.aria_activo : estados.aria_inactivo).replace(':modulo', modulo.etiqueta) })
        expect(interruptor).toHaveProperty('checked', activo)
        expect(celda.getByText(estados.plan.replace(':plan', suscripcion.planNombre))).toBeInTheDocument()
        expect(celda.queryByText(estados.no_asignado)).toBeNull()
      } else {
        expect(celda.getByText(estados.no_asignado)).toBeInTheDocument()
        expect(celda.queryByRole('switch')).toBeNull()
      }
    })

    expect(within(celdas[5]).getByText(estados.no_asignado)).toBeInTheDocument()
    expect(within(celdas[6]).getByText(estados.no_asignado)).toBeInTheDocument()
  })

  it('el interruptor de un aplicativo contratado se puede apagar y encender desde la tabla', () => {
    renderEmpresas()
    const celda = within(within(filasDeDatos()[0]).getAllByRole('cell')[3])
    const nombre = MODULOS_EMPRESA[0].etiqueta
    const activo = () => celda.getByRole('switch', { name: estados.aria_activo.replace(':modulo', nombre) })
    expect(activo()).toBeChecked()
    fireEvent.click(activo())
    expect(celda.getByRole('switch', { name: estados.aria_inactivo.replace(':modulo', nombre) })).not.toBeChecked()
    expect(celda.getByText(estados.plan.replace(':plan', SUSCRIPCIONES[0].planNombre))).toBeInTheDocument()
    fireEvent.click(celda.getByRole('switch', { name: estados.aria_inactivo.replace(':modulo', nombre) }))
    expect(activo()).toBeChecked()
  })

  it('Planillas aparece apagada con su plan en las empresas que lo tienen asignado y se puede activar y desactivar', () => {
    renderEmpresas()
    const empresa = EMPRESAS.find((candidata) => candidata.planesModulo?.planillas) as (typeof EMPRESAS)[number]
    const indice = MODULOS_EMPRESA.findIndex((modulo) => modulo.clave === 'planillas')
    const nombre = MODULOS_EMPRESA[indice].etiqueta
    const celda = within(within(screen.getByText(empresa.nombre).closest('tr') as HTMLElement).getAllByRole('cell')[3 + indice])
    expect(celda.getByText(estados.plan.replace(':plan', empresa.planesModulo?.planillas ?? ''))).toBeInTheDocument()
    const apagado = celda.getByRole('switch', { name: estados.aria_inactivo.replace(':modulo', nombre) })
    expect(apagado).not.toBeChecked()
    fireEvent.click(apagado)
    expect(celda.getByRole('switch', { name: estados.aria_activo.replace(':modulo', nombre) })).toBeChecked()
    fireEvent.click(celda.getByRole('switch', { name: estados.aria_activo.replace(':modulo', nombre) }))
    expect(celda.getByRole('switch', { name: estados.aria_inactivo.replace(':modulo', nombre) })).not.toBeChecked()
  })

  it('la fila ofrece ver, editar y desactivar, sin menu de mas opciones', () => {
    renderEmpresas()
    const nombre = EMPRESAS[0].nombre

    expect(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', nombre) })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: catalogoEmpresas.botones.editar.replace(':nombre', nombre) })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: catalogoEmpresas.botones.desactivar.replace(':nombre', nombre) })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Más opciones/ })).toBeNull()
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('el encabezado Empresa ordena de forma ascendente, descendente y vuelve al orden original', () => {
    renderEmpresas()
    const encabezado = screen.getByRole('columnheader', { name: new RegExp(catalogoEmpresas.tabla.empresa) })
    const boton = within(encabezado).getByRole('button', { name: catalogoEmpresas.botones.ordenar_empresas })
    const primera = () => within(filasDeDatos()[0]).getByText(/SAC|SRL/, { selector: 'span.truncate' }).textContent
    const alfabeticas = [...EMPRESAS].map((empresa) => empresa.nombre).sort((a, b) => a.localeCompare(b, catalogoEmpresas.orden.idioma))

    expect(encabezado).toHaveAttribute('aria-sort', catalogoEmpresas.orden.aria.ninguno)
    fireEvent.click(boton)
    expect(encabezado).toHaveAttribute('aria-sort', catalogoEmpresas.orden.aria.ascendente)
    expect(primera()).toBe(alfabeticas[0])
    fireEvent.click(boton)
    expect(encabezado).toHaveAttribute('aria-sort', catalogoEmpresas.orden.aria.descendente)
    expect(primera()).toBe(alfabeticas[alfabeticas.length - 1])
    fireEvent.click(boton)
    expect(encabezado).toHaveAttribute('aria-sort', catalogoEmpresas.orden.aria.ninguno)
    expect(primera()).toBe(EMPRESAS[0].nombre)
  })

  it('ordenarEmpresas no modifica la lista original y siguienteOrden recorre los tres estados', () => {
    const copia = [...EMPRESAS]
    const ordenadas = ordenarEmpresas(EMPRESAS, 'ascendente')

    expect(EMPRESAS).toEqual(copia)
    expect(ordenadas).not.toBe(EMPRESAS)
    expect(ordenarEmpresas(EMPRESAS, null)).toBe(EMPRESAS)
    expect(siguienteOrden(null)).toBe('ascendente')
    expect(siguienteOrden('ascendente')).toBe('descendente')
    expect(siguienteOrden('descendente')).toBeNull()
  })
})
