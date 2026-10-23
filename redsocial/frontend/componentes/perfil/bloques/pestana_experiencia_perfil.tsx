import { guardarItem, quitarItem, resumenEmpleo, resumenFormacion } from './logica_edicion_perfil'
import { SeccionListaPerfil } from './seccion_lista_perfil'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PestanaEditablePerfilProps } from '@/tipos/perfil/contrato_perfil'
import type { CampoFormularioPerfil, DefinicionListaPerfil, EmpleoPerfil, FormacionPerfil, ItemPerfil } from '@/tipos/perfil/modelo_perfil'

const textos = catalogoPerfil.experiencia
const LABORAL = textos.laboral as DefinicionListaPerfil & { campos: CampoFormularioPerfil[] }
const FORMACION = textos.formacion as DefinicionListaPerfil

export function PestanaExperienciaPerfil({ perfil, propio, onGuardar }: PestanaEditablePerfilProps) {
  return (
    <>
      <SeccionListaPerfil
        definicion={LABORAL}
        items={perfil.empleos}
        propio={propio}
        resumen={(item) => resumenEmpleo(item as unknown as EmpleoPerfil, LABORAL.actual ?? '')}
        onGuardar={(item: ItemPerfil) => onGuardar({ empleos: guardarItem(perfil.empleos, item, 'empleo') })}
        onEliminar={(id) => onGuardar({ empleos: quitarItem(perfil.empleos, id) })}
      />
      <SeccionListaPerfil
        definicion={FORMACION}
        items={perfil.formaciones}
        propio={propio}
        resumen={(item) => resumenFormacion(item as unknown as FormacionPerfil)}
        onGuardar={(item: ItemPerfil) => onGuardar({ formaciones: guardarItem(perfil.formaciones, item, 'formacion') })}
        onEliminar={(id) => onGuardar({ formaciones: quitarItem(perfil.formaciones, id) })}
      />
    </>
  )
}
