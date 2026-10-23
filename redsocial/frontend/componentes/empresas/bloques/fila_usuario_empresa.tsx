import { useState } from 'react'
import type { MouseEvent } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { Menu } from '../../compartido/interfaz/menu'
import { CLASES_TABLA } from '../../compartido/clases_tabla'
import { AvatarUsuarioEmpresa } from './avatar_usuario_empresa'
import { FilaUsuarioEdicion } from './fila_usuario_edicion'
import { opcionesDeUsuario } from './logica_usuarios_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { FilaUsuarioEmpresaProps, OpcionMenuUsuarioEmpresa } from '@/tipos/empresas/contrato_usuarios_empresa'
import type { UsuarioEmpresa } from '@/tipos/empresas/modelo_usuarios_empresa'

const textos = catalogoEmpresas.usuarios_empresa
const PLANTILLA_OPCIONES = textos.etiquetas.mas_opciones
const OPCIONES_MENU = textos.menu as OpcionMenuUsuarioEmpresa[]
const ETIQUETAS_ROL: Record<string, string> = textos.roles
const ETIQUETAS_ESTADO: Record<string, string> = textos.estados
const CLASES_ROL: Record<string, string> = textos.clases.rol
const CLASES_ESTADO: Record<string, { texto: string; punto: string }> = textos.clases.estado
const ACCION_EDITAR = textos.menu[0].clave
const ACCION_DESACTIVAR = textos.menu[1].clave
const ACCION_ACTIVAR = textos.menu[2].clave

const clases = catalogoEmpresas.clases

export function FilaUsuarioEmpresa({ usuario, editable, edicionUsuarios }: FilaUsuarioEmpresaProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const [editando, setEditando] = useState(false)
  const estado = CLASES_ESTADO[usuario.estado]

  function abrirMenu(evento: MouseEvent<HTMLButtonElement>) {
    setAncla(evento.currentTarget)
  }

  function cerrarMenu() {
    setAncla(null)
  }

  function manejarOpcion(clave: string) {
    return () => {
      setEditando(clave === ACCION_EDITAR)
      if (clave === ACCION_DESACTIVAR) edicionUsuarios?.actualizar(usuario.correo, { ...usuario, estado: 'inactivo' })
      if (clave === ACCION_ACTIVAR) edicionUsuarios?.actualizar(usuario.correo, { ...usuario, estado: 'activo' })
    }
  }

  function guardarUsuario(nuevo: UsuarioEmpresa) {
    edicionUsuarios?.actualizar(usuario.correo, nuevo)
    setEditando(false)
  }

  function cancelarEdicion() {
    setEditando(false)
  }

  function correoDisponible(nuevo: string) {
    return edicionUsuarios ? edicionUsuarios.correoDisponible(nuevo, usuario.correo) : true
  }

  if (editando && edicionUsuarios) {
    return <FilaUsuarioEdicion usuario={usuario} alGuardar={guardarUsuario} alCancelar={cancelarEdicion} correoDisponible={correoDisponible} />
  }

  return (
    <tr className={CLASES_TABLA.fila}>
      <td className={CLASES_TABLA.celda}>
        <div className="flex items-center gap-3">
          <AvatarUsuarioEmpresa usuario={usuario} />
          <strong className={clases.nombre_fila}>{usuario.nombre}</strong>
        </div>
      </td>
      <td className={`${CLASES_TABLA.celda} whitespace-nowrap ${clases.texto_celda}`}>{usuario.correo}</td>
      <td className={CLASES_TABLA.celda}>
        <Insignia variant="status" className={CLASES_ROL[usuario.rol]}>{ETIQUETAS_ROL[usuario.rol]}</Insignia>
      </td>
      <td className={`${CLASES_TABLA.celda} whitespace-nowrap`}>
        <Insignia variant="status" className={`inline-flex items-center gap-1.5 text-subtitulo ${estado.texto}`} punto={estado.punto}>
          {ETIQUETAS_ESTADO[usuario.estado]}
        </Insignia>
      </td>
      <td className={`${CLASES_TABLA.celda} whitespace-nowrap`}>
        <span className={`block ${clases.texto_celda}`}>{usuario.fecha}</span>
        <span className={`block ${clases.texto_auxiliar}`}>{usuario.hora}</span>
      </td>
      {editable ? (
        <td className={CLASES_TABLA.celda}>
          <BotonIcono
            icono="puntos"
            type="button"
            variant="contorno"
            aria-label={PLANTILLA_OPCIONES.replace(':nombre', usuario.nombre)}
            aria-haspopup="menu"
            aria-expanded={Boolean(ancla)}
            onClick={abrirMenu}
          />
          {ancla ? <Menu ancla={ancla} alCerrar={cerrarMenu} elementos={opcionesDeUsuario(usuario, OPCIONES_MENU).map((opcion) => ({ etiqueta: opcion.etiqueta, peligro: opcion.peligro, alHacerClick: manejarOpcion(opcion.clave) }))} /> : null}
        </td>
      ) : null}
    </tr>
  )
}
