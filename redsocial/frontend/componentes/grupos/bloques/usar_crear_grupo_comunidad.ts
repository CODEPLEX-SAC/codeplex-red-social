import { useState } from 'react'
import type { TuGrupo } from '@/tipos/grupos/contrato_tus_grupos'
import type { ParametrosCrearGrupo } from '@/tipos/grupos/contrato_gestion_grupos'

export function usarCrearGrupoComunidad({ puerto, grupo, onCerrar }: ParametrosCrearGrupo) {
  const [nombre, setNombre] = useState(grupo?.nombre ?? String())
  const [descripcion, setDescripcion] = useState(grupo?.descripcion ?? String())
  const [invitarSeguidores, setInvitarSeguidores] = useState(false)
  const [errorNombre, setErrorNombre] = useState(false)
  const [creado, setCreado] = useState<TuGrupo | null>(null)

  function cambiarNombre(valor: string) {
    setNombre(valor)
    setErrorNombre(false)
  }

  function enviar() {
    const incompleto = nombre.trim() === String()
    setErrorNombre(incompleto)
    if (incompleto) return
    if (grupo) {
      puerto.editar(grupo.id, { nombre, descripcion })
      onCerrar()
      return
    }
    setCreado(puerto.crear({ nombre, descripcion }))
  }

  return { nombre, descripcion, invitarSeguidores, errorNombre, creado, cambiarNombre, cambiarDescripcion: setDescripcion, alternarSeguidores: setInvitarSeguidores, enviar }
}
