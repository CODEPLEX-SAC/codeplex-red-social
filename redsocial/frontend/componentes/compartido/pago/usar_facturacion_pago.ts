import { useState } from 'react'
import { datosDePerfil, perfilConDatos, perfilVacio, validarPerfil } from './logica_perfil_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { ConfiguracionFlujoPago, ControlPerfilesPago, DatosPerfilPago, ErroresPerfilPago, ModoFacturacionPago, PerfilPago, VarianteAvisoPago } from '@/tipos/compartido/contrato_flujo_pago'

function perfilInicial(configuracion: ConfiguracionFlujoPago, perfiles: PerfilPago[]) {
  const pedido = perfiles.find((perfil) => perfil.id === configuracion.perfilInicialId)
  return (pedido ?? perfiles[0])?.id ?? null
}

export function usarFacturacionPago(configuracion: ConfiguracionFlujoPago, control: ControlPerfilesPago, notificar: (variante: VarianteAvisoPago, mensaje: string) => void) {
  const textos = usarTextosPago()
  const [perfilId, setPerfilId] = useState<string | null>(() => perfilInicial(configuracion, control.perfiles))
  const [modo, setModo] = useState<ModoFacturacionPago>('resumen')
  const [borrador, setBorrador] = useState<DatosPerfilPago>(() => perfilVacio(configuracion.paises))
  const [errores, setErrores] = useState<ErroresPerfilPago>({})
  const perfil = control.perfiles.find((candidato) => candidato.id === perfilId) ?? null
  const modoActual: ModoFacturacionPago = perfil ? modo : 'nuevo'

  function volverAlResumen(id: string) {
    setPerfilId(id)
    setModo('resumen')
    setErrores({})
  }

  function editar() {
    if (!perfil) return
    control.limpiarError()
    setBorrador(datosDePerfil(perfil))
    setErrores({})
    setModo('edicion')
  }

  function agregar() {
    control.limpiarError()
    setBorrador(perfilVacio(configuracion.paises))
    setErrores({})
    setModo('nuevo')
  }

  function cancelar() {
    control.limpiarError()
    setErrores({})
    setBorrador(perfil ? datosDePerfil(perfil) : perfilVacio(configuracion.paises))
    setModo('resumen')
  }

  function cambiar<C extends keyof DatosPerfilPago>(campo: C, valor: DatosPerfilPago[C]) {
    setBorrador((previo) => ({ ...previo, [campo]: valor }))
    setErrores((previos) => ({ ...previos, [campo]: undefined }))
  }

  async function guardar() {
    const encontrados = validarPerfil(borrador, textos)
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return
    if (modoActual === 'edicion' && perfil) {
      const actualizado = await control.actualizar(perfil.id, borrador)
      if (actualizado) {
        volverAlResumen(actualizado.id)
        notificar('exito', textos.avisos.perfil_actualizado)
      } else notificar('error', textos.avisos.perfil_error)
      return
    }
    const registrado = await control.registrar(borrador)
    if (registrado) {
      volverAlResumen(registrado.id)
      notificar('exito', textos.avisos.perfil_agregado)
    } else notificar('error', textos.avisos.perfil_error)
  }

  function asegurar(): PerfilPago | null | Promise<PerfilPago | null> {
    if (modoActual === 'nuevo' && perfilConDatos(borrador)) return control.registrar(borrador)
    return perfil
  }

  return {
    perfil,
    modo: modoActual,
    borrador,
    errores,
    hayOtros: control.perfiles.length > 1,
    hayPerfiles: control.perfiles.length > 0,
    elegir: volverAlResumen,
    editar,
    agregar,
    cancelar,
    cambiar,
    guardar,
    asegurar,
  }
}
