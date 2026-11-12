import { useMemo, useState } from 'react'
import { alternarModulos } from './logica_edicion_empresa'
import { aplicarEdiciones, estaInactiva } from './logica_listado_empresas'
import { limiteAlcanzado, limiteDeEmpresas } from './logica_suscripciones_empresas'
import { usarSuscripciones } from '../../compartido/carrito/contexto_suscripciones'
import type { AccionesEmpresas } from '@/tipos/empresas/contrato_listado_empresas'
import type { SolicitudDetalleEmpresa } from '@/tipos/empresas/contrato_detalle_empresa'
import type { ClaveModuloEmpresa, Empresa } from '@/tipos/empresas/modelo_empresas'
import type { UsuarioEmpresa } from '@/tipos/empresas/modelo_usuarios_empresa'

function empresaDeSolicitud(empresas: Empresa[], solicitud: SolicitudDetalleEmpresa | null) {
  if (!solicitud) return undefined
  return empresas.find((empresa) => empresa.codigo === solicitud.codigo)
}

export function usarAccionesEmpresas(empresas: Empresa[]): AccionesEmpresas {
  const suscripciones = usarSuscripciones()
  const [registradas, setRegistradas] = useState<Empresa[]>([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [avisoLimiteAbierto, setAvisoLimiteAbierto] = useState(false)
  const [empresaACambiar, setEmpresaACambiar] = useState<Empresa | null>(null)
  const [ediciones, setEdiciones] = useState<Record<string, Empresa>>({})
  const [detalle, setDetalle] = useState<SolicitudDetalleEmpresa | null>(null)
  const [edicion, setEdicion] = useState<SolicitudDetalleEmpresa | null>(null)
  const [usuariosEditados, setUsuariosEditados] = useState<Record<string, UsuarioEmpresa[]>>({})
  const todas = useMemo(() => aplicarEdiciones([...registradas, ...empresas], ediciones), [registradas, empresas, ediciones])
  const empresaDetalle = empresaDeSolicitud(todas, detalle)
  const empresaEdicion = empresaDeSolicitud(todas, edicion)

  function abrirModal() {
    const mostrar = limiteAlcanzado(todas.length, suscripciones) ? setAvisoLimiteAbierto : setModalAbierto
    mostrar(true)
  }

  function cerrarAvisoLimite() {
    setAvisoLimiteAbierto(false)
  }

  function cerrarModal() {
    setModalAbierto(false)
  }

  function registrar(empresa: Empresa) {
    setRegistradas((actuales) => [empresa, ...actuales])
    setModalAbierto(false)
  }

  function elegirAccion(clave: string, empresa: Empresa) {
    const solicitud: SolicitudDetalleEmpresa = { codigo: empresa.codigo, pestana: 'informacion' }
    const manejadores: Record<string, () => void> = {
      desactivar: () => setEmpresaACambiar(empresa),
      activar: () => setEmpresaACambiar(empresa),
      ver_detalle: () => setDetalle(solicitud),
      editar: () => setEdicion(solicitud),
    }
    manejadores[clave]?.()
  }

  function alternarModulo(empresa: Empresa, clave: ClaveModuloEmpresa) {
    setEdiciones((actuales) => {
      const vigente = actuales[empresa.codigo] ?? empresa
      return { ...actuales, [empresa.codigo]: { ...vigente, modulos: alternarModulos(vigente.modulos, clave) } }
    })
  }

  function cerrarDetalle() {
    setDetalle(null)
  }

  function cerrarCambioEstado() {
    setEmpresaACambiar(null)
  }

  function confirmarCambioEstado() {
    if (empresaACambiar) setEdiciones((actuales) => ({ ...actuales, [empresaACambiar.codigo]: { ...empresaACambiar, estado: estaInactiva(empresaACambiar) ? 'activa' : 'inactiva' } }))
    setEmpresaACambiar(null)
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
    suscripciones,
    modalAbierto,
    avisoLimiteAbierto,
    limiteEmpresas: limiteDeEmpresas(suscripciones),
    detalle,
    empresaDetalle,
    empresaACambiar,
    edicion,
    empresaEdicion,
    usuariosEditados,
    abrirModal,
    cerrarModal,
    cerrarAvisoLimite,
    registrar,
    elegirAccion,
    alternarModulo,
    cerrarDetalle,
    cerrarCambioEstado,
    confirmarCambioEstado,
    cerrarEdicion,
    guardarEdicion,
  }
}
