import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonUnirseGrupo } from './boton_unirse_grupo'
import { referenciaDeMenu } from './logica_menu_grupo'
import { MembresiaGrupo } from './membresia_grupo'
import { usarAdministrarGrupo } from './usar_administrar_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { AccionesDetalleGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const detalle = catalogoGrupos.detalle
const clases = catalogoGrupos.clases.detalle

export function AccionesDetalleGrupo({ grupo, enlace, puerto, alInvitar, alCompartir }: AccionesDetalleGrupoProps) {
  const administrar = usarAdministrarGrupo()

  return (
    <>
      {grupo.rol === 'visitante' && <BotonUnirseGrupo nombre={grupo.nombre} puerto={puerto} />}
      {grupo.rol === 'administrador' && administrar && (
        <Boton type="button" variant="primario" size="md" className={clases.administrar_movil} onClick={administrar}>
          <Icono name="configuracion" className="h-4 w-4" /> {detalle.administrar}
        </Boton>
      )}
      {grupo.rol !== 'visitante' && (
        <Boton type="button" variant="primario" size="md" className={grupo.rol === 'administrador' ? clases.invitar_administrador : undefined} onClick={alInvitar}>
          <Icono name="nuevo-usuario" className="h-4 w-4" /> {detalle.invitar}
        </Boton>
      )}
      <Boton type="button" variant="secundario" size="md" className={grupo.rol === 'visitante' ? undefined : clases.compartir_oculto_movil} onClick={alCompartir}>
        <Icono name="compartir" className="h-4 w-4" /> {detalle.compartir}
      </Boton>
      {grupo.rol === 'miembro' && <MembresiaGrupo grupo={referenciaDeMenu(grupo, enlace)} enlace={enlace} puerto={puerto} />}
    </>
  )
}
