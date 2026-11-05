import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { FlujoPago } from '@/componentes/compartido/pago/flujo_pago'
import { usarPerfilesPago } from '@/componentes/compartido/pago/usar_perfiles_pago'
import { usarTarjetasPago } from '@/componentes/compartido/pago/usar_tarjetas_pago'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import type {
  AutorizacionPago,
  ConfiguracionFlujoPago,
  FlujoPagoProps,
  DatosPerfilPago,
  PedidoPago,
  PerfilPago,
  RepositorioPerfilesPago,
  RepositorioTarjetasPago,
  TarjetaPago,
} from '@/tipos/compartido/contrato_flujo_pago'

const textos = catalogoCompartido.flujo_pago.textos
const guardado = textos.metodo_guardado
const perfilesTextos = textos.perfiles
const matchMediaOriginal = window.matchMedia

const PAISES = [{ id: 'pe', nombre: 'Perú', prefijo: '+51' }, { id: 'cl', nombre: 'Chile', prefijo: '+56' }]
const TARJETA_A: TarjetaPago = { id: 'a', marca: 'Visa', ultimos4: '4242', vencimiento: '12/99', titular: 'Ana Prueba', predeterminada: true }
const TARJETA_B: TarjetaPago = { id: 'b', marca: 'Mastercard', ultimos4: '5555', vencimiento: '11/98', titular: 'Luis Prueba', predeterminada: false }
const PERFIL_A: PerfilPago = { id: 'p-a', documento: '20111111111', razon: 'Empresa Alfa SAC', pais: 'pe', direccion: 'Calle Alfa 100', correo: 'alfa@ejemplo.test', celular: '911222333', whatsapp: true, sms: false }
const PERFIL_B: PerfilPago = { id: 'p-b', documento: '20222222222', razon: 'Empresa Beta SAC', pais: 'cl', direccion: 'Calle Beta 200', correo: 'beta@ejemplo.test', celular: '944555666', whatsapp: false, sms: true }

const PEDIDO: PedidoPago = {
  lineas: [{ id: 'l1', nombre: 'Producto Uno', detalle: 'Plan Base', precio: 'USD 10 /mes', icono: 'tarjeta-pago', claseIcono: 'bg-primario' }],
  adicionales: [],
  filas: [{ etiqueta: 'Cobro hoy', valor: 'USD 0' }],
  totalEtiqueta: 'Total',
  total: 'USD 10',
  accion: 'Confirmar compra',
  aviso: 'Pago de demostración',
}

const TERMINOS: AutorizacionPago = { id: 'terminos', texto: 'Acepto los términos del pedido', obligatoria: true, version: '2026-01' }
const COBROS: AutorizacionPago = { id: 'cobros', texto: 'Autorizo los cobros recurrentes', obligatoria: true }
const PROMOCIONES: AutorizacionPago = { id: 'promociones', texto: 'Quiero recibir novedades', obligatoria: false }

const CONFIGURACION: ConfiguracionFlujoPago = {
  metodos: ['tarjeta', 'billetera'],
  billeteras: [{ id: 'yape', nombre: 'Yape' }, { id: 'plin', nombre: 'Plin' }],
  paises: PAISES,
  perfilInicialId: 'p-a',
  avisoRenovacion: 'Se renovará el 01 ene.',
  calendario: { titulo: 'Calendario', detalle: 'Cobros por adelantado', filas: [{ titulo: 'Hoy', detalle: 'Activación', valor: 'USD 0' }] },
  autorizaciones: { titulo: 'Autorización', detalle: 'Confirma tu pedido', elementos: [TERMINOS] },
}

function repositorioTarjetas(semilla: TarjetaPago[]): RepositorioTarjetasPago {
  let lista = semilla.map((tarjeta) => ({ ...tarjeta }))
  const copia = () => lista.map((tarjeta) => ({ ...tarjeta }))
  return {
    leerEstadoInicial: () => ({ tarjetas: copia(), estado: 'listo' }),
    listar: async () => copia(),
    registrar: async (datos, predeterminada) => {
      lista = [{ ...datos, id: `t-${lista.length + 1}`, predeterminada: predeterminada || lista.length === 0 }, ...lista.map((tarjeta) => (predeterminada ? { ...tarjeta, predeterminada: false } : tarjeta))]
      return copia()
    },
    actualizar: async (id, cambios) => {
      lista = lista.map((tarjeta) => {
        if (tarjeta.id === id) return { ...tarjeta, vencimiento: cambios.vencimiento, titular: cambios.titular, predeterminada: cambios.predeterminada || tarjeta.predeterminada === true }
        return cambios.predeterminada ? { ...tarjeta, predeterminada: false } : tarjeta
      })
      return copia()
    },
    eliminar: async (id) => {
      const restantes = lista.filter((tarjeta) => tarjeta.id !== id)
      lista = restantes.some((tarjeta) => tarjeta.predeterminada) || restantes.length === 0 ? restantes : restantes.map((tarjeta, indice) => (indice === 0 ? { ...tarjeta, predeterminada: true } : tarjeta))
      return copia()
    },
    codigoDeFallo: () => 'escritura',
  }
}

function repositorioPerfiles(semilla: PerfilPago[]): RepositorioPerfilesPago {
  let lista = semilla.map((perfil) => ({ ...perfil }))
  let secuencia = 0
  const copia = () => lista.map((perfil) => ({ ...perfil }))
  return {
    leerEstadoInicial: () => ({ perfiles: copia(), estado: 'listo' }),
    listar: async () => copia(),
    registrar: async (datos: DatosPerfilPago) => {
      secuencia += 1
      lista = [...lista, { ...datos, id: `nuevo-${secuencia}` }]
      return copia()
    },
    actualizar: async (id, datos) => {
      lista = lista.map((perfil) => (perfil.id === id ? { ...datos, id } : perfil))
      return copia()
    },
    codigoDeFallo: () => 'escritura',
  }
}

function Montaje({ tarjetas, perfiles, configuracion = CONFIGURACION, alActivar = () => undefined, repositorio, pedido = PEDIDO }: { tarjetas: TarjetaPago[]; perfiles: PerfilPago[]; pedido?: PedidoPago; configuracion?: ConfiguracionFlujoPago; alActivar?: FlujoPagoProps['alActivar']; repositorio?: RepositorioPerfilesPago }) {
  const controlTarjetas = usarTarjetasPago(repositorioTarjetas(tarjetas))
  const controlPerfiles = usarPerfilesPago(repositorio ?? repositorioPerfiles(perfiles))
  return <FlujoPago configuracion={configuracion} pedido={pedido} tarjetas={controlTarjetas} perfiles={controlPerfiles} alActivar={alActivar} />
}

function escribir(etiqueta: string, valor: string) {
  fireEvent.change(screen.getByRole('textbox', { name: etiqueta }), { target: { value: valor } })
}

function simularMovil(activo: boolean) {
  window.matchMedia = ((consulta: string) => ({
    matches: activo && consulta === catalogoCompartido.consultas.movil,
    media: consulta,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as typeof window.matchMedia
}

afterEach(() => {
  window.matchMedia = matchMediaOriginal
})

describe('Flujo de pago compartido: métodos de pago', { timeout: 30000 }, () => {
  it('muestra la tarjeta guardada con marca, últimos cuatro, vencimiento y predeterminada, sin pedir de nuevo sus datos', () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    expect(screen.getByText('Visa •••• 4242')).toBeInTheDocument()
    expect(screen.getByText(textos.guardados.vence.replace(':fecha', '12/99'), { exact: false })).toBeInTheDocument()
    expect(screen.getByText(guardado.predeterminada)).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: textos.campos.numero })).toBeNull()
    expect(screen.queryByRole('textbox', { name: textos.campos.cvv })).toBeNull()
  })

  it('el lapiz de editar es el glifo oficial de la biblioteca de iconos, no un SVG propio', () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    for (const nombre of [guardado.editar_etiqueta, perfilesTextos.editar_etiqueta]) {
      const boton = screen.getByRole('button', { name: nombre })
      expect(boton.querySelector('.material-symbols-rounded')?.textContent).toBe('edit')
      expect(boton.querySelector('svg.icono')).toBeNull()
    }
  })

  it('edita una tarjeta con el formulario precargado y actualiza la misma tarjeta sin duplicarla', async () => {
    render(<Montaje tarjetas={[TARJETA_A, TARJETA_B]} perfiles={[PERFIL_A]} />)
    fireEvent.click(screen.getByRole('button', { name: guardado.editar_etiqueta }))
    const selector = within(screen.getByRole('dialog', { name: guardado.modal.titulo }))
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.editar_tarjeta.replace(':tarjeta', 'Visa •••• 4242') }))
    expect(selector.getByRole('textbox', { name: textos.campos.vencimiento })).toHaveValue('12/99')
    expect(selector.getByRole('textbox', { name: textos.campos.propietario })).toHaveValue('Ana Prueba')
    fireEvent.change(selector.getByRole('textbox', { name: textos.campos.propietario }), { target: { value: 'Ana Editada' } })
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.guardar_cambios }))
    await waitFor(() => expect(selector.queryByRole('textbox', { name: textos.campos.propietario })).toBeNull())
    expect(selector.getAllByRole('radio')).toHaveLength(2)
    expect(selector.getByText('Ana Editada', { exact: false })).toBeInTheDocument()
  })

  it('cancelar la edición conserva los valores anteriores', async () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    fireEvent.click(screen.getByRole('button', { name: guardado.editar_etiqueta }))
    const selector = within(screen.getByRole('dialog', { name: guardado.modal.titulo }))
    fireEvent.click(selector.getByRole('button', { name: /^Editar tarjeta/ }))
    fireEvent.change(selector.getByRole('textbox', { name: textos.campos.propietario }), { target: { value: 'Otro Nombre' } })
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.cancelar_edicion }))
    expect(selector.getByText('Ana Prueba', { exact: false })).toBeInTheDocument()
    expect(selector.queryByText('Otro Nombre', { exact: false })).toBeNull()
  })

  it('quitar una tarjeta pide confirmación, la elimina y la predeterminada pasa a la siguiente', async () => {
    render(<Montaje tarjetas={[TARJETA_A, TARJETA_B]} perfiles={[PERFIL_A]} />)
    fireEvent.click(screen.getByRole('button', { name: guardado.editar_etiqueta }))
    const selector = within(screen.getByRole('dialog', { name: guardado.modal.titulo }))
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.editar_tarjeta.replace(':tarjeta', 'Visa •••• 4242') }))
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.quitar }))
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.quitar_conservar }))
    expect(selector.getByRole('button', { name: textos.tarjetas.quitar })).toBeInTheDocument()
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.quitar }))
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.quitar_confirmar }))
    await waitFor(() => expect(selector.getAllByRole('radio')).toHaveLength(1))
    expect(selector.queryByText('Visa •••• 4242')).toBeNull()
    expect(within(selector.getByRole('radio', { name: /Mastercard/ })).getByText(guardado.predeterminada)).toBeInTheDocument()
  })

  it('al quitar la única tarjeta el flujo vuelve a pedir los datos de una nueva', async () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    fireEvent.click(screen.getByRole('button', { name: guardado.editar_etiqueta }))
    const selector = within(screen.getByRole('dialog', { name: guardado.modal.titulo }))
    fireEvent.click(selector.getByRole('button', { name: /^Editar tarjeta/ }))
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.quitar }))
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.quitar_confirmar }))
    await waitFor(() => expect(selector.queryByRole('radio')).toBeNull())
    fireEvent.click(selector.getByRole('button', { name: guardado.modal.cancelar }))
    expect(await screen.findByRole('textbox', { name: textos.campos.numero })).toHaveValue('')
  })

  it('un vencimiento pasado no se guarda y muestra el error', () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    fireEvent.click(screen.getByRole('button', { name: guardado.editar_etiqueta }))
    const selector = within(screen.getByRole('dialog', { name: guardado.modal.titulo }))
    fireEvent.click(selector.getByRole('button', { name: /^Editar tarjeta/ }))
    fireEvent.change(selector.getByRole('textbox', { name: textos.campos.vencimiento }), { target: { value: '0120' } })
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.guardar_cambios }))
    expect(selector.getByText(textos.errores.vencida)).toBeInTheDocument()
  })

  it('al editar una tarjeta se puede establecer como predeterminada y solo una conserva la marca', async () => {
    render(<Montaje tarjetas={[TARJETA_A, TARJETA_B]} perfiles={[PERFIL_A]} />)
    fireEvent.click(screen.getByRole('button', { name: guardado.editar_etiqueta }))
    const selector = within(screen.getByRole('dialog', { name: guardado.modal.titulo }))
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.editar_tarjeta.replace(':tarjeta', 'Mastercard •••• 5555') }))
    fireEvent.click(selector.getByRole('checkbox', { name: textos.tarjetas.predeterminada_edicion }))
    fireEvent.click(selector.getByRole('button', { name: textos.tarjetas.guardar_cambios }))
    await waitFor(() => expect(selector.getAllByText(guardado.predeterminada)).toHaveLength(1))
    const mastercard = selector.getByRole('radio', { name: /Mastercard/ })
    expect(within(mastercard).getByText(guardado.predeterminada)).toBeInTheDocument()
  })

  it('con billeteras habilitadas permite elegir entre las que entrega el consumidor', () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(textos.metodos.opciones[1].titulo) }))
    expect(screen.getByRole('radio', { name: /Yape/ })).toHaveAttribute('aria-checked', 'true')
    fireEvent.click(screen.getByRole('radio', { name: /Plin/ }))
    expect(screen.getByRole('radio', { name: /Plin/ })).toHaveAttribute('aria-checked', 'true')
  })

  it('un consumidor que solo admite tarjetas no ve billeteras digitales', () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} configuracion={{ ...CONFIGURACION, metodos: ['tarjeta'] }} />)
    expect(screen.queryByText(textos.metodos.opciones[1].titulo)).toBeNull()
    expect(screen.getByText(textos.metodos.opciones[0].titulo)).toBeInTheDocument()
  })
})

describe('Flujo de pago compartido: datos de facturación', { timeout: 30000 }, () => {
  it('muestra el perfil guardado con todos sus datos y no un formulario vacío', () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A, PERFIL_B]} />)
    expect(screen.getByText('Empresa Alfa SAC')).toBeInTheDocument()
    for (const dato of ['20111111111', 'Perú', '+51 911 222 333', 'alfa@ejemplo.test', 'Calle Alfa 100', textos.perfiles.canal_whatsapp]) {
      expect(screen.getByText(dato, { exact: false })).toBeInTheDocument()
    }
    expect(screen.queryByRole('textbox', { name: textos.campos.documento })).toBeNull()
  })

  it('editar abre el formulario con los datos precargados y cancelar los conserva', () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.editar_etiqueta }))
    expect(screen.getByRole('textbox', { name: textos.campos.documento })).toHaveValue('20111111111')
    expect(screen.getByRole('textbox', { name: textos.campos.razon })).toHaveValue('Empresa Alfa SAC')
    expect(screen.getByRole('textbox', { name: textos.campos.direccion })).toHaveValue('Calle Alfa 100')
    expect(screen.getByRole('textbox', { name: textos.campos.correo })).toHaveValue('alfa@ejemplo.test')
    escribir(textos.campos.direccion, 'Otra dirección 1')
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.cancelar }))
    expect(screen.getByText('Calle Alfa 100')).toBeInTheDocument()
    expect(screen.queryByText('Otra dirección 1')).toBeNull()
  })

  it('guardar actualiza el mismo perfil y no crea un duplicado', async () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A, PERFIL_B]} />)
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.editar_etiqueta }))
    escribir(textos.campos.direccion, 'Calle Alfa 999')
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.guardar_cambios }))
    expect(await screen.findByText('Calle Alfa 999')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: new RegExp(textos.guardados.ver_otras.replace(':n', '2').replace('(', '\\(').replace(')', '\\)')) })).toBeInTheDocument()
  })

  it('permite elegir otro perfil sin sobrescribir el anterior', async () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A, PERFIL_B]} />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp('Ver otras') }))
    const selector = within(screen.getByRole('dialog', { name: textos.guardados.titulo_perfiles }))
    fireEvent.click(selector.getByRole('button', { name: /Empresa Beta SAC/ }))
    expect(await screen.findByText('Empresa Beta SAC')).toBeInTheDocument()
    expect(screen.getByText('Chile')).toBeInTheDocument()
    expect(screen.queryByText('Empresa Alfa SAC')).toBeNull()
  })

  it('agregar perfil abre un formulario vacío, exige RUC o DNI y razón social, y registra uno nuevo', async () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.agregar }))
    expect(screen.getByRole('textbox', { name: textos.campos.documento })).toHaveValue('')
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.guardar }))
    expect(screen.getByText(perfilesTextos.errores.documento)).toBeInTheDocument()
    expect(screen.getByText(perfilesTextos.errores.razon)).toBeInTheDocument()
    escribir(textos.campos.documento, '20333333333')
    escribir(textos.campos.razon, 'Empresa Gamma SAC')
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.guardar }))
    expect(await screen.findByText('Empresa Gamma SAC')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: new RegExp('Ver otras') })).toBeInTheDocument()
  })

  it('vaciar un dato obligatorio al editar no guarda ni sale de la edición: marca el error y conserva el perfil', async () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.editar_etiqueta }))
    escribir(textos.campos.documento, '')
    escribir(textos.campos.razon, '')
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.guardar_cambios }))
    expect(screen.getByText(perfilesTextos.errores.documento)).toBeInTheDocument()
    expect(screen.getByText(perfilesTextos.errores.razon)).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: textos.campos.documento })).toHaveValue('')
    escribir(textos.campos.documento, '20111111111')
    expect(screen.queryByText(perfilesTextos.errores.documento)).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.cancelar }))
    expect(screen.getByText('Empresa Alfa SAC')).toBeInTheDocument()
  })

  it('un correo mal escrito se rechaza al guardar, pero dejarlo vacío es válido', async () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.editar_etiqueta }))
    escribir(textos.campos.correo, 'sin-arroba')
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.guardar_cambios }))
    expect(screen.getByText(perfilesTextos.errores.correo)).toBeInTheDocument()
    escribir(textos.campos.correo, '')
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.guardar_cambios }))
    expect(await screen.findByText('Empresa Alfa SAC')).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: textos.campos.correo })).toBeNull()
  })

  it('un cliente nuevo ve los formularios de tarjeta y de facturación vacíos', () => {
    render(<Montaje tarjetas={[]} perfiles={[]} />)
    expect(screen.getByRole('textbox', { name: textos.campos.numero })).toHaveValue('')
    expect(screen.getByRole('textbox', { name: textos.campos.documento })).toHaveValue('')
    expect(screen.queryByRole('button', { name: perfilesTextos.editar_etiqueta })).toBeNull()
  })
})

const avisos = textos.avisos
const aut = textos.autorizacion

function casilla(texto: string) {
  return screen.getByRole('checkbox', { name: new RegExp(texto.slice(0, 12)) })
}

function aceptar(...elementos: AutorizacionPago[]) {
  elementos.forEach((elemento) => fireEvent.click(casilla(elemento.texto)))
}

function conAutorizaciones(...elementos: AutorizacionPago[]): ConfiguracionFlujoPago {
  return { ...CONFIGURACION, autorizaciones: { ...CONFIGURACION.autorizaciones, elementos } }
}

function intentar() {
  fireEvent.click(screen.getByRole('button', { name: PEDIDO.accion }))
}

describe('Flujo de pago compartido: autorizaciones', { timeout: 30000 }, () => {
  it('ninguna autorización viene aceptada por defecto', () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} configuracion={conAutorizaciones(TERMINOS, COBROS, PROMOCIONES)} />)
    for (const elemento of [TERMINOS, COBROS, PROMOCIONES]) expect(casilla(elemento.texto)).not.toBeChecked()
  })

  it('al intentar continuar sin aceptar no se inicia la operación y se señala la autorización pendiente', () => {
    const alActivar = vi.fn()
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} alActivar={alActivar} />)
    const boton = screen.getByRole('button', { name: PEDIDO.accion })
    expect(boton).toBeEnabled()
    intentar()
    expect(alActivar).not.toHaveBeenCalled()
    expect(boton).not.toHaveAttribute('aria-busy', 'true')
    const campo = casilla(TERMINOS.texto)
    expect(campo).toHaveAttribute('aria-invalid', 'true')
    expect(campo).toHaveFocus()
    const error = screen.getByText(aut.obligatoria_pendiente)
    expect(error).toHaveAttribute('role', 'alert')
    expect(campo.getAttribute('aria-describedby')).toBe(error.id)
    expect(screen.queryByText(/autorizaciones obligatorias para continuar/i)).toBeNull()
    expect(screen.queryByRole('status')).toBeNull()
    expect(screen.getAllByText(aut.obligatoria_pendiente)).toHaveLength(1)
    expect(screen.queryByText(/\* Autorización obligatoria/)).toBeNull()
    expect(screen.queryByText(textos.errores_flujo.activar)).toBeNull()
  })

  it('al aceptar desaparece el error y se puede volver a intentar', async () => {
    const alActivar = vi.fn()
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} alActivar={alActivar} />)
    intentar()
    aceptar(TERMINOS)
    expect(screen.queryByText(aut.obligatoria_pendiente)).toBeNull()
    expect(casilla(TERMINOS.texto)).not.toHaveAttribute('aria-invalid', 'true')
    intentar()
    await waitFor(() => expect(alActivar).toHaveBeenCalledTimes(1))
  })

  it('entrega al consumidor cada autorización con su aceptación y versión, y no marca como simulado sin demostración', async () => {
    const alActivar = vi.fn()
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} alActivar={alActivar} configuracion={conAutorizaciones(TERMINOS, PROMOCIONES)} />)
    aceptar(TERMINOS)
    intentar()
    await waitFor(() => expect(alActivar).toHaveBeenCalledTimes(1))
    expect(alActivar).toHaveBeenCalledWith(expect.objectContaining({
      metodo: 'tarjeta',
      marca: 'Visa',
      ultimos4: '4242',
      billetera: null,
      simulado: false,
      perfil: expect.objectContaining({ id: 'p-a' }),
      autorizaciones: [{ id: 'terminos', aceptada: true, version: '2026-01' }, { id: 'promociones', aceptada: false, version: undefined }],
    }))
  })

  it('con dos obligatorias deben aceptarse las dos, y cada pendiente muestra su error', async () => {
    const alActivar = vi.fn()
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} alActivar={alActivar} configuracion={conAutorizaciones(TERMINOS, COBROS)} />)
    aceptar(TERMINOS)
    intentar()
    expect(alActivar).not.toHaveBeenCalled()
    expect(screen.getAllByText(aut.obligatoria_pendiente)).toHaveLength(1)
    expect(casilla(COBROS.texto)).toHaveFocus()
    aceptar(COBROS)
    intentar()
    await waitFor(() => expect(alActivar).toHaveBeenCalledTimes(1))
  })

  it('una autorización opcional no bloquea y no lleva asterisco', async () => {
    const alActivar = vi.fn()
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} alActivar={alActivar} configuracion={conAutorizaciones(TERMINOS, PROMOCIONES)} />)
    aceptar(TERMINOS)
    intentar()
    await waitFor(() => expect(alActivar).toHaveBeenCalledTimes(1))
    expect(casilla(PROMOCIONES.texto)).not.toBeChecked()
  })

  it('marca con asterisco solo las obligatorias, junto al texto, y lo explica una única vez', () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} configuracion={conAutorizaciones(TERMINOS, COBROS, PROMOCIONES)} />)
    const asterisco = catalogoCompartido.flujo_pago.reglas.autorizacion.asterisco
    for (const elemento of [TERMINOS, COBROS]) {
      const etiqueta = casilla(elemento.texto).closest('label') as HTMLElement
      const marca = within(etiqueta).getByText(asterisco)
      expect(marca).toHaveAttribute('aria-hidden', 'true')
      expect(marca.parentElement).toHaveTextContent(new RegExp(`${elemento.texto.split(' ').pop()}\\*$`))
      expect(casilla(elemento.texto)).toHaveAttribute('aria-required', 'true')
    }
    const opcional = casilla(PROMOCIONES.texto).closest('label') as HTMLElement
    expect(within(opcional).queryByText(asterisco)).toBeNull()
    expect(casilla(PROMOCIONES.texto)).toHaveAttribute('aria-required', 'false')
    expect(screen.queryByText(/Autorización obligatoria/)).toBeNull()
    expect(screen.queryByText(/opcional/i)).toBeNull()
  })

  it('en el estado de error el texto conserva su color y solo el control y el asterisco señalan el problema', () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    const etiqueta = casilla(TERMINOS.texto).closest('label') as HTMLElement
    expect(etiqueta.className).not.toMatch(/texto-/)
    intentar()
    const enError = casilla(TERMINOS.texto).closest('label') as HTMLElement
    expect(enError).toHaveClass(...catalogoCompartido.flujo_pago.clases.texto_autorizacion_error.split(' '))
    expect(within(enError).getByText(catalogoCompartido.flujo_pago.reglas.autorizacion.asterisco)).toHaveClass(...catalogoCompartido.flujo_pago.clases.asterisco.split(' '))
    aceptar(TERMINOS)
    expect((casilla(TERMINOS.texto).closest('label') as HTMLElement).className).toBe(etiqueta.className)
  })

  it('un consumidor sin autorizaciones obligatorias puede continuar de inmediato', async () => {
    const alActivar = vi.fn()
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} alActivar={alActivar} configuracion={conAutorizaciones(PROMOCIONES)} />)
    intentar()
    await waitFor(() => expect(alActivar).toHaveBeenCalledTimes(1))
  })
})

describe('Flujo de pago compartido: validaciones, estados de operación y alertas', { timeout: 30000 }, () => {
  it('con cambios de facturación sin guardar no continúa y lo advierte', () => {
    const alActivar = vi.fn()
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} alActivar={alActivar} />)
    aceptar(TERMINOS)
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.editar_etiqueta }))
    intentar()
    expect(alActivar).not.toHaveBeenCalled()
    expect(screen.getByText(perfilesTextos.edicion_pendiente)).toBeInTheDocument()
    expect(screen.getByText(avisos.edicion_pendiente)).toBeInTheDocument()
  })

  it('sin tarjeta guardada exige los datos de la tarjeta antes de procesar', () => {
    const alActivar = vi.fn()
    render(<Montaje tarjetas={[]} perfiles={[PERFIL_A]} alActivar={alActivar} />)
    aceptar(TERMINOS)
    intentar()
    expect(alActivar).not.toHaveBeenCalled()
    expect(screen.getByText(textos.errores.numero)).toBeInTheDocument()
    expect(screen.getByText(avisos.datos_incompletos)).toBeInTheDocument()
  })

  it('durante el procesamiento muestra la carga, impide envíos duplicados y luego confirma sin presentarlo como cobro real', async () => {
    let terminar: () => void = () => undefined
    const alActivar = vi.fn(() => new Promise<void>((resolver) => { terminar = resolver }))
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} alActivar={alActivar} configuracion={{ ...CONFIGURACION, demostracion: { tarjetas: 'Demostración' } }} />)
    aceptar(TERMINOS)
    const boton = screen.getByRole('button', { name: PEDIDO.accion })
    fireEvent.click(boton)
    fireEvent.click(boton)
    const ocupado = await screen.findByRole('button', { name: new RegExp(textos.resumen.procesando) })
    expect(ocupado).toBeDisabled()
    expect(ocupado).toHaveAttribute('aria-busy', 'true')
    fireEvent.click(ocupado)
    expect(alActivar).toHaveBeenCalledTimes(1)
    expect(alActivar).toHaveBeenCalledWith(expect.objectContaining({ simulado: true }))
    terminar()
    expect(await screen.findByText(avisos.operacion_demostracion)).toBeInTheDocument()
    expect(screen.queryByText(textos.errores_flujo.activar)).toBeNull()
    expect(screen.getByRole('button', { name: PEDIDO.accion })).toBeDisabled()
  })

  it('si el consumidor rechaza la operación informa el error, conserva lo aceptado y permite reintentar', async () => {
    const alActivar = vi.fn().mockRejectedValueOnce(new Error('fallo interno')).mockResolvedValue(undefined)
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} alActivar={alActivar} />)
    aceptar(TERMINOS)
    intentar()
    expect(await screen.findByText(textos.errores_flujo.activar)).toBeInTheDocument()
    expect(screen.queryByText('fallo interno')).toBeNull()
    expect(screen.queryByText(avisos.operacion_exito)).toBeNull()
    expect(casilla(TERMINOS.texto)).toBeChecked()
    expect(screen.getByRole('button', { name: PEDIDO.accion })).toBeEnabled()
    intentar()
    await waitFor(() => expect(alActivar).toHaveBeenCalledTimes(2))
    expect(await screen.findByText(avisos.operacion_exito)).toBeInTheDocument()
  })

  it('un resultado fallido del consumidor muestra su mensaje y no presenta éxito', async () => {
    const alActivar = vi.fn(() => ({ exito: false, mensaje: 'Servicio no disponible' }))
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} alActivar={alActivar} />)
    aceptar(TERMINOS)
    intentar()
    expect(await screen.findByText('Servicio no disponible')).toBeInTheDocument()
    expect(screen.queryByText(avisos.operacion_exito)).toBeNull()
    expect(screen.queryByText(avisos.operacion_demostracion)).toBeNull()
  })

  it('guardar un perfil muestra una única confirmación y un error de guardado conserva lo que se estaba editando', async () => {
    const base = repositorioPerfiles([PERFIL_A])
    let fallar = true
    const repositorio: RepositorioPerfilesPago = { ...base, actualizar: (id, datos) => (fallar ? Promise.reject(new Error('sin red')) : base.actualizar(id, datos)) }
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} repositorio={repositorio} />)
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.editar_etiqueta }))
    escribir(textos.campos.direccion, 'Calle Nueva 1')
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.guardar_cambios }))
    expect(await screen.findByText(avisos.perfil_error)).toBeInTheDocument()
    expect(screen.queryByText(avisos.perfil_actualizado)).toBeNull()
    expect(screen.getByRole('textbox', { name: textos.campos.direccion })).toHaveValue('Calle Nueva 1')
    fallar = false
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.guardar_cambios }))
    expect(await screen.findByText(avisos.perfil_actualizado)).toBeInTheDocument()
    expect(screen.getAllByText(avisos.perfil_actualizado)).toHaveLength(1)
    expect(screen.getByText('Calle Nueva 1')).toBeInTheDocument()
  })

  it('agregar un perfil confirma de forma distinta a editar', async () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.agregar }))
    escribir(textos.campos.documento, '20333333333')
    escribir(textos.campos.razon, 'Empresa Gamma SAC')
    fireEvent.click(screen.getByRole('button', { name: perfilesTextos.guardar }))
    expect(await screen.findByText(avisos.perfil_agregado)).toBeInTheDocument()
    expect(screen.queryByText(avisos.perfil_actualizado)).toBeNull()
  })

  it('sin calendario el paso de autorización se numera a continuación de facturación', () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} configuracion={{ ...CONFIGURACION, calendario: null }} />)
    expect(screen.queryByText(CONFIGURACION.calendario?.titulo ?? '')).toBeNull()
    const titulo = screen.getByRole('heading', { name: CONFIGURACION.autorizaciones.titulo })
    expect(titulo.parentElement?.previousElementSibling).toHaveTextContent('3')
  })

  it('en móvil la acción principal va en una barra fija y no se duplica en el resumen', () => {
    simularMovil(true)
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    const botones = screen.getAllByRole('button', { name: PEDIDO.accion })
    expect(botones).toHaveLength(1)
    expect(botones[0].closest(`.${catalogoCompartido.flujo_pago.clases.barra_accion.split(' ')[0]}`)).not.toBeNull()
  })

  it('en escritorio la acción principal va dentro del resumen del pedido', () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} />)
    const resumen = screen.getByRole('heading', { name: textos.resumen.titulo }).closest('aside')
    expect(resumen).not.toBeNull()
    expect(within(resumen as HTMLElement).getByRole('button', { name: PEDIDO.accion })).toBeInTheDocument()
  })
})

describe('Flujo de pago compartido: nombre del pedido en el resumen', { timeout: 30000 }, () => {
  const LARGO = 'Consultoría Empresarial y Servicios Generales del Norte SAC'
  const pedidoLargo: PedidoPago = { ...PEDIDO, lineas: [{ ...PEDIDO.lineas[0], nombre: LARGO }] }

  function medidas(elemento: HTMLElement, ancho: number, visible: number) {
    Object.defineProperty(elemento, 'scrollWidth', { configurable: true, value: ancho })
    Object.defineProperty(elemento, 'clientWidth', { configurable: true, value: visible })
  }

  it('muestra el nombre completo en el tooltip oficial al pasar el cursor cuando está truncado', async () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} pedido={pedidoLargo} />)
    const nombre = screen.getByText(LARGO)
    medidas(nombre, 320, 180)
    await act(async () => { fireEvent.mouseOver(nombre) })
    expect(await screen.findByRole('tooltip')).toHaveTextContent(LARGO)
  })

  it('el nombre truncado se puede enfocar con el teclado y el foco también abre el tooltip', async () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} pedido={pedidoLargo} />)
    const nombre = screen.getByText(LARGO)
    expect(nombre).toHaveAttribute('tabindex', '0')
    medidas(nombre, 320, 180)
    fireEvent.keyDown(document.body, { key: 'Tab' })
    await act(async () => { nombre.focus() })
    expect(await screen.findByRole('tooltip')).toHaveTextContent(LARGO)
  })

  it('no muestra tooltip cuando el nombre cabe completo', async () => {
    render(<Montaje tarjetas={[TARJETA_A]} perfiles={[PERFIL_A]} pedido={pedidoLargo} />)
    const nombre = screen.getByText(LARGO)
    medidas(nombre, 180, 180)
    await act(async () => { fireEvent.mouseOver(nombre) })
    expect(screen.queryByRole('tooltip')).toBeNull()
  })
})
