import { Icono, imagenEmpresaPredeterminada } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { Boton } from '../../compartido/interfaz/boton'
import { Insignia } from '../../compartido/interfaz/insignia'
import { usarSuscripciones } from '../../compartido/carrito/contexto_suscripciones'
import { EstadoEmpresa } from './estado_empresa'
import { FilaDatoEmpresa } from './fila_dato_empresa'
import { rellenarPlantilla } from './logica_resumen_empresas'
import { estadoModuloEmpresa, modulosActivos } from './logica_suscripciones_empresas'
import { TituloSeccionEmpresa } from './titulo_seccion_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { DetalleEmpresaProps } from '@/tipos/empresas/contrato_detalle_empresa'

const textos = catalogoEmpresas.detalle_empresa
const campos = textos.campos
const clases = textos.clases
const aplicativos = catalogoEmpresas.clases.aplicativos

export function TarjetaGeneralEmpresa({ empresa }: DetalleEmpresaProps) {
  const logo = empresa.logo ?? imagenEmpresaPredeterminada
  const suscripciones = usarSuscripciones()
  const activos = modulosActivos(empresa, suscripciones)

  function verLogo() {
    window.open(logo, '_blank', 'noopener')
  }

  return (
    <section aria-label={textos.secciones.general} className={`${clases.tarjeta} flex flex-col gap-4`}>
      <TituloSeccionEmpresa icono="empresa" titulo={textos.secciones.general} />
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-768:grid-cols-1">
        <FilaDatoEmpresa etiqueta={campos.razon_social}><span className={clases.valor}>{empresa.nombre}</span></FilaDatoEmpresa>
        <FilaDatoEmpresa etiqueta={campos.aplicativos}>
          {activos.length === 0 ? (
            <span className={clases.valor}>{textos.sin_aplicativos}</span>
          ) : (
            <div className={aplicativos.lista}>
              {activos.map((modulo) => (
                <Insignia key={modulo.clave} variant="status" className={aplicativos.pildora}>
                  {rellenarPlantilla(textos.pildora_aplicativo, { aplicativo: modulo.etiqueta, plan: estadoModuloEmpresa(empresa, modulo, suscripciones).planNombre ?? '' })}
                </Insignia>
              ))}
            </div>
          )}
        </FilaDatoEmpresa>
        <FilaDatoEmpresa etiqueta={campos.nombre_comercial}><span className={clases.valor}>{empresa.nombreComercial}</span></FilaDatoEmpresa>
        <FilaDatoEmpresa etiqueta={campos.estado}>
          <EstadoEmpresa estado={empresa.estado} />
        </FilaDatoEmpresa>
        <FilaDatoEmpresa etiqueta={campos.ruc}><span className={clases.valor}>{empresa.ruc}</span></FilaDatoEmpresa>
        <FilaDatoEmpresa etiqueta={campos.fecha_registro}><span className={clases.valor}>{empresa.fechaRegistro}</span></FilaDatoEmpresa>
        <FilaDatoEmpresa etiqueta={campos.rubro}><span className={clases.valor}>{empresa.rubro}</span></FilaDatoEmpresa>
        <FilaDatoEmpresa etiqueta={campos.tipo_plan_cuenta}><span className={clases.valor}>{empresa.tipoPlanCuenta ?? textos.sin_definir}</span></FilaDatoEmpresa>
        <FilaDatoEmpresa etiqueta={campos.logo}>
          <span className="grid h-14 w-14 flex-none place-items-center overflow-hidden rounded-xl bg-primario-suave">
            <AvatarImagen src={logo} className="h-full w-full" />
          </span>
          <Boton type="button" variant="secundario" size="md" onClick={verLogo}>
            <Icono name="ver" className="w-4 h-4" />
            {textos.ver_logo}
          </Boton>
        </FilaDatoEmpresa>
      </div>
    </section>
  )
}
