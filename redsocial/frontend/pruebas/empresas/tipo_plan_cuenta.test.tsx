import { fireEvent, screen, within } from '@testing-library/react'
import { renderEmpresas } from './entorno_empresas'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import { armarEmpresa, crearDatosIniciales } from '../../componentes/empresas/bloques/logica_formulario_empresa'
import { datosDesdeEmpresa, empresaDesdeEdicion, SIN_TIPO_PLAN_CUENTA } from '../../componentes/empresas/bloques/logica_edicion_empresa'
import { EMPRESAS } from '../../servicios/empresas/empresas'

const modal = catalogoEmpresas.modal_empresa
const campos = modal.campos
const edicion = catalogoEmpresas.edicion_empresa
const [COMPLETO, SIMPLIFICADO, PERSONALIZADO] = modal.opciones.tipos_plan_cuenta
const NOMBRE = 'Empresa con plan de cuenta SAC'

function escribir(dialogo: ReturnType<typeof within>, etiqueta: string, valor: string) {
  fireEvent.change(dialogo.getByRole('textbox', { name: new RegExp(etiqueta) }), { target: { value: valor } })
}

function elegir(dialogo: ReturnType<typeof within>, etiqueta: string, opcion: string) {
  fireEvent.mouseDown(dialogo.getByRole('combobox', { name: etiqueta }))
  fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: opcion }))
}

function registrar(tipo?: string) {
  fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.nueva_empresa }))
  const dialogo = within(screen.getByRole('dialog', { name: modal.titulo }))
  escribir(dialogo, campos.ruc, '20555666777')
  escribir(dialogo, campos.razon_social, NOMBRE)
  escribir(dialogo, campos.direccion, 'Av. Javier Prado 1234')
  escribir(dialogo, campos.telefono, '987654321')
  escribir(dialogo, campos.email, 'contacto@nueva.pe')
  if (tipo) elegir(dialogo, campos.tipo_plan_cuenta, tipo)
  fireEvent.click(dialogo.getByRole('button', { name: modal.guardar }))
}

function abrirDetalle(nombre: string) {
  fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', nombre) }))
  return within(screen.getByRole('dialog', { name: catalogoEmpresas.detalle_empresa.titulo }))
}

function abrirEdicion(nombre: string) {
  fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.editar.replace(':nombre', nombre) }))
  return within(screen.getByRole('dialog', { name: edicion.titulo }))
}

function valorDe(dialogo: ReturnType<typeof within>) {
  return dialogo.getByRole('combobox', { name: catalogoEmpresas.detalle_empresa.campos.tipo_plan_cuenta })
}

describe('Tipo de plan de cuenta', { timeout: 30000 }, () => {
  it('la lógica conserva el valor al armar la empresa, al editarla y al recuperarla', () => {
    const datos = { ...crearDatosIniciales(), razon_social: NOMBRE, tipo_plan_cuenta: PERSONALIZADO }
    const empresa = armarEmpresa(datos, 10, null)
    expect(empresa.tipoPlanCuenta).toBe(PERSONALIZADO)
    expect(datosDesdeEmpresa(empresa).tipo_plan_cuenta).toBe(PERSONALIZADO)
    expect(empresaDesdeEdicion(empresa, { ...datosDesdeEmpresa(empresa), tipo_plan_cuenta: SIMPLIFICADO }, null, []).tipoPlanCuenta).toBe(SIMPLIFICADO)
  })

  it('una empresa sin tipo no recibe uno inventado al editarla', () => {
    const sembrada = EMPRESAS[0]
    expect(sembrada.tipoPlanCuenta).toBeUndefined()
    expect(datosDesdeEmpresa(sembrada).tipo_plan_cuenta).toBe(SIN_TIPO_PLAN_CUENTA)
    expect(empresaDesdeEdicion(sembrada, datosDesdeEmpresa(sembrada), null, sembrada.modulos).tipoPlanCuenta).toBeUndefined()
  })

  it('el alta guarda el valor elegido y el detalle lo muestra al recuperar la empresa', () => {
    renderEmpresas()
    registrar(SIMPLIFICADO)
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(abrirDetalle(NOMBRE).getByText(SIMPLIFICADO)).toBeInTheDocument()
  })

  it('el alta sin cambiar el selector guarda la opción mostrada por defecto', () => {
    renderEmpresas()
    registrar()
    expect(abrirDetalle(NOMBRE).getByText(COMPLETO)).toBeInTheDocument()
  })

  it('Editar muestra el valor guardado, permite cambiarlo y el cambio se conserva', () => {
    renderEmpresas()
    registrar(SIMPLIFICADO)
    const dialogo = abrirEdicion(NOMBRE)
    expect(valorDe(dialogo)).toHaveTextContent(SIMPLIFICADO)
    elegir(dialogo, catalogoEmpresas.detalle_empresa.campos.tipo_plan_cuenta, PERSONALIZADO)
    fireEvent.click(dialogo.getByRole('button', { name: edicion.guardar }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(abrirDetalle(NOMBRE).getByText(PERSONALIZADO)).toBeInTheDocument()
    fireEvent.click(screen.getByText('Cerrar', { selector: 'button' }))
    expect(abrirEdicion(NOMBRE).getByRole('combobox', { name: catalogoEmpresas.detalle_empresa.campos.tipo_plan_cuenta })).toHaveTextContent(PERSONALIZADO)
  })

  it('una empresa existente sin tipo se muestra «Sin definir» y guardar otros cambios no le asigna uno', () => {
    renderEmpresas()
    const nombre = EMPRESAS[0].nombre
    const dialogo = abrirEdicion(nombre)
    expect(valorDe(dialogo)).toHaveTextContent(edicion.sin_definir)
    escribir(dialogo, catalogoEmpresas.detalle_empresa.campos.nombre_comercial, 'Nombre comercial nuevo')
    fireEvent.click(dialogo.getByRole('button', { name: edicion.guardar }))
    expect(abrirDetalle(nombre).getByText(catalogoEmpresas.detalle_empresa.sin_definir)).toBeInTheDocument()
  })
})
