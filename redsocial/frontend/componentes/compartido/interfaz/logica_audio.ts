import type { BarraOnda } from '@/tipos/compartido/contrato_audio'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const audio = catalogoCompartido.audio

export function duracionLegible(segundos: number): string {
  const total = Math.max(0, Math.floor(segundos))
  const relleno = (valor: number) => String(valor).padStart(2, audio.reloj.relleno)
  return [Math.floor(total / audio.reloj.minutos), relleno(total % audio.reloj.minutos)].join(audio.reloj.separador)
}

export function resumirNiveles(niveles: readonly number[], barras: number = audio.barras): number[] {
  const total = Math.min(barras, niveles.length)
  return Array.from({ length: total }, (_, indice) => {
    const desde = Math.floor((indice * niveles.length) / total)
    const hasta = Math.max(desde + 1, Math.floor(((indice + 1) * niveles.length) / total))
    return Math.max(...niveles.slice(desde, hasta))
  })
}

function semillaNumerica(texto: string): number {
  return Array.from(texto).reduce((suma, caracter) => (suma * audio.semilla.multiplicador + caracter.charCodeAt(0)) % audio.semilla.modulo, audio.semilla.inicio)
}

export function picosPorDefecto(semilla: string, barras: number = audio.barras): number[] {
  const base = semillaNumerica(semilla)
  return Array.from({ length: barras }, (_, indice) => audio.picos_por_defecto.minimo + ((Math.abs(Math.sin(base + indice * audio.picos_por_defecto.paso)) * audio.picos_por_defecto.variacion) % audio.picos_por_defecto.variacion))
}

export function completarPicos(picos: readonly number[], barras: number = audio.barras): number[] {
  return Array.from({ length: barras }, (_, indice) => picos[indice] ?? 0)
}

export function ventanaDeNiveles(niveles: readonly number[], barras: number = audio.barras): number[] {
  return niveles.slice(-barras)
}

export function barrasDeOnda(picos: readonly number[], progreso: number, conCursor: boolean = true): BarraOnda[] {
  const completos = completarPicos(picos)
  const posicion = Math.floor(Math.min(1, Math.max(0, progreso)) * completos.length)
  const hayCursor = !(progreso <= 0 || progreso >= 1)
  return completos.map((pico, orden) => ({ id: String(orden), altura: claseDeAltura(pico), hecha: orden < posicion, cursor: conCursor && hayCursor && orden === posicion }))
}

export function claseDeAltura(pico: number): string {
  const alturas = audio.alturas
  return alturas[Math.min(alturas.length - 1, Math.max(0, Math.floor(pico * alturas.length)))]
}

export function limiteAlcanzado(transcurridos: number, limite: number | null): boolean {
  return limite !== null && transcurridos >= limite
}
