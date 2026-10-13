import { useSyncExternalStore } from 'react'
import type { Escucha } from '@/tipos/enrutamiento/contrato_navegacion'

const escuchas = new Set<Escucha>()

function obtenerInstantanea(): string {
  return window.location.pathname
}

function notificar() {
  escuchas.forEach((escucha) => escucha())
}

function obtenerBusqueda(): string {
  return window.location.search
}

function rutaCompleta(): string {
  return window.location.pathname + window.location.search
}

export function navegar(ruta: string) {
  if (ruta === rutaCompleta()) return
  window.history.pushState({}, '', ruta)
  notificar()
}

export function reemplazarRuta(ruta: string) {
  if (ruta === window.location.pathname) return
  window.history.replaceState({}, '', ruta)
  notificar()
}

function suscribir(escucha: Escucha) {
  escuchas.add(escucha)
  window.addEventListener('popstate', escucha)
  return () => {
    escuchas.delete(escucha)
    window.removeEventListener('popstate', escucha)
  }
}

export function usarRutaActual(): string {
  return useSyncExternalStore(suscribir, obtenerInstantanea, obtenerInstantanea)
}

export function usarParametroDeRuta(nombre: string): string | null {
  const busqueda = useSyncExternalStore(suscribir, obtenerBusqueda, obtenerBusqueda)
  return new URLSearchParams(busqueda).get(nombre)
}
