import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { PanelLateral } from '../../compartido/bloques/panel_lateral'
import { FilaActividadReciente } from './fila_actividad_reciente'
import { FilaListaLateral } from './panel_lateral_amigos'
import { FilaPersonaConocer } from './fila_persona_conocer'
import type { ColumnaLateralAmigosProps } from '@/tipos/amigos/contrato_columna_lateral_amigos'

export function ColumnaLateralAmigos({ personas, listas, actividad }: ColumnaLateralAmigosProps) {
  return (
    <aside className="grid gap-4">
      <PanelLateral titulo={catalogoAmigos.secciones.personas_conocer} enlace={textosRedSocial.VER_TODAS} ruta={catalogoAmigos.rutas.sugerencias}>
        {personas.map((p) => (
          <FilaPersonaConocer key={p.nombre} nombre={p.nombre} comunes={p.comunes} />
        ))}
      </PanelLateral>
      <PanelLateral titulo={catalogoAmigos.secciones.tus_listas} enlace={textosRedSocial.VER_TODAS} ruta={catalogoAmigos.rutas.listas}>
        {listas.map((l) => (
          <FilaListaLateral key={l.nombre} icono={l.icono} color={l.color} nombre={l.nombre} miembros={l.miembros} />
        ))}
      </PanelLateral>
      <PanelLateral titulo={catalogoAmigos.secciones.actividad_reciente} enlace={textosRedSocial.VER_TODAS}>
        {actividad.map((a) => (
          <FilaActividadReciente key={a.nombre} nombre={a.nombre} accion={a.accion} tiempo={a.tiempo} />
        ))}
      </PanelLateral>
    </aside>
  )
}
