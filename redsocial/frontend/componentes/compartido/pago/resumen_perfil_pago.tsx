import { Boton } from '../interfaz/boton'
import { BotonIcono } from '../interfaz/boton_icono'
import { Icono } from '../icono'
import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import { canalesDePerfil, nombreDePais, telefonoDePerfil } from './logica_perfil_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { PaisPago, PerfilPago } from '@/tipos/compartido/contrato_flujo_pago'

function Dato({ titulo, valor, ancho = false }: { titulo: string; valor: string; ancho?: boolean }) {
  return (
    <div className={ancho ? clases.perfil_dato_ancho : clases.perfil_dato}>
      <dt className={clases.perfil_dato_titulo}>{titulo}</dt>
      <dd className={clases.perfil_dato_valor}>{valor}</dd>
    </div>
  )
}

export function ResumenPerfilPago({ perfil, paises, cantidad, deshabilitado, alEditar, alCambiar, alAgregar }: { perfil: PerfilPago; paises: PaisPago[]; cantidad: number; deshabilitado: boolean; alEditar: () => void; alCambiar: () => void; alAgregar: () => void }) {
  const textos = usarTextosPago()
  const { campos, guardados, perfiles } = textos
  return (
    <div className={clases.perfil_resumen}>
      <div className={clases.perfil_cabecera}>
        <Icono name="empresa" className={clases.perfil_icono} />
        <div className={clases.perfil_texto}>
          <div className={clases.perfil_nombre}>{perfil.razon}</div>
          <div className={clases.perfil_documento}>{guardados.documento.replace(':documento', perfil.documento)}</div>
        </div>
        <BotonIcono icono="editar-oficial" type="button" variant="sutil" aria-label={perfiles.editar_etiqueta} disabled={deshabilitado} onClick={alEditar} />
      </div>
      <dl className={clases.perfil_datos}>
        <Dato titulo={perfiles.pais} valor={nombreDePais(paises, perfil.pais)} />
        <Dato titulo={perfiles.telefono} valor={telefonoDePerfil(perfil, paises)} />
        <Dato titulo={campos.correo} valor={perfil.correo} />
        <Dato titulo={perfiles.canales_titulo} valor={canalesDePerfil(perfil, textos)} />
        <Dato titulo={campos.direccion} valor={perfil.direccion} ancho />
      </dl>
      <div className={clases.perfil_acciones}>
        {cantidad > 1 && <Boton type="button" variant="enlace" size="enlace_accion" disabled={deshabilitado} onClick={alCambiar}>{guardados.ver_otras.replace(':n', String(cantidad))}</Boton>}
        <Boton type="button" variant="enlace" size="enlace_accion" disabled={deshabilitado} onClick={alAgregar}>{perfiles.agregar}</Boton>
      </div>
    </div>
  )
}
