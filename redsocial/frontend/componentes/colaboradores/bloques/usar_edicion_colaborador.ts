import { useState } from 'react'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { BorradorColaborador, CambiarBorrador } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import { borradorValido, crearBorrador, estadoDeEtiqueta, etiquetaDeEstado, referenciaDeRol } from './logica_colaboradores'

export function usarEdicionColaborador(colaborador: Colaborador, lista: Colaborador[]) {
  const [borrador, setBorrador] = useState<BorradorColaborador>(() => crearBorrador(colaborador))

  const cambiar: CambiarBorrador = (campo, valor) => setBorrador((actual) => ({ ...actual, [campo]: valor }))

  function elegirEstado(etiqueta: string) {
    const estado = estadoDeEtiqueta(etiqueta)
    if (estado) cambiar('estado', estado)
  }

  return {
    borrador,
    cambiar,
    elegirEstado,
    etiquetaEstado: etiquetaDeEstado(borrador.estado),
    descripcionRol: referenciaDeRol(colaborador, borrador.rol, lista).descripcionRol,
    valido: borradorValido(colaborador, borrador, lista),
  }
}
