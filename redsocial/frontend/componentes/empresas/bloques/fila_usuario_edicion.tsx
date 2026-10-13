import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import { AvatarUsuarioEmpresa } from './avatar_usuario_empresa'
import { inicialesDesdeNombreCompleto, usuarioEditadoValido } from './logica_usuarios_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { FilaUsuarioEdicionProps } from '@/tipos/empresas/contrato_usuarios_empresa'
import type { RolUsuarioEmpresa, EstadoUsuarioEmpresa, UsuarioEmpresa } from '@/tipos/empresas/modelo_usuarios_empresa'

const textos = catalogoEmpresas.usuarios_empresa
const edicion = textos.edicion
const ROLES = Object.entries(textos.roles)
const ESTADOS = Object.entries(textos.estados)
const celda = catalogoEmpresas.clases.celda

const textoAuxiliar = catalogoEmpresas.clases.texto_auxiliar
const textoCelda = catalogoEmpresas.clases.texto_celda

export function FilaUsuarioEdicion({ usuario, alGuardar, alCancelar, correoDisponible }: FilaUsuarioEdicionProps) {
  const [borrador, setBorrador] = useState<UsuarioEmpresa>(usuario)
  const valido = usuarioEditadoValido(borrador) && correoDisponible(borrador.correo.trim())

  function cambiarNombre(texto: string) {
    setBorrador((actual) => ({ ...actual, nombre: texto }))
  }

  function cambiarCorreo(texto: string) {
    setBorrador((actual) => ({ ...actual, correo: texto }))
  }

  function cambiarRol(evento: { target: { value: unknown } }) {
    setBorrador((actual) => ({ ...actual, rol: String(evento.target.value) as RolUsuarioEmpresa }))
  }

  function cambiarEstado(evento: { target: { value: unknown } }) {
    setBorrador((actual) => ({ ...actual, estado: String(evento.target.value) as EstadoUsuarioEmpresa }))
  }

  function guardar() {
    const nombre = borrador.nombre.trim()
    const iniciales = usuario.iniciales && nombre !== usuario.nombre ? inicialesDesdeNombreCompleto(nombre) : usuario.iniciales
    alGuardar({ ...borrador, nombre, correo: borrador.correo.trim(), ...(iniciales ? { iniciales } : {}) })
  }

  function guardarConTeclado(evento: KeyboardEvent<HTMLTableRowElement>) {
    if (evento.key !== edicion.tecla_guardar) return
    evento.preventDefault()
    if (valido) guardar()
  }

  return (
    <tr className={edicion.clases.fila} onKeyDown={guardarConTeclado}>
      <td className={celda}>
        <div className="flex min-w-44 items-center gap-3">
          <AvatarUsuarioEmpresa usuario={borrador} />
          <div className="min-w-0 flex-1">
            <CampoTexto anchoCompleto inputProps={{ 'aria-label': edicion.nombre }} valor={borrador.nombre} alCambiar={cambiarNombre} />
          </div>
        </div>
      </td>
      <td className={celda}>
        <div className="min-w-48">
          <CampoTexto anchoCompleto tipo="email" inputProps={{ 'aria-label': edicion.correo }} valor={borrador.correo} alCambiar={cambiarCorreo} />
        </div>
      </td>
      <td className={celda}>
        <div className="min-w-36">
          <Selector variant="colaboradores" aria-label={edicion.rol} value={borrador.rol} onChange={cambiarRol}>
            {ROLES.map(([clave, etiqueta]) => <option key={clave} value={clave}>{etiqueta}</option>)}
          </Selector>
        </div>
      </td>
      <td className={celda}>
        <div className="min-w-32">
          <Selector variant="colaboradores" aria-label={edicion.estado} value={borrador.estado} onChange={cambiarEstado}>
            {ESTADOS.map(([clave, etiqueta]) => <option key={clave} value={clave}>{etiqueta}</option>)}
          </Selector>
        </div>
      </td>
      <td className={`${celda} whitespace-nowrap`}>
        <span className={`block ${textoCelda}`}>{usuario.fecha}</span>
        <span className={`block ${textoAuxiliar}`}>{usuario.hora}</span>
      </td>
      <td className={`${celda} ${edicion.clases.acciones}`}>
        <div className="flex gap-2">
          <BotonIcono icono="verificado" type="button" variant="suave" aria-label={edicion.guardar} disabled={!valido} onClick={guardar} className={edicion.clases.guardar} />
          <BotonIcono icono="cerrar" type="button" variant="contorno" aria-label={edicion.cancelar} onClick={alCancelar} />
        </div>
      </td>
    </tr>
  )
}
