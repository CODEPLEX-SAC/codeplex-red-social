import { Icono } from '../../compartido/icono'
import { FilaDatoEmpresa } from './fila_dato_empresa'
import { TituloSeccionEmpresa } from './titulo_seccion_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { DetalleEmpresaProps } from '@/tipos/empresas/contrato_detalle_empresa'

const textos = catalogoEmpresas.detalle_empresa
const campos = textos.campos
const clases = textos.clases

export function TarjetaContactoEmpresa({ empresa }: DetalleEmpresaProps) {
  return (
    <section aria-label={textos.secciones.contacto} className={`${clases.tarjeta} flex flex-col gap-4`}>
      <TituloSeccionEmpresa icono="llamada" titulo={textos.secciones.contacto} />
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-768:grid-cols-1">
        <FilaDatoEmpresa etiqueta={campos.direccion}><span className={clases.valor}>{empresa.direccion}</span></FilaDatoEmpresa>
        <FilaDatoEmpresa etiqueta={campos.telefono}><span className={clases.valor}>{empresa.telefono}</span></FilaDatoEmpresa>
        <FilaDatoEmpresa etiqueta={campos.ubigeo}><span className={clases.valor}>{empresa.ubigeo}</span></FilaDatoEmpresa>
        <FilaDatoEmpresa etiqueta={campos.email}><span className={clases.valor}>{empresa.correo}</span></FilaDatoEmpresa>
        <span className="max-768:hidden" />
        <FilaDatoEmpresa etiqueta={campos.web}>
          <a href={empresa.web} target="_blank" rel="noreferrer" aria-label={textos.abrir_web} className="inline-flex min-w-0 items-center gap-2 break-all text-titulo-subseccion text-primario hover:underline">
            {empresa.web}
            <Icono name="flecha-arriba-derecha" className="h-4 w-4 flex-none" />
          </a>
        </FilaDatoEmpresa>
      </div>
    </section>
  )
}
