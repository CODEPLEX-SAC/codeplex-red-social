import { Boton } from '../interfaz/boton'
import { IndicadorCarga } from '../interfaz/indicador_carga'
import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import { EncabezadoPasoPago } from './encabezado_paso_pago'
import { FormularioPerfilPago } from './formulario_perfil_pago'
import { ResumenPerfilPago } from './resumen_perfil_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { usarFlujoPago } from './usar_flujo_pago'
import type { ConfiguracionFlujoPago, ControlPerfilesPago } from '@/tipos/compartido/contrato_flujo_pago'

export function SeccionFacturacionPago({ estado, perfiles, configuracion, numero }: { estado: ReturnType<typeof usarFlujoPago>; perfiles: ControlPerfilesPago; configuracion: ConfiguracionFlujoPago; numero: number }) {
  const textos = usarTextosPago()
  const facturacion = estado.facturacion
  const perfil = facturacion.perfil
  const enResumen = facturacion.modo === 'resumen' && perfil !== null

  return (
    <section className={clases.seccion}>
      <EncabezadoPasoPago numero={numero} titulo={textos.paso2.titulo} detalle={textos.paso2.detalle} />
      <div className={clases.grupo_campos}>
        {perfiles.estado === 'cargando' && <IndicadorCarga etiqueta={textos.perfiles.cargando} />}
        {perfiles.estado === 'error' && (
          <div role="alert" className={clases.aviso_estado}>
            <span>{textos.perfiles.error_lectura}</span>
            <Boton type="button" variant="enlace" size="enlace_accion" onClick={perfiles.recargar}>{textos.metodo_guardado.reintentar}</Boton>
          </div>
        )}
        {perfiles.error === 'escritura' && <div role="alert" className={clases.aviso_estado}>{textos.perfiles.error_escritura}</div>}
        {perfiles.estado !== 'cargando' && (enResumen ? (
          <ResumenPerfilPago perfil={perfil} paises={configuracion.paises} cantidad={perfiles.perfiles.length} deshabilitado={estado.procesando} alEditar={facturacion.editar} alCambiar={() => estado.abrirVentana('perfiles')} alAgregar={facturacion.agregar} />
        ) : (
          <FormularioPerfilPago facturacion={facturacion} paises={configuracion.paises} ocupado={perfiles.ocupado} cancelable={facturacion.hayPerfiles} />
        ))}
        {configuracion.demostracion?.perfiles && <p className={clases.texto_suave}>{configuracion.demostracion.perfiles}</p>}
      </div>
    </section>
  )
}
