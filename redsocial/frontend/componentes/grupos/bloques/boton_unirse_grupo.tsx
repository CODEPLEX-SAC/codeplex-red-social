import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { BotonUnirseGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

export function BotonUnirseGrupo({ nombre, puerto }: BotonUnirseGrupoProps) {
  return (
    <Boton type="button" variant="primario" size="md" onClick={() => puerto.unirse(nombre)}>
      <Icono name="mas" className="h-4 w-4" /> {catalogoGrupos.sugerencias.unirme}
    </Boton>
  )
}
