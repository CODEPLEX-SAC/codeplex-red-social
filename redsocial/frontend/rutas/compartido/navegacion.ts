import { useSyncExternalStore } from 'react'
import type { Escucha } from '@/tipos/enrutamiento/navegacion'

const escuchas = new Set<Escucha>()

function obtenerInstantanea(): string {
  return window.location.pathname
}

function notificar() {
  escuchas.forEach((escucha) => escucha())
}

export function navegar(ruta: string) {
  if (ruta === window.location.pathname) return
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

export function useRutaActual(): string {
  return useSyncExternalStore(suscribir, obtenerInstantanea, obtenerInstantanea)
}
