import { useContext, useMemo, useState } from 'react'
import { ContextoDirectorioUsuarios } from '../sesion/contexto_directorio_usuarios'
import { buscarUsuarios } from './logica_buscador_global'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const MAXIMO = catalogoCompartido.buscador_global.maximo_resultados

export function usarBuscadorGlobal() {
  const directorio = useContext(ContextoDirectorioUsuarios)
  const [texto, setTexto] = useState(String())
  const [enfocado, setEnfocado] = useState(false)
  const resultados = useMemo(() => buscarUsuarios(directorio, texto, MAXIMO), [directorio, texto])

  return {
    texto,
    resultados,
    abierto: enfocado && texto.trim() !== String(),
    cambiarTexto: setTexto,
    abrir: () => setEnfocado(true),
    cerrar: () => setEnfocado(false),
  }
}
