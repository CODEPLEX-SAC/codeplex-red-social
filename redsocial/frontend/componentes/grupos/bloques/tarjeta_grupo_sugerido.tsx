import { Boton } from '../../compartido/interfaz/boton'
import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { TarjetaGrupoSugeridoProps } from '@/tipos/grupos/contrato_tus_grupos'

const clases = catalogoGrupos.clases.sugerencias

export function TarjetaGrupoSugerido({ grupo, alUnirse }: TarjetaGrupoSugeridoProps) {
  return (
    <article className={clases.tarjeta}>
      <img src={grupo.imagen} alt="" className={clases.portada} />
      <div className={clases.cuerpo}>
        <h3 className={clases.nombre}>{grupo.nombre}</h3>
        <p className={clases.meta}>{[grupo.miembros, grupo.publicaciones].join(' • ')}</p>
        <GrupoAvatares avatares={3} tamano="sm" resto={grupo.masAvatares} className="mb-0" />
        <Boton type="button" variant="secundario" size="default" className={clases.unirme} onClick={() => alUnirse(grupo.nombre)}>
          {catalogoGrupos.sugerencias.unirme}
        </Boton>
      </div>
    </article>
  )
}
