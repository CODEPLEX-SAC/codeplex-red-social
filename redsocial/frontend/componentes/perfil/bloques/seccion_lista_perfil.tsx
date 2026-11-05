import { useState } from 'react'
import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoPerfil } from './campo_perfil'
import { FilaPlaceholderPerfil } from './fila_placeholder_perfil'
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
    <li className={clases.fila_lista}>
      <span className={clases.caja_icono}>
        <Icono name={icono as IconName} className="h-4.5 w-4.5 text-texto-suave" />
      </span>
      <div className={clases.item_cuerpo}>
        <strong className="truncate text-campo-formulario text-texto">{datos.titulo}</strong>
        {datos.subtitulo && <span className="text-subtitulo text-texto-suave">{datos.subtitulo}</span>}
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
          {!propio && items.length === 0 && <p className={clases.vacio_ajeno}>{definicion.vacio}</p>}
          <ul className={clases.lista}>
            {items.map((item) => (
              <ItemListaPerfil key={item.id} item={item} datos={resumen(item)} icono={definicion.icono} propio={propio} onEditar={setEnEdicion} onEliminar={onEliminar} />
            ))}
          </ul>
          {propio && <FilaPlaceholderPerfil etiqueta={definicion.placeholder} accesible={definicion.agregar} icono={definicion.icono} onClick={abrirNuevo} />}
        </>
      )}
    </MarcoSeccionPerfil>
  )
}
