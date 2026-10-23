import { useState } from 'react'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { formatearTarjeta, formatearVencimiento } from './logica_pago_planes'
import { sinErrores, validarTarjetaNueva } from './validacion_tarjeta'
import type { DatosTarjeta, ErroresTarjeta, FormularioTarjeta } from '@/tipos/marketplace/modelo_pago'

const VACIO = catalogoCompartido.controles.texto_vacio
const NO_DIGITO = /\D/g
const tarjetaInicial: DatosTarjeta = { numero: VACIO, vencimiento: VACIO, cvv: VACIO, propietario: VACIO }

export function usarFormularioTarjeta(): FormularioTarjeta {
  const [tarjeta, setTarjeta] = useState(tarjetaInicial)
  const [errores, setErrores] = useState<ErroresTarjeta>({})

  function cambiar(campo: keyof DatosTarjeta, valor: string) {
    setTarjeta((previa) => ({ ...previa, [campo]: valor }))
    setErrores((previos) => ({ ...previos, [campo]: undefined }))
  }

  function validar() {
    const resultado = validarTarjetaNueva(tarjeta)
    setErrores(resultado)
    return sinErrores(resultado)
  }

  return {
    tarjeta,
    errores,
    cambiarNumero: (valor: string) => cambiar('numero', formatearTarjeta(valor)),
    cambiarVencimiento: (valor: string) => cambiar('vencimiento', formatearVencimiento(valor)),
    cambiarCvv: (valor: string) => cambiar('cvv', valor.replace(NO_DIGITO, VACIO).slice(0, 4)),
    cambiarPropietario: (valor: string) => cambiar('propietario', valor),
    validar,
    limpiar: () => {
      setTarjeta(tarjetaInicial)
      setErrores({})
    },
  }
}

