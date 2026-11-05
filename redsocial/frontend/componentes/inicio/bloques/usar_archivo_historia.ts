import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { esMedioHistoriaValido, medioDesdeArchivo } from './logica_historia'
import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

export function usarArchivoHistoria(onMedio: (medio: MedioLocalPublicacion) => void) {
  const [errorArchivo, setErrorArchivo] = useState(false)
  const selector = useRef<HTMLInputElement>(null)
  const contador = useRef(0)

  function abrirSelector() {
    selector.current?.click()
  }

  function alElegirArchivo(evento: ChangeEvent<HTMLInputElement>) {
    const archivo = evento.target.files?.[0]
    evento.target.value = String()
    if (!archivo) return
    const valido = esMedioHistoriaValido(archivo)
    setErrorArchivo(!valido)
    if (!valido) return
    contador.current += 1
    onMedio(medioDesdeArchivo(archivo, String(contador.current)))
  }

  return { errorArchivo, selector, abrirSelector, alElegirArchivo }
}
