import { useMemo } from 'react'
import { contieneTexto, crearFuenteLocal } from '../../compartido/interfaz/fuente_busqueda_local'
import { usarBusqueda } from '../../compartido/interfaz/usar_busqueda'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { BusquedaInvitados, ParametrosBusquedaInvitados } from '@/tipos/mensajeria/contrato_busqueda_invitados'

const MAXIMO_RESULTADOS = catalogoMensajeria.videollamada.programar.maximo_resultados

export function usarBusquedaInvitados({ disponibles, onAgregar }: ParametrosBusquedaInvitados): BusquedaInvitados {
  const fuente = useMemo(() => crearFuenteLocal(disponibles, (contacto, consulta) => contieneTexto(contacto.nombre, consulta)), [disponibles])
  const busqueda = usarBusqueda(fuente)
  const consulta = busqueda.texto.trim()
  const limpiar = () => busqueda.cambiarTexto(String())

  function agregar(nombre: string) {
    onAgregar(nombre)
    limpiar()
  }

  return {
    texto: busqueda.texto,
    consulta,
    opciones: busqueda.resultado.elementos.slice(0, MAXIMO_RESULTADOS),
    agregar,
    limpiar,
    cambiarConsulta: (evento) => busqueda.cambiarTexto(evento.target.value),
    invitarTexto: () => agregar(consulta),
  }
}
