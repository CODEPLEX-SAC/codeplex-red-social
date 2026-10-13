import { useMemo, useState } from 'react'
import { aplicarEdiciones } from './logica_listado_empresas'
import type { AccionesEmpresas } from '@/tipos/empresas/contrato_listado_empresas'
import type { SolicitudDetalleEmpresa } from '@/tipos/empresas/contrato_detalle_empresa'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'
import type { UsuarioEmpresa } from '@/tipos/empresas/modelo_usuarios_empresa'

export function usarAccionesEmpresas(empresas: Empresa[]): AccionesEmpresas {
  const [registradas, setRegistradas] = useState<Empresa[]>([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [empresaADesactivar, setEmpresaADesactivar] = useState<Empresa | null>(null)
  const [ediciones, setEdiciones] = useState<Record<string, Empresa>>({})
  const [detalle, setDetalle] = useState<SolicitudDetalleEmpresa | null>(null)
  const [edicion, setEdicion] = useState<SolicitudDetalleEmpresa | null>(null)
  const [usuariosEditados, setUsuariosEditados] = useState<Record<string, UsuarioEmpresa[]>>({})
  const todas = useMemo(() => aplicarEdiciones([...registradas, ...empresas], ediciones), [registradas, empresas, ediciones])
  const empresaDetalle = detalle ? todas.find((empresa) => empresa.codigo === detalle.codigo) : undefined
  const empresaEdicion = edicion ? todas.find((empresa) => empresa.codigo === edicion.codigo) : undefined

  function abrirModal() {
    setModalAbierto(true)
  }

  function cerrarModal() {
    setModalAbierto(false)
  }

  function registrar(empresa: Empresa) {
    setRegistradas((actuales) => [empresa, ...actuales])
    setModalAbierto(false)
  }

  function elegirAccion(clave: string, empresa: Empresa) {
    if (clave === 'desactivar') setEmpresaADesactivar(empresa)
    if (clave === 'ver_detalle') setDetalle({ codigo: empresa.codigo, pestana: 'informacion' })
    if (clave === 'editar') setEdicion({ codigo: empresa.codigo, pestana: 'informacion' })
  }

  function cerrarDetalle() {
    setDetalle(null)
  }

  function cerrarDesactivacion() {
    setEmpresaADesactivar(null)
  }

  function confirmarDesactivacion() {
    if (empresaADesactivar) setEdiciones((actuales) => ({ ...actuales, [empresaADesactivar.codigo]: { ...empresaADesactivar, estado: 'inactiva' } }))
    setEmpresaADesactivar(null)
  }

  function cerrarEdicion() {
    setEdicion(null)
  }

  function guardarEdicion(empresa: Empresa, usuarios: UsuarioEmpresa[]) {
    setEdiciones((actuales) => ({ ...actuales, [empresa.codigo]: empresa }))
    setUsuariosEditados((actuales) => ({ ...actuales, [empresa.codigo]: usuarios }))
    setEdicion(null)
  }

  return {
    todas,
    modalAbierto,
    detalle,
    empresaDetalle,
    empresaADesactivar,
    edicion,
    empresaEdicion,
    usuariosEditados,
    abrirModal,
    cerrarModal,
    registrar,
    elegirAccion,
    cerrarDetalle,
    cerrarDesactivacion,
    confirmarDesactivacion,
    cerrarEdicion,
    guardarEdicion,
  }
}
