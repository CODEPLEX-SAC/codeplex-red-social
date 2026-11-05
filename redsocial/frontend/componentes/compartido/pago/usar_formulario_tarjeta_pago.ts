import { useState } from 'react'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { formatearTarjeta, formatearVencimiento, soloDigitos } from './logica_tarjeta_pago'
import { sinErrores, validarTarjetaNueva } from './validacion_tarjeta_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { DatosTarjetaPago, ErroresTarjetaPago, FormularioTarjetaPago } from '@/tipos/compartido/contrato_flujo_pago'

const VACIO = catalogoCompartido.controles.texto_vacio
const tarjetaInicial: DatosTarjetaPago = { numero: VACIO, vencimiento: VACIO, cvv: VACIO, propietario: VACIO }

export function usarFormularioTarjetaPago(): FormularioTarjetaPago {
  const textos = usarTextosPago()
  const [tarjeta, setTarjeta] = useState(tarjetaInicial)
  const [errores, setErrores] = useState<ErroresTarjetaPago>({})

  function cambiar(campo: keyof DatosTarjetaPago, valor: string) {
    setTarjeta((previa) => ({ ...previa, [campo]: valor }))
    setErrores((previos) => ({ ...previos, [campo]: undefined }))
  }

  function validar() {
    const resultado = validarTarjetaNueva(tarjeta, textos.errores)
    setErrores(resultado)
    return sinErrores(resultado)
  }

  return {
    tarjeta,
    errores,
    cambiarNumero: (valor: string) => cambiar('numero', formatearTarjeta(valor)),
    cambiarVencimiento: (valor: string) => cambiar('vencimiento', formatearVencimiento(valor)),
    cambiarCvv: (valor: string) => cambiar('cvv', soloDigitos(valor).slice(0, 4)),
    cambiarPropietario: (valor: string) => cambiar('propietario', valor),
    validar,
    limpiar: () => {
      setTarjeta(tarjetaInicial)
      setErrores({})
    },
  }
}
