import { useState } from 'react'
import { Pestanas } from '../../compartido/interfaz/pestanas'
import { ContenidoPestanaEmpresa } from './contenido_pestana_empresa'
import { TarjetaContactoEdicionEmpresa } from './tarjeta_contacto_edicion_empresa'
import { PestanaPlanesEdicionEmpresa } from './pestana_planes_edicion_empresa'
import { TarjetaGeneralEdicionEmpresa } from './tarjeta_general_edicion_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { PestanaDetalleEmpresa } from '@/tipos/empresas/contrato_detalle_empresa'
import type { CuerpoEditarEmpresaProps } from '@/tipos/empresas/contrato_edicion_empresa'

const detalle = catalogoEmpresas.detalle_empresa
const CLAVES_PESTANAS: string[] = catalogoEmpresas.edicion_empresa.pestanas
const ETIQUETAS_PESTANAS: Record<string, string> = detalle.pestanas
const ICONOS_PESTANAS = detalle.iconos_pestana as Record<string, IconName>

export function CuerpoEditarEmpresa({ empresa, edicion, pestanaInicial, datosDetalle, edicionUsuarios, totalEmpresas }: CuerpoEditarEmpresaProps) {
  const [pestana, setPestana] = useState<PestanaDetalleEmpresa>(pestanaInicial)

  function cambiarPestana(clave: string) {
    edicionUsuarios.cancelarAgregado()
    setPestana(clave as PestanaDetalleEmpresa)
  }

  return (
    <>
      <Pestanas
        className="px-6 max-480:px-4"
        activa={pestana}
        alCambiar={cambiarPestana}
        elementos={CLAVES_PESTANAS.map((clave) => ({ clave, etiqueta: ETIQUETAS_PESTANAS[clave], icono: ICONOS_PESTANAS[clave] }))}
      />
      {pestana === 'informacion' ? (
        <div role="tabpanel" aria-label={detalle.pestanas.informacion} className="flex flex-col gap-4 px-6 max-480:px-4">
          <TarjetaGeneralEdicionEmpresa edicion={edicion} fechaRegistro={empresa.fechaRegistro} />
          <TarjetaContactoEdicionEmpresa edicion={edicion} fechaRegistro={empresa.fechaRegistro} />
        </div>
      ) : pestana === 'planes' ? (
        <PestanaPlanesEdicionEmpresa edicion={edicion} totalEmpresas={totalEmpresas} />
      ) : (
        <ContenidoPestanaEmpresa empresa={empresa} pestana={pestana} datosDetalle={datosDetalle} edicionUsuarios={edicionUsuarios} totalEmpresas={totalEmpresas} />
      )}
    </>
  )
}
