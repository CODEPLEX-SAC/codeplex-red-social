import { usarSuscripciones } from '../../compartido/carrito/contexto_suscripciones'
import { BannerInformativo } from '../../compartido/interfaz/banner_informativo'
import { Boton } from '../../compartido/interfaz/boton'
import { irARuta } from '../../compartido/interfaz/menu'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { estadoModuloEmpresa, modulosActivos, RUTA_MARKETPLACE_EMPRESAS } from './logica_suscripciones_empresas'
import { TarjetaPlanAsignado } from './tarjeta_plan_asignado'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { PestanaPlanesEmpresaProps } from '@/tipos/empresas/contrato_detalle_empresa'

const textos = catalogoEmpresas.planes_asignados
const clases = textos.clases

export function PestanaPlanesEmpresa({ empresa, totalEmpresas }: PestanaPlanesEmpresaProps) {
  const suscripciones = usarSuscripciones()
  const activos = modulosActivos(empresa, suscripciones)

  return (
    <div role="tabpanel" aria-label={textos.titulo} className={clases.contenedor}>
      <BannerInformativo icono={textos.icono_aviso as IconName} descripcion={textos.aviso} variante="nota" />
      {activos.length === 0 ? (
        <MensajeVacio titulo={textos.vacio_titulo} texto={textos.vacio_detalle} />
      ) : (
        <ul className={`m-0 list-none p-0 ${clases.lista}`}>
          {activos.map((modulo) => (
            <TarjetaPlanAsignado
              key={modulo.clave}
              modulo={modulo}
              suscripcion={suscripciones.find((candidata) => candidata.aplicacion === modulo.producto) as SuscripcionContratada}
              planNombre={estadoModuloEmpresa(empresa, modulo, suscripciones).planNombre ?? ''}
              totalEmpresas={totalEmpresas}
            />
          ))}
        </ul>
      )}
      <div className={clases.pie}>
        <Boton type="button" variant="secundario" size="md" onClick={() => irARuta(RUTA_MARKETPLACE_EMPRESAS)}>
          {textos.ir_marketplace}
        </Boton>
      </div>
    </div>
  )
}
