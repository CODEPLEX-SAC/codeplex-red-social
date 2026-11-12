import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonUnirseGrupo } from './boton_unirse_grupo'
import { referenciaDeMenu } from './logica_menu_grupo'
import { MembresiaGrupo } from './membresia_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { AccionesDetalleGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const detalle = catalogoGrupos.detalle

export function AccionesDetalleGrupo({ grupo, enlace, puerto, alInvitar, alCompartir }: AccionesDetalleGrupoProps) {
  return (
    <>
      {grupo.rol === 'visitante' && <BotonUnirseGrupo nombre={grupo.nombre} puerto={puerto} />}
      {grupo.rol !== 'visitante' && (
        <Boton type="button" variant="primario" size="md" onClick={alInvitar}>
          <Icono name="nuevo-usuario" className="h-4 w-4" /> {detalle.invitar}
        </Boton>
      )}
      <Boton type="button" variant="secundario" size="md" onClick={alCompartir}>
        <Icono name="compartir" className="h-4 w-4" /> {detalle.compartir}
      </Boton>
      {grupo.rol === 'miembro' && <MembresiaGrupo grupo={referenciaDeMenu(grupo, enlace)} enlace={enlace} puerto={puerto} />}
    </>
  )
}
