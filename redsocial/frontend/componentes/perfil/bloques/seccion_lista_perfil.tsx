import { useState } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { CampoPerfil } from './campo_perfil'
import { itemNuevo } from './logica_edicion_perfil'
import { MarcoSeccionPerfil } from './marco_seccion_perfil'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ItemListaPerfilProps, SeccionListaPerfilProps } from '@/tipos/perfil/contrato_perfil'
import type { ItemPerfil } from '@/tipos/perfil/modelo_perfil'

const clases = catalogoPerfil.clases.editor
const textos = catalogoPerfil.experiencia

function ItemListaPerfil({ item, datos, icono, propio, onEditar, onEliminar }: ItemListaPerfilProps) {
  const editar = () => onEditar(item)
  const eliminar = () => onEliminar(item.id)

  return (
    <li className={clases.item}>
      <Icono name={icono as IconName} className="mt-0.5 h-4 w-4 flex-none text-texto-suave" />
      <div className={clases.item_cuerpo}>
        <strong className="text-campo-formulario text-texto">{datos.titulo}</strong>
        {datos.subtitulo && <span className="text-subtitulo text-texto">{datos.subtitulo}</span>}
        {datos.periodo && <span className="text-auxiliar text-texto-suave">{datos.periodo}</span>}
        {datos.detalle && <span className="text-auxiliar text-texto-suave">{datos.detalle}</span>}
      </div>
      {propio && (
        <div className={clases.item_acciones}>
          <BotonIcono icono="editar-oficial" type="button" aria-label={`${textos.editar_item} ${datos.titulo}`} onClick={editar} variant="discreto" size="default" />
          <BotonIcono icono="eliminar" type="button" aria-label={`${textos.eliminar_item} ${datos.titulo}`} onClick={eliminar} variant="discreto" size="default" />
        </div>
      )}
    </li>
  )
}

export function SeccionListaPerfil({ definicion, items, propio, resumen, onGuardar, onEliminar }: SeccionListaPerfilProps) {
  const [enEdicion, setEnEdicion] = useState<ItemPerfil | null>(null)
  const requerido = definicion.campos.find((campo) => campo.tipo === 'texto')?.clave ?? ''
  const sinRequerido = !enEdicion || String(enEdicion[requerido] ?? '').trim().length === 0
  const abrirNuevo = () => setEnEdicion(itemNuevo(definicion.campos))
  const cancelar = () => setEnEdicion(null)

  function cambiar(clave: string, valor: string | boolean) {
    setEnEdicion((actual) => (actual ? { ...actual, [clave]: valor } : actual))
  }

  function guardar() {
    if (!enEdicion) return
    onGuardar(enEdicion)
    setEnEdicion(null)
  }

  if (!propio && items.length === 0) return null

  return (
    <MarcoSeccionPerfil titulo={definicion.titulo} puedeEditar={false} editando={enEdicion !== null} guardarDeshabilitado={sinRequerido} onEditar={abrirNuevo} onCancelar={cancelar} onGuardar={guardar}>
      {enEdicion ? (
        <div className={clases.formulario}>
          {definicion.campos.map((campo) => (
            <CampoPerfil key={campo.clave} campo={campo} valor={enEdicion[campo.clave] ?? ''} onCambiar={(valor) => cambiar(campo.clave, valor)} />
          ))}
        </div>
      ) : (
        <>
          {items.length === 0 && <MensajeVacio texto={definicion.vacio} />}
          <ul className={clases.lista}>
            {items.map((item) => (
              <ItemListaPerfil key={item.id} item={item} datos={resumen(item)} icono={definicion.icono} propio={propio} onEditar={setEnEdicion} onEliminar={onEliminar} />
            ))}
          </ul>
          {propio && (
            <Boton type="button" variant="enlace" size="enlace_accion" onClick={abrirNuevo} className="mt-3">
              {definicion.agregar}
            </Boton>
          )}
        </>
      )}
    </MarcoSeccionPerfil>
  )
}
