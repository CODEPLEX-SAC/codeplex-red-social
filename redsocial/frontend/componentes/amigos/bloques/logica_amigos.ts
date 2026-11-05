import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'

export function resumenConPendientes<T extends { icono: string; valor: string }>(resumen: readonly T[], pendientes: number): T[] {
  return resumen.map((tarjeta) => (tarjeta.icono === catalogoAmigos.icono_resumen_pendientes ? { ...tarjeta, valor: String(pendientes) } : tarjeta))
}

export function rutaDeMensajeAmigo(nombre: string, conversaciones: readonly { id: string; nombre: string; esGrupo?: boolean }[], rutaBase: string, parametro: string): string {
  const conversacion = conversaciones.find((candidata) => !candidata.esGrupo && candidata.nombre === nombre)
  return conversacion ? `${rutaBase}?${parametro}=${encodeURIComponent(conversacion.id)}` : rutaBase
}

export function insigniaDePendientes(pendientes: number): number | undefined {
  return pendientes > 0 ? pendientes : undefined
}
