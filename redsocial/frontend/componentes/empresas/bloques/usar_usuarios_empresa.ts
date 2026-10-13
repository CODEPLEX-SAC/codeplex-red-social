import { useMemo, useState } from 'react'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { filtrarUsuarios, TODOS_LOS_ESTADOS, TODOS_LOS_ROLES } from './logica_usuarios_empresa'
import type { CriteriosUsuariosEmpresa, ListadoUsuariosEmpresa } from '@/tipos/empresas/contrato_usuarios_empresa'
import type { UsuarioEmpresa } from '@/tipos/empresas/modelo_usuarios_empresa'

const POR_PAGINA = catalogoEmpresas.usuarios_empresa.tamano_pagina

export function usarUsuariosEmpresa(usuarios: UsuarioEmpresa[]): ListadoUsuariosEmpresa {
  const [busqueda, setBusqueda] = useState('')
  const [rol, setRol] = useState(TODOS_LOS_ROLES)
  const [estado, setEstado] = useState(TODOS_LOS_ESTADOS)
  const [pagina, setPagina] = useState(1)

  const criterios: CriteriosUsuariosEmpresa = { busqueda, rol, estado }
  const filtrados = useMemo(() => filtrarUsuarios(usuarios, { busqueda, rol, estado }), [usuarios, busqueda, rol, estado])
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
    cambiarBusqueda: cambiarFiltro(setBusqueda),
    cambiarRol: cambiarFiltro(setRol),
    cambiarEstado: cambiarFiltro(setEstado),
    irAPagina: setPagina,
  }
}
