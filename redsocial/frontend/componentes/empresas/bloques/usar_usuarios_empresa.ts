import { useMemo, useState } from 'react'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { crearFuenteLocal } from '../../compartido/interfaz/fuente_busqueda_local'
import { usarBusqueda } from '../../compartido/interfaz/usar_busqueda'
import { admiteUsuario, coincideUsuario, TODOS_LOS_ESTADOS, TODOS_LOS_ROLES } from './logica_usuarios_empresa'
import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { CriteriosUsuariosEmpresa, FiltrosBusquedaUsuariosEmpresa, ListadoUsuariosEmpresa } from '@/tipos/empresas/contrato_usuarios_empresa'
import type { UsuarioEmpresa } from '@/tipos/empresas/modelo_usuarios_empresa'

const POR_PAGINA = catalogoEmpresas.usuarios_empresa.tamano_pagina

export function usarUsuariosEmpresa(usuarios: UsuarioEmpresa[], fuente?: FuenteBusqueda<UsuarioEmpresa, FiltrosBusquedaUsuariosEmpresa>): ListadoUsuariosEmpresa {
  const [rol, setRol] = useState(TODOS_LOS_ROLES)
  const [estado, setEstado] = useState(TODOS_LOS_ESTADOS)
  const [pagina, setPagina] = useState(1)

  const filtrosBusqueda = useMemo<FiltrosBusquedaUsuariosEmpresa>(() => ({ rol, estado }), [rol, estado])
  const fuenteLocal = useMemo(() => {
    return crearFuenteLocal<UsuarioEmpresa, FiltrosBusquedaUsuariosEmpresa>(usuarios, coincideUsuario, admiteUsuario)
  }, [usuarios])
  const busquedaEnCurso = usarBusqueda(fuente ?? fuenteLocal, { modo: fuente ? 'remota' : 'local', filtros: filtrosBusqueda })
  const criterios: CriteriosUsuariosEmpresa = { busqueda: busquedaEnCurso.texto, rol, estado }
  const filtrados = busquedaEnCurso.resultado.elementos
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA))
  const paginaActual = Math.min(pagina, totalPaginas)
  const filas = useMemo(() => filtrados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA), [filtrados, paginaActual])

  function cambiarFiltro(asignar: (valor: string) => void) {
    return (evento: { target: { value: unknown } }) => {
      asignar(String(evento.target.value))
      setPagina(1)
    }
  }

  return {
    busqueda: criterios.busqueda,
    rol: criterios.rol,
    estado: criterios.estado,
    pagina: paginaActual,
    totalPaginas,
    filas,
    total: filtrados.length,
    hayUsuarios: usuarios.length > 0,
    estadoBusqueda: busquedaEnCurso.estado,
    errorBusqueda: busquedaEnCurso.error,
    cambiarBusqueda: (evento) => {
      busquedaEnCurso.cambiarTexto(String(evento.target.value))
      setPagina(1)
    },
    cambiarRol: cambiarFiltro(setRol),
    cambiarEstado: cambiarFiltro(setEstado),
    irAPagina: setPagina,
  }
}
