import { ModalEliminarLista } from './modal_eliminar_lista'
import { ModalMiembrosLista } from './modal_miembros_lista'
import { ModalNombreLista } from './modal_nombre_lista'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { ModalesListasAmigosProps } from '@/tipos/amigos/contrato_listas'

const tipos = catalogoAmigos.tipos_modal_lista

export function ModalesListasAmigos({ control, amigos }: ModalesListasAmigosProps) {
  const { modal, listas } = control
  if (!modal) return null
  if (modal.tipo === 'crear') return <ModalNombreLista modo="crear" nombreInicial={String()} alConfirmar={control.crear} alCerrar={control.cerrar} />
  const lista = listas.find((candidata) => candidata.id === modal.id)
  if (!lista) return null
  if (modal.tipo === 'editar') return <ModalNombreLista key={lista.id} modo="editar" nombreInicial={lista.nombre} alConfirmar={(nombre) => control.renombrar(lista.id, nombre)} alCerrar={control.cerrar} />
  if (modal.tipo === tipos.eliminar) return <ModalEliminarLista lista={lista} alConfirmar={() => control.eliminar(lista.id)} alCerrar={control.cerrar} />
  return <ModalMiembrosLista key={lista.id} lista={lista} amigos={amigos} alGuardar={(miembros) => control.guardarMiembros(lista.id, miembros)} alCerrar={control.cerrar} />
}
