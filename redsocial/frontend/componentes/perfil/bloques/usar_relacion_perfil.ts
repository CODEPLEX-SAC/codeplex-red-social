import { useState } from 'react'
import type { ConsultasRelacionPerfil } from '@/tipos/perfil/contrato_perfil'
import type { PerfilUsuario, RelacionPerfil } from '@/tipos/perfil/modelo_perfil'

export function usarRelacionPerfil(perfil: PerfilUsuario, perfilPropio: PerfilUsuario | undefined, consultas: ConsultasRelacionPerfil) {
  const [solicitudEnviada, setSolicitudEnviada] = useState(false)
  const esPropio = perfil.id === perfilPropio?.id
  const amigosEnComun = esPropio ? 0 : consultas.contarAmigosEnComun(perfil, perfilPropio)
  let relacion: RelacionPerfil = 'ninguna'
  if (esPropio) relacion = 'propio'
  else if (perfilPropio && consultas.sonAmigos(perfilPropio, perfil.id)) relacion = 'amigos'
  else if (solicitudEnviada) relacion = 'solicitud_enviada'

  return { esPropio, relacion, amigosEnComun, alternarSolicitud: () => setSolicitudEnviada((enviada) => !enviada) }
}
