import { useRef } from 'react'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { FormularioEmpresaProps } from '@/tipos/empresas/contrato_formulario_empresa'

const textos = catalogoEmpresas.modal_empresa.logo
const claseLogo = catalogoEmpresas.modal_empresa.clases.logo
const claseEtiqueta = catalogoEmpresas.clases.etiqueta_campo

const textoAuxiliar = catalogoEmpresas.clases.texto_auxiliar
const textoError = catalogoEmpresas.clases.texto_error

export function SeccionLogoEmpresa({ formulario }: FormularioEmpresaProps) {
  const selectorArchivos = useRef<HTMLInputElement>(null)

  function abrirSelector() {
    selectorArchivos.current?.click()
  }

  return (
    <div className="flex flex-col gap-2">
      <span className={claseEtiqueta}>{textos.etiqueta}</span>
      <div className="flex items-center gap-4">
        <div className={claseLogo}>
          {formulario.logo ? (
            <AvatarImagen src={formulario.logo} alt={textos.vista_previa} className="h-full w-full" />
          ) : (
            <Icono name="empresa" className="h-8 w-8" />
          )}
        </div>
        <div className="flex min-w-0 flex-col items-start gap-2">
          <Boton type="button" variant="secundario" size="md" onClick={abrirSelector}>
            <Icono name="imagen" className="w-4 h-4" />
            {textos.cambiar}
          </Boton>
          <span className={textoAuxiliar}>{textos.formatos}</span>
        </div>
        <input ref={selectorArchivos} type="file" hidden tabIndex={-1} aria-label={textos.cambiar} accept={textos.tipos_aceptados} onChange={formulario.elegirLogo} />
      </div>
      {formulario.errorLogo ? <p role="alert" className={`m-0 ${textoError}`}>{formulario.errorLogo}</p> : null}
    </div>
  )
}
