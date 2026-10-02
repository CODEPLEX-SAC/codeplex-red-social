import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

export const CONFIGURACION_LIBRERIA = catalogoCompartido.icono_libreria
export const ICONOS_LIBRERIA = catalogoCompartido.iconos_libreria as Record<string, string>

export function asegurarFuenteLibreria() {
  if (document.getElementById(CONFIGURACION_LIBRERIA.id_fuente)) return
  const estilo = document.createElement('style')
  estilo.textContent = CONFIGURACION_LIBRERIA.css_oculto
  document.head.appendChild(estilo)
  const enlace = document.createElement('link')
  enlace.id = CONFIGURACION_LIBRERIA.id_fuente
  enlace.rel = 'stylesheet'
  enlace.href = CONFIGURACION_LIBRERIA.url_fuente
  enlace.onload = () => {
    document.fonts.load(CONFIGURACION_LIBRERIA.fuente_carga).then(() => document.documentElement.classList.add(CONFIGURACION_LIBRERIA.clase_lista))
  }
  document.head.appendChild(enlace)
}

export function tamanoDeClases(clases: string): string {
  const coincidencia = clases.match(/(?:^|\s)h-([\d.]+)(?=\s|$)/)
  return coincidencia ? `${Number(coincidencia[1]) * CONFIGURACION_LIBRERIA.factor_unidad}rem` : CONFIGURACION_LIBRERIA.tamano_predeterminado
}

export function clasesSinTamano(clases: string): string {
  return clases.split(/\s+/).filter((clase) => !/^(h|w)-[\d.]+$/.test(clase)).join(' ')
}
