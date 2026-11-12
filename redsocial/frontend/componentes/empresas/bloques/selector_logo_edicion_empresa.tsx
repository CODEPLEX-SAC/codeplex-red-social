import { AlertaEstado } from '../../compartido/interfaz/alerta_estado'
import { imagenEmpresaPredeterminada, Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { useRef } from 'react'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { EdicionEmpresaProps } from '@/tipos/empresas/contrato_edicion_empresa'

const detalle = catalogoEmpresas.detalle_empresa
const textos = catalogoEmpresas.edicion_empresa
const clases = textos.clases
const logoTextos = catalogoEmpresas.modal_empresa.logo
const claseEtiqueta = catalogoEmpresas.clases.etiqueta_campo

export function SelectorLogoEdicionEmpresa({ edicion }: Pick<EdicionEmpresaProps, 'edicion'>) {
  const selectorArchivos = useRef<HTMLInputElement>(null)

  function abrirSelector() {
    selectorArchivos.current?.click()
  }

  return (
        <div className="flex min-w-0 flex-col gap-1">
          <span className={claseEtiqueta}>{detalle.campos.logo}</span>
          <div className={clases.logo_fila}>
            <span className={clases.logo_miniatura}>
              <AvatarImagen src={edicion.logo ?? imagenEmpresaPredeterminada} className="h-full w-full" />
            </span>
            <div className={clases.logo_acciones}>
              <div className={clases.logo_botones}>
                <Boton type="button" variant="contorno" size="default" onClick={abrirSelector}>
                  <Icono name="imagen" className="w-4 h-4" />
                  {logoTextos.cambiar}
                </Boton>
                <BotonIcono icono="eliminar" type="button" variant="contorno" aria-label={textos.quitar_logo} disabled={edicion.logo === null} onClick={edicion.quitarLogo} className={catalogoEmpresas.clases.boton_icono_peligro} />
                <input ref={selectorArchivos} type="file" hidden tabIndex={-1} aria-label={logoTextos.cambiar} accept={logoTextos.tipos_aceptados} onChange={edicion.elegirLogo} />
              </div>
              <span className={catalogoEmpresas.clases.texto_auxiliar}>{textos.formatos}</span>
              {edicion.errorLogo ? <AlertaEstado className={catalogoEmpresas.clases.texto_error}>{edicion.errorLogo}</AlertaEstado> : null}
            </div>
          </div>
        </div>
  )
}
