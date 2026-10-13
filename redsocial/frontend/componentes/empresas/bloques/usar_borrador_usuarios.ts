import { useState } from 'react'
import { armarUsuarios, crearDatosNuevoUsuario, limitarNotas, nuevoUsuarioValido, usuarioDesdeNuevo } from './logica_usuarios_empresa'
import type { CampoNuevoUsuario, EdicionUsuariosEmpresa } from '@/tipos/empresas/contrato_usuarios_empresa'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'
import type { UsuarioBaseEmpresa, UsuarioEmpresa } from '@/tipos/empresas/modelo_usuarios_empresa'

export function usarBorradorUsuarios(empresa: Empresa, usuariosBase: UsuarioBaseEmpresa[], guardados?: UsuarioEmpresa[]): EdicionUsuariosEmpresa {
  const [usuarios, setUsuarios] = useState<UsuarioEmpresa[]>(() => guardados ?? armarUsuarios(empresa, usuariosBase))
  const [agregando, setAgregando] = useState(false)
  const [nuevo, setNuevo] = useState(crearDatosNuevoUsuario)
  const correoNuevoDisponible = !usuarios.some((usuario) => usuario.correo === nuevo.correo.trim())

  function actualizar(correoOriginal: string, editado: UsuarioEmpresa) {
    setUsuarios((actuales) => actuales.map((usuario) => (usuario.correo === correoOriginal ? editado : usuario)))
  }

  function correoDisponible(candidato: string, correoOriginal: string) {
    return candidato === correoOriginal || !usuarios.some((usuario) => usuario.correo === candidato)
  }

  function iniciarAgregado() {
    setNuevo(crearDatosNuevoUsuario())
    setAgregando(true)
  }

  function cancelarAgregado() {
    setAgregando(false)
  }

  function confirmarAgregado() {
    if (!nuevoUsuarioValido(nuevo) || !correoNuevoDisponible) return
    setUsuarios((actuales) => [usuarioDesdeNuevo(nuevo), ...actuales])
    setAgregando(false)
  }

  function cambiarCampo(campo: CampoNuevoUsuario, valor: string) {
    setNuevo((actual) => ({ ...actual, [campo]: campo === 'notas' ? limitarNotas(valor) : valor }))
  }

  function manejarTexto(campo: CampoNuevoUsuario) {
    return (texto: string) => cambiarCampo(campo, texto)
  }

  function manejarSelector(campo: CampoNuevoUsuario) {
    return (evento: { target: { value: unknown } }) => cambiarCampo(campo, String(evento.target.value))
  }

  return {
    usuarios,
    actualizar,
    correoDisponible,
    agregando,
    nuevo,
    puedeAgregar: nuevoUsuarioValido(nuevo) && correoNuevoDisponible,
    iniciarAgregado,
    cancelarAgregado,
    confirmarAgregado,
    manejarTexto,
    manejarSelector,
  }
}
