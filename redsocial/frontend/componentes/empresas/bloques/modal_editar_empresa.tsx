import type { FormEvent } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'
import { CabeceraModalEmpresa } from './cabecera_modal_empresa'
import { CabeceraResumenEmpresa } from './cabecera_resumen_empresa'
import { CuerpoEditarEmpresa } from './cuerpo_editar_empresa'
import { usarBorradorUsuarios } from './usar_borrador_usuarios'
import { usarEdicionEmpresa } from './usar_edicion_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ModalEditarEmpresaProps } from '@/tipos/empresas/contrato_edicion_empresa'

const textos = catalogoEmpresas.edicion_empresa
const textosAgregar = catalogoEmpresas.usuarios_empresa.agregar_usuario

export function ModalEditarEmpresa({ empresa, totalEmpresas, pestanaInicial, datosDetalle, usuariosGuardados, alCerrar, alGuardar }: ModalEditarEmpresaProps) {
  const edicion = usarEdicionEmpresa(empresa)
  const edicionUsuarios = usarBorradorUsuarios(empresa, datosDetalle.usuariosBase, usuariosGuardados)

  function guardar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (edicionUsuarios.agregando) return edicionUsuarios.confirmarAgregado()
    if (edicion.puedeGuardar) alGuardar({ ...edicion.construirEmpresa(), usuarios: edicionUsuarios.usuarios.length }, edicionUsuarios.usuarios)
  }

  return (
    <Modal
      titulo={textos.titulo}
      etiquetaCerrar={textosRedSocial.CERRAR}
      onCerrar={alCerrar}
      cabecera={<CabeceraModalEmpresa titulo={textos.titulo} subtitulo={textos.subtitulo} alCerrar={alCerrar} />}
      className="max-w-225 rounded-2xl max-600:h-full max-600:rounded-none"
    >
      <form onSubmit={guardar} noValidate className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-4">
          <CabeceraResumenEmpresa empresa={empresa} />
          <CuerpoEditarEmpresa empresa={empresa} edicion={edicion} pestanaInicial={pestanaInicial} datosDetalle={datosDetalle} edicionUsuarios={edicionUsuarios} totalEmpresas={totalEmpresas} />
        </div>
        <div className="flex flex-none items-center justify-end gap-3 border-t border-borde px-6 py-4 max-480:flex-col-reverse max-480:items-stretch max-480:px-4">
          {edicionUsuarios.agregando ? (
            <>
              <Boton type="button" variant="secundario" size="md" onClick={edicionUsuarios.cancelarAgregado}>
                {textosAgregar.cancelar}
              </Boton>
              <Boton type="submit" variant="primario" size="md" disabled={!edicionUsuarios.puedeAgregar}>
                <Icono name="nuevo-usuario" className="w-4 h-4" />
                {textosAgregar.confirmar}
              </Boton>
            </>
          ) : (
            <>
              <Boton type="button" variant="secundario" size="md" onClick={alCerrar}>
                {textos.cancelar}
              </Boton>
              <Boton type="submit" variant="primario" size="md" disabled={!edicion.puedeGuardar}>
                <Icono name="guardar" className="w-4 h-4" />
                {textos.guardar}
              </Boton>
            </>
          )}
        </div>
      </form>
    </Modal>
  )
}
