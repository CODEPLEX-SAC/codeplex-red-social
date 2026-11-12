import { TarjetaGrupoSugerido } from './tarjeta_grupo_sugerido'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { SeccionSugerenciasGruposProps } from '@/tipos/grupos/contrato_tus_grupos'

const clases = catalogoGrupos.clases.sugerencias

export function SeccionSugerenciasGrupos({ titulo, grupos, alUnirse }: SeccionSugerenciasGruposProps) {
  if (grupos.length === 0) return null

  return (
    <section className={clases.seccion}>
      <h2 className={clases.titulo}>{titulo}</h2>
      <div className={clases.rejilla}>
        {grupos.map((grupo) => (
          <TarjetaGrupoSugerido key={grupo.nombre} grupo={grupo} alUnirse={alUnirse} />
        ))}
      </div>
    </section>
  )
}
