import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import { etiquetarCampo, manejarTexto } from './manejadores_campo_colaborador'
import type { CambiarCampoColaborador, DatosColaboradorInvitado } from '@/tipos/colaboradores/contrato_invitar_colaborador'

export function BloqueTelefonoWhatsapp({
  colaborador,
  alCambiarCampo,
}: { colaborador: DatosColaboradorInvitado; alCambiarCampo: CambiarCampoColaborador }) {
  return (
    <CampoEtiquetado variante="compacta" etiqueta={catalogoColaboradores.campos_informacion.telefono_whatsapp}>
      <div className="flex gap-2">
        <span className="flex h-control flex-none items-center gap-1 rounded-control border border-borde bg-superficie pl-3">
          <span className="h-3.25 w-4.5 rounded-sm degradado-bandera" />
          <Selector variant="integrado" aria-label={catalogoColaboradores.campos_informacion.codigo_pais} defaultValue={catalogoColaboradores.selectores.codigo_pais.opciones[0]}>
            {catalogoColaboradores.selectores.codigo_pais.opciones.map((o) => <option key={o}>{o}</option>)}
          </Selector>
        </span>
        <div className="min-w-0 flex-1">
          <CampoTexto
            valor={colaborador.telefono}
            alCambiar={manejarTexto(alCambiarCampo, 'telefono')}
            inputProps={etiquetarCampo(catalogoColaboradores.campos_informacion.telefono_whatsapp)}
            tipo="tel"
          />
        </div>
      </div>
      <span className="text-auxiliar text-texto-suave">{catalogoColaboradores.campos_informacion.telefono_ayuda}</span>
    </CampoEtiquetado>
  )
}
