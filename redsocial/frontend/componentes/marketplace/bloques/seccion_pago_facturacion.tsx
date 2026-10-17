import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Casilla } from '../../compartido/interfaz/casilla'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Icono } from '../../compartido/icono'
import { Selector } from '../../compartido/interfaz/selector'
import { EncabezadoPasoPago } from './encabezado_paso_pago'
import type { usarPagoPlanes } from './usar_pago_planes'
import type { PaisPago } from '@/tipos/marketplace/modelo_pago'
import type { PerfilFacturacion } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.pago
const guardados = textos.guardados
const VACIO = catalogoCompartido.controles.texto_vacio

function PerfilElegido({ perfil, alCambiar }: { perfil: PerfilFacturacion; alCambiar: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-borde bg-fondo px-3.5 py-2.5">
      <Icono name="empresa" className="h-5 w-5 flex-none text-primario" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-nombre-fila text-texto">{perfil.razon}</div>
        <div className="truncate text-auxiliar text-texto-suave">{[guardados.documento.replace(':documento', perfil.documento), perfil.correo].join(guardados.separador)}</div>
        <div className="truncate text-auxiliar text-texto-suave">{perfil.direccion}</div>
      </div>
      <Boton type="button" variant="enlace" size="enlace_accion" onClick={alCambiar}>{guardados.cambiar}</Boton>
    </div>
  )
}

export function SeccionPagoFacturacion({ estado, paises, cantidadGuardados }: { estado: ReturnType<typeof usarPagoPlanes>; paises: PaisPago[]; cantidadGuardados: number }) {
  const campos = textos.campos
  const datos = estado.facturacion
  const cambiar = estado.cambiarFacturacion
  const guardado = estado.perfilGuardado
  const campoCorreo = (
    <CampoEtiquetado etiqueta={campos.correo}>
      <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.correo }} marcador={campos.correo_ph} tipo="email" valor={datos.correo} alCambiar={(valor) => cambiar('correo', valor)} />
    </CampoEtiquetado>
  )
  const etiquetaCelular = campos.celular.replace(':prefijo', estado.prefijo)
  return (
    <section className={textos.clases.tarjeta}>
      <EncabezadoPasoPago numero={2} titulo={textos.paso2.titulo} detalle={textos.paso2.detalle} />
      <div className="grid gap-4">
        {guardado ? (
          <>
            <PerfilElegido perfil={guardado} alCambiar={estado.nuevoPerfil} />
            {cantidadGuardados > 1 && <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => estado.abrirVentana('perfiles')}>{guardados.ver_otras.replace(':n', String(cantidadGuardados))}</Boton>}
            {campoCorreo}
          </>
        ) : (
          <>
            <CampoEtiquetado etiqueta={campos.documento}>
              <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.documento }} marcador={campos.documento_ph} valor={datos.documento} alCambiar={(valor) => cambiar('documento', valor.replace(/\D/g, VACIO).slice(0, 11))} />
            </CampoEtiquetado>
            <CampoEtiquetado etiqueta={campos.razon}>
              <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.razon }} marcador={campos.razon_ph} valor={datos.razon} alCambiar={(valor) => cambiar('razon', valor)} />
            </CampoEtiquetado>
            <CampoEtiquetado etiqueta={campos.pais}>
              <Selector variant="colaboradores" aria-label={campos.pais} value={datos.pais} onChange={(evento) => cambiar('pais', String(evento.target.value))}>
                {paises.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </Selector>
            </CampoEtiquetado>
            <CampoEtiquetado etiqueta={campos.direccion}>
              <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.direccion }} marcador={campos.direccion_ph} valor={datos.direccion} alCambiar={(valor) => cambiar('direccion', valor)} />
            </CampoEtiquetado>
            <div className={textos.clases.dos_columnas}>
              {campoCorreo}
              <CampoEtiquetado etiqueta={etiquetaCelular}>
                <CampoTexto anchoCompleto inputProps={{ 'aria-label': etiquetaCelular }} marcador={campos.celular_ph} valor={datos.celular} alCambiar={(valor) => cambiar('celular', valor.replace(/\D/g, VACIO).slice(0, 9))} />
              </CampoEtiquetado>
            </div>
            {cantidadGuardados > 0 && <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => estado.abrirVentana('perfiles')}>{guardados.usar_perfil}</Boton>}
          </>
        )}
      </div>
      <h4 className="m-0 mb-1 mt-4 text-titulo-subseccion text-texto">{textos.canales.titulo}</h4>
      <div className="grid gap-1">
        <Casilla etiqueta={textos.canales.whatsapp.etiqueta} seleccionado={datos.whatsapp} alCambiar={(_, marcado) => cambiar('whatsapp', marcado)} />
        <Casilla etiqueta={textos.canales.sms.etiqueta} seleccionado={datos.sms} alCambiar={(_, marcado) => cambiar('sms', marcado)} />
      </div>
    </section>
  )
}
