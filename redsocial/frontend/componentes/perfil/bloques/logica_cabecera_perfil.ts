import type { EstadisticaCabeceraPerfil, ItemEstadisticaCabeceraPerfil } from '@/tipos/perfil/contrato_perfil'

export function estadisticasDe(items: ItemEstadisticaCabeceraPerfil[], valores: Record<string, number>, propio: boolean): EstadisticaCabeceraPerfil[] {
  return items
    .filter((item) => propio ? !item.solo_ajeno : true)
    .map((item) => ({ clave: item.clave, valor: valores[item.clave], texto: valores[item.clave] === 1 && item.texto_singular ? item.texto_singular : item.texto }))
}
