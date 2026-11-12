import { useMemo, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { crearFuenteLocal, usarBusqueda } from '../../compartido'
import { coincidePorNombre } from './logica_busqueda_mensajeria'
import { nombreDeGrupoRepetido } from './logica_grupos_mensajeria'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ParticipanteMensajeria } from '@/tipos/mensajeria/contrato_mensajes'
import type { FiltrosParticipantes, ModalCrearGrupoProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'

const textos = catalogoMensajeria.grupos.modal
const tiposImagen = textos.tipos_aceptados.split(',')

function noExcluido(persona: ParticipanteMensajeria, { excluir }: FiltrosParticipantes): boolean {
  return !excluir.includes(persona.id)
}

export function usarModalCrearGrupo({ participantes, fuente, nombresExistentes, onCrear }: ModalCrearGrupoProps) {
  const selectorArchivos = useRef<HTMLInputElement>(null)
  const [elegidos, setElegidos] = useState<readonly string[]>([])
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imagen, setImagen] = useState<string | null>(null)
  const [error, setError] = useState<{ campo: 'nombre' | 'imagen'; mensaje: string } | null>(null)
  const habilitado = elegidos.length > 0
  const filtros = useMemo<FiltrosParticipantes>(() => ({ excluir: elegidos }), [elegidos])
  const fuenteLocal = useMemo(() => crearFuenteLocal(participantes, coincidePorNombre, noExcluido), [participantes])
  const busqueda = usarBusqueda(fuente ?? fuenteLocal, { modo: fuente ? 'remota' : 'local', filtros })
  const buscado = busqueda.estado !== 'inicial'
  const resultados = buscado ? busqueda.resultado.elementos : []
  const participantePorId = new Map(participantes.map((persona) => [persona.id, persona]))
  const seleccionados = elegidos.flatMap((id) => participantePorId.get(id) ?? [])

  function quitar(id: string) {
    setElegidos((actual) => actual.filter((elegido) => elegido !== id))
  }

  function cambiarNombre(valor: string) {
    setNombre(valor)
    setError((actual) => (actual?.campo === 'nombre' ? null : actual))
  }

  function agregar(id: string) {
    setElegidos((actual) => [...actual, id])
    busqueda.limpiar()
  }

  function elegirImagen(evento: ChangeEvent<HTMLInputElement>) {
    const archivo = evento.target.files?.[0]
    evento.target.value = ''
    if (!archivo) return
    if (!tiposImagen.includes(archivo.type)) {
      setError({ campo: 'imagen', mensaje: textos.errores.imagen_invalida })
      return
    }
    setImagen(URL.createObjectURL(archivo))
    setError((actual) => (actual?.campo === 'imagen' ? null : actual))
  }

  function crear() {
    const limpio = nombre.trim()
    if (!limpio) return setError({ campo: 'nombre', mensaje: textos.errores.nombre_vacio })
    if (nombreDeGrupoRepetido(nombresExistentes, limpio)) return setError({ campo: 'nombre', mensaje: textos.errores.nombre_repetido })
    onCrear({ nombre: limpio, descripcion: descripcion.trim(), imagen, participantes: elegidos })
  }

  return { selectorArchivos, nombre, descripcion, imagen, error, habilitado, busqueda, buscado, resultados, seleccionados, setDescripcion, cambiarNombre, quitar, agregar, elegirImagen, crear }
}
